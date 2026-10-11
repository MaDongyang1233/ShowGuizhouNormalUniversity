/* ============================================================
 * 贵州师范大学国际教育学院 · 展示网站数据层
 * 本文件数据源自项目内原始资料 sie-college.json / sie-college-xml.sm
 * 数据整理自学院官网公开信息，仅供参考。
 * ============================================================ */
window.SIE = {
  meta: {
    code: "SIE-GZNU",
    zh: "贵州师范大学国际教育学院",
    en: "School of International Education, Guizhou Normal University",
    website: "https://sie.gznu.edu.cn/",
    location: "贵州省贵阳市贵安新区花溪大学城贵州师范大学西区",
    founded: 2014,
    predecessor: "英国高等教育文凭项目部（创办于2009年）",
    affiliation: "贵州师范大学"
  },

  /* 学院简介正文（分段） */
  intro: [
    "贵州师范大学国际教育学院前身为 2009 年成立的英国高等教育文凭项目部，2014 年，随着学校加大国际合作办学，正式成立国际教育学院。学院位于贵州省贵阳市贵安新区花溪大学城贵州师范大学西区，承担了中外合作办学项目学生及来华留学生的招生、管理等工作。",
    "学院现有英国高等教育文凭（SQA AD）项目、国际通识教育课程（IGEC）项目、与美国中央俄克拉荷马大学合作举办的音乐学专业本科教育项目，与美国中央俄克拉荷马大学、切斯特大学、赫尔大学、阿尔弗雷德大学、加努恩大学等 55 所英美大学有合作。",
    "学院现设置有工商管理系、旅游与酒店管理系、计算机与数据科学系、音乐教育系，包含旅游管理（国际酒店管理方向）、计算机科学与技术（软件开发方向）、市场营销、旅游管理、音乐学 5 个本科专业。",
    "学院设有国际学生事务管理中心，负责全校国际来华留学生的招生、日常管理和教学管理，并负责汉语水平考试（HSK）考点和剑桥五级考试（MSE）考点的考试工作。"
  ],

  /* 核心数据（量化口径来自原始资料） */
  metrics: [
    { icon: "👥", label: "全日制在校学生", value: 3600, suffix: "+", unit: "余人", note: "国内外学生" },
    { icon: "🎓", label: "本科专业", value: 5, suffix: "", unit: "个", note: "覆盖四大院系" },
    { icon: "🌍", label: "合作院校", value: 55, suffix: "", unit: "所", note: "美国、英国等" },
    { icon: "🤝", label: "国际项目", value: 3, suffix: "", unit: "个", note: "SQA AD / IGEC / 中美合作" },
    { icon: "🏛️", label: "教学院系", value: 4, suffix: "", unit: "个", note: "含国际学生管理中心" },
    { icon: "🛂", label: "管理机构", value: 5, suffix: "", unit: "个", note: "含国际考试中心" }
  ],

  /* 核心数据的另一口径展示（卡片大字） */
  heroMetrics: [
    { value: 3600, suffix: "+", label: "在校国内外学生" },
    { value: 55, suffix: "", label: "所国际合作院校" },
    { value: 5, suffix: "", label: "个本科专业" },
    { value: 2014, suffix: "", label: "年正式建院" }
  ],

  /* 项目 → 专业 归属（用于 sunburst） */
  programs: [
    {
      name: "SQA AD · 英国高等教育文凭",
      count: 2,
      children: ["旅游管理（国际酒店管理方向）", "计算机科学与技术（软件开发方向）"]
    },
    {
      name: "IGEC · 国际通识教育课程",
      count: 2,
      children: ["市场营销", "旅游管理"]
    },
    {
      name: "中美合作办学",
      count: 1,
      children: ["音乐学（中央俄克拉荷马大学合作）"]
    }
  ],

  /* 发展历程 */
  timeline: [
    { year: "2009", title: "英国高等教育文凭项目部成立", desc: "作为学院前身，启动英国高等教育文凭（HND/SQA）人才培养项目。" },
    { year: "2014", title: "正式成立国际教育学院", desc: "伴随学校加大国际合作办学力度，学院正式组建，统筹中外合作办学与来华留学生工作。" },
    { year: "2015—2019", title: "拓展国际教育版图", desc: "先后落地 SQA AD、IGEC 等国际项目，并开展中美合作音乐学本科教育项目，与英美高校陆续建立合作。" },
    { year: "至今", title: "办学体系日臻完善", desc: "设有四大院系及 5 个本科专业，国际学生事务管理中心服务全校来华留学生，设有 HSK、MSE 两大考试考点。" }
  ],

  /* 国际合作院校（官网点名） */
  partners: {
    total: 55,
    listed: [
      { name: "中央俄克拉荷马大学", country: "美国" },
      { name: "阿尔弗雷德大学", country: "美国" },
      { name: "加努恩大学", country: "美国" },
      { name: "切斯特大学", country: "英国" },
      { name: "赫尔大学", country: "英国" }
    ]
  },

  /* 组织机构（ECharts 树） */
  leadership: {
    positions: [
      { title: "党委书记", persons: ["尚源"] },
      { title: "院长", persons: ["姜山"] },
      { title: "党委副书记", persons: ["姜山", "汪莉栋"] },
      { title: "副院长", persons: ["陈昶", "秦欣"] },
      { title: "副处级组织员", persons: ["彭万斌"] }
    ]
  },
  offices: [
    { name: "办公室", phone: "0851-86700476" },
    { name: "教学科", phone: "0851-86758404" },
    { name: "学生科", phone: "0851-86700348" },
    { name: "学院团委", phone: "0851-86700348" },
    { name: "国际学生事务管理中心", phone: "0851-86759517" }
  ],
  departments: [
    { name: "工商管理系", phone: "0851-88911043" },
    { name: "旅游与酒店管理系", phone: "0851-88911331" },
    { name: "计算机与数据科学系", phone: "" },
    { name: "音乐教育系", phone: "" }
  ],

  /* 国际学生服务 */
  intlServices: {
    center: "国际学生事务管理中心",
    duties: ["全校国际来华留学生的招生", "国际来华留学生的日常管理", "国际来华留学生的教学管理"],
    centers: [
      { code: "HSK", name: "汉语水平考试考点" },
      { code: "MSE", name: "剑桥五级考试考点" }
    ]
  },

  /* 使命 */
  mission: [
    "培养具有本土情怀、国际视野和竞争力的应用型人才",
    "致力于培养学生的好奇心、创造力、执行力、合作精神",
    "为学生的发展提供多种选择",
    "着力培养学生的英语应用能力，使之成为其核心竞争力",
    "引入借鉴优质国际教育资源和理念，探索高等教育新模式"
  ],

  /* 师资亮点 */
  faculty: [
    "教师有美国、英国、法国、澳大利亚及港澳等地的留学背景",
    "能以国际先进教学理念和方法进行双语教学",
    "经教育部留学服务中心和英方专家培训后上岗"
  ],

  /* 联系方式 */
  contact: {
    address: "贵州省贵安新区花溪大学城贵州师范大学西区",
    postalCode: "550025",
    phoneOffice: "0851-86700476",
    phoneStudents: "0851-86700348",
    email: "sie@gznu.edu.cn",
    icp: "黔ICP备13004003号-2"
  },

  /* 图片来源（官网链接） */
  images: {
    banner1: "images/banner-1.jpg",
    banner2: "images/banner-2.jpg",
    team: "images/news-qianschool.jpg",
    concert: "images/news-ucopiano.jpg",
    meeting: "images/headline-liujin.jpg",
    qr: "images/qr-wechat.jpg"
  }
};