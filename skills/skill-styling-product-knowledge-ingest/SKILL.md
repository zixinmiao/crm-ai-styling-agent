---
name: skill-styling-product-knowledge-ingest
description: 解析品牌商品 PDF、商品图册和培训资料，抽取商品知识卡。用于从品牌商品资料中提取款号、品类、颜色、材质、版型、风格、适合场景与适合身形等结构化信息。
---

# 商品资料解析

输出 `result`：
- `product_cards`
- `source_summary`
- `missing_fields`

## 关键规则
- 优先抽取可稳定识别的商品事实：款号、品类、颜色、价格带、材质、版型、风格标签
- 将“品牌表达”与“可检索字段”同时保留
- 对 PDF 每页或每个系列保留来源引用，便于追溯
- 无法确认的字段标记为 `unknown`，不要编造

## 建议字段
- `brand`
- `season`
- `series`
- `product_code`
- `product_name`
- `category`
- `color`
- `material`
- `silhouette`
- `fit`
- `price`
- `style_tags`
- `scene_tags`
- `body_shape_tags`
- `selling_points`
- `source_ref`
