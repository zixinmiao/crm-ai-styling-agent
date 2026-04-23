---
name: skill-styling-intake-router
description: 识别当前输入属于吊牌识别、库存导入、穿搭图拆解、顾客画像还是试衣候选请求，并路由到对应技能。
---

# 输入路由

输出 `result`：
- `input_type`
- `route_to`
- `route_reason`

## 输入类型
- `tag_image`：吊牌图 → `skill-styling-tag-recognize`
- `inventory_sheet`：库存数据 → `skill-styling-inventory-normalize`
- `look_image`：穿搭图 → `skill-styling-look-parse`
- `customer_description`：顾客偏好/身形描述 → `skill-styling-customer-profile-parse`
- `outfit_request`：试衣候选请求 → `skill-styling-outfit-recommend`

## 路由规则
- 图片中识别到吊牌文字/条形码特征 → `tag_image`
- 图片中识别到完整人物穿搭 → `look_image`
- 文本含身形/风格/场景描述 → `customer_description`
- 表格/CSV/结构化库存数据 → `inventory_sheet`
- 显式"推荐搭配/试衣"意图 → `outfit_request`
