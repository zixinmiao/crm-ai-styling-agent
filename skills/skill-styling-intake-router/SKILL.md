---
name: skill-styling-intake-router
description: 识别当前输入属于商品资料解析、库存导入、穿搭图拆解还是试衣候选请求，并路由到对应技能。
---

# 输入路由

输出 `result`：
- `input_type`
- `route_to`
- `route_reason`

## 输入类型
- `product_pdf`
- `inventory_sheet`
- `look_image`
- `single_product_image`
- `outfit_request`
