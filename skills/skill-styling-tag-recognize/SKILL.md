---
name: skill-styling-tag-recognize
description: 识别导购拍摄的商品吊牌图，OCR 款号/名称/颜色/尺码/价格，按款号优先精确命中飞书「商品知识库」并联查「门店库存库」得到商品与库存状态；无法确认时走人工兜底。用于"拍吊牌 → 得到商品 → 进入搭配推荐"场景。
---

# 吊牌识别与商品匹配

## 输出 `result`
- `tag_fields`：从吊牌上读到的原始字段
- `matched_product`：命中的商品知识库记录（单条，可能为空）
- `inventory_status`：当前门店该款该色该尺码的库存状态
- `missing_fields`：哪些字段缺失或模糊
- `needs_manual_input`：是否需要导购手工补输
- `failure_reason`：失败原因（如 `ocr_blurry` / `product_code_missing` / `knowledge_not_found` / `cannot_disambiguate`）
- `next_action`：建议下一步动作（如 `retake_tag_photo` / `input_product_code_manually` / `check_knowledge_base_record`）

## tag_fields 至少包含
- `product_code`：款号
- `product_name`：商品名称
- `color`：颜色（颜色名或色号）
- `size`：尺码
- `price`：吊牌价

## matched_product 来自飞书「商品知识库」
至少返回：
- `product_id`
- `product_code`
- `product_name`
- `brand`
- `season`
- `category`
- `color`
- `material`
- `silhouette`
- `style_tags`
- `scene_tags`
- `body_shape_fit`

## 执行逻辑

### ① 款号 OCR
调视觉模型识别吊牌图，输出 `product_code` / `product_name` / `color` / `size` / `price`。

### ② 款号优先精确匹配
1. 用 OCR 到的 `product_code` 去「商品知识库」（table_id `tblSZwqFZZdA2rCp`）按 `款号` 字段精确查询
2. 命中单条 → 直接采用
3. 命中多条（同款号多颜色）→ 用 OCR 到的 `color` 做二次过滤
4. 若二次过滤后仍无法唯一确认 → 落到 ③
5. 未命中 → 落到 ③

### ③ 人工兜底
- `needs_manual_input = true`
- `missing_fields` 列出缺失或模糊项（尤其是 `product_code`）
- 根据失败类型填写：
  - 吊牌模糊 / 反光 → `failure_reason = "ocr_blurry"`，`next_action = "retake_tag_photo"`
  - 款号未识别出 → `failure_reason = "product_code_missing"`，`next_action = "input_product_code_manually"`
  - 商品知识库未命中 → `failure_reason = "knowledge_not_found"`，`next_action = "check_knowledge_base_record"`
  - 同款号无法唯一确认 → `failure_reason = "cannot_disambiguate"`，`next_action = "input_product_code_manually"`
- 提示导购手工输入款号或重拍吊牌
- **不要猜测、不要模糊匹配出一个候选**

## 库存联查（命中商品后必须执行）
用命中的 `product_code` + `color` + OCR 到的 `size` 去「门店库存库」（table_id `tblVkg9lIp1DwOC8`）查：
- `有货` → `inventory_status = "in_stock"`
- `紧张` → `inventory_status = "low"`
- `无货` → `inventory_status = "out_of_stock"`
- 查不到记录 → `inventory_status = "not_listed"`

## 写表（必须执行）
**每次识别后无论成功失败，都要写一条记录到「吊牌识别日志」（table_id `tblGtOfomQ24Lkzm`）**：
- `识别记录ID`：自动生成
- `输入吊牌图`：原始上传图
- `款号`：OCR 到的 `product_code`（可空）
- `颜色`：OCR 到的 `color`
- `尺码`：OCR 到的 `size`
- `最终命中商品`：`matched_product.product_id`，未命中留空
- `库存状态`：`inventory_status`
- `是否走人工兜底`：`needs_manual_input`
- `失败原因`：`failure_reason`（成功时留空）

## 关键规则
- **禁止在未命中知识库时输出候选商品**——不准靠视觉特征猜款，这会污染下游推荐
- **禁止跳过库存联查**——下游 `outfit_recommend` 依赖 `inventory_status`
- **禁止跳过日志写入**——所有识别（含失败）必须落表，用于后续优化 OCR 与知识库覆盖率
- 若吊牌反光 / 模糊导致款号读不出：直接 `needs_manual_input = true`，并返回明确的 `failure_reason` 与 `next_action`，不要硬编
- 价格仅作为展示字段，不参与匹配逻辑
