# SPSU26 PDF 解析字段映射表

## 一、商品知识库字段映射

| PDF 中可能出现的信息 | 映射到字段 | 说明 |
|---|---|---|
| Season / Collection / Line | 季节 / 系列 | 例如 SPSU26、Summer Utility |
| Style / Style No / Item Code | 款号 | 商品唯一识别的核心字段 |
| Product Name / Description | 商品名 | 统一保留原始英文或中文名 |
| Category / Tops / Bottoms / Outerwear | 品类 | 需要标准化成固定枚举 |
| Color / Wash | 颜色 | 可多值 |
| Fabric / Material | 材质 | 可拆成多选 |
| Fit / Silhouette | 版型 | 统一映射成修身/宽松/直筒等 |
| Key message / product highlight | 核心卖点 | 保留品牌表达 |
| Price / MSRP / price point | 价格带 | 若无具体价，可保留区间/等级 |
| Page number | 原始页码 | 追溯来源 |

## 二、搭配知识库字段映射

| PDF 中可能出现的信息 | 映射到字段 | 说明 |
|---|---|---|
| Theme / Editorial / Styling page | 主题/系列 | look 的主题归属 |
| Full look image | 来源图片 | 可保存页面截图或外链 |
| Key item | 主单品款号 | 若无法确认款号，可先填主单品描述 |
| Match items | 搭配单品款号列表 | 多件商品组合 |
| Styling keywords | 风格标签 | 如极简、通勤、松弛感 |
| Occasion / Occasion note | 场景标签 | 如通勤、周末、旅行 |
| Visual proportion / shape effect | 适合身形标签 | 如小个子友好、显高 |
| Color combination | 色彩关系 | 如同色系、撞色、深浅对比 |
| Layering / Styling note | 层次结构 | 如外套+内搭+下装 |
| Why it works | 搭配逻辑 / 推荐理由 | 这套搭配成立的原因 |

## 三、标准化建议

### 品类枚举建议
- T恤
- 衬衫
- 针织
- 卫衣
- 牛仔上装
- 外套
- 西装
- 连衣裙
- 半裙
- 牛仔裤
- 休闲裤
- 短裤
- 配饰

### 版型枚举建议
- 修身
- 合体
- 宽松
- oversize
- 直筒
- A字
- cropped
- 长款

### 风格标签枚举建议
- 极简
- 通勤
- 轻正式
- 美式休闲
- 法式
- 松弛感
- 青年感
- 干练
- 性感
- 度假

### 场景标签枚举建议
- 通勤
- 约会
- 周末
- 旅行
- 门店试衣追加推荐
- 社交聚会

### 身形标签枚举建议
- 小个子友好
- 高挑友好
- 微胖友好
- 梨形友好
- H型友好
- 沙漏型友好
- 肩宽友好

## 四、模拟库存生成规则
- 从商品知识库选取可搭配性强的商品优先进入模拟库存
- 优先保留：基础内搭、下装、外套、经典单品
- 每个商品生成 2-4 个尺码库存记录
- 库存状态规则：
  - 库存数量 >= 4：有货
  - 1-3：紧张
  - 0：无货

## 五、推荐链路中的使用方式
1. 输入单品图 / 款号
2. 先在 `商品知识库` 找到商品事实
3. 再在 `搭配知识库` 找相关 look 和搭配逻辑
4. 再从 `门店模拟库存库` 过滤出当前可卖商品
5. 生成 `搭配候选记录`
