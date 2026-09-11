---
title: Git 日常工作流：让每一次修改都有迹可循
description: 整理最常用的 Git 操作，从查看差异到提交修改，建立一个安心、清晰的版本管理习惯。
date: 2026-03-04
category: 工具效率
tags: [Git, 工作流]
example: true
---
> 这是一篇示例笔记，不代表个人项目经历。

## 动手之前，先看状态

```bash
git status
git diff
```

`git status` 告诉你哪些文件发生了变化，`git diff` 帮你逐行确认具体内容。提交前花一分钟检查，可以避免把临时调试代码一起上传。

## 让提交保持专注

一次提交尽量只解决一件事。比如「修复搜索空状态」与「更换首页配色」最好分成两次提交。

```bash
git add src/pages/index.astro
git diff --cached
git commit -m "fix: improve empty search state"
```

### 提交说明如何写？

| 前缀 | 用途 |
| --- | --- |
| feat | 新增功能 |
| fix | 修复问题 |
| docs | 更新文档或笔记 |
| style | 排版或样式调整 |
| refactor | 不改变行为的重构 |

这些前缀只是约定，不是 Git 强制要求。最重要的是团队和自己都能看懂。

## 用分支尝试新想法

```bash
git switch -c feat/new-homepage
# 完成修改并提交后
git push -u origin feat/new-homepage
```

先在独立分支上尝试，再通过 Pull Request 检查和合并，可以避免直接影响稳定版本。

## 几条值得保留的习惯

- 不提交密码、访问令牌和 `.env` 文件。
- 合并之前阅读差异，而不仅仅看文件名。
- 对有破坏性的命令保持谨慎，先确认备份和当前分支。
- 推送前运行项目的构建或测试。
