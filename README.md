# XFH · 个人笔记

一个简洁、有轻科技感的个人博客。基于 Astro + Markdown，生成静态页面，使用 GitHub Pages 免费托管。不需要服务器、数据库或额外的字体/CDN服务。

**部署后地址：<https://xfhaixx.github.io/person_blog/>**

> 仓库地址不是博客地址。只有代码推送并成功完成 Pages 部署后，上面的链接才能访问。

## 功能

- 深色 / 浅色主题，自动保存选择。
- 分类筛选，自动从笔记内容汇总分类和数量。
- 搜索标题、摘要、标签和正文，支持多个关键词组合匹配。
- 筛选条件保存在网址中，方便收藏和分享。
- Markdown 文章、代码高亮、代码复制、阅读进度。
- 自动生成二级 / 三级标题目录，阅读时高亮对应章节。
- 同分类推荐、标签跳转搜索、移动端适配。
- 草稿不生成公开页面，不进入首页与搜索。
- GitHub Actions 自动构建并部署到 GitHub Pages。

初始 6 篇文章均为明确标注的**示例笔记**，不是作者真实经历。可以修改或删除。

## 1. 本地预览

推荐 Node.js 22.12+ 或 Node.js 24。

```bash
npm ci
npm run dev
```

打开 <http://localhost:4321/person_blog/>。

```bash
# 类型检查并生成静态站点
npm run build

# 预览构建产物
npm run preview
```

构建结果位于 `dist/`，无需手动提交此目录。

## 2. 首次上线 GitHub Pages

### 开启 Pages

1. 打开 <https://github.com/xfhaixx/person_blog/settings/pages>。
2. 找到 **Build and deployment → Source**。
3. 选择 **GitHub Actions**，不要选择 Deploy from a branch。

### 提交并推送代码

在当前博客目录内执行（需要你自己的 GitHub 登录权限）：

```bash
git add .
git commit -m "feat: build personal notes blog"
git push origin main
```

如果使用 HTTPS 推送且 Git 提示认证，请使用 Git Credential Manager、GitHub CLI 等正规登录方式，不要在笔记或代码中写入访问令牌。

### 确认发布结果

1. 打开仓库 **Actions**，找到 `Deploy blog to GitHub Pages`。
2. 等待 `build` 和 `deploy` 都成功。
3. 访问 <https://xfhaixx.github.io/person_blog/>。

如果代码已推送后才开启 Pages，可在 Actions 中打开该工作流，选择 **Run workflow** 重新发布。部署成功后首次访问可能需要稍等片刻。

常见问题：

- **找不到 Pages 设置**：确认当前登录账号拥有该仓库的管理权限，并且仓库满足 GitHub Pages 的套餐与可见性要求。
- **deploy 提示 Pages 未开启**：检查 Source 是否设为 GitHub Actions，然后重新运行工作流。
- **资源 404**：仓库名应是 `person_blog`。更换仓库名时同步修改 `astro.config.mjs` 的 `base`。

## 3. 写一篇新笔记

在 `src/content/notes/` 下新建 `my-first-note.md`：

```markdown
---
title: 我的第一篇笔记
description: 这里写一句简短摘要，用于首页卡片和搜索结果。
date: 2026-03-09
category: 编程实践
tags: [Python, 学习]
draft: false
---

## 背景

记录遇到的问题。

## 解决方法

写下思路、步骤与代码。

### 注意事项

补充细节。

## 总结

记录能够复用的结论。
```

- 日期改成实际写作日期；首页按照日期倒序排列。
- 文件名是文章 URL 的一部分，推荐英文小写和短横线，发布后尽量不改。
- `title`、`description`、`date`、`category` 必填。
- 分类名可以自行新增，无需修改页面代码。
- `tags` 可省略，默认空数组。
- `draft: true` 表示不发布，但**公开仓库里的源文件仍可被看到，不要放私人或敏感内容**。
- `example: true` 会显示「示例笔记」标记，真实笔记不用加。
- 正文从 `##` 开始，`##` 和 `###` 会自动进入目录。
- 修改后推送到 `main`，网站自动更新。

### 完全在 GitHub 网页上写

打开仓库 `src/content/notes/` → **Add file → Create new file** → 输入 `your-note.md` → 粘贴上面的格式并写正文 → 提交到 `main`。无需本地安装开发工具。

### 插入图片

把图片放在 `public/images/` 下，在 Markdown 中使用：

```markdown
![图片说明](/person_blog/images/example.png)
```

如果以后变更部署路径，需要同步修改这些图片链接。

## 4. 修改个人信息与风格

| 文件 | 用途 |
| --- | --- |
| `src/site.ts` | 站点名称、简介、GitHub 链接 |
| `src/pages/index.astro` | 首页主标题、装饰代码窗口和布局 |
| `src/pages/about.astro` | 关于页介绍 |
| `src/layouts/Layout.astro` | 顶栏标识、导航和页脚 |
| `src/styles/global.css` | 主题颜色、字体、布局和响应式样式 |
| `public/favicon.svg` | 浏览器标签图标 |
| `astro.config.mjs` | 网站域名和部署子路径 |

主题颜色使用 CSS 变量：`:root` 是深色，`:root[data-theme=light]` 是浅色，`--accent` 控制强调色。

## 5. 项目结构

```text
.github/workflows/deploy.yml  # 自动发布
public/                      # 图标、图片等静态资源
src/
  content/notes/             # Markdown 笔记
  content.config.ts         # 内容字段校验
  layouts/Layout.astro      # 通用页面框架
  pages/
    index.astro             # 分类、搜索与文章卡片
    notes/[...id].astro      # 阅读页面
    about.astro             # 关于
    404.astro               # 找不到页面
  styles/global.css         # 全站样式
  site.ts                   # 基本信息
astro.config.mjs
```

## 适用范围

这是公开的静态笔记博客，不带登录、在线后台或评论系统。搜索在浏览器内完成，适合个人中小规模笔记库；文章数量或内容规模显著增加后，可以进一步接入 Pagefind 等索引搜索。深浅主题、搜索交互和代码复制需要 JavaScript；文章正文与普通链接不依赖 JavaScript。
