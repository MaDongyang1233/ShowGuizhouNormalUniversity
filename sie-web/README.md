# 贵州师范大学国际教育学院 · 展示网站

基于学院官方 JSON / XML 资料，结合官网图片与 ECharts 可视化打造的可部署静态单页网站。

## 项目结构

```
sie-web/
├── index.html                  # 首页（单页网站主体）
├── css/
│   └── style.css               # 全站样式
├── js/
│   ├── data.js                 # 数据层（源自 sie-college.json）
│   ├── main.js                 # 页面逻辑 + ECharts 图表
│   └── vendor/
│       └── echarts.min.js      # 本地 ECharts 图表库（离线可用）
├── data/
│   ├── sie-college.json        # 原始资料（JSON）
│   ├── sie-college-object.json # 原始资料（JSON·对象版）
│   └── sie-college.xml         # 原始资料（XML）
└── images/                     # 官网爬取图片（本地存储）
    ├── banner-1.jpg            # 书法文化体验工作坊
    ├── banner-2.jpg            # 2024 中国—东盟千校携手大会
    ├── news-qianschool.jpg     # 学院师生合影
    ├── news-ucopiano.jpg       # 中美高校音乐会
    ├── headline-liujin.jpg     # 学院调研会
    └── qr-wechat.jpg           # 微信公众号二维码
```

## 图表可视化一览

| 图表 | 位置 | 说明 |
|------|------|------|
| 数字滚动指标 | 首屏 Hero / 数据看板 | 人数、专业、院校数等动画计数 |
| 旭日图 Sunburst | 数据看板 | 本科专业 × 国际项目归属分布 |
| 环形饼图 Donut | 数据看板 | 合作院校国家构成 |
| 关系图 Graph | 数据看板 | 学院—合作院校国际合作版图 |
| 树图 Tree | 组织机构 | 领导团队 / 管理机构 / 教学院系 |

## 本地预览

用任意静态服务器打开即可（浏览器直接双击 `index.html` 亦可，数据已内联无需网络）：

```bash
# 在 sie-web 目录下启动本地静态服务器
cd "d:\国际教育学院介绍xml文件\sie-web"
python -m http.server 8123
# 浏览器访问 http://127.0.0.1:8123
```

## 部署上线（让他人通过链接访问）

本网站为**纯静态资源**，无需后端与数据库，可部署到任意静态托管平台：

- **GitHub Pages**：将 `sie-web/` 下的文件推送到仓库，在仓库 Settings → Pages 选择主分支即可，访问 `https://<用户名>.github.io/<仓库名>/`。
- **Gitee Pages / 码云**：国内访问更快，上传后一键发布生成链接。
- **腾讯云 COS / 阿里云 OSS 静态网站托管**：配置静态网站托管 + 自定义域名后即可访问。
- **Netlify / Vercel**：拖拽 `sie-web/` 文件夹上传，自动生成可分享链接。

任选一种，把生成的链接发给他人即可点击访问。

## 数据说明

- 数据整理自学院官网公开信息（来源：https://sie.gznu.edu.cn/ ），具体以官网最新发布为准。
- 图片均为官网公开页面爬取并存储至本地，避免防盗链导致失效。
- ICP 备案号：黔ICP备13004003号-2