---
name: skill-styling-knowledge-sync
description: 将商品知识卡、库存商品卡和搭配知识卡沉淀到知识库载体。用于输出适合写入飞书多维表格、飞书文档或 JSON 的结构化内容。
---

# 知识库沉淀

输出 `sync_result`：
- `product_knowledge_rows`
- `look_knowledge_rows`
- `doc_outline`
- `sync_summary`

## 推荐知识库结构
### 飞书多维表格
- `商品知识库`
- `门店库存库`
- `搭配知识库`
- `搭配候选记录`

### 飞书文档
- 品牌商品培训摘要
- 风格搭配方法论
- 单品搭配范式

## 关键规则
- 结构化事实优先落多维表格
- 方法论、总结、品牌表达优先落飞书文档
- 所有知识卡保留来源字段 `source_ref`
