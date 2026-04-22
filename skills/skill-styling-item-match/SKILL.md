---
name: skill-styling-item-match
description: 识别导购拍摄的单品图，并与商品知识库做候选匹配。用于“拍一张商品照片 -> 找到商品候选 -> 进入搭配推荐”场景。
---

# 单品识别与商品匹配

输出 `result`：
- `item_features`
- `matched_product_candidates`
- `match_confidence`
- `missing_fields`

## item_features 至少包含
- `category`
- `color`
- `material_guess`
- `silhouette`
- `fit`
- `style_tags`
- `key_visual_points`

## matched_product_candidates 至少包含
- `product_id`
- `product_code`
- `product_name`
- `match_reason`
- `match_confidence`

## 关键规则
- 优先做“候选匹配”，不要假装唯一识别成功
- 如果图片无法对应到唯一款号，至少输出 3 个候选商品
- 当前图片特征与商品知识库冲突时，以图片事实为主、款号为候选
- 后续推荐默认使用 `match_confidence` 最高的 1-3 个商品进入搭配候选生成
