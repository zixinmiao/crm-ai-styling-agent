---
name: skill-styling-customer-profile-parse
description: 从导购文字、顾客偏好、试衣反馈和场景描述中提取顾客画像与身形约束，落表到飞书「顾客画像记录」。用于让搭配推荐不只看商品，也看人。
---

# 顾客画像与身形解析

## 输出 `result`
- `customer_profile`
- `body_shape_tags`
- `style_preference_tags`
- `scene_preference_tags`
- `recommend_constraints`
- `profile_id`：写表后返回的飞书记录 ID

## customer_profile 至少包含
- `height_level`（可选）
- `body_shape_tags`
- `fit_preference`
- `color_preference`
- `style_preference_tags`
- `taboo_points`
- `shopping_goal`

## 写表（必须执行）
**解析完成后写一条记录到「顾客画像记录」（table_id `tbld1EbJRzlb0ogR`）**，并把生成的 `profile_id` 回写到 `result`，供 `outfit_recommend` 使用：
- `顾客画像ID`：自动生成
- `身形标签`：`body_shape_tags`
- `风格偏好`：`style_preference_tags`
- `禁忌点`：`taboo_points`
- `试衣目标`：`shopping_goal`
- `推荐约束`：`recommend_constraints`
- `来源描述`：原始导购输入文字（保留追溯）

## 关键规则
- 没有明确身形信息时，不要编具体三围；只输出保守标签，如"小个子倾向 / 微胖倾向 / 标准身形待确认"
- 负向偏好必须进 `recommend_constraints`，例如"不想太紧""不要太短""想显高"
- 推荐阶段优先使用约束，而不是只做宽泛画像
- **禁止跳过写表**——`outfit_recommend` 通过 `profile_id` 反查约束，画像不落表会导致推荐缺少人维度
- 若同一顾客在同次试衣中多次描述偏好：更新原记录而非新增（用 `profile_id` 复用）
