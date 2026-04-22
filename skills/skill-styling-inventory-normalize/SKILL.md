---
name: skill-styling-inventory-normalize
description: 将门店库存表、SKU 列表或商品台账标准化成可供搭配检索的在库商品库。用于把库存数据映射为结构化商品字段，并补充可用于搭配推荐的风格和角色标签。
---

# 库存商品标准化

输出 `result`：
- `inventory_cards`
- `stock_summary`
- `conflicts`

## 关键规则
- 以库存真实性优先，禁止编造库存
- 一件商品至少输出：SKU/款号、颜色、尺码、库存状态、门店、价格
- 允许补充搭配标签：主单品、内搭、下装、外套、配饰
- 若商品知识库已有同款，可合并品牌知识字段，但库存字段以门店表为准
