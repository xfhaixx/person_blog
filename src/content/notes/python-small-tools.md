---
title: Python 小技巧：把重复操作交给脚本
description: 用 pathlib、Counter 和简单的函数拆分，把日常小任务变成可复用的自动化工具。
date: 2026-03-06
category: 编程实践
tags: [Python, 自动化]
example: true
---
> 示例笔记：代码可用于练习，请根据自己的数据和路径调整。

## 从一个重复任务开始

自动化不一定意味着复杂系统。当你第二次手动统计文件、整理文本或转换格式时，就可以考虑写一个小脚本。

## 用 pathlib 遍历文件

`pathlib` 提供面向对象的路径操作方式，不需要手动拼接路径分隔符。

```python
from pathlib import Path

notes_dir = Path("src/content/notes")
for path in sorted(notes_dir.rglob("*.md")):
    text = path.read_text(encoding="utf-8")
    print(f"{path.name}: {len(text)} 个字符")
```

### 为什么显式指定编码？

不同操作系统的默认编码可能不同。读取中文文本时指定 `encoding="utf-8"`，能减少环境差异带来的问题。

## 用 Counter 做简单统计

```python
from collections import Counter

categories = ["编程实践", "知识管理", "编程实践", "工具效率"]
for name, count in Counter(categories).most_common():
    print(f"{name}: {count}")
```

## 写一个易维护的小工具

1. 把输入、处理、输出分开。
2. 对路径不存在、文件格式错误等情况给出明确提示。
3. 涉及删除或覆盖文件时，先提供预览模式。
4. 留下一个使用示例，方便未来的自己快速上手。

> 好脚本不一定长，但应该让下一次操作更可靠。
