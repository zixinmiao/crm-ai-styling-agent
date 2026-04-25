---
name: skill-styling-look-parse
description: 拆解导购上传的穿搭图片或品牌 look 图，识别穿搭中的商品组成、风格、色彩关系、层次结构和适合身形，形成搭配知识卡并写入飞书「搭配知识库」。
---

# 穿搭图片拆解

## 输出 `result`
- `look_cards`：拆解后的搭配知识卡数组
- `item_candidates`：图中识别到的单品候选（带款号猜测，可空）
- `style_summary`：整体风格总结
- `synced_look_ids`：写入「搭配知识库」后返回的 look_id 列表

## 每张 look_card 至少包含
- `look_id`
- `style_tags`
- `main_item`（主单品，含款号或品类描述）
- `match_items`（搭配单品）
- `color_relation`
- `layer_structure`
- `scene`（适合场景）
- `body_shape`（适合身形）
- `reason`（为什么这套搭配成立）
- `match_logic`（用于后续库存映射）
- `source`（来源图片/资料链接）

## 写表（必须执行）
**每张 look_card 都要写一条记录到「搭配知识库」（table_id `tbl9WHzDBzOD8t6j`）**：
- `look_id`：自动生成
- `风格标签`：`style_tags`
- `主单品`：`main_item`（优先填款号，无款号时填品类描述）
- `搭配单品`：`match_items`
- `色彩关系`：`color_relation`
- `层次结构`：`layer_structure`
- `适合场景`：`scene`
- `适合身形`：`body_shape`
- `推荐理由`：`reason`
- `来源图片/来源资料`：`source`

写入成功后，把每条记录的 `look_id` 收集到 `synced_look_ids` 返回。

## 关键规则
- 不仅识别单品，还要说明这套搭配为什么成立
- 至少输出：主单品、辅助单品、风格标签、色彩关系、适合场景、适合身形
- 若无法识别具体商品款号，可保留为通用品类描述（如"高腰阔腿牛仔裤"），但 `match_logic` 字段必须说明后续如何映射库存
- **禁止跳过写表**——下游 `outfit_recommend` 直接读「搭配知识库」做候选 look 召回，不落表等于没做
- 同一来源图片重复上传时：先按 `source` 字段去重，避免脏数据
