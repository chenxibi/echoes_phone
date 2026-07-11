import React, { useState, useRef } from "react";
import { LogOut, GripVertical } from "lucide-react";

const HomeScreen = ({
  apps,
  onOpenApp,
  isPlaying,
  currentCoverUrl,
  onLogout,
  useStickyState,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  // 存储每个图标的坐标 { app_id: {x, y} }
  const [positions, setPositions] = useStickyState({}, "echoes_icon_positions");
  const [draggingApp, setDraggingApp] = useState(null);
  const containerRef = useRef(null);

  // 处理拖拽开始
  const handleDragStart = (id, e) => {
    setDraggingApp(id);
    e.dataTransfer.setData("text/plain", id);
  };

  // 处理拖拽放置
  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggingApp || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 30; // 居中修正
    const y = e.clientY - rect.top - 30;

    setPositions({
      ...positions,
      [draggingApp]: { x, y },
    });
    setDraggingApp(null);
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative overflow-hidden select-none"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* 页面 1：App 与 黑胶组件 */}
      {currentPage === 0 && (
        <div className="w-full h-full p-8">
          {/* 2x2 黑胶挂件 (固定或拖拽) */}
          <div
            className="absolute z-20 group"
            style={{
              left: positions["music_widget"]?.x || 20,
              top: positions["music_widget"]?.y || 20,
            }}
            draggable
            onDragStart={(e) => handleDragStart("music_widget", e)}
          >
            <div
              onClick={() => onOpenApp("music")}
              className="w-32 h-32 bg-black/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center shadow-inner cursor-pointer hover:scale-105 transition-transform"
            >
              <div
                className={`w-24 h-24 rounded-full bg-[#121212] relative flex items-center justify-center border-4 border-black/80 ${isPlaying ? "animate-spin-slow" : ""}`}
              >
                <div
                  className="absolute inset-0 opacity-20 rounded-full"
                  style={{
                    background: `repeating-radial-gradient(circle, #444, #444 1px, #111 2px, #444 3px)`,
                  }}
                ></div>
                {currentCoverUrl ? (
                  <img
                    src={currentCoverUrl}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-2 h-2 bg-[#7A2A3A] rounded-full" />
                )}
              </div>
            </div>
          </div>

          {/* 渲染 App 图标 */}
          {apps.map((app) => (
            <div
              key={app.id}
              draggable
              onDragStart={(e) => handleDragStart(app.id, e)}
              onClick={() => onOpenApp(app.id)}
              className="absolute flex flex-col items-center gap-1 cursor-pointer group p-2"
              style={{
                left: positions[app.id]?.x || 100 + apps.indexOf(app) * 90,
                top: positions[app.id]?.y || 180,
              }}
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#7A2A3A] group-active:scale-90 transition-all">
                {/* 修改这里：如果是组件则渲染为标签，如果是元素则直接渲染 */}
                {typeof app.icon === "function" ||
                (typeof app.icon === "object" && app.icon.$$typeof) ? (
                  <app.icon size={24} />
                ) : (
                  app.icon
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 页面 2：系统操作 */}
      {currentPage === 1 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in duration-300">
          <button
            onClick={onLogout}
            className="bg-white/80 backdrop-blur-md border border-red-100 text-red-500 px-10 py-4 rounded-3xl font-bold flex items-center gap-3 shadow-xl active:scale-95 transition-all"
          >
            <LogOut size={20} />
            Log Out
          </button>
          <p className="mt-4 text-gray-300 text-[10px] font-mono tracking-widest uppercase">
            System Control
          </p>
        </div>
      )}

      {/* 底部页面指示器 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${currentPage === i ? "bg-black w-4" : "bg-black/20"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
