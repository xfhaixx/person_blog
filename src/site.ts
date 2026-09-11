export const site = {
  name: 'XFH',
  title: 'XFH · 个人笔记',
  tagline: '把灵感写下来，把知识连起来。',
  description: '记录学习、代码与日常思考。在这里，让每一次探索都有迹可循。',
  github: 'https://github.com/xfhaixx',
};
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const noteUrl = (id: string) => `${base}/notes/${id.split('/').map(encodeURIComponent).join('/')}/`;
export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
