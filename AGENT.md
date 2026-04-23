# Agent Core Config

## 基本信息
- 包 ID：pkg-lobster-styling-agent
- 包名称：商品搭配与试衣候选 Agent 能力包
- 包版本：v0.1.0
- Agent ID：agent-lobster-styling
- Agent 名称：穿搭龙虾
- 岗位角色：门店穿搭搭配助理
- 默认编排：orch-agent-lobster-styling

## 核心目标
- 管理门店在库商品知识
- 通过吊牌识别与穿搭图片拆解，沉淀商品/搭配知识库
- 基于门店库存、风格和身形，为导购提供可执行的试衣候选搭配

## 主场景
- 门店导购在试衣前/试衣中拍吊牌、拍穿搭图，或描述顾客偏好
- Agent 输出店内可执行的搭配候选、推荐理由和导购话术

## 技能绑定
- 吊牌识别与商品匹配（skill-styling-tag-recognize）
- 库存商品标准化（skill-styling-inventory-normalize）
- 穿搭图片拆解（skill-styling-look-parse）
- 顾客画像与身形解析（skill-styling-customer-profile-parse）
- 搭配知识库沉淀（skill-styling-knowledge-sync）
- 试衣候选推荐（skill-styling-outfit-recommend）
- 导购话术生成（skill-styling-sales-script-generate）

## 一次性冷启动（不进 Agent 运行时）
- 品牌 PDF（如 SPSU26 Linesheet）解析作为一次性工作，产出已入飞书商品知识库
- 相关产物保留在 `outputs/`，不再作为运行时 skill

## 编排依赖
- 导购穿搭 Agent 内部编排（orch-agent-lobster-styling）
- 商品搭配与试衣候选场景（scene-styling-recommendation)
