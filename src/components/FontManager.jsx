import React, { useState, useEffect } from "react";
import { Upload, RotateCcw, Check } from "lucide-react";

export const FontManager = () => {
  const [fontName, setFontName] = useState(
    localStorage.getItem("custom-font-name") || "",
  );
  const [isSaved, setIsSaved] = useState(false);

  // Load stored font on init
  useEffect(() => {
    const savedFont = localStorage.getItem("custom-font-data");
    if (savedFont) {
      applyFont("UserCustomFont", savedFont);
    }
  }, []);

  const applyFont = (name, dataUrl) => {
    const styleId = "dynamic-user-font";
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      @font-face { font-family: '${name}'; src: url(${dataUrl}); }
      :root { --app-font: '${name}'; }
    `;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      applyFont("UserCustomFont", base64Data);
      try {
        localStorage.setItem("custom-font-data", base64Data);
        localStorage.setItem("custom-font-name", file.name);
        setFontName(file.name);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } catch (err) {
        alert("Font file too large to save locally (limit ~5MB)");
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset to default logic
  const handleReset = () => {
    localStorage.removeItem("custom-font-data");
    localStorage.removeItem("custom-font-name");
    const styleTag = document.getElementById("dynamic-user-font");
    if (styleTag) styleTag.remove();
    document.documentElement.style.setProperty(
      "--app-font",
      "'Inter', sans-serif",
    );
    setFontName("");
  };

  return (
    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Interface Font
        </label>
        {fontName && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500 transition-colors"
          >
            <RotateCcw size={10} /> Reset
          </button>
        )}
      </div>

      <label className="relative flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-[#7A2A3A]/30 transition-all">
        <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400">
          {isSaved ? (
            <Check size={18} className="text-green-500" />
          ) : (
            <Upload size={18} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-700 truncate">
            {fontName || "Click to upload a font file"}
          </p>
          <p className="text-[10px] text-gray-400">Supports .ttf, .otf, .woff2</p>
        </div>
        <input
          type="file"
          accept=".ttf,.otf,.woff2"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};
