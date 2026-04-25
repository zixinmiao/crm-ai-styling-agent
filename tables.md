# 飞书多维表格字典

> 给 ArkClaw 配置飞书工具时使用。所有表都在同一个 Base 下，凭据共用。

## Base 信息
- **App Token（Base ID）**：`WKxvbOg1XaeYPRslkuVcpSoonic`
- **Base URL**：https://yhdn05cxqe.feishu.cn/base/WKxvbOg1XaeYPRslkuVcpSoonic

## 表清单

| 表名 | table_id | 用途 | 主要使用 Skill |
|---|---|---|---|
| 商品知识库 | `tblSZwqFZZdA2rCp` | 品牌商品主数据 | tag-recognize（读）/ outfit-recommend（读）/ inventory-normalize（合并）/ knowledge-sync |
| 搭配知识库 | `tbl9WHzDBzOD8t6j` | look 卡 / 搭配方案 | outfit-recommend（读）/ look-parse（写）/ knowledge-sync |
| 门店库存库 | `tblVkg9lIp1DwOC8` | 门店在库 SKU + 数量 | tag-recognize（读）/ outfit-recommend（读）/ inventory-normalize（写） |
| 搭配候选记录 | `tblorQwKBBRJwPra` | 每次试衣推荐落表 | outfit-recommend（写） |
| 顾客画像记录 | `tbld1EbJRzlb0ogR` | 顾客身形 / 偏好 / 约束 | customer-profile-parse（写）/ outfit-recommend（读） |
| 吊牌识别日志 | `tblGtOfomQ24Lkzm` | 每次吊牌识别记录与命中结果 | tag-recognize（写） |

## 字段命名约定
- 飞书侧字段统一使用中文（如 `款号`、`颜色`、`尺码`）
- SKILL.md 内部变量用英文（如 `product_code`、`color`、`size`）
- ArkClaw 工具节点中需做字段映射：英文变量 ↔ 中文字段名

## 关键字段映射（建议保持一致）

### 商品知识库
| 英文 | 中文 |
|---|---|
| product_code | 款号 |
| product_name | 商品名 |
| brand | 品牌 |
| season | 季节 |
| series | 系列 |
| category | 品类 |
| color | 颜色 |
| material | 材质 |
| silhouette | 版型 |
| style_tags | 风格标签 |
| scene_tags | 场景标签 |
| body_shape_fit | 适合身形 |
| selling_points | 卖点 |
| source | 来源 |

### 门店库存库
| 英文 | 中文 |
|---|---|
| store | 门店 |
| sku | SKU |
| product_code | 款号 |
| product_name | 商品名 |
| color | 颜色 |
| size | 尺码 |
| price | 价格 |
| stock_qty | 库存数量 |
| stock_status | 在库状态 |
| match_role | 搭配角色 |
| substitute | 近似替代款 |

### 搭配知识库
| 英文 | 中文 |
|---|---|
| look_id | look_id |
| style_tags | 风格标签 |
| main_item | 主单品 |
| match_items | 搭配单品 |
| color_relation | 色彩关系 |
| layer_structure | 层次结构 |
| scene | 适合场景 |
| body_shape | 适合身形 |
| reason | 推荐理由 |
| source | 来源图片/来源资料 |

### 顾客画像记录
| 英文 | 中文 |
|---|---|
| profile_id | 顾客画像ID |
| body_shape_tags | 身形标签 |
| style_preference | 风格偏好 |
| taboo_points | 禁忌点 |
| shopping_goal | 试衣目标 |
| recommend_constraints | 推荐约束 |
| source_desc | 来源描述 |

### 吊牌识别日志
| 英文 | 中文 |
|---|---|
| log_id | 识别记录ID |
| tag_image | 输入吊牌图 |
| product_code | 款号 |
| color | 颜色 |
| size | 尺码 |
| matched_product_id | 最终命中商品 |
| inventory_status | 库存状态 |
| needs_manual_input | 是否走人工兜底 |
| failure_reason | 失败原因 |

### 搭配候选记录
| 英文 | 中文 |
|---|---|
| candidate_id | 候选ID |
| customer_profile_id | 顾客画像ID |
| main_product_code | 主单品款号 |
| outfit_payload | 搭配内容 |
| mobile_card | 手机端卡片 |
| sales_script | 导购话术 |
| try_on_priority | 试衣优先级 |
| created_at | 生成时间 |
