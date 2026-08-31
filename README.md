# 张涵的个人网站 · Cinematic 版

这是张涵个人网站的 Cinematic 版本，用于 GitHub Pages。上一版 Aethera 网站已保留为独立本地备份和 Git 回退标签。

## 设计方向

- 全屏电影窗景首屏，后续区块统一浅灰紫纸面、近白卡片与细线，并用紫、绿、粉、橙作小面积强调
- 四个产品工作阶段：洞察、设计、验证、复盘
- 点击后先切换对应的本地场景封面，再由加载完成的视频无缝接管
- 默认只加载当前视频；手机、省流量和减少动态效果时使用四张本地场景封面
- 按“项目案例 → 产品方法 → 文章洞察 → 关于与联系”组织访问路径
- 产品工厂、SignalBloom 与追因三个项目均用“问题、关键动作、可查看产出”说明，文章分为精选与更多且不重复
- 移动端导航、当前区块高亮与轻量滚动动效
- 尊重系统的“减少动态效果”设置

## 技术结构

- 纯 HTML / CSS / JavaScript
- 无 JavaScript 框架和构建依赖
- `index.html`：页面内容与结构
- `css/style.css`：电影感首屏、完整视觉与响应式样式
- `js/main.js`：双视频槽交叉切换、移动导航、区块高亮与轻量动效
- `assets/scene-1.jpg` 至 `assets/scene-4.jpg`：四种场景的轻量本地封面
- `assets/hero-landscape.jpg`：上一版原创景观保留文件
- `assets/cinematic-window.png`：电影窗景叠加层
- `assets/og-card-cinematic.png`：Cinematic 版社交分享图

## 本地查看

在此目录启动任意静态文件服务，然后打开首页即可。发布时只同步网站文件，并保留 Git 回退点。
