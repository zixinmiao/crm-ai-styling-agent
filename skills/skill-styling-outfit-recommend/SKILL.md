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
- `rejected_candidates`

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
- `mobile_card`

## 执行逻辑
1. 从 `matched_product_candidates` 中取置信度最高的 1-3 个商品候选作为起点。
2. **先查 `商品知识库`**：只有在商品知识库中命中的商品，才允许进入正式推荐链路；未命中的只可进入 `rejected_candidates`，不得直接推荐。
3. **再查 `搭配知识库`**：仅允许使用 `主单品款号` 命中、或 `搭配单品款号列表` 明确关联的 look；不得凭风格语义直接虚构一个新商品名。
4. **再查 `门店模拟库存库`**：
   - 推荐商品必须在库存表中存在记录
   - 优先 `有货`
   - 其次 `紧张`
   - `无货` 只能作为替代说明，不能进入正式候选
5. 用 `customer_profile.recommend_constraints` 做二次过滤：
   - 例如“不要太紧”“想显高”“偏通勤”
6. 最终输出 3-5 套候选，并标记：
   - `可直接试`
   - `需替代款`
   - `库存不足`
7. 将结果整理为可写入 `搭配候选记录` 的 `writeback_payload`。

## 手机端输出规则（强约束）
- 默认输出必须是 **手机端短版**，不要先输出长解释。
- 每套候选只保留 4 行核心信息：
  - `搭配`：主单品 + 搭配单品
  - `风格`
  - `理由`：一句话
  - `话术`：一句话
- `mobile_card` 建议控制在 **50-70 个汉字** 内。
- 详细解释只能作为附加层，不得占据默认主输出。

## 关键规则
- **禁止推荐不在 `商品知识库` 中的商品。** 如果像“收腰款藏蓝色雪纺衬衫”这类商品无法在知识库命中，就不得作为正式推荐结果输出。
- **禁止推荐不在 `门店模拟库存库` 中的商品。** 只有库存表里存在且状态为 `有货/紧张` 的商品，才可进入正式候选。
- 若命中的商品不足 3 套，优先少推，不要为了凑数编造商品。
- 若某搭配需要替代款，必须明确标注 `substitute_item`，且替代款也必须来自知识库与库存库。
- 如果 `item-match` 没法唯一识别商品，不要阻塞推荐；允许基于 Top3 候选并行生成，但每个候选仍必须经过“知识库命中 + 库存命中”校验。
