import React, { useState } from "react";
import { Upload, RotateCcw, Asterisk, Type, Monitor, Grid, Palette } from "lucide-react";

// 官方皮肤预设
const OFFICIAL_SKINS = [
  {
    id: "midnight",
    name: "午夜深蓝",
    desc: "暗色界面，护眼柔和",
    preview: "bg-[#1a1a2e]",
    css: `/* 午夜深蓝主题 */
#echoes-chat { --skin-bg: #1a1a2e; --skin-surface: #252540; --skin-card: #2a2a45; --skin-text: #e0e0f0; --skin-sub: #8888aa; }
#echoes-chat .bg-\\[\\#F2F2F7\\] { background: #1a1a2e !important; }
#echoes-chat [class*="bg-\\[\\#F2F2F7"] { background: #1a1a2e !important; }
#echoes-chat header { color: #8888cc !important; }
#echoes-chat .bg-\\[\\#EBEBF0\\] { background: #1a1a2e !important; }
#echoes-chat .glass-card { background: rgba(255,255,255,0.06) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgba(255,255,255,0.08) !important; color: #d0d0e8 !important; }
#echoes-chat .glass-card label { color: #c0c0dd !important; }
#echoes-chat .glass-card p, #echoes-chat .glass-card span { color: #9999bb !important; }
#echoes-chat [class*="bg-white"] { background: #252540 !important; }
#echoes-chat .text-gray-800, #echoes-chat .text-gray-700 { color: #d0d0e8 !important; }
#echoes-chat .text-gray-500, #echoes-chat .text-gray-400 { color: #8888aa !important; }
#echoes-chat .border-gray-200 { border-color: rgba(255,255,255,0.08) !important; }
#echoes-chat .border-gray-200\\/50 { border-color: rgba(255,255,255,0.06) !important; }
#echoes-chat [class*="bg-gray-50"] { background: #1e1e38 !important; }
#echoes-chat [class*="bg-gray-100"] { background: rgba(255,255,255,0.05) !important; }
#echoes-chat input, #echoes-chat textarea { background: #1e1e38 !important; color: #d0d0e8 !important; border-color: rgba(255,255,255,0.1) !important; }
#echoes-chat input::placeholder, #echoes-chat textarea::placeholder { color: #555588 !important; }
#echoes-chat button.bg-black { background: #5566cc !important; }
#echoes-chat .text-gray-300 { color: #7777aa !important; }
`,
  },
  {
    id: "latte",
    name: "燕麦拿铁",
    desc: "暖调配色，温柔奶油感",
    preview: "bg-[#faf0e6]",
    css: `/* 燕麦拿铁主题 */
#echoes-chat { --skin-bg: #faf0e6; --skin-surface: #f5e6d3; --skin-card: #fff8f0; --skin-text: #4a3728; --skin-sub: #8b7355; }
#echoes-chat .bg-\\[\\#F2F2F7\\] { background: #faf0e6 !important; }
#echoes-chat [class*="bg-\\[\\#F2F2F7"] { background: #faf0e6 !important; }
#echoes-chat header { color: #c4956a !important; }
#echoes-chat .bg-\\[\\#EBEBF0\\] { background: #faf0e6 !important; }
#echoes-chat .glass-card { background: rgba(255,255,255,0.7) !important; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-color: #e8d5c0 !important; color: #4a3728 !important; border-radius: 14px !important; }
#echoes-chat .glass-card label { color: #6b5540 !important; }
#echoes-chat .glass-card p, #echoes-chat .glass-card span { color: #8b7355 !important; }
#echoes-chat [class*="bg-white"] { background: #fff8f0 !important; }
#echoes-chat .text-gray-800, #echoes-chat .text-gray-700 { color: #4a3728 !important; }
#echoes-chat .text-gray-500, #echoes-chat .text-gray-400 { color: #8b7355 !important; }
#echoes-chat .border-gray-200 { border-color: #e8d5c0 !important; }
#echoes-chat .border-gray-200\\/50 { border-color: #e8d5c0 !important; }
#echoes-chat [class*="bg-gray-50"] { background: #fff5ec !important; }
#echoes-chat [class*="bg-gray-100"] { background: rgba(196,150,106,0.08) !important; }
#echoes-chat input, #echoes-chat textarea { background: #fff5ec !important; color: #4a3728 !important; border-color: #e8d5c0 !important; }
#echoes-chat input::placeholder, #echoes-chat textarea::placeholder { color: #c4956a !important; }
#echoes-chat button.bg-black { background: #c4956a !important; }
#echoes-chat .text-gray-300 { color: #c4956a !important; }
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
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200/50 pb-1 flex items-center gap-2">
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
                isFullscreen ? "left-4.5" : "left-0.5"
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
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200/50 pb-1 flex items-center gap-2">
          <Palette size={10} /> 界面样式
        </h3>

        {/* 官方皮肤 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
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
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selectedSkin === skin.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className={`w-full h-10 rounded-lg mb-2 ${skin.preview}`} />
              <div className="text-xs font-bold text-gray-700">{skin.name}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{skin.desc}</div>
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
            使用 <code className="bg-gray-100 px-1 rounded">#echoes-chat</code> 作为选择器前缀
          </p>
        </div>
      </section>

      {/* ---------------- SECTION 2: 图标定制 ---------------- */}
      <section>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200/50 pb-1 flex items-center gap-2">
          <Asterisk size={10} /> 图标定制
        </h3>

        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          {appList.map((app) => {
            // [关键修改] 1. 将组件引用赋值给大写变量
            const Icon = app.icon;

            return (
              <div key={app.id} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-[16px] bg-white border border-gray-200 flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
                  {/* 显示当前图标 (自定义 或 默认) */}
                  {customIcons[app.id] ? (
                    <img
                      src={customIcons[app.id]}
                      className="w-full h-full object-cover"
                      alt={app.label}
                    />
                  ) : (
                    // [关键修改] 2. 使用这个大写变量进行渲染
                    // 还要加个判断，防止 Icon 为空导致报错
                    Icon && <Icon size={20} className="text-gray-400" />
                  )}

                  {/* 悬停上传遮罩 */}
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

                  {/* 仅在有自定义图标时显示“还原”按钮 */}
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
