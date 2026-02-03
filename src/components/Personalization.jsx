import React from "react";
import { Upload, RotateCcw, Asterisk, Type, Monitor, Grid } from "lucide-react";

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
  appList, // 应用列表 (从App.jsx传入，确保两边数据一致)
  customIcons, // 当前的自定义图标状态 { appId: base64Str }
  handleAppIconUpload, // 上传处理函数
  handleResetIcon, // 重置处理函数
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
