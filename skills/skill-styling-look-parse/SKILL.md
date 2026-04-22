---
name: skill-styling-look-parse
description: 拆解导购上传的穿搭图片或品牌 look 图，识别穿搭中的商品组成、风格、色彩关系、层次结构和适合身形，形成搭配知识卡。
---

# 穿搭图片拆解

输出 `result`：
- `look_cards`
- `item_candidates`
- `style_summary`

## 关键规则
- 不仅识别单品，还要说明这套搭配为什么成立
- 至少输出：主单品、辅助单品、风格标签、色彩关系、适合场景、适合身形
- 若无法识别具体商品编码，可保留为通用品类描述
- 推荐保留 `match_logic` 字段，用于后续做库存映射
