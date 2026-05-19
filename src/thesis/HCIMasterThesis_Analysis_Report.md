# 阿尔托大学 HCI 硕士论文分析报告

三篇论文来源：阿尔托大学（Aalto University）人机交互与设计（Human Computer Interaction and Design）硕士项目2025届毕业生的硕士论文。

---

## 论文一：情感智能语音对话系统——支持老年人居家怀旧疗法

### 1. 基本信息

| 项目 | 内容 |
|------|------|
| 作者 | （论文中未标注，从内容推断为硕士论文） |
| 主题 | 设计与评估一个情感智能语音对话系统，支持老年人居家怀旧疗法（Reminiscence Therapy） |
| 合著方 | 无外部合作机构 |
| 页面 | 约66页正文 + 大量附录 |

### 2. 论文结构格式

#### 2.1 章节安排（共8章）

```
Chapter 1: Introduction       —— 动机、背景、研究目标、论文结构
Chapter 2: State of the Art  —— 文献综述（怀旧疗法、VUI、情感AI、现有系统、研究空白）
Chapter 3: Methodology       —— 研究方法论（UCD、文献综述、原型开发、可用性评估）
Chapter 4: Context of Use    —— 用户群分析、Persona、任务分析、环境分析
Chapter 5: Low-Fi Prototype  —— 低保真原型设计（线框图、用户流程）
Chapter 6: High-Fi Prototype —— 高保真原型实现（技术架构、情感检测逻辑）
Chapter 7: Evaluation Results —— 评估结果（老年人组3人 + 护理人员组4人的SUS/UEQ-S评分）
Chapter 8: Conclusion        —— 结论、讨论、设计启示、局限与未来方向
```

**格式特点：**
- 每个大章节有独立的intro和summary/transition段落
- 图表丰富（Figure + Table编号独立排序）
- 附录内容详尽（Consent forms、Questionnaires、Raw data等）
- 采用IEEE引用格式
- 页面编号从正文第1页开始，参考文献独立编号（i-xxx）

#### 2.2 辅助材料

- Appendix A: 伦理审查文件（知情同意书）
- Appendix B: 参与者人口统计数据
- Appendix C: Low-Fi线框图完整集合 + Figma链接
- Appendix D: 高保真原型界面截图

### 3. 使用的交互设计理论/框架

#### 3.1 主要设计方法论

**User-Centered Design (UCD) — ISO 9241-210**
- 贯穿全文的核心方法论
- 遵循四个主要阶段：Context-of-Use Analysis → Requirements Specification → Prototype Development → Usability Evaluation
- 迭代式设计过程

#### 3.2 具体理论框架

**怀旧疗法分类理论 (Cappeliez, Guindon & Robitaille, 2008)**
- 将怀旧疗法分为：整合型（integrative）、工具型（instrumental）、精神型（spiritual）、传讯型（transmissive）
- 以及负面类型：强迫型（obsessive）、逃避型（escapist）
- 依据情感效价（正/负）和焦点（自我/社会）进行二维分类

**情感计算与自然语言处理 (Affective Computing)**
- 实时情感检测框架
- Hume.AI Empathic Voice Interface (EVI) 的48维情感维度模型
- 情感valence评分公式：Emotion Score = (P_pos − P_neg) / (P_pos + P_neg + ε)

**VUIs老年人可用性研究**
- 语音交互降低认知/身体负担
- VUI陪伴感减少孤独
- 老年人的语音助手接受度研究

**技术框架：Next.js + Radix UI + Tailwind CSS + IndexedDB/LocalStorage**
- Hume.AI EVI做情感检测

### 4. Methodology（研究方法论）

#### 4.1 整体框架：User-Centered Design (UCD)

```
[Secondary Research]
       ↓
[Context-of-Use Analysis]
  - Affinity Diagramming
  - Persona Development
  - Task Scenarios
  - Environmental Mapping
       ↓
[User Requirements Specification]
       ↓
[Low-Fi Prototype] ← Expert Review (3 domain experts)
       ↓
[High-Fi Prototype] ← Remote usability testing
       ↓
[Usability Evaluation]
  - Post-Task Questionnaire
  - SUS (System Usability Scale)
  - UEQ-S (User Experience Questionnaire Short)
```

#### 4.2 次级研究方法

- **数据库**：ACM Digital Library、IEEE Xplore、Google Scholar、PubMed
- **时间范围**：2011年1月至2025年3月
- **搜索策略**：
  ```
  "(voice assistant OR VUI OR AI OR emotional AI) AND (elderly OR older adults) AND (reminiscence therapy)"
  ```
- **初检218条 → 去重约200条 → 标题摘要筛选 → 80篇全文审视 → 最终纳入28篇**

#### 4.3 可用性评估方法

**评估维度：**
1. Effectiveness（有效性）：用户能否完成任务
2. Efficiency（效率）：任务完成的难易和速度
3. User Satisfaction（用户满意度）：SUS + UEQ-S
4. Emotional Engagement（情感参与度）：情感适应性能否被感知为支持性

**参与者招募：**
- 3位老年人（65-80岁）+ 4位非正式护理人员
- 以pairs形式招募（老年人+其护理人员）
- 通过个人网络和社区组织招募

**评估工具：**
- Post-Task Questionnaire（任务特定问卷）
- SUS（系统可用性量表，10题，5点Likert）
- UEQ-S（用户体验问卷简短版，8题对，7点量表）

**评估流程：**
- 远程异步进行，模拟居家使用条件
- 参与者使用自有设备独立完成任务

### 5. 主要发现与结论

**老年人组结果：**
- SUS得分：82.50（SD=5.00）→ 优秀可用性水平
- UEQ-S： Pragmatic Quality 1.8（excellent）、Hedonic Quality良好、Overall 1.63（excellent）
- 主要问题：首次引导不足、语音助手语调不一致、库存照片缺乏个人相关性

**护理人员组结果：**
- SUS得分：81.25（SD=4.33）→ 良好可用性
- UEQ-S所有维度均为Excellent
- 主要问题：情感数据数值不清晰、情感检测准确度存疑、缺乏情境信息

### 6. 论文亮点与局限

**亮点：**
- 将情感AI技术（EVI）创新性地应用于怀旧疗法场景
- 清晰的双角色设计（老年人用户 + 护理人员管理员）
- 情感数据可视化（Emotion Trends时间线图、Stimuli Emotion Patterns）

**局限：**
- 样本量小（3+4=7人），无法代表更广泛群体
- 短期测试，缺乏长期效果评估
- 使用库存照片而非个人照片，降低了情感相关性
- 仅使用语音和文本进行情感检测，未引入面部表情等多模态信号

---

## 论文二：可触摸桌上游戏——用于探索能源电网的趣味互动设计

### 1. 基本信息

| 项目 | 内容 |
|------|------|
| 作者 | Sarah Sommerschuh |
| 主题 | 设计和评估一个可触摸桌上游戏，让博物馆游客趣味性地探索能源电网 |
| 合作方 | 100%FAT B.V.（荷兰艺术科技公司） |
| 日期 | 2025年7月28日 |
| 页面 | 91页正文 + 99页附录 |

### 2. 论文结构格式

#### 2.1 章节安排（共11章）

```
Chapter 1: Introduction        —— 背景、动机、目标、研究问题
Chapter 2: Theoretical Framework —— 设计思维、共创、可触摸桌面、可用性/参与度/学习、Octalysis游戏框架
Chapter 3: Research Context    —— 案例公司、项目范围
Chapter 4: Research Methodology —— IS研究框架、文献综述、利益相关者访谈+Co-Design、竞品分析
Chapter 5: Empathising         —— 关键利益相关者、Actor Map、访谈发现
Chapter 6: Analysis of Empathising —— 目标群体分析、设计启示、测量技术、竞品分析
Chapter 7: Defining Target Group —— Persona、MoSCoW分析
Chapter 8: Ideating Solutions   —— Bodystorming、Morphological Chart、Storyboarding
Chapter 9: Prototyping & Testing —— Low-Fi Paper、低保真草图 → High-Fi WoZ原型、可用性研究
Chapter 10: Discussion          —— 关键发现、局限、经验教训、未来方向
Chapter 11: Conclusion          —— 总结
```

**附录（几乎与正文等长，99页）：**
- A: Octalysis Framework详解
- B: 访谈和Co-Design session指南
- C-I: 各类文件（参与信息表、知情同意书、竞品概览、Storyboards、低保真草图等）
- K: High-Fi原型完整交互
- L-P: 可用性研究相关（参与信息表、Consent form、SUS、UES-SF、Guideline）
- Q-R: 问卷结果、数据

**格式特点：**
- 极强的Methodology章节——理论框架占约30%的正文内容
- 每个方法（如Design Thinking、Co-Design、Bodystorming等）都有完整的理论基础铺垫
- 大量引用HCI顶级会议/期刊文献（CHI, TEI等）
- 详细的竞品分析（表格形式）

#### 2.2 论文组织特色

**Theoretical Framework（第2章）独立成体系：**
- 2.1 Design Thinking
- 2.2 Co-Design
- 2.3 Tangible Tabletops
- 2.4 Usability, Engagement and Learning
- 2.5 Game Qualities and Drivers（Octalysis Framework）
- 2.6 Energy Grid

这种将理论背景独立成章的方式，特别适合将HCI理论课程内容与应用场景结合的论文。

### 3. 使用的交互设计理论/框架

#### 3.1 设计方法论

**Design Thinking（设计思维）**
- 五阶段非迭代过程：Empathise → Define → Ideate → Prototype → Test
- 明确说明不使用第六阶段（Implement），因为本项目不涉及实现

**Co-Design（共同设计）**
- 利益相关者积极参与设计全过程
- 使用Buchenau & Suri (2000)的Experience Prototyping方法
- Bodystorming（身体风暴）：在物理环境中通过角色扮演和移动表达想法

**Information Systems Research Framework**
- 结合了Design Thinking和IS研究方法

#### 3.2 具体理论模型

**Tokens and Constraints Framework (Da Costa et al.)**
- Tokens（物理对象）vs. Constraints（限制行为）
- Active tokens vs. Passive tokens
- Fiducial markers（基准标记）

**Octalysis Framework (Chou, 2025)**
- 8大游戏化驱动力：
  1. Epic Meaning and Calling
  2. Development and Accomplishment
  3. Empowerment of Creativity and Feedback
  4. Ownership and Possession
  5. Social Influence and Relatedness
  6. Scarcity and Impatience
  7. Unpredictability and Curiosity
  8. Loss and Avoidance

**可用性/参与度/学习三维变量**
- 三者相互关联：可用性→参与度→学习
- 博物馆情境下对三者的特定需求

**测量工具：**
- SUS（系统可用性量表）
- UES-SF（用户参与度量表-简短版，4维度：Focused Attention、Perceived Usability、Aesthetic Elements、Reward Factor）
- Pre/Post教育知识quiz

#### 3.3 技术实现

**Wizard of Oz (WoZ) 原型**
- 模拟20个tokens的识别系统
- ProtoPie + Figma制作高保真交互原型
- 通过蓝牙键盘远程触发token响应（模拟系统识别）
- 3D打印tokens和placeholders

### 4. Methodology（研究方法论）

#### 4.1 三阶段研究过程

```
Stage 1: Empathise (Chapter 4-5)
  - Literature Review
  - Competitive Analysis
  - Stakeholder Interviews with Co-Design Activity (Bodystorming)
  
Stage 2: Define & Ideate (Chapter 6-8)
  - Target Group Analysis
  - Persona Development
  - MoSCoW Requirements Analysis
  - Morphological Chart
  - Storyboarding
  
Stage 3: Prototype & Test (Chapter 9)
  - Low-Fi Paper Prototyping
  - High-Fi WoZ Prototyping (ProtoPie + 3D printing)
  - Usability Study (5 participants)
```

#### 4.2 利益相关者访谈

- **访谈对象**：包括博物馆教育工作者、能源行业专家、博物馆游客等
- **方法**：半结构化访谈 + Co-Design Activity（包含身体风暴和粗糙原型）
- **分析**：Taylor-Powell & Renner (2003)的方法 → ATLAS.ti编码 → Miro可视化

#### 4.3 可用性研究

**参与者：** 5人（筛选条件：偶尔去博物馆、不过于技术化、能源知识不深）

**测量：**
1. **可用性** → SUS问卷
2. **参与度** → UES-SF（Focused Attention、Perceived Usability、Aesthetic Elements、Reward Factor）
3. **学习效果** → Pre/Post教育quiz（4个开放性问题）

**观察数据：** 26次困惑/卡顿情境记录、18次wizard提示、14次学习到的动作

### 5. 主要发现与结论

**核心发现：**
- **SUS = 67**（略低于第50百分位68），属于"OK/一般"水平
- **UES-SF总分 = 4.0/5**（偏正）：Aesthetic 4.3、Reward 4.3、Perceived Usability 3.9、Focused Attention 3.3
- **学习效果**：取决于先验知识——知识较少的用户有明显学习效果，知识较多者无显著提升

**关键洞察：**
- 尽管有20个tokens，但没有被抱怨数量过多
- 设计策略（渐进式引入、分组、限制功能）有效防止了overwhelmingness
- 主要问题来自UI引导不足导致的困惑（而非tokens数量）
- 平均交互时长14分钟，远超博物馆参观者对互动装置的2分钟预期

### 6. 论文亮点与局限

**亮点：**
- 理论与实践强结合：整整一章讲述理论基础
- Co-Design深入实践（身体风暴、工作坊）
- Wizard of Oz方法巧妙解决了技术限制
- 竞品分析详尽，建立了明确的设计约束
- MoSCoW需求分级方法清晰

**局限：**
- 5人样本量极小
- WoZ模拟与真实系统差异
- 博物馆实地环境与实验室测试环境差异
- 测试时间短，无长期效果评估

---

## 论文三："Better a Lasagna than a Onesie"——探索产后日常需求与护理以指导支持性技术设计

### 1. 基本信息

| 项目 | 内容 |
|------|------|
| 作者 | Alice Benedetti |
| 主题 | 探索家庭如何在产后管理心理健康，以及数字技术如何有意义地支持他们 |
| 合作方 | OFFIS Research Institute（德国），NEST项目 |
| 日期 | 2025年7月31日 |
| 页面 | 65页正文 + 98页附录 |

### 2. 论文结构格式

#### 2.1 章节安排（共8章）

```
Chapter 1: Introduction         —— 问题陈述、研究背景
Chapter 2: State of the Art    —— 妊娠/分娩与心理健康、围产期心理健康、PPD与HCI、市场现有解决方案、NEST项目
Chapter 3: Methods             —— Feminist HCI、Human-Centered Design、数据收集与分析方法、专家评估
Chapter 4: Understanding Context —— 人种志vignette研究、在线调查、样本与招募
Chapter 5: Analysis & Requirements —— 反思性主题分析(RTA)、4个核心主题、16条设计需求
Chapter 6: Designing Solution   —— 构思、主要用户流程、中保真原型
Chapter 7: Validation           —— 认知走查、启发式评估、可访问性审计
Chapter 8: Conclusion           —— 讨论、局限与未来方向
```

**格式特点：**
- **方法论章节（Chapter 3）独立且详细**——Feminist HCI和HCD各占一节
- State of the Art章节篇幅较长，包含市场分析（现有技术分类）
- 主题分析结果直接推导出16条设计需求（与Design Requirements直接挂钩）
- 附录98页，包含完整的调查转录稿（多语言）
- 采用清晰的编号系统（1., 1.1, 1.1.1）

#### 2.2 论文组织特色

**独特的研究背景：**
- Feminist HCI价值观作为方法论根基
- NEST项目背景（产后抑郁的无屏幕技术预防）
- 研究者reflexivity声明（在3.3节明确说明研究者身份立场）

### 3. 使用的交互设计理论/框架

#### 3.1 设计方法论

**Human-Centered Design (HCD) — ISO 9241-210:2019**
- 明确区分UCD和HCD：HCD更强调"人"而非"用户"
- 六个核心原则：
  1. 基于对用户、任务、环境的明确理解
  2. 用户全程参与
  3. 以用户为中心的评估驱动设计
  4. 迭代过程
  5. 解决整体用户体验
  6. 多学科团队

**Feminist HCI (Bardzell, 2010)**
- 核心价值：多元化（pluralism）、参与性（participation）、具身性（embodiment）、倡导性（advocacy）
- 强调研究者反思性（reflexivity）
- 以关怀（care）、代理（agency）、福祉（wellbeing）为核心

#### 3.2 数据分析方法

**Reflexive Thematic Analysis (RTA) — Braun & Clarke**
- 理论灵活性 + 研究者主观性强调
- In Vivo coding（使用参与者原话作为代码）
- ATLAS.ti软件辅助编码
- Miro用于主题可视化

#### 3.3 评估方法

**专家评估三角验证：**
1. Cognitive Walkthrough（认知走查）
2. Heuristic Evaluation（启发式评估，Nielsen's 10 heuristics）
3. Accessibility Audit（可访问性审计，WCAG 2.1）

**可访问性标准：**
- 1.3.3感官特征、1.4.1颜色使用、1.4.6颜色对比（AAA级）
- 2.5.5触摸目标尺寸（≥44×44px）
- 3.1.3不常用词、3.1.4缩写
- 3.2.3一致导航、3.2.4一致识别
- 3.3.2标签或说明

### 4. Methodology（研究方法论）

#### 4.1 研究设计

**在线调查 + 人种志vignette研究**
- 通过LimeSurvey平台管理
- **5种语言**：英语、德语、意大利语、西班牙语、芬兰语
- **匿名性设计**：无个人数据收集
- **筛选机制**：screen-out问题排除非目标人群

**调查内容（3个主题）：**
1. 产后心理健康相关挑战
2. 社区与支持
3. 见解、愿望与后见之明

#### 4.2 样本情况

- 总计53份回复
- 分布：意大利33人、德国11人、西班牙4人、芬兰2人、美国1人
- 平均年龄49岁（范围28-79岁）
- 51位女性，1位男性（仅1位非生育伴侣）
- **68.52%**报告了围产期心理健康挑战

#### 4.3 分析过程

```
数据熟悉化 → 生成初始代码(ATLAS.ti)
  → 放弃AI辅助编码（过于碎片化）
  → 手动编码 + In Vivo编码
  → Miro可视化聚类
  → 三轮主题修订
  → 最终4个核心主题
```

#### 4.4 设计迭代

```
Mid-Fi Prototype (Paper sketches)
       ↓
Expert Evaluation Round 1:
  - Cognitive Walkthrough → 11个可用性问题
       ↓
Second Iteration (改善3个主要问题)
       ↓
Expert Evaluation Round 2:
  - Heuristic Evaluation → 2个minor问题
  - Accessibility Audit → 所有检查通过
```

### 5. 主要发现与结论

#### 5.1 四个核心主题

**Theme 1: 适应 parenthood 很困难，期望并无帮助**
- 产后情绪波动（joy, confusion, sadness, anxiety同时出现）
- 社会对母职的完美主义期望造成额外压力
- 未被请求的建议（unsolicited advice）造成伤害

**Theme 2: 身体恢复、护理缺口与隐形困境**
- 身体恢复比预期更慢（会阴撕裂、剖宫产疼痛等）
- 医疗系统对心理健康的忽视
- 母乳喂养支持的缺失
- PTSD、产后抑郁、甚至自杀意念

**Theme 3: 请求、接受和给予支持并不简单**
- 伴侣是最重要和最频繁的支持来源
- 女性家属（母亲、婆婆）比男性更多地提供支持
- 实际的、动手的帮助（"Better a lasagna than a onesie"）比情感鼓励更受欢迎
- 寻求帮助的障碍：害怕被评判、愧疚感、不知道该向谁求助

**Theme 4: 不仅仅是母亲，不仅仅是婴儿——重拾身份与承认人格**
- 母亲作为独立个体的身份被边缘化
- 简单行为（独自散步、二人晚餐）被视为自我保存而非自私
- 婴儿也是独立个体，有独特个性需要被发现

#### 5.2 16条设计需求（节选）

| ID | 需求 |
|----|------|
| R1 | 不带评判地支持情感复杂性 |
| R2 | 挑战理想化的父母期望 |
| R3 | 正常化对帮助的需求 |
| R4 | 降低寻求帮助的门槛 |
| R5 | 为倾听而非说教而设计 |
| R6 | 承认整体恢复过程（身体+情绪+心理） |
| R7 | 提供响应式和共情式信息 |
| R8 | 去污名化地鼓励专业支持 |
| R9 | 优先实际支持而非表演性支持 |
| R10 | 尊重情感边界和主体性 |
| R11 | 促进非评判性的诚实同伴支持 |
| R12 | 通过温和提示支持帮助寻求 |
| R13 | 适应不同角色和需求 |
| R14 | 支持身份连续性和自我反思 |
| R15 | 将婴儿视为个体而非清单 |
| R16 | 促进自主性同时不忽视联结 |

### 6. 论文亮点与局限

**亮点：**
- Feminist HCI框架的深度整合（非表面引用）
- 强烈的reflexivity声明——研究者明确说明自身立场和局限
- 从定性数据到设计需求的清晰转化路径
- 调研设计高度考虑伦理（匿名性、情感安全、screen-out机制）
- 多语言国际调研

**局限：**
- 缺乏与最终用户的直接测试（仅专家评估）
- 样本集中在西欧（意大利、德国为主）
- 回顾性数据（部分参与者回忆30年前的生产经历）
- 研究者作为 outsider 的位置

---

## 三篇论文综合比较

### 1. 格式与结构共同点

| 方面 | 论文一 | 论文二 | 论文三 |
|------|--------|--------|--------|
| 章节层次 | 8章 | 11章 | 8章 |
| 附录规模 | 中等 | 约等于正文 | 约等于正文 |
| 理论章节 | 合并在State of the Art | 独立Theoretical Framework | 独立Methods章 |
| 参考文献格式 | IEEE（编号式） | IEEE | IEEE |

### 2. 方法论共同模式

所有三篇论文都遵循以下模式：

```
文献综述/理论背景
    ↓
用户/利益相关者研究
    ↓
设计需求/Requirements
    ↓
原型设计与迭代
    ↓
评估（用户测试 OR 专家评估 OR 两者）
    ↓
讨论、局限、未来方向
```

### 3. HCD/UCD原则的应用

| HCD原则 | 论文一 | 论文二 | 论文三 |
|---------|--------|--------|--------|
| 1. 明确理解用户/任务/环境 | ✅ Context of Use分析 | ✅ Empathise阶段 | ✅ Online Survey + Vignette |
| 2. 用户全程参与 | ✅ 老年人+护理人员配对测试 | ✅ Co-Design工作坊 | ⚠️ 仅有专家评估 |
| 3. 用户为中心的评估驱动 | ✅ Remote可用性测试 | ✅ Usability Study | ✅ Cognitive Walkthrough + Heuristic |
| 4. 迭代过程 | ✅ Low-Fi → High-Fi | ✅ Low-Fi → High-Fi WoZ | ✅ 两轮专家评估 |
| 5. 整体用户体验 | ✅ 双角色界面 | ✅ 博物馆游戏体验 | ✅ 产后控制中心app |
| 6. 多学科视角 | ✅ HCI+心理学+老年学 | ✅ HCI+游戏设计+能源系统 | ✅ HCI+女性健康+心理健康 |

### 4. 评估方法比较

| 评估方法 | 论文一 | 论文二 | 论文三 |
|---------|--------|--------|--------|
| SUS | ✅ | ✅ | ⚠️ (启发式评估中提及) |
| UEQ/UES | ✅ UEQ-S | ✅ UES-SF | ❌ |
| 任务/知识测试 | ✅ 任务完成度 | ✅ Pre/Post quiz | ❌ |
| 访谈 | ✅ Post-task访谈 | ✅ 半结构化后访谈 | ❌ (专家评估替代) |
| 观察 | ✅ 远程观察 | ✅ 现场录像观察 | ❌ |
| 认知走查 | ❌ | ❌ | ✅ |
| 启发式评估 | ❌ | ❌ | ✅ Nielsen's 10 |
| 可访问性审计 | ❌ | ❌ | ✅ WCAG 2.1 |

### 5. 各自独特贡献

**论文一：**
- Hume.AI情感AI与怀旧疗法的创新结合
- 双用户系统（老年人+护理人员）
- 情感valence评分的数学公式

**论文二：**
- 大数量tokens（20个）的TUI设计策略
- Wizard of Oz原型的巧妙工程解决方案
- Octalysis游戏化框架的实际应用
- Bodystorming + Co-Design的深入实践

**论文三：**
- Feminist HCI作为方法论核心（非点缀）
- Reflexive Thematic Analysis的完整过程记录
- 16条从定性发现直接推导的设计需求
- 产后心理健康领域的HCI设计指南

---

## 值得学习和借鉴的要点

### 1. 论文结构建议

- **理论框架独立成章**（如论文二）适合将课程理论与应用结合的论文
- **附录应当完整**——包含所有问卷、原始数据、补充图表
- **每个方法都应引用理论基础**，而非仅描述操作步骤
- **章节间应有过渡段落**，说明章节内容和与上下文的联系

### 2. 研究设计建议

- **UCD/HCD框架作为贯穿线**：从背景到评估始终呼应最初的方法论选择
- **多种评估方法三角验证**：SUS + 访谈 + 观察比单一方法更有说服力
- **样本量虽小但分析深入**：描述性统计 + 开放式反馈 + 观察记录
- **伦理考虑应当显著**：专门的伦理章节或段落（如论文三的reflexivity）

### 3. 写作风格建议

- **使用具体命名**：避免抽象标题，使用描述性标题（如论文三的"Better a Lasagna than a Onesie"直接引用参与者原话）
- **理论与实践交织**：论文二在第2章详细铺垫每个理论，第9章再回溯引用
- **明确的研究者立场**：尤其在敏感话题（论文三的Feminist HCI框架、研究者reflexivity声明）
- **设计启示（Design Implications）应具体可操作**：从发现直接推导，而非泛泛而谈

### 4. 研究方法启示

- **在线调查适用于敏感话题**：匿名性能提高真实表达意愿（论文三）
- **Wizard of Oz适合技术受限的场景**：能在无完整实现的情况下测试交互（论文二）
- **专家评估可部分替代用户测试**：适合目标用户难以招募的情况（论文三）
- **MoSCoW分析提供清晰的需求优先级**：论文二的应用示范了如何在企业合作项目中管理需求

### 5. 数据可视化建议

- **情感时间线图**（论文一）：直观展示会话过程中的情感变化
- **参与者流程图+照片**（论文二）：高保真原型与实际使用情境对照
- **四象限情绪图**（论文三）：借鉴Mood Meter的二维情感映射
- **数据表格+图示并用**：三篇论文都展示了如何将定量数据同时用表格和图表呈现

---

*报告完成时间：2026-04-07*
*分析基于三篇论文的完整正文和附录内容*
