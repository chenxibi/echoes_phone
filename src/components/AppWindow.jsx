import React from "react";
import { ChevronLeft } from "lucide-react";

const AppWindow = ({ isOpen, title, children, onClose, isChat, actions }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 bg-[#F2F2F7]/60 backdrop-blur-2xl z-30 flex flex-col animate-in slide-in-from-bottom-[5%] duration-300">
      <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200/50 bg-white/40 backdrop-blur-md shrink-0 sticky top-0 z-50">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
          <span className="text-sm font-medium ml-0.5">返回</span>
        </button>
        <span className="text-sm font-bold text-gray-800">{title}</span>
        <div className="flex items-center gap-2">
          {actions ? actions : <div className="w-8"></div>}
        </div>
      </div>
      <div
        className={`flex-grow overflow-y-auto custom-scrollbar ${
          !isChat ? "p-6" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AppWindow;
