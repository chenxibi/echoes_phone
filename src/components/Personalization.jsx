import React from "react";
import { Upload, RotateCcw, Asterisk, Type, Monitor, Grid, Palette } from "lucide-react";

// ============================================================
// 官方皮肤预设
// 每个皮肤是一个自包含的 CSS 片段, 通过 <style> 注入到 #echoes-chat
// ============================================================
const OFFICIAL_SKINS = [
  {
    id: "midnight",
    name: "午夜深蓝",
    desc: "暗色界面，护眼柔和",
    preview: "bg-[#1a1a2e]",
    previewColor: "#1a1a2e",
    borderColor: "#99aaff",
    css: `/* == 午夜深蓝 == */
#echoes-chat {
  --skin-bg: #1a1a2e;
  --skin-surface: #1e1e38;
  --skin-card: #252540;
  --skin-text: #d0d0e8;
  --skin-sub: #8888aa;
  --skin-accent: #7788dd;
  --skin-accent-hover: #99aaff;
}
#echoes-chat { background: #1a1a2e !important; color: #d0d0e8 !important; }
/* 主背景 */
#echoes-chat .bg-\\[\\#F2F2F7\\] { background: #1a1a2e !important; }
#echoes-chat [class*="bg-\\[\\#F2F2F7"] { background: #1a1a2e !important; }
#echoes-chat .bg-\\[\\#EBEBF0\\] { background: #14142a !important; }
/* 锁屏装饰 */
#echoes-chat .bg-blue-50\\/50 { background: rgba(100,100,255,0.15) !important; }
#echoes-chat .bg-gray-100\\/60 { background: rgba(80,80,160,0.2) !important; }
#echoes-chat .bg-gray-300\\/50 { background: rgba(255,255,255,0.1) !important; }
#echoes-chat .bg-white\\/50 { background: rgba(30,30,60,0.6) !important; }
#echoes-chat [class*="bg-\\[\\#EBEBF0"] { background: #14142a !important; }
#echoes-chat .bg-green-50\\/50 { background: rgba(68,170,119,0.2) !important; }
#echoes-chat .bg-green-100 { background: rgba(68,170,119,0.3) !important; }
#echoes-chat .text-green-700 { color: #66cc99 !important; }
#echoes-chat .text-green-600 { color: #55bb88 !important; }
#echoes-chat .border-green-100 { border-color: rgba(68,170,119,0.3) !important; }
/* 文字层级 */
#echoes-chat .text-\\[\\#1a1a1a\\] { color: #e0e0f0 !important; }
#echoes-chat .text-\\[\\#2C2C2C\\] { color: #c8c8e0 !important; }
#echoes-chat .text-gray-800 { color: #d0d0e8 !important; }
#echoes-chat .text-gray-700 { color: #c0c0dd !important; }
#echoes-chat .text-gray-600 { color: #b0b0d0 !important; }
#echoes-chat .text-gray-500 { color: #8888aa !important; }
#echoes-chat .text-gray-400 { color: #7777aa !important; }
#echoes-chat .text-gray-300 { color: #6666aa !important; }
/* 标题栏 */
#echoes-chat header { color: #aabbee !important; }
/* 玻璃面板 - 暗色半透明 */
#echoes-chat .glass-panel {
  background: rgba(30,30,60,0.75) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-color: rgba(255,255,255,0.08) !important;
  color: #d0d0e8 !important;
}
#echoes-chat .glass-card {
  background: rgba(30,30,60,0.6) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  border-color: rgba(255,255,255,0.06) !important;
  color: #d0d0e8 !important;
}
#echoes-chat .glass-card label { color: #c0c0dd !important; }
#echoes-chat .glass-card p, #echoes-chat .glass-card span { color: #a0a0cc !important; }
/* 白色背景全换 */
#echoes-chat [class*="bg-white"] { background: #252540 !important; }
#echoes-chat [class*="bg-gray-50"] { background: #1e1e38 !important; }
#echoes-chat [class*="bg-gray-100"] { background: rgba(255,255,255,0.05) !important; }
/* 按钮 - 黑色变紫色 */
#echoes-chat [class*="bg-black"] { background: #5566cc !important; border-color: #5566cc !important; }
#echoes-chat [class*="bg-black"]:hover { background: #6b7aee !important; }
#echoes-chat button.bg-black { background: #5566cc !important; }
#echoes-chat button.bg-black:hover { background: #6b7aee !important; }
/* 按钮 - #2C2C2C 暗灰变深紫 */
#echoes-chat [class*="bg-\\[\\#2C2C2C\\]"] { background: #3a3a70 !important; }
#echoes-chat [class*="bg-\\[\\#2C2C2C\\]"]:hover { background: #4a4a88 !important; }
#echoes-chat [class*="bg-gray-800"] { background: #3a3a70 !important; }
/* 按钮文字白变紫白 */
#echoes-chat :not(button)[class*="text-white"] { color: #e0e0f0 !important; }
/* 输入框 */
#echoes-chat input, #echoes-chat textarea {
  background: #1e1e38 !important;
  color: #d0d0e8 !important;
  border-color: rgba(255,255,255,0.1) !important;
}
#echoes-chat input::placeholder, #echoes-chat textarea::placeholder { color: #555588 !important; }
/* 边框 */
#echoes-chat .border-gray-200 { border-color: rgba(255,255,255,0.08) !important; }
#echoes-chat .border-gray-200\\/50 { border-color: rgba(255,255,255,0.06) !important; }
#echoes-chat .border-white\\/50 { border-color: rgba(255,255,255,0.06) !important; }
#echoes-chat .border-white\\/60 { border-color: rgba(255,255,255,0.08) !important; }
#echoes-chat .ring-black\\/5 { --tw-ring-color: rgba(255,255,255,0.05) !important; }
/* 首页 AppIcon 图标文字 */
#echoes-chat .text-gray-700.group-hover\\:text-black { color: #aabbdd !important; }
#echoes-chat .text-gray-700.group-hover\\:text-black:hover { color: #ccddff !important; }
/* 首页 AppIcon 图标颜色 (通过 CSS filter 反转明亮图标) */
#echoes-chat .glass-panel svg { stroke: #aabbdd; }
#echoes-chat .glass-panel:has(img) svg, #echoes-chat [class*="bg-white"] svg { stroke: #aabbdd; }
/* 通讯/论坛等底部栏 */
#echoes-chat [class*="rounded-\\[24px\\]"].glass-panel {
  background: rgba(30,30,60,0.75) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
#echoes-chat [class*="rounded-\\[24px\\]"].glass-panel svg,
#echoes-chat .flex.justify-around svg { stroke: #99aadd; }
/* 消息气泡 */
#echoes-chat [class*="bg-\\[\\#1a1a1a\\]"] { background: #252540 !important; color: #d0d0e8 !important; }
/* 选项/标签 */ 
#echoes-chat [class*="bg-black"] { background: #5566cc !important; }
#echoes-chat .bg-green-500 { background: #44aa77 !important; }
/* 弹窗背景保留半透明 */
#echoes-chat .fixed.inset-0 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-white\\/90 { background: rgba(30,30,60,0.85) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; }
#echoes-chat [class*="bg-white"].rounded-2xl { background: #252540 !important; opacity: 0.95; }
#echoes-chat .bg-black\\/50 { background: rgba(0,0,0,0.5) !important; }
/* 操作菜单、表情面板、模态卡片保持原始深色样式 */
#echoes-chat .bg-\[\#1a1a1a\]\/95 { background: rgba(26,26,26,0.95) !important; color: #fff !important; }
#echoes-chat .bg-\[\#1a1a1a\]\/95 * { color: #fff !important; }
#echoes-chat .bg-\[\#1a1a1a\]\\/95 { background: rgba(26,26,26,0.95) !important; color: #fff !important; }
#echoes-chat [class*="bg-[#1a1a1a]"] { background: #1a1a1a !important; color: #fff !important; }
#echoes-chat [class*="bg-[#1a1a1a]"] * { color: #fff !important; }
#echoes-chat .text-red-300 { color: #fc8181 !important; }
#echoes-chat .hover\:bg-white\/20:hover { background: rgba(255,255,255,0.2) !important; }
#echoes-chat .border-white\/20 { border-color: rgba(255,255,255,0.2) !important; }
#echoes-chat .bg-black\/50 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .fixed.inset-0 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-white\/90 { opacity:0.92 !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; }
#echoes-chat [class*="bg-white"].rounded-2xl { opacity: 0.95 !important; }
#echoes-chat .text-red-500 { color: #ff7799 !important; }

/* 开关主题色 */
#echoes-chat .bg-green-500 { background: #5566cc !important; }
#echoes-chat .bg-gray-300 { background: #3a3a6a !important; }
/* 按钮选中态白字 */
#echoes-chat button.bg-black { color: #fff !important; }
#echoes-chat button.bg-black:hover { color: #fff !important; }
#echoes-chat [class*="bg-black"][class*="text-white"] { color: #fff !important; }
`
  },
  {
    id: "latte",
    name: "燕麦拿铁",
    desc: "暖调配色，温柔奶油感",
    preview: "bg-[#faf0e6]",
    previewColor: "#faf0e6",
    borderColor: "#c4956a",
    css: `/* == 燕麦拿铁 == */
#echoes-chat {
  --skin-bg: #faf0e6;
  --skin-surface: #f5e6d3;
  --skin-card: #fff8f0;
  --skin-text: #4a3728;
  --skin-sub: #8b7355;
  --skin-accent: #c4956a;
  --skin-accent-hover: #b07d50;
}
#echoes-chat .bg-\\[\\#F2F2F7\\] { background: #faf0e6 !important; }
#echoes-chat [class*="bg-\\[\\#F2F2F7"] { background: #faf0e6 !important; }
#echoes-chat .bg-\\[\\#EBEBF0\\] { background: #f0e4d8 !important; }
/* 锁屏装饰 */
#echoes-chat .bg-blue-50\\/50 { background: rgba(196,180,160,0.3) !important; }
#echoes-chat .bg-gray-100\\/60 { background: rgba(196,150,106,0.2) !important; }
#echoes-chat .bg-gray-300\\/50 { background: rgba(196,150,106,0.2) !important; }
#echoes-chat .bg-white\\/50 { background: rgba(255,248,240,0.7) !important; }
#echoes-chat [class*="bg-\\[\\#EBEBF0"] { background: #f0e4d8 !important; }
#echoes-chat .bg-green-50\\/50 { background: rgba(139,176,106,0.2) !important; }
#echoes-chat .bg-green-100 { background: rgba(139,176,106,0.3) !important; }
#echoes-chat .text-green-700 { color: #6b8b50 !important; }
#echoes-chat .text-green-600 { color: #7ba060 !important; }
#echoes-chat .border-green-100 { border-color: rgba(139,176,106,0.3) !important; }
#echoes-chat .text-\\[\\#1a1a1a\\] { color: #4a3728 !important; }
#echoes-chat .text-\\[\\#2C2C2C\\] { color: #5c4a3a !important; }
#echoes-chat .text-gray-800 { color: #4a3728 !important; }
#echoes-chat .text-gray-700 { color: #5c4a3a !important; }
#echoes-chat .text-gray-600 { color: #6b5540 !important; }
#echoes-chat .text-gray-500 { color: #8b7355 !important; }
#echoes-chat .text-gray-400 { color: #a0886a !important; }
#echoes-chat .text-gray-300 { color: #c4956a !important; }
#echoes-chat header { color: #b07d50 !important; }
#echoes-chat .glass-panel {
  background: rgba(255,248,240,0.7) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-color: #e8d5c0 !important;
  color: #4a3728 !important;
}
#echoes-chat .glass-card {
  background: rgba(255,248,240,0.55) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  border-color: #e8d5c0 !important;
  border-radius: 14px !important;
  color: #4a3728 !important;
}
#echoes-chat .glass-card label { color: #6b5540 !important; }
#echoes-chat .glass-card p, #echoes-chat .glass-card span { color: #8b7355 !important; }
#echoes-chat [class*="bg-white"] { background: #fff8f0 !important; }
#echoes-chat [class*="bg-gray-50"] { background: #fff5ec !important; }
#echoes-chat [class*="bg-gray-100"] { background: rgba(196,150,106,0.08) !important; }
#echoes-chat [class*="bg-black"] { background: #c4956a !important; border-color: #c4956a !important; }
#echoes-chat [class*="bg-black"]:hover { background: #b07d50 !important; }
#echoes-chat button.bg-black { background: #c4956a !important; }
#echoes-chat button.bg-black:hover { background: #b07d50 !important; }
#echoes-chat [class*="bg-\\[\\#2C2C2C\\]"] { background: #b07d50 !important; }
#echoes-chat [class*="bg-\\[\\#2C2C2C\\]"]:hover { background: #9a6840 !important; }
#echoes-chat [class*="bg-gray-800"] { background: #b07d50 !important; }
#echoes-chat :not(button)[class*="text-white"] { color: #fff8f0 !important; }
#echoes-chat input, #echoes-chat textarea {
  background: #fff5ec !important;
  color: #4a3728 !important;
  border-color: #e8d5c0 !important;
}
#echoes-chat input::placeholder, #echoes-chat textarea::placeholder { color: #c4956a !important; }
#echoes-chat .border-gray-200 { border-color: #e8d5c0 !important; }
#echoes-chat .border-gray-200\\/50 { border-color: #e8d5c0 !important; }
#echoes-chat .border-white\\/50 { border-color: rgba(232,213,192,0.8) !important; }
#echoes-chat .border-white\\/60 { border-color: rgba(232,213,192,0.8) !important; }
#echoes-chat .ring-black\\/5 { --tw-ring-color: rgba(180,125,80,0.06) !important; }
#echoes-chat .text-gray-700.group-hover\\:text-black { color: #8b7355 !important; }
#echoes-chat .text-gray-700.group-hover\\:text-black:hover { color: #4a3728 !important; }
#echoes-chat .glass-panel svg { stroke: #8b7355; }
#echoes-chat [class*="bg-white"] svg { stroke: #8b7355; }
#echoes-chat [class*="rounded-\\[24px\\]"].glass-panel {
  background: rgba(255,248,240,0.7) !important;
  border-color: #e8d5c0 !important;
}
#echoes-chat [class*="rounded-\\[24px\\]"].glass-panel svg,
#echoes-chat .flex.justify-around svg { stroke: #8b7355; }
#echoes-chat [class*="bg-\\[\\#1a1a1a\\]"] { background: #fff8f0 !important; color: #4a3728 !important; }
#echoes-chat .bg-green-500 { background: #8bb06a !important; }
/* 弹窗背景保留半透明 */
#echoes-chat .fixed.inset-0 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-white\\/90 { background: rgba(255,248,240,0.85) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; }
#echoes-chat [class*="bg-white"].rounded-2xl { background: #fff8f0 !important; opacity: 0.95; }
#echoes-chat .bg-black\\/50 { background: rgba(0,0,0,0.5) !important; }
/* 操作菜单、表情面板、模态卡片保持原始深色样式 */
#echoes-chat .bg-\[\#1a1a1a\]\/95 { background: rgba(26,26,26,0.95) !important; color: #fff !important; }
#echoes-chat .bg-\[\#1a1a1a\]\/95 * { color: #fff !important; }
#echoes-chat .bg-\[\#1a1a1a\]\\/95 { background: rgba(26,26,26,0.95) !important; color: #fff !important; }
#echoes-chat [class*="bg-[#1a1a1a]"] { background: #1a1a1a !important; color: #fff !important; }
#echoes-chat [class*="bg-[#1a1a1a]"] * { color: #fff !important; }
#echoes-chat .text-red-300 { color: #fc8181 !important; }
#echoes-chat .hover\:bg-white\/20:hover { background: rgba(255,255,255,0.2) !important; }
#echoes-chat .border-white\/20 { border-color: rgba(255,255,255,0.2) !important; }
#echoes-chat .bg-black\/50 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .fixed.inset-0 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-white\/90 { opacity:0.92 !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; }
#echoes-chat [class*="bg-white"].rounded-2xl { opacity: 0.95 !important; }
#echoes-chat .text-red-500 { color: #cc6666 !important; }

/* 开关主题色 */
#echoes-chat .bg-green-500 { background: #c4a882 !important; }
#echoes-chat .bg-gray-300 { background: #e8d5c0 !important; }
/* 按钮选中态白字 */
#echoes-chat button.bg-black { color: #fff !important; }
#echoes-chat button.bg-black:hover { color: #fff !important; }
#echoes-chat [class*="bg-black"][class*="text-white"] { color: #fff !important; }
`
  },
  {
    id: "pixel",
    name: "像素复古",
    desc: "Soft Vaporwave，浅粉 + 荧光蓝",
    preview: "bg-[#ffe0ec]",
    previewColor: "#ffe0ec",
    borderColor: "#00e5ff",
    css: `/* 像素复古 — Soft Vaporwave (Asset Integrated) */
#echoes-chat { --skin-bg: #ffe0ec; --skin-surface: #ffe8f0; --skin-card: #fff0f5; --skin-text: #554455; --skin-sub: #cc7799; --skin-accent: #00e5ff; --skin-accent-hover: #ff6b9d; }
#echoes-chat, #echoes-chat *, #echoes-chat *::before, #echoes-chat *::after { font-family: "Courier New","Source Code Pro","Fira Code","IBM Plex Mono","JetBrains Mono",Consolas,monospace !important; border-radius:2px !important; }
#echoes-chat [class*="rounded-full"] { border-radius:4px !important; }
#echoes-chat { background:#ffe0ec !important; color:#554455 !important; }
#echoes-chat .bg-\[\#F2F2F7\] { background:#ffe0ec !important; }
#echoes-chat .bg-\[\#EBEBF0\] { background:#ffd4e4 !important; }
#echoes-chat [class*="bg-\[\#F2F2F7"] { background:#ffe0ec !important; }
#echoes-chat [class*="bg-\[\#EBEBF0"] { background:#ffd4e4 !important; }
#echoes-chat .bg-blue-50\/50 { background:#ffe0f0 !important; }
#echoes-chat .bg-gray-100\/60 { background:#ffd8e8 !important; }
#echoes-chat .bg-gray-300\/50 { background:#ffcce0 !important; }
#echoes-chat .bg-white\/50 { background:#fff0f5 !important; }
#echoes-chat .text-\[\#1a1a1a\] { color:#554455 !important; }
#echoes-chat .text-\[\#2C2C2C\] { color:#665566 !important; }
#echoes-chat .text-gray-800 { color:#554455 !important; }
#echoes-chat .text-gray-700 { color:#665566 !important; }
#echoes-chat .text-gray-600 { color:#776677 !important; }
#echoes-chat .text-gray-500 { color:#cc7799 !important; }
#echoes-chat .text-gray-400 { color:#bb6699 !important; }
#echoes-chat .text-gray-300 { color:#aa5588 !important; }
#echoes-chat header { color:#ff6b9d !important; background:#ffe0ec !important; }
#echoes-chat .glass-panel { background:#fff0f5 !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; border:2px solid #00e5ff !important; border-color:#00e5ff !important; color:#554455 !important; box-shadow:4px 4px 0 #ff6b9d !important; }
#echoes-chat .glass-card { background:#ffe8f0 !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; border:2px solid #ffccdd !important; border-color:#ffccdd !important; color:#554455 !important; box-shadow:2px 2px 0 #ffbbcc !important; }
#echoes-chat .glass-card label { color:#665566 !important; }
#echoes-chat .glass-card p,#echoes-chat .glass-card span { color:#cc7799 !important; }
#echoes-chat [class*="bg-white"] { background:#fff0f5 !important; }
#echoes-chat [class*="bg-gray-50"] { background:#ffe8f0 !important; }
#echoes-chat [class*="bg-gray-100"] { background:#ffe0ec !important; }
#echoes-chat [class*="bg-black"] { background:#ffd4e4 !important; border:2px solid #00e5ff !important; border-color:#00e5ff !important; color:#00e5ff !important; box-shadow:3px 3px 0 #ff6b9d !important; }
#echoes-chat [class*="bg-black"]:hover { background:#ffc0d8 !important; border-color:#33ebff !important; color:#33ebff !important; }
#echoes-chat button.bg-black { background:#ffd4e4 !important; border:2px solid #00e5ff !important; border-color:#00e5ff !important; color:#00e5ff !important; box-shadow:3px 3px 0 #ff6b9d !important; }
#echoes-chat button.bg-black:hover { background:#ffc0d8 !important; color:#33ebff !important; }
#echoes-chat [class*="bg-\[\#2C2C2C\]"] { background:#ffd4e4 !important; border:2px solid #ffccdd !important; border-color:#ffccdd !important; box-shadow:2px 2px 0 #ffbbcc !important; }
#echoes-chat [class*="bg-\[\#2C2C2C\]"]:hover { background:#ffc0d8 !important; }
#echoes-chat [class*="bg-gray-800"] { background:#ffd4e4 !important; border:2px solid #ffccdd !important; border-color:#ffccdd !important; }
#echoes-chat :not(button)[class*="text-white"] { color:#554455 !important; }
#echoes-chat input,#echoes-chat textarea { background:#ffe0ec !important; color:#00e5ff !important; border:2px solid #ffccdd !important; caret-color:#00e5ff !important; }
#echoes-chat input::placeholder,#echoes-chat textarea::placeholder { color:#ccaabb !important; }
#echoes-chat .border-gray-200 { border-color:#ffccdd !important; }
#echoes-chat .border-gray-200\/50 { border-color:#ffbbcc !important; }
#echoes-chat .border-white\/50 { border-color:#ffccdd !important; }
#echoes-chat .border-white\/60 { border-color:#ffccdd !important; }
#echoes-chat .ring-black\/5 { --tw-ring-color:#ffbbcc !important; }
#echoes-chat .border-white { border-color:#ffccdd !important; }
#echoes-chat .border-t { border-color:#ffccdd !important; }
#echoes-chat .text-gray-700.group-hover\:text-black { color:#cc7799 !important; }
#echoes-chat .text-gray-700.group-hover\:text-black:hover { color:#ff6b9d !important; }
#echoes-chat .glass-panel svg { stroke:#cc7799; }
#echoes-chat [class*="bg-white"] svg { stroke:#cc7799; }
#echoes-chat [class*="rounded-\[24px\]"].glass-panel { background:#fff0f5 !important; border:2px solid #00e5ff !important; border-color:#00e5ff !important; box-shadow:4px 4px 0 #ff6b9d !important; }
#echoes-chat [class*="rounded-\[24px\]"].glass-panel svg,#echoes-chat .flex.justify-around svg { stroke:#cc7799; }
#echoes-chat [class*="bg-\[\#1a1a1a\]"] { background:#fff0f5 !important; color:#554455 !important; border:2px solid #ffccdd !important; border-color:#ffccdd !important; }
#echoes-chat .bg-green-500 { background: linear-gradient(135deg,#ff6b9d 0%,#ff8fab 50%,#00e5ff 100%) !important; color:#fff !important; border:2px solid #00e5ff !important; }
#echoes-chat .text-red-500 { color:#ff6b9d !important; text-shadow:1px 1px 0 #00e5ff !important; }
#echoes-chat .bg-green-50\/50 { background:#ffe0f0 !important; }
#echoes-chat .bg-green-100 { background:#ffd0e0 !important; }
#echoes-chat .text-green-700 { color:#00e5ff !important; text-shadow:0 0 8px rgba(0,229,255,0.4) !important; }
#echoes-chat .text-green-600 { color:#00e5ff !important; }
#echoes-chat .border-green-100 { border-color:#00e5ff !important; }
#echoes-chat [class*="border-black"] { border-color:#00e5ff !important; }
#echoes-chat [class*="bg-black"][class*="text-white"] { background: linear-gradient(135deg,#ff6b9d,#ff8fab) !important; color:#fff !important; border:2px solid #00e5ff !important; box-shadow:3px 3px 0 #00e5ff !important; }


/* 蒸汽波网格背景 */
#echoes-chat::before { content:""; position:fixed; inset:0; pointer-events:none; z-index:0; opacity:0.12; background-image: linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px); background-size:40px 40px; }
/* 扫描线效果 */
#echoes-chat::after { content:""; position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.03; background: repeating-linear-gradient(0deg,transparent,transparent 2px,#ff6b9d 2px,#ff6b9d 4px); }
/* 标题霓虹发光 */
#echoes-chat header { color:#ff6b9d !important; background:#ffe0ec !important; text-shadow: 0 0 10px rgba(255,107,157,0.5), 2px 2px 0 #00e5ff !important; }


/* --- 蒸汽波素材插入部分 --- */


/* 拓麻歌子替换生活圈图标 */
#echoes-chat [data-app-link="生活圈"] svg { display:none !important; }
#echoes-chat [data-app-link="生活圈"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-tamagotchi.png"); background-size:contain; background-repeat:no-repeat; background-position:center; filter: drop-shadow(2px 2px 0px #00e5ff); }


/* 贝壳替换界面样式标题图标 */
#echoes-chat h3[data-section-icon="palette"] svg { display:none !important; }
#echoes-chat h3[data-section-icon="palette"]::before { content:""; display:inline-block; width:14px; height:14px; background-image:url("./vapor-shell.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; margin-right:4px; }


/* GameBoy替换个性化App图标 */
#echoes-chat [data-app-link="个性化"] svg { display:none !important; }
#echoes-chat [data-app-link="个性化"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-gameboy.png"); background-size:contain; background-repeat:no-repeat; background-position:center; filter: drop-shadow(2px 2px 0px #00e5ff); }


/* 复古电脑替换系统设置图标 */
#echoes-chat [data-app-link="系统设置"] svg { display:none !important; }
#echoes-chat [data-app-link="系统设置"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-mac.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }


/* IE图标替换浏览器图标 */
#echoes-chat [data-app-link="浏览器"] svg { display:none !important; }
#echoes-chat [data-app-link="浏览器"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-ie.png"); background-size:contain; background-repeat:no-repeat; background-position:center; filter: hue-rotate(20deg); }


/* iPod替换音乐图标 */
#echoes-chat [data-app-link="共鸣旋律"] svg { display:none !important; }
#echoes-chat [data-app-link="共鸣旋律"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-ipod.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }


/* 蝴蝶替换智能家图标 */
#echoes-chat [data-app-link="智能家"] svg { display:none !important; }
#echoes-chat [data-app-link="智能家"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-butterfly.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }


/* 磁带替换日记图标 */
#echoes-chat [data-app-link="日记"] svg { display:none !important; }
#echoes-chat [data-app-link="日记"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-cassette.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }


/* 充气爱心替换生活痕迹图标 */
#echoes-chat [data-app-link="生活痕迹"] svg { display:none !important; }
#echoes-chat [data-app-link="生活痕迹"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-heart.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }


/* 十字架替换世界书图标 */
#echoes-chat [data-app-link="世界书"] svg { display:none !important; }
#echoes-chat [data-app-link="世界书"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./vapor-cross.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }


/* 翻盖手机替换底部通讯栏图标 */
#echoes-chat [data-icon="chat"] svg { display:none !important; }
#echoes-chat [data-icon="chat"]::before { content:""; display:inline-block; width:26px; height:26px; background-image:url("./vapor-phone.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; }


/* 墨镜替换图标定制标题 */
#echoes-chat h3[data-section-icon="customize"] svg { display:none !important; }
#echoes-chat h3[data-section-icon="customize"]::before { content:""; display:inline-block; width:14px; height:14px; background-image:url("./vapor-glasses.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; margin-right:4px; }


/* 多卷磁带替换显示与排版标题 */
#echoes-chat h3[data-section-icon="display"] svg { display:none !important; }
#echoes-chat h3[data-section-icon="display"]::before { content:""; display:inline-block; width:14px; height:14px; background-image:url("./vapor-cassettes.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; margin-right:4px; }


/* 手机替换浏览器刷新按钮图标 */
#echoes-chat [data-app-link="浏览器刷新"] svg { display:none !important; }
#echoes-chat [data-app-link="浏览器刷新"]::before { content:""; display:inline-block; width:18px; height:18px; background-image:url("./vapor-phone.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; margin-right:6px; }

/* 弹窗保持半透明 */
#echoes-chat .fixed.inset-0 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-white\/90 { background: rgba(255,232,240,0.85) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; }
#echoes-chat [class*="bg-white"].rounded-2xl { background: rgba(255,240,245,0.92) !important; }
#echoes-chat .bg-black\/50 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-black\/40 { background: rgba(0,0,0,0.4) !important; }

/* 开关主题色 */
#echoes-chat .bg-green-500 { background: linear-gradient(135deg,#ff6b9d,#ff8fab) !important; }
#echoes-chat .bg-gray-300 { background: #ffcce0 !important; }
/* 按钮选中态白字 */
#echoes-chat button.bg-black { color: #fff !important; }
#echoes-chat button.bg-black:hover { color: #fff !important; }
#echoes-chat [class*="bg-black"][class*="text-white"] { color: #fff !important; }
`
  },
  {
    id: "sweet",
    name: "甜梦泡泡",
    desc: "灰粉波点，小熊软萌氛围",
    preview: "bg-[#f0e8ed]",
    previewColor: "#f0e8ed",
    borderColor: "#d4959a",
    css: `/* 甜梦泡泡 */
#echoes-chat { --skin-bg: #f0e8ed; --skin-surface: #f5eff4; --skin-card: #faf5f8; --skin-text: #4a3548; --skin-sub: #8b7088; --skin-accent: #d4959a; --skin-accent-hover: #c08088; }
#echoes-chat { background-color:#f0e8ed !important; background-image:radial-gradient(circle,rgba(212,149,154,0.45) 1.5px,transparent 1.5px) !important; background-size:18px 18px !important; color:#4a3548 !important; }
#echoes-chat .bg-\\[\\#F2F2F7\\] { background-color:#f0e8ed !important; background-image:radial-gradient(circle,rgba(212,149,154,0.45) 1.5px,transparent 1.5px) !important; background-size:18px 18px !important; }
#echoes-chat .bg-\\[\\#EBEBF0\\] { background:#e8dde4 !important; }
#echoes-chat [class*="bg-\\[\\#F2F2F7"] { background-color:#f0e8ed !important; background-image:radial-gradient(circle,rgba(212,149,154,0.45) 1.5px,transparent 1.5px) !important; background-size:18px 18px !important; }
#echoes-chat [class*="bg-\\[\\#EBEBF0"] { background:#e8dde4 !important; }
#echoes-chat .bg-blue-50\\/50 { background:#f5e0e5 !important; }
#echoes-chat .bg-gray-100\\/60 { background:#f0dce2 !important; }
#echoes-chat .bg-gray-300\\/50 { background:#e8d4da !important; }
#echoes-chat .bg-white\\/50 { background:#faf5f8 !important; }
#echoes-chat .text-\\[\\#1a1a1a\\] { color:#4a3548 !important; }
#echoes-chat .text-\\[\\#2C2C2C\\] { color:#5c4658 !important; }
#echoes-chat .text-gray-800 { color:#4a3548 !important; }
#echoes-chat .text-gray-700 { color:#5c4658 !important; }
#echoes-chat .text-gray-600 { color:#6b5568 !important; }
#echoes-chat .text-gray-500 { color:#8b7088 !important; }
#echoes-chat .text-gray-400 { color:#a088a0 !important; }
#echoes-chat .text-gray-300 { color:#c0a8b8 !important; }
#echoes-chat header { color:#d4959a !important; }
#echoes-chat .glass-panel { background:#faf5f8 !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; border:1.5px solid rgba(212,149,154,0.3) !important; border-color:rgba(212,149,154,0.3) !important; color:#4a3548 !important; border-radius:18px !important; }
#echoes-chat .glass-card { background:#fff !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; border:1.5px solid rgba(212,149,154,0.25) !important; border-color:rgba(212,149,154,0.25) !important; border-radius:16px !important; color:#4a3548 !important; }
#echoes-chat .glass-card label { color:#5c4658 !important; }
#echoes-chat .glass-card p,#echoes-chat .glass-card span { color:#8b7088 !important; }
#echoes-chat [class*="bg-white"] { background:#faf5f8 !important; border-radius:14px !important; }
#echoes-chat [class*="bg-gray-50"] { background:#faf5f8 !important; }
#echoes-chat [class*="bg-gray-100"] { background:#fff0f3 !important; }
#echoes-chat [class*="bg-black"] { background:#d4959a !important; border-color:#d4959a !important; }
#echoes-chat [class*="bg-black"]:hover { background:#c08088 !important; }
#echoes-chat button.bg-black { background:#d4959a !important; }
#echoes-chat button.bg-black:hover { background:#c08088 !important; }
#echoes-chat [class*="bg-\\[\\#2C2C2C\\]"] { background:#d4959a !important; }
#echoes-chat [class*="bg-\\[\\#2C2C2C\\]"]:hover { background:#c08088 !important; }
#echoes-chat [class*="bg-gray-800"] { background:#d4959a !important; }
#echoes-chat :not(button)[class*="text-white"] { color:#fff !important; }
#echoes-chat input,#echoes-chat textarea { background:#faf5f8 !important; color:#4a3548 !important; border:1.5px solid rgba(212,149,154,0.35) !important; border-color:rgba(212,149,154,0.35) !important; border-radius:12px !important; }
#echoes-chat input::placeholder,#echoes-chat textarea::placeholder { color:#c0a8b8 !important; }
#echoes-chat .border-gray-200 { border-color:rgba(212,149,154,0.2) !important; }
#echoes-chat .border-gray-200\\/50 { border-color:rgba(212,149,154,0.15) !important; }
#echoes-chat .border-white\\/50 { border-color:rgba(212,149,154,0.25) !important; }
#echoes-chat .border-white\\/60 { border-color:rgba(212,149,154,0.3) !important; }
#echoes-chat .ring-black\\/5 { --tw-ring-color:rgba(212,149,154,0.06) !important; }
#echoes-chat .border-white { border-color:rgba(212,149,154,0.25) !important; }
#echoes-chat .text-gray-700.group-hover\\:text-black { color:#8b7088 !important; }
#echoes-chat .text-gray-700.group-hover\\:text-black:hover { color:#d4959a !important; }
#echoes-chat .glass-panel svg { stroke:#8b7088; }
#echoes-chat [class*="bg-white"] svg { stroke:#8b7088; }
#echoes-chat [class*="rounded-\\[24px\\]"].glass-panel { background:#faf5f8 !important; border-color:rgba(212,149,154,0.3) !important; border-radius:18px !important; }
#echoes-chat [class*="rounded-\\[24px\\]"].glass-panel svg,#echoes-chat .flex.justify-around svg { stroke:#8b7088; }
#echoes-chat [class*="bg-\\[\\#1a1a1a\\]"] { background:#faf5f8 !important; color:#4a3548 !important; }
#echoes-chat .bg-green-500 { background:#b8a8c8 !important; }
#echoes-chat .text-red-500 { color:#cc8899 !important; }
#echoes-chat .bg-green-50\\/50 { background:#eee8f4 !important; }
#echoes-chat .bg-green-100 { background:#e8dcee !important; }
#echoes-chat .text-green-700 { color:#9b8bb0 !important; }
#echoes-chat .text-green-600 { color:#a898b8 !important; }
#echoes-chat .border-green-100 { border-color:#ddd0e4 !important; }
#echoes-chat [class*="rounded-lg"],#echoes-chat [class*="rounded-xl"],#echoes-chat [class*="rounded-2xl"],#echoes-chat [class*="rounded-\\[16px\\]"],#echoes-chat [class*="rounded-\\[22px\\]"],#echoes-chat [class*="rounded-\\[24px\\]"],#echoes-chat [class*="rounded-full"],#echoes-chat [class*="rounded-\\[48px\\]"] { border-radius:18px !important; }
#echoes-chat [class*="rounded-\\[48px\\]"] { border-radius:36px !important; }
#echoes-chat [class*="rounded-full"] { border-radius:9999px !important; }
/* 小熊替换生活圈图标 */
#echoes-chat [data-app-link="生活圈"] svg { display:none !important; }
#echoes-chat [data-app-link="生活圈"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-bear.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 蝴蝶结替换界面样式标题图标 */
#echoes-chat h3[data-section-icon="palette"] svg { display:none !important; }
#echoes-chat h3[data-section-icon="palette"]::before { content:""; display:inline-block; width:12px; height:12px; background-image:url("./bow.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; }
/* 蝴蝶结替换个性化App图标 */
#echoes-chat [data-app-link="个性化"] svg { display:none !important; }
#echoes-chat [data-app-link="个性化"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./bow.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 棒棒糖替换系统设置图标 */
#echoes-chat [data-app-link="系统设置"] svg { display:none !important; }
#echoes-chat [data-app-link="系统设置"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-lollipop.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 电话替换浏览器图标 */
#echoes-chat [data-app-link="浏览器"] svg { display:none !important; }
#echoes-chat [data-app-link="浏览器"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-telephone.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 爱心替换音乐图标 */
#echoes-chat [data-app-link="共鸣旋律"] svg { display:none !important; }
#echoes-chat [data-app-link="共鸣旋律"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-heart.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 蝴蝶结替换智能家图标 */
#echoes-chat [data-app-link="智能家"] svg { display:none !important; }
#echoes-chat [data-app-link="智能家"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-butterfly.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 草莓巧克力替换日记图标 */
#echoes-chat [data-app-link="日记"] svg { display:none !important; }
#echoes-chat [data-app-link="日记"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./strawberry-chocolate.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 蜡烛替换生活痕迹图标 */
#echoes-chat [data-app-link="生活痕迹"] svg { display:none !important; }
#echoes-chat [data-app-link="生活痕迹"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-candle.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 蘑菇替换世界书图标 */
#echoes-chat [data-app-link="世界书"] svg { display:none !important; }
#echoes-chat [data-app-link="世界书"] .glass-panel::after { content:""; position:absolute; inset:6px; background-image:url("./pink-mushroom.png"); background-size:contain; background-repeat:no-repeat; background-position:center; }
/* 饮料替换底部通讯栏图标 */
#echoes-chat [data-icon="chat"] svg { display:none !important; }
#echoes-chat [data-icon="chat"]::before { content:""; display:inline-block; width:24px; height:24px; background-image:url("./pink-drink.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; }
/* 发带替换图标定制标题 */
#echoes-chat h3[data-section-icon="customize"] svg { display:none !important; }
#echoes-chat h3[data-section-icon="customize"]::before { content:""; display:inline-block; width:12px; height:12px; background-image:url("./pink-hair-band.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; }
/* 笔记本替换显示与排版标题 */
#echoes-chat h3[data-section-icon="display"] svg { display:none !important; }
#echoes-chat h3[data-section-icon="display"]::before { content:""; display:inline-block; width:12px; height:12px; background-image:url("./pink-laptop.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; }
/* 玩具替换浏览器刷新按钮图标 */
#echoes-chat [data-app-link="浏览器刷新"] svg { display:none !important; }
#echoes-chat [data-app-link="浏览器刷新"]::before { content:""; display:inline-block; width:16px; height:16px; background-image:url("./pink-toy.png"); background-size:contain; background-repeat:no-repeat; vertical-align:middle; margin-right:6px; }
/* 弹窗保持半透明 */
#echoes-chat .fixed.inset-0 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-white\/90 { background: rgba(250,245,248,0.85) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; }
#echoes-chat [class*="bg-white"].rounded-2xl { background: rgba(250,245,248,0.92) !important; }
#echoes-chat .bg-black\/50 { background: rgba(0,0,0,0.5) !important; }
#echoes-chat .bg-black\/40 { background: rgba(0,0,0,0.4) !important; }

/* 开关主题色 */
#echoes-chat .bg-green-500 { background: #d4959a !important; }
#echoes-chat .bg-gray-300 { background: #e0d0d8 !important; }
/* 按钮选中态白字 */
#echoes-chat button.bg-black { color: #fff !important; }
#echoes-chat button.bg-black:hover { color: #fff !important; }
#echoes-chat [class*="bg-black"][class*="text-white"] { color: #fff !important; }
`,
  },
];

const PersonalizationPanel = ({
  // --- 显示设置 Props ---
  isFullscreen,
  toggleFullScreen,

  // --- 字体设置 Props ---
  fontName,
  handleResetFont,
  handleFontUrlSubmit,
  inputUrl,
  setInputUrl,

  // --- 图标定制 Props ---
  appList,
  customIcons,
  handleAppIconUpload,
  handleResetIcon,

  // --- 皮肤 Props ---
  skinCSS,
  setSkinCSS,
  selectedSkin,
  setSelectedSkin,
}) => {
  return (
    <div className="space-y-8 pt-4 pb-20 px-1">
      {/* ---------------- SECTION 1: 显示与排版 ---------------- */}
      <section>
        <h3 data-section-icon="display" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200/50 pb-1 flex items-center gap-2">
          <Monitor size={10} /> 显示与排版
        </h3>

        {/* 沉浸模式 */}
        <div className="glass-card p-4 rounded-xl mb-4 flex items-center justify-between">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              沉浸模式
            </label>
            <p className="text-[10px] text-gray-400">
              隐藏浏览器地址栏与状态栏
            </p>
          </div>
          <button
            onClick={toggleFullScreen}
            className={`w-8 h-4 rounded-full relative transition-colors ${
              isFullscreen ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                isFullscreen ? "left-4" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {/* 字体设置 */}
        <div className="glass-card p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Type size={12} className="text-gray-500" />
              <label className="text-xs font-bold text-gray-700">
                系统字体
              </label>
            </div>
            <button
              onClick={handleResetFont}
              className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={8} /> 恢复默认
            </button>
          </div>

          <div className="flex gap-2">
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="粘贴字体链接 (例如 https://...)"
              className="flex-grow p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-black placeholder:text-gray-300"
            />
            <button
              onClick={handleFontUrlSubmit}
              className="px-3 bg-black text-white rounded-lg text-xs font-bold whitespace-nowrap"
            >
              应用
            </button>
          </div>
          <p className="text-[9px] text-gray-400 truncate">
            当前使用: {fontName || "默认字体"}
          </p>
        </div>
      </section>

      {/* ---------------- SECTION: 界面样式 ---------------- */}
      <section>
        <h3 data-section-icon="palette" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200/50 pb-1 flex items-center gap-2">
          <Palette size={10} /> 界面样式
        </h3>

        {/* 官方皮肤 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {OFFICIAL_SKINS.map((skin) => (
            <button
              key={skin.id}
              onClick={() => {
                if (selectedSkin === skin.id) {
                  setSelectedSkin("");
                  setSkinCSS("");
                } else {
                  setSelectedSkin(skin.id);
                  setSkinCSS(skin.css);
                }
              }}
              className={`p-2 rounded-xl border text-center transition-all ${
                selectedSkin === skin.id
                  ? "bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={selectedSkin === skin.id ? { borderColor: skin.borderColor, borderWidth: '1px', borderStyle: 'solid' } : {}}
            >
              <div className="w-full h-8 rounded-lg mb-1" style={{ backgroundColor: skin.previewColor }}></div>
              <div className="text-[11px] font-bold text-gray-700 leading-tight">{skin.name}</div>
            </button>
          ))}
        </div>

        {/* 自定义 CSS */}
        <div className="glass-card p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Type size={12} className="text-gray-500" />
              <label className="text-xs font-bold text-gray-700">
                自定义样式
              </label>
            </div>
            {skinCSS && (
              <button
                onClick={() => { setSkinCSS(""); setSelectedSkin(""); }}
                className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
              >
                <RotateCcw size={8} /> 恢复默认
              </button>
            )}
          </div>
          <textarea
            value={skinCSS}
            onChange={(e) => {
              setSkinCSS(e.target.value);
              if (selectedSkin && !OFFICIAL_SKINS.some(s => s.css === e.target.value)) {
                setSelectedSkin("");
              }
            }}
            placeholder="粘贴 CSS 代码来自定义界面样式..."
            rows={5}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono outline-none focus:border-black resize-y"
          />
          <p className="text-[9px] text-gray-400">
            使用 <code className="bg-gray-100 px-1 rounded">#echoes-chat</code> 作为选择器前缀，
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = './theme-guide.md';
                link.download = 'theme-guide.md';
                link.click();
              }}
              className="text-blue-500 underline ml-1 cursor-pointer"
            >
              点击下载主题创作指南
            </button>
          </p>
        </div>
      </section>

      {/* ---------------- SECTION 2: 图标定制 ---------------- */}
      <section>
        <h3 data-section-icon="customize" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200/50 pb-1 flex items-center gap-2">
          <Asterisk size={10} /> 图标定制
        </h3>

        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          {appList.map((app) => {
            const Icon = app.icon;

            return (
              <div key={app.id} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-[16px] bg-white border border-gray-200 flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
                  {customIcons[app.id] ? (
                    <img
                      src={customIcons[app.id]}
                      className="w-full h-full object-cover"
                      alt={app.label}
                    />
                  ) : (
                    Icon && <Icon size={20} className="text-gray-400" />
                  )}

                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Upload size={16} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAppIconUpload(e, app.id)}
                    />
                  </label>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-600 font-medium">
                    {app.label}
                  </span>

                  {customIcons[app.id] && (
                    <button
                      onClick={() => handleResetIcon(app.id)}
                      className="text-[9px] text-red-400 hover:text-red-600 mt-1 flex items-center gap-0.5 scale-90"
                    >
                      <RotateCcw size={8} /> 还原
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PersonalizationPanel;