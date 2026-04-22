---
name: skill-styling-customer-profile-parse
description: 从导购文字、顾客偏好、试衣反馈和场景描述中提取顾客画像与身形约束。用于让搭配推荐不只看商品，也看人。
---

# 顾客画像与身形解析

输出 `result`：
- `customer_profile`
- `body_shape_tags`
- `style_preference_tags`
- `scene_preference_tags`
- `recommend_constraints`

## customer_profile 至少包含
- `height_level`（可选）
- `body_shape_tags`
- `fit_preference`
- `color_preference`
- `style_preference_tags`
- `taboo_points`
- `shopping_goal`

## 关键规则
- 没有明确身形信息时，不要编具体三围；只输出保守标签，如“小个子倾向 / 微胖倾向 / 标准身形待确认”
- 负向偏好必须进 `recommend_constraints`，例如“不想太紧”“不要太短”“想显高”
- 推荐阶段优先使用约束，而不是只做宽泛画像
