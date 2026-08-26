# 张涵的个人网站 · Cinematic 版

这是张涵个人网站的 Cinematic 版本，用于 GitHub Pages。上一版 Aethera 网站已保留为独立本地备份和 Git 回退标签。

## 设计方向

- 全屏电影窗景首屏、液态玻璃导航与克制的场景切换
- 四个产品工作阶段：洞察、设计、验证、复盘
- 点击后先切换对应的本地场景封面，再由加载完成的视频无缝接管
- 默认只加载当前视频；手机、省流量和减少动态效果时使用四张本地场景封面
- 精选写作、完整文章索引、开源项目与联系方式
- 文章关键词搜索、移动端导航与轻量滚动动效
- 尊重系统的“减少动态效果”设置

## 技术结构

- 纯 HTML / CSS / JavaScript
- 无 JavaScript 框架和构建依赖
- `index.html`：页面内容与结构
- `css/style.css`：电影感首屏、完整视觉与响应式样式
- `js/main.js`：双视频槽交叉切换、导航、文章搜索与轻量动效
- `assets/scene-1.jpg` 至 `assets/scene-4.jpg`：四种场景的轻量本地封面
- `assets/hero-landscape.jpg`：上一版原创景观保留文件
- `assets/cinematic-window.png`：电影窗景叠加层
- `assets/og-card-cinematic.png`：Cinematic 版社交分享图

## 本地查看

在此目录启动任意静态文件服务，然后打开首页即可。发布时只同步网站文件，并保留 Git 回退点。
