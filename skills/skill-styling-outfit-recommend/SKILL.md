---
name: skill-styling-outfit-recommend
description: 基于单品图、商品知识、门店库存和顾客身形信息，输出 3-5 套店内可执行搭配候选。用于试衣前、试衣中和导购现场推荐场景。
---

# 试衣候选推荐

输出 `result`：
- `outfit_candidates`
- `candidate_summary`
- `missing_inputs`
- `writeback_payload`

## 输入依赖
- `matched_product_candidates`（来自 `skill-styling-item-match`）
- `customer_profile` / `recommend_constraints`（来自 `skill-styling-customer-profile-parse`）
- `商品知识库`（飞书表）
- `搭配知识库`（飞书表）
- `门店模拟库存库`（飞书表）

## 每套候选至少包含
- `look_name`
- `style_tags`
- `target_body_shape`
- `main_item`
- `match_items`
- `inventory_available`
- `recommend_reason`
- `try_on_priority`
- `sales_hint`

## 执行逻辑
1. 从 `matched_product_candidates` 中取置信度最高的 1-3 个商品候选作为起点
2. 在 `搭配知识库` 中按以下优先级找 look：
   - 主单品款号直接命中
   - 风格标签相近
   - 场景标签相近
   - 身形标签不冲突
3. 再到 `门店模拟库存库` 过滤搭配单品：
   - 优先 `有货`
   - 其次 `紧张`
   - `无货` 只能作为替代说明，不能作为主推荐
4. 用 `customer_profile.recommend_constraints` 做二次过滤：
   - 例如“不要太紧”“想显高”“偏通勤”
5. 最终输出 3-5 套候选，并标记：
   - `可直接试`
   - `需替代款`
   - `库存不足`
6. 将结果整理为可写入 `搭配候选记录` 的 `writeback_payload`

## 关键规则
- 必须优先门店有库存的商品
- 至少输出 3 套不同风格或不同身形友好的候选
- 若缺少顾客身形信息，可按“小个子/高挑/微胖/标准”给出分层候选
- 若某搭配需要替代款，必须明确标注 `substitute_item`
- 如果 `item-match` 没法唯一识别商品，不要阻塞推荐；允许基于 Top3 候选并行生成候选搭配
