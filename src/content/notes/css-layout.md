---
title: CSS 布局笔记：Grid 与 Flex 怎么选？
description: 理清两种布局工具的适用场景，用少量 CSS 组织出清晰、适配手机的页面结构。
date: 2026-03-02
category: 编程实践
tags: [CSS, 前端]
example: true
---
> 示例笔记：用于展示技术内容和代码块样式。

## 一维还是二维？

一个简单的判断方式：

- **Flex**：主要关心一行或一列中的排列，例如导航栏、按钮组。
- **Grid**：同时关心行与列的关系，例如卡片列表、主内容加侧栏。

它们不是竞争关系，实际页面中经常组合使用。

## 用 Grid 排列卡片

```css
.note-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 600px) {
  .note-grid {
    grid-template-columns: 1fr;
  }
}
```

`minmax(0, 1fr)` 允许列收缩，减少长文本或代码撑破布局的情况。

## 用 Flex 对齐元素

```css
.card-footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-footer .arrow {
  margin-left: auto;
}
```

这里的 `margin-left: auto` 会吸收剩余空间，把箭头推到最右边。

## 别忘了真实内容

布局做好后，至少检查以下场景：

1. 很长的中文标题。
2. 没有空格的长链接。
3. 手机上的横向代码块。
4. 内容数量为零或者只有一条时。
5. 键盘操作与可见的焦点样式。

漂亮的布局应该服务阅读，而不只是服务截图。
