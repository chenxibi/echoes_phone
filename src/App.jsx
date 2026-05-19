import React, { useState, useEffect, useRef } from "react";
import { jsonrepair } from "jsonrepair";
import { PRESET_LOCATION_IMAGES } from "./constants/assets";
import Forum from "./components/Forum";
import SettingsPanel from "./components/Settings";
import WorldBook from "./components/WorldBook";
import MusicApp from "./components/Music";
import {
  showToast,
  getFormattedMessageText,
  initNotification,
  getCurrentTimeObj,
  getContextString,
  getWorldInfoString,
  getRecentTurns,
  getStickerInstruction,
  formatSmartTime,
} from "./utils/helpers";
import AppWindow from "./components/AppWindow";
import PersonalizationPanel from "./components/Personalization";
import "./index.css";
import {
  DEFAULT_CHAR_STICKERS,
  DEFAULT_USER_STICKERS,
} from "./constants/stickers";
import {
  DEFAULT_PROMPTS,
  STYLE_PROMPTS as stylePrompts,
  CHARACTER_CREATION_PROMPT,
} from "./constants/prompts";
import mapBg from "./map_bg.png";
import {
  Wifi,
  Battery,
  Signal,
  Palette,
  ChevronLeft,
  Send,
  Settings as SettingsIcon,
  Play,
  Wand,
  SkipForward,
  Banknote,
  RefreshCw,
  Plus,
  MessageSquareMore,
  Lock,
  Minus,
  Unlock,
  FileText,
  WandSparkles,
  Fingerprint,
  ScanLine,
  Receipt,
  Disc3,
  Book,
  MessageCircle,
  ChevronRight,
  SlidersHorizontal,
  User,
  History,
  Upload,
  FileJson,
  Download,
  Camera,
  Image as ImageIcon,
  Edit2,
  Database,
  Save,
  X,
  ToggleLeft,
  ToggleRight,
  Clock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Smile,
  RotateCcw,
  MoreHorizontal,
  Quote,
  CloudFog,
  Link,
  MapPin,
  Smartphone,
  Activity,
  ScanEye,
  Ghost,
  ArrowRight,
  Heart,
  Shirt,
  Globe, // Browser Icon
  Search, // Search Icon
  EyeOff, // Incognito Icon
  ChevronUp, // Collapse Icon
  MessageSquare, // Thought Icon
  LogOut, // Logout Icon
  StopCircle, // Stop Icon
  XCircle, // Cancel Icon
  BookOpen, // WorldBook Icon
  UserRound, // User Persona Icon
  UserPen, // User Persona Icon
  Video, // AV Data Icon
  Mic, // Microphone Icon
  Hash, // Forum Icon
  MessageSquarePlus, // Add Post Icon
  MessageCircle as CommentIcon, // Comment Icon
  CornerDownRight, // Reply Icon
  Share, // Forward Icon
  RefreshCcw, // Update Replies Icon
  PlusCircle, // New Post Icon
  Bot,
  Eye,
  Sparkle,
  Check, // Bot Icon for Char Reply
  Circle, // [新增]
  Sparkles, // [新增]
  Calendar,
  FolderInput,
  ArrowRightToLine,
  Bell,
  BellOff,
  Dices,
} from "lucide-react";
import { getUserId, fetchActiveMessages, clearActiveMessages } from "./utils/activeMessages";
import ActiveMessageToast from "./components/ActiveMessageToast";

// --- helpers moved to ./utils/appHelpers.jsx ---
import {
  echoesDB,
  useStickyState,
  replacePlaceholders,
  generateContent,
  cleanCharacterJson,
  CollapsibleThought,
  MinimalCard,
  GhostButton,
  StickerEditorModal,
  CreationAssistantModal,
  StatusPanel,
  VoiceMessageBubble,
  TransferBubble,
  CustomDialog,
  LocationBubble,
  isImageMsg,
  getImageDesc,
  compressImage,
  formatTime,
  formatDate,
  parseStickerLinks,
  safeJSONParse,
  toggleFullScreen,
  APP_LIST,
  PLACEHOLDER_IMG_BASE64,
  IMG_TAG_START,
} from "./utils/appHelpers.jsx";

// 3D 骰子面（1-6 点）
// 2D 骰子面（静态展示，白底黑点�?
const StaticDice = ({ value }) => {
  const dots = {
    1: [[1,1]],
    2: [[0,2],[2,0]],
    3: [[0,2],[1,1],[2,0]],
    4: [[0,0],[0,2],[2,0],[2,2]],
    5: [[0,0],[0,2],[1,1],[2,0],[2,2]],
    6: [[0,0],[0,2],[1,0],[1,2],[2,0],[2,2]],
  }[value];
  return (
    <div className="w-14 h-14 rounded-2xl grid grid-cols-3 grid-rows-3 p-2.5 shadow-sm" style={{ background: "#ffffff" }}>
      {Array.from({length:9}).map((_,i)=>{
        const r=Math.floor(i/3), c=i%3;
        const active=dots.some(([dr,dc])=>dr===r&&dc===c);
        return <div key={i} className="flex items-center justify-center">
          {active && <div className="w-3 h-3 rounded-full bg-gray-900" />}
        </div>;
      })}
    </div>
  );
};

// 3D 骰子组件
const DiceFace = ({ value, animate = false, onDone }) => {
  const SIZE = 56;
  const H = SIZE / 2;

  // targetAngles: 每个点数对应的最�?3D 姿�?
  const targetAngles = {
    1: { rx: -40, ry: 28 },
    2: { rx: 140, ry: 28 },
    3: { rx: -40, ry: 118 },
    4: { rx: -40, ry: -62 },
    5: { rx: 50, ry: 28 },
    6: { rx: -40, ry: 208 },
  };

  const [angle, setAngle] = useState(() => animate ? { rx: 0, ry: 0 } : targetAngles[value]);
  const [done, setDone] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const target = targetAngles[value];
    const steps = 14; // 翻滚步数
    let step = 0;
    let raf;

    const tick = () => {
      step++;
      const delay = 40 + (step / (steps + 1)) * 50; // 逐步变慢
      if (step <= steps) {
        setAngle({
          rx: step < steps ? Math.random() * 720 + 180 : target.rx,
          ry: step < steps ? Math.random() * 720 + 180 : target.ry,
        });
        raf = setTimeout(tick, delay);
      } else {
        // 精确停在目标角度
        setAngle(target);
        setDone(true);
        onDone?.();
      }
    };

    raf = setTimeout(tick, 60);
    return () => clearTimeout(raf);
  }, []);

  const Dots = ({ n }) => {
    const dots = {
      1: [[1,1]], 2: [[0,2],[2,0]], 3: [[0,2],[1,1],[2,0]],
      4: [[0,0],[0,2],[2,0],[2,2]], 5: [[0,0],[0,2],[1,1],[2,0],[2,2]],
      6: [[0,0],[0,2],[1,0],[1,2],[2,0],[2,2]],
    }[n];
    return (
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1.5">
        {Array.from({length:9}).map((_,i)=>{
          const r=Math.floor(i/3), c=i%3;
          const active=dots.some(([dr,dc])=>dr===r&&dc===c);
          return <div key={i} className="flex items-center justify-center">
            {active && <div className="w-2 h-2 rounded-full bg-gray-900" />}
          </div>;
        })}
      </div>
    );
  };

  const faceCls = `absolute inset-0 rounded-xl flex items-center justify-center`;
  const fs = { width: SIZE, height: SIZE };
  const currentTransform = `rotateX(${angle.rx}deg) rotateY(${angle.ry}deg)`;

  return (
    <div style={{ perspective: 200, width: 56, height: 56, overflow: "visible" }}>
      <div
        className="relative"
        style={{
          width: SIZE,
          height: SIZE,
          transformStyle: "preserve-3d",
          transform: currentTransform,
          transition: done ? "" : "none",
        }}
      >
        {/* 顶面(5) �?结果面，最�?*/}
        <div className={faceCls} style={{ ...fs, transform: `rotateX(90deg) translateZ(${H}px)`, background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)" }}>
          <Dots n={5} />
        </div>
        {/* 底面(2) �?最�?*/}
        <div className={faceCls} style={{ ...fs, transform: `rotateX(-90deg) translateZ(${H}px)`, background: "linear-gradient(135deg, #d0d0d0 0%, #c0c0c0 100%)" }}>
          <Dots n={2} />
        </div>
        {/* 前面(1) */}
        <div className={faceCls} style={{ ...fs, transform: `translateZ(${H}px)`, background: "linear-gradient(135deg, #e8e8e8 0%, #dcdcdc 100%)" }}>
          <Dots n={1} />
        </div>
        {/* 后面(6) */}
        <div className={faceCls} style={{ ...fs, transform: `rotateY(180deg) translateZ(${H}px)`, background: "linear-gradient(135deg, #e0e0e0 0%, #d4d4d4 100%)" }}>
          <Dots n={6} />
        </div>
        {/* 右面(4) */}
        <div className={faceCls} style={{ ...fs, transform: `rotateY(90deg) translateZ(${H}px)`, background: "linear-gradient(135deg, #e4e4e4 0%, #d8d8d8 100%)" }}>
          <Dots n={4} />
        </div>
        {/* 左面(3) */}
        <div className={faceCls} style={{ ...fs, transform: `rotateY(-90deg) translateZ(${H}px)`, background: "linear-gradient(135deg, #e4e4e4 0%, #d8d8d8 100%)" }}>
          <Dots n={3} />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [charStickers, setCharStickers, charStickersLoaded] = useStickyState(
    DEFAULT_CHAR_STICKERS,
    "echoes_char_stickers",
  );
  const [userStickers, setUserStickers, userStickersLoaded] = useStickyState(
    DEFAULT_USER_STICKERS,
    "echoes_user_stickers",
  );

  // 批量导入表情包函�?
  const handleBulkImport = (
    text,
    type = "char",
    targetGroup = "自定义表�?,
  ) => {
    const lines = text.split("\n");
    const newStickers = [];
    const now = Date.now();

    lines.forEach((line, index) => {
      const parts = line.split(/[:：]/);
      if (parts.length >= 2) {
        const desc = parts[0].trim();
        const url = parts.slice(1).join(":").trim();
        if (desc && url.startsWith("http")) {
          newStickers.push({
            id: `s${now}_${index}`,
            url: url,
            desc: desc,
            group: targetGroup,
            enabled: true,
          });
        }
      }
    });

    if (newStickers.length > 0) {
      if (type === "char") {
        setCharStickers((prev) => [...prev, ...newStickers]);
      } else {
        setUserStickers((prev) => [...prev, ...newStickers]);
      }
      if (typeof showToast === "function")
        // 加上第一个参�?"success"
        showToast("success", `已成功导�?${newStickers.length} 个表情包`);
    } else {
      if (typeof showToast === "function")
        // �?"error" 挪到前面
        showToast("error", "格式错误 (应为 描述: 链接)");
    }
  };
  // -- PERSISTENT STATE --
  const [apiConfig, setApiConfig, apiConfigLoaded] = useStickyState(
    { useCustom: true, baseUrl: "", key: "", model: "" },
    "echoes_api_config",
  );
  const [inputKey, setInputKey, inputKeyLoaded] = useStickyState(
    "",
    "echoes_raw_json",
  );
  const [persona, setPersona, personaLoaded] = useStickyState(
    null,
    "echoes_persona",
  );
  const [worldBook, setWorldBook, worldBookLoaded] = useStickyState(
    [],
    "echoes_worldbook",
  );
  const [fontName, setFontName, fontNameLoaded] = useStickyState(
    "",
    "echoes_custom_font_name",
  );

  const applyFont = (name, url) => {
    const styleId = "dynamic-user-font";
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    // 这里直接�?url 放进去即可，浏览器会自动去下�?
    styleTag.innerHTML = `
    @font-face { font-family: '${name}'; src: url('${url}'); font-display: swap; }
    body { --app-font: '${name}' !important; }
  `;
  };

  useEffect(() => {
    const loadFont = async () => {
      const savedFontUrl = await echoesDB.getItem("custom-font-url");
      const savedFontName = await echoesDB.getItem("custom-font-name");
      if (savedFontUrl) {
        applyFont("UserCustomFont", savedFontUrl);
        setFontName(savedFontName || "自定义字�?);
      }
    };
    loadFont();
  }, []);

  const handleFontUrlSubmit = async () => {
    const url = inputUrl.trim(); // 使用你定义好�?inputUrl 状�?
    if (url) {
      applyFont("UserCustomFont", url);
      setFontName("自定义字�?);
      await echoesDB.setItem("custom-font-url", url);
      await echoesDB.setItem("custom-font-name", "自定义字�?);
      // setShowFontInput(false); // 如果有这个状态就加上
      showToast("success", "字体已应�?);
    } else {
      showToast("error", "请输入字�?URL");
    }
  };

  const handleResetFont = async () => {
    // 加上 async
    // 移除自定义字�?
    const styleElement = document.getElementById("UserCustomFont");
    if (styleElement) styleElement.remove();
    document.body.style.fontFamily = "";
    setFontName("默认字体");
    await echoesDB.removeItem("custom-font-url");
    await echoesDB.removeItem("custom-font-name");
    showToast("info", "已恢复默认字�?);
  };

  // [新增] 自定义图标状�?
  const [customIcons, setCustomIcons, customIconsLoaded] = useStickyState(
    {},
    "echoes_custom_icons",
  );

  const handleAppIconUpload = async (e, appId) => {
    // 加上 async
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      // 这里的匿名回调也要加 async
      const base64 = event.target.result;
      const newIcons = { ...customIcons, [appId]: base64 };
      setCustomIcons(newIcons);
      await echoesDB.setItem("my_custom_icons", newIcons);
      showToast("success", "图标已更�?);
    };
    reader.readAsDataURL(file);
  };

  // [新增] 重置图标
  const handleResetIcon = async (appId) => {
    if (await customConfirm("确定恢复默认图标吗？", "恢复图标")) {
      setCustomIcons((prev) => {
        const newState = { ...prev };
        delete newState[appId];
        return newState;
      });
    }
  };

  // --- CUSTOM DIALOG STATE ---
  const [dialogConfig, setDialogConfig] = useState(null);

  // Helper: 封装 Promise 以等待用户操�?
  const showDialog = (options) => {
    return new Promise((resolve) => {
      setDialogConfig({ ...options, resolve });
    });
  };

  // 替代 window.alert
  const customAlert = (message, title = "提示") => {
    return showDialog({ type: "alert", title, message });
  };

  // 替代 window.confirm
  const customConfirm = (message, title = "确认", danger = false) => {
    return showDialog({ type: "confirm", title, message, danger });
  };

  // 替代 window.prompt
  const customPrompt = (message, defaultValue = "", title = "输入") => {
    return showDialog({ type: "prompt", title, message, defaultValue });
  };

  // 1. Memory 相关�?State
  const [memoryConfig, setMemoryConfig, memoryConfigLoaded] = useStickyState(
    {
      enabled: true,
      threshold: 10,
    },
    "echoes_memory_config",
  );
  const [longMemory, setLongMemory, longMemoryLoaded] = useStickyState(
    "",
    "echoes_long_memory",
  );
  const [
    msgCountSinceSummary,
    setMsgCountSinceSummary,
    msgCountSinceSummaryLoaded,
  ] = useStickyState(0, "echoes_msg_count");

  const audioRef = useRef(null);
  // User Profile
  const [userPersona, setUserPersona, userPersonaLoaded] = useStickyState(
    "",
    "echoes_user_persona",
  );
  const [userName, setUserName, userNameLoaded] = useStickyState(
    "",
    "echoes_user_name",
  );
  const [userAvatar, setUserAvatar, userAvatarLoaded] = useStickyState(
    null,
    "echoes_user_avatar",
  );
  const [avatar, setAvatar, avatarLoaded] = useStickyState(
    null,
    "echoes_char_avatar",
  );

  const [inputUrl, setInputUrl] = useState("");

  // Content
  const [chatHistory, setChatHistory, chatHistoryLoaded] = useStickyState(
    [],
    "echoes_chat_history",
  );
  const [statusHistory, setStatusHistory, statusHistoryLoaded] = useStickyState(
    [],
    "echoes_status_history",
  );
  const [diaries, setDiaries, diariesLoaded] = useStickyState(
    [],
    "echoes_diaries",
  );
  const [receipts, setReceipts, receiptsLoaded] = useStickyState(
    [],
    "echoes_receipts",
  );
  const [music, setMusic, musicLoaded] = useStickyState([], "echoes_music");
  const [browserHistory, setBrowserHistory, browserHistoryLoaded] =
    useStickyState([], "echoes_browser");
  const [skinCSS, setSkinCSS, skinCSSLoaded] = useStickyState(
    "",
    "echoes_skin_css",
  );
  const [selectedSkin, setSelectedSkin, selectedSkinLoaded] = useStickyState(
    "",
    "echoes_selected_skin",
  );

  // 追踪器相关状�?
  const [userFacts, setUserFacts, userFactsLoaded] = useStickyState(
    [],
    "echoes_user_facts",
  );
  const [charFacts, setCharFacts, charFactsLoaded] = useStickyState(
    [],
    "echoes_char_facts",
  );
  const [sharedEvents, setSharedEvents, sharedEventsLoaded] = useStickyState(
    [],
    "echoes_shared_events",
  );
  const [showEventsInDiary, setShowEventsInDiary] = useState(false);
  const [trackerConfig, setTrackerConfig, trackerConfigLoaded] = useStickyState(
    { facts: true, events: true },
    "echoes_tracker_config",
  );

  // Settings
  const prompts = DEFAULT_PROMPTS;
  // const [prompts, setPrompts] = useStickyState(DEFAULT_PROMPTS,"echoes_prompts");
  const [customRules, setCustomRules, customRulesLoaded] = useStickyState(
    "无特殊规�?,
    "echoes_custom_rules",
  );
  const [chatStyle, setChatStyle, chatStyleLoaded] = useStickyState(
    "dialogue",
    "echoes_chat_style",
  );

  const [stickersEnabled, setStickersEnabled, stickersEnabledLoaded] =
    useStickyState(true, "echoes_stickers_enabled");

  // 上下文记忆条�?
  const [contextLimit, setContextLimit, contextLimitLoaded] = useStickyState(
    10,
    "echoes_context_limit",
  );

  const handleSendTransfer = async () => {
    // async
    const amount = await customPrompt(
      "请输入转账金�?(CNY):",
      "520",
      "发起转账",
    );
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      if (amount) showToast("error", "请输入有效的金额");
      return;
    }

    // 备注
    const noteInput = await customPrompt(
      "添加转账备注 (可�?:",
      "",
      "转账备注",
    );
    const note = noteInput === null ? "" : noteInput;

    handleUserSend(amount, "transfer", null, { note: note });
    setShowMediaMenu(false);
  };
  const handleSendDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    handleUserSend(result, "dice");
    setShowMediaMenu(false);
  };
  const handleTransferInteract = (index, action) => {
    const newHistory = [...chatHistory];
    const msg = newHistory[index];
    if (!msg.transfer || msg.transfer.status !== "pending") return;

    // 更新状�?
    msg.transfer.status = action === "accept" ? "accepted" : "rejected";

    const amount = msg.transfer.amount;
    const actionText = action === "accept" ? "已收�? : "已退�?;

    // 生成系统消息
    const notificationMsg = {
      id: `sys_${Date.now()}`,
      sender: "me",
      isSystem: true,
      text: `�?{actionText} ¥${amount}`,
      time: formatTime(getCurrentTimeObj()),
      ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
    };

    newHistory.push(notificationMsg);
    setChatHistory(newHistory);

    const hint = `[SYSTEM EVENT]: User ${
      action === "accept" ? "accepted" : "rejected"
    } the transfer (¥${amount}).`;
    setPendingHint(hint);
  };

  // [新增] 核心回退逻辑：根据消�?ID 删除它生成的所�?Facts �?Events
  const rollbackTrackerData = (sourceMsgId) => {
    if (!sourceMsgId) return;

    // 1. 回退 User Facts
    setUserFacts((prev) => {
      const filtered = prev.filter((item) => item.sourceMsgId !== sourceMsgId);
      if (filtered.length !== prev.length) {
        console.log(
          `[Echoes] 已回退关联�?User Facts (${
            prev.length - filtered.length
          }�?`,
        );
      }
      return filtered;
    });

    // 2. 回退 Char Facts
    setCharFacts((prev) => {
      const filtered = prev.filter((item) => item.sourceMsgId !== sourceMsgId);
      if (filtered.length !== prev.length) {
        console.log(
          `[Echoes] 已回退关联�?Char Facts (${
            prev.length - filtered.length
          }�?`,
        );
      }
      return filtered;
    });

    // 3. 回退 Shared Events (pending 状态的)
    setSharedEvents((prev) => {
      const filtered = prev.filter((item) => item.sourceMsgId !== sourceMsgId);
      if (filtered.length !== prev.length) {
        console.log(
          `[Echoes] 已回退关联�?Events (${prev.length - filtered.length}�?`,
        );
      }
      return filtered;
    });
  };

  // 3. 临时 UI 状�?
  const [editingSticker, setEditingSticker] = useState(null); // 当前正在编辑的表情包
  const [showUserStickerPanel, setShowUserStickerPanel] = useState(false); // 用户表情面板开�?
  const [isUserStickerEditMode, setIsUserStickerEditMode] = useState(false); // 用户表情包编辑模式开�?
  const [isVoiceMode, setIsVoiceMode] = useState(false); // 语音模式开�?
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLocGenerating, setIsLocGenerating] = useState(false);

  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const imageUploadRef = useRef(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState(null);

  // [新增] 全屏状态控�?
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen({ navigationUI: "hide" })
        .then(() => {
          setIsFullscreen(true);
          // 全屏后添�?viewport-fit 以覆盖状态栏区域
          document.documentElement.style.setProperty("padding-top", "env(safe-area-inset-top)");
        })
        .catch((e) => {
          console.log(e);
          showToast("error", "全屏模式被浏览器拒绝");
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
          document.documentElement.style.removeProperty("padding-top");
        });
      }
    }
  };

  // 监听原生全屏变化（比如用户按ESC退出），同步按钮状�?
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const [replyIdentity, setReplyIdentity] = useState("me");

  // -- TRANSIENT STATE --
  const [isLocked, setIsLocked] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [showLockSettings, setShowLockSettings] = useState(false);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    initNotification(setNotification);
  }, []);
  const [showEditPersona, setShowEditPersona] = useState(false);

  // Active Messages
  const [activeMsgEnabled, setActiveMsgEnabled, activeMsgEnabledLoaded] =
    useStickyState(false, "echoes_active_msg_enabled");
  const [activeMessages, setActiveMessages] = useState([]);
  const [activeMsgToast, setActiveMsgToast] = useState(null);

  useEffect(() => {
    if (!activeMsgEnabled) return;
    const uid = getUserId();
    const poll = async () => {
      try {
        const data = await fetchActiveMessages(uid);
        if (data?.messages?.length) {
          setActiveMessages(data.messages);
          const unread = data.messages.filter((m) => !m.read);
          if (unread.length > 0) {
            setActiveMsgToast({ ...unread[0], id: unread[0].id || Date.now() });
          }
        }
      } catch (e) { /* 静默失败 */ }
    };
    poll();
    const timer = setInterval(poll, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, [activeMsgEnabled]);

  const handleDismissActiveMsg = () => setActiveMsgToast(null);
  const handleReadActiveMsg = async (message) => {
    setActiveMsgToast(null);
    try { await clearActiveMessages(getUserId()); } catch (e) { /* ignore */ }
    setActiveApp("chat");
  };

  const [connectionStatus, setConnectionStatus] = useState("idle");
  const [availableModels, setAvailableModels] = useState([]);
  const [isFetchingModels, setIsFetchingModels] = useState(false);
  const [previousApp, setPreviousApp] = useState(null);
  const [timeSettings, setTimeSettings] = useState({
    useSystem: true,
    customDate: "2025-11-11",
    customTime: "23:45",
  });
  const currentTime = getCurrentTimeObj(timeSettings);
  const [interactionMode, setInteractionMode, interactionModeLoaded] =
    useStickyState("online", "echoes_interaction_mode");
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);
  const [regenerateTarget, setRegenerateTarget] = useState(null);
  const [regenHint, setRegenHint] = useState("");
  const [expandedMusicHistory, setExpandedMusicHistory] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null); // 当前哪个消息显示了菜�?
  const [pendingHint, setPendingHint] = useState(null);
  const [editIndex, setEditIndex] = useState(null); // 当前正在编辑哪条消息
  const [editContent, setEditContent] = useState(""); // 编辑框的内容
  const longPressTimerRef = useRef(null);
  const [isSummarizing, setIsSummarizing] = useState(false); // Loading 状�?

  // NEW: State to track which message has its status expanded
  const [expandedChatStatusIndex, setExpandedChatStatusIndex] = useState(null);

  // Abort Controller Ref
  const abortControllerRef = useRef(null);

  // Refs
  const jsonInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const identityAvatarInputRef = useRef(null);
  const userAvatarInputRef = useRef(null);
  const stickerInputRef = useRef(null);
  const lastUserSendTimeRef = useRef(Date.now());
  const [lastInteractionTime, setLastInteractionTime, lastInteractionTimeLoaded] =
    useStickyState(Date.now(), "echoes_last_interaction");
  const skipNextGapNoticeRef = useRef(false);
  const [realTimeEnabled, setRealTimeEnabled, realTimeEnabledLoaded] = useStickyState(
    true,
    "echoes_real_time_enabled",
  );
  const chatScrollRef = useRef(null);

  // === 新增状�?===
  const [showCreationAssistant, setShowCreationAssistant] = useState(false);
  const [creationInput, setCreationInput] = useState("");
  const [isGeneratingCharacter, setIsGeneratingCharacter] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState(null);

  // === 角色生成函数 ===
  const generateCharacterFromDescription = async () => {
    if (!creationInput.trim()) {
      showToast("error", "请输入角色描�?);
      return;
    }

    setIsGeneratingCharacter(true);

    try {
      const result = await generateContent(
        {
          prompt: `用户描述: "${creationInput}"
        
          请根据以上简短描述，生成一个完整、详细的角色卡。确保所有细节都有逻辑支撑。`,
          systemInstruction: CHARACTER_CREATION_PROMPT,
          isJson: true,
        },
        apiConfig,
        (err) => showToast("error", err),
      );

      if (result) {
        setGeneratedPreview(result);
        showToast("success", "角色生成成功�?);
      }
    } catch (error) {
      showToast("error", "生成失败: " + error.message);
    } finally {
      setIsGeneratingCharacter(false);
    }
  };

  // === 应用生成的角�?===
  const applyGeneratedCharacter = () => {
    if (!generatedPreview) return;

    const cleaned = cleanCharacterJson(generatedPreview);
    const finalDescription = generatedPreview.description || cleaned.rawText;
    // 优先级：generatedPreview.name > cleaned.name > 从description正则提取 > "Unknown"
    // 支持标准格式 "Name: xxx" �?YAML 格式 "角色�?\n  Chinese_name:"
    const raw = finalDescription || "";
    // 标准 Name: xxx 格式
    const nameFromStandard = raw.match(/^Name:\s*(.+)/m);
    // YAML 格式：取 description 里第一�?"角色�?\n" 后紧�?Chinese_name 的模�?
    const nameFromYaml = raw.match(/^([^\n:]{2,20}):\s*\n\s+Chinese_name:/m);
    // 兜底：直接取 description 第一行（去掉 <info> 等标签后的第一行内容）
    const firstLineRaw = raw.replace(/<[^>]+>/g, "").split("\n").find(l => l.trim().length > 0);
    // 改进：匹配第一行，排除明显是字段标签的行（�?"Appearance:"�?Personality:"�?
    const nameFromFirstLine = firstLineRaw
      ? firstLineRaw.trim().match(/^([^\n:]{2,20})$/)
      : null;
    const isLikelyFieldLabel = (str) => /^[A-Z][a-z]+:\s*$/.test(str) || /^(appearance|personality|background|description):/i.test(str);
    const firstLineCandidate = firstLineRaw ? firstLineRaw.trim() : null;
    const safeFirstLineName = (firstLineCandidate && firstLineCandidate.length >= 2 && firstLineCandidate.length <= 20 && !isLikelyFieldLabel(firstLineCandidate)) ? firstLineCandidate : null;
    const finalName =
      (generatedPreview.name && generatedPreview.name !== "Unknown" ? generatedPreview.name : null) ||
      (cleaned.name && cleaned.name !== "Unknown" ? cleaned.name : null) ||
      (nameFromStandard ? nameFromStandard[1].trim() : null) ||
      (nameFromYaml ? nameFromYaml[1].trim() : null) ||
      (safeFirstLineName && !isLikelyFieldLabel(safeFirstLineName) ? safeFirstLineName : null) ||
      "Unknown";
    setPersona({
      name: finalName,
      rawDescription: finalDescription,
      avatar: null,
    });
    setInputKey(finalDescription);

    // 5. 设置世界�?(如果�?
    const groupedWorldBook = (cleaned.worldBook || []).map((entry) => ({
      ...entry,
      group: finalName, // 使用角色名作为分�?
    }));
    setWorldBook(groupedWorldBook);

    // 6. 重置生成�?UI
    setShowCreationAssistant(false);
    setGeneratedPreview(null);
    setCreationInput("");

    // 重置状�?
    setShowCreationAssistant(false);
    setGeneratedPreview(null);
    setCreationInput("");
    showToast("success", `角色�?{finalName}」已加载`);
  };

  const handleOpenLocationModal = () => {
    setShowMediaMenu(false); // 关闭菜单
    setShowLocationModal(true);
  };

  const generateTrackerUpdate = async (sourceMsgId) => {
    if (!persona) return;

    const recentMsgs = getRecentTurns(chatHistory, 12);
    const recentHistory = recentMsgs
      .map((m) => {
        const role = m.sender === "me" ? userName || "User" : persona.name;
        let content = `${role}: ${m.text}`;
        if (m.sender !== "me" && m.status && chatStyle !== "novel") {
          if (m.status.thought) {
            content += `\n(Inner Thought: ${m.status.thought})`;
          }
        }
        return content;
      })
      .join("\n---\n");
    const pendingEvents = sharedEvents.filter((e) => e.type === "pending");

    // 准备数据传给 Prompt
    const pendingEventsStr = JSON.stringify(
      pendingEvents.map((e) => ({ id: e.id, content: e.content })),
    );
    const userFactsStr = JSON.stringify(userFacts.map((f) => f.content));
    const charFactsStr = JSON.stringify(charFacts.map((f) => f.content)); // [新增]

    const prompt = prompts.tracker_update
      .replaceAll("{{HISTORY}}", recentHistory)
      .replaceAll("{{PENDING_EVENTS}}", pendingEventsStr)
      .replaceAll("{{USER_FACTS}}", userFactsStr)
      .replaceAll("{{CHAR_FACTS}}", charFactsStr) // [新增]
      .replaceAll("{{USER_NAME}}", userName || "User")
      .replaceAll("{{NAME}}", persona.name);

    try {
      const data = await generateContent(
        { prompt, systemInstruction: getFinalSystemPrompt() },
        apiConfig,
        null,
      );

      if (data) {
        // 1. 处理 User Facts
        if (data.newUserFacts && data.newUserFacts.length > 0) {
          const newEntries = data.newUserFacts.map((f) => ({
            id: `ufact_${Date.now()}_${Math.random()}`,
            content: f.content,
            comment: f.comment,
            time: formatDate(getCurrentTimeObj()),
            sourceMsgId: sourceMsgId, // <--- [关键新增] 记录来源消息ID
          }));
          setUserFacts((prev) => [...newEntries, ...prev]);
          showToast("success", `记住了关于你�?${newEntries.length} 件事`);
        }

        // 2. 处理 Char Facts
        if (data.newCharFacts && data.newCharFacts.length > 0) {
          const newEntries = data.newCharFacts.map((f) => ({
            id: `cfact_${Date.now()}_${Math.random()}`,
            content: f.content,
            comment: f.comment,
            time: formatDate(getCurrentTimeObj()),
            sourceMsgId: sourceMsgId, // <--- [关键新增]
          }));
          setCharFacts((prev) => [...newEntries, ...prev]);
          showToast("success", `更新了角色设�?(${newEntries.length}�?`);
        }

        // 3. 处理 Events
        if (data.newEvents && data.newEvents.length > 0) {
          const newEntries = data.newEvents.map((e) => ({
            id: `evt_${Date.now()}_${Math.random()}`,
            content: e.content,
            type: e.type || "pending",
            comment: e.comment,
            time: formatDate(getCurrentTimeObj()),
            sourceMsgId: sourceMsgId, // <--- [关键新增]
          }));
          setSharedEvents((prev) => [...newEntries, ...prev]);
        }

        // 4. 完成事件 (逻辑不变)
        if (data.completedEventIds && data.completedEventIds.length > 0) {
          setSharedEvents((prev) =>
            prev.map((evt) => {
              const completionInfo = data.completedEventIds.find(
                (c) => c.id === evt.id,
              );
              if (completionInfo) {
                return {
                  ...evt,
                  type: "completed",
                  comment: completionInfo.comment || evt.comment,
                  completedTime: formatDate(getCurrentTimeObj()),
                };
              }
              return evt;
            }),
          );
        }
      }
    } catch (e) {
      console.error("Tracker Update Failed", e);
    }
  };

  // --- TRACKER HANDLERS ---

  const handleDeleteTrackerItem = async (type, id) => {
    if (!(await customConfirm("确定删除这条记录吗？"))) return;

    // 修复点：兼容 "fact" (User Facts) �?"userFact"
    if (type === "userFact" || type === "fact") {
      setUserFacts((prev) => prev.filter((i) => i.id !== id));
    } else if (type === "charFact") {
      setCharFacts((prev) => prev.filter((i) => i.id !== id));
    } else {
      // 这里�?else 对应 events
      setSharedEvents((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleEditTrackerItem = async (type, id, oldContent) => {
    const newContent = await customPrompt("编辑内容:", oldContent);
    if (newContent && newContent.trim() !== "") {
      if (type === "fact" || type === "userFact") {
        setUserFacts((prev) =>
          prev.map((i) => (i.id === id ? { ...i, content: newContent } : i)),
        );
      } else if (type === "charFact") {
        // [新增] 之前漏了这个分支，导�?CharFacts 编辑会跑�?else 里去�?SharedEvents
        setCharFacts((prev) =>
          prev.map((i) => (i.id === id ? { ...i, content: newContent } : i)),
        );
      } else {
        setSharedEvents((prev) =>
          prev.map((i) => (i.id === id ? { ...i, content: newContent } : i)),
        );
      }
      showToast("success", "已更�?);
    }
  };

  // 切换配置开�?
  const toggleTrackerConfig = (key) => {
    setTrackerConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 删除状态记录函�?
  const handleDeleteStatus = async (index) => {
    if (await customConfirm("确定删除这条状态记录？")) {
      const newHistory = [...statusHistory];
      newHistory.splice(index, 1);
      setStatusHistory(newHistory);
      showToast("success", "状态记录已删除");
    }
  };

  // Effects
  useEffect(() => {
    // Auto unlock if we have data loaded
    if (persona && inputKey) {
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (activeApp === "chat" && chatScrollRef.current) {
      // 直接定位到底部，不做滚动动画
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, activeApp, loading.chat, isTyping]);

  // --- [新增] 数据结构迁移：自动给旧数据加上分�?---
  useEffect(() => {
    // 1. 迁移表情�?
    setCharStickers((prev) =>
      prev.map((s) => ({
        ...s,
        group: s.group || "狗男日记",
        enabled: s.enabled !== undefined ? s.enabled : true,
      })),
    );

    // 2. 迁移世界�?
    setWorldBook((prev) =>
      prev.map((w) => ({
        ...w,
        group: w.group || "未分�?,
      })),
    );
  }, []); // 只在组件挂载时执行一�?

  // --- FIXED MESSAGE QUEUE LOGIC ---
  // Effect 1: Trigger typing state when there are messages
  useEffect(() => {
    if (messageQueue.length > 0 && !isTyping) {
      setIsTyping(true);
    }
  }, [messageQueue, isTyping]);

  // Effect 2: Process messages when in typing state
  useEffect(() => {
    if (isTyping && messageQueue.length > 0) {
      const nextMsg = messageQueue[0];
      // Random delay for typing simulation
      const delay = Math.floor(Math.random() * 1000) + 800;

      const timer = setTimeout(() => {
        setChatHistory((prev) => [...prev, nextMsg]);
        setMessageQueue((prev) => prev.slice(1));
        setIsTyping(false); // This triggers Effect 1 again if queue > 0
      }, delay);

      return () => clearTimeout(timer);
    } else if (isTyping && messageQueue.length === 0) {
      // Safety: If typing but no messages, stop typing immediately
      setIsTyping(false);
    }
  }, [isTyping, messageQueue]);

  // 皮肤 CSS 注入
  useEffect(() => {
    let styleEl = document.getElementById("echoes-skin-style");
    if (!skinCSS) {
      if (styleEl) styleEl.remove();
      return;
    }
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "echoes-skin-style";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = skinCSS;
  }, [skinCSS]);

  // Helpers

  // Actions
  const handleJsonUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          try {
            const json = JSON.parse(e.target.result);
            const { rawText, worldBook, name } = cleanCharacterJson(json);
            setInputKey(rawText);
            setWorldBook(worldBook);
            // �?rawText 中提�?Name: xxx 格式的名字，兜底�?cleanCharacterJson 返回�?name
            const nameMatch = rawText.match(/^Name:\s*(.+)/m);
            const finalName = nameMatch ? nameMatch[1].trim() : (name && name !== "Unknown" ? name : "角色");
            setPersona((prev) => ({
              ...prev,
              name: finalName,
            }));
            showToast("success", "角色卡读取成�?);
          } catch (err) {
            showToast("error", "JSON 解析失败: " + err.message);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // 1. 获取所有唯一的分组名
  const getGroups = (list) => {
    const groups = new Set(list.map((i) => i.group || "自定义表�?));
    return Array.from(groups);
  };

  // 2. 移动世界书条目到新分�?
  const moveWorldBookEntry = async (id, newGroup) => {
    let finalGroup = newGroup;
    if (newGroup === "NEW_GROUP_TRIGGER") {
      const name = await customPrompt("请输入新分组名称:", "", "新建分组");
      if (!name) return;
      finalGroup = name;
    }

    setWorldBook((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, group: newGroup } : entry,
      ),
    );
  };

  // 重命名世界书分组
  const renameWorldBookGroup = async (oldName) => {
    const newName = await customPrompt("重命名分�?", oldName);
    if (!newName || newName.trim() === "" || newName === oldName) return;

    setWorldBook((prev) =>
      prev.map((entry) =>
        entry.group === oldName ? { ...entry, group: newName } : entry,
      ),
    );
  };

  // [新增] 删除世界书分�?(支持自定义弹�?
  const deleteWorldBookGroup = async (groupName) => {
    if (
      await customConfirm(
        `确定删除分组 "${groupName}" 下的所有条目吗？`,
        "删除分组",
      )
    ) {
      setWorldBook((prev) => prev.filter((w) => w.group !== groupName));
      showToast("success", "分组已删�?);
    }
  };

  const addStickerGroup = async () => {
    const name = await customPrompt("请输入新表情包库名称:", "", "新建�?);
    if (!name || name.trim() === "") return;

    // 检查是否已存在
    const exists = charStickers.some((s) => s.group === name);
    if (exists) {
      showToast("error", "该分组已存在");
      return;
    }

    setCharStickers((prev) => [
      ...prev,
      // 添加一个占位符，确保分组能显示出来
      {
        id: `placeholder_${Date.now()}`,
        group: name,
        url: "",
        isPlaceholder: true,
        enabled: true,
      },
    ]);
  };

  // [新增] 删除表情包库
  const deleteStickerGroup = async (groupName) => {
    if (
      await customConfirm(
        `确定删除�?"${groupName}" 及其中所有表情包吗？`,
        "删除表情包库",
      )
    ) {
      setCharStickers((prev) => prev.filter((s) => s.group !== groupName));
    }
  };

  // [新增] 重命名表情包�?
  const renameStickerGroup = async (oldName) => {
    const newName = await customPrompt("重命名表情包�?", oldName);
    if (!newName || newName.trim() === "" || newName === oldName) return;

    setCharStickers((prev) =>
      prev.map((s) => (s.group === oldName ? { ...s, group: newName } : s)),
    );
  };

  // [修改] 切换分组开�?(逻辑保持不变)
  const toggleStickerGroup = (groupName, isEnabled) => {
    setCharStickers((prev) =>
      prev.map((s) =>
        (s.group || "自定义表�?) === groupName
          ? { ...s, enabled: isEnabled }
          : s,
      ),
    );
  };

  const handleWorldBookUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          let newEntries = [];

          if (json.entries) {
            if (Array.isArray(json.entries)) {
              newEntries = json.entries;
            } else {
              newEntries = Object.values(json.entries);
            }
          } else if (Array.isArray(json)) {
            newEntries = json;
          } else {
            newEntries = Object.values(json).filter(
              (item) => typeof item === "object",
            );
          }

          const baseTime = Date.now(); // 提取时间戳到循环�?
          const defaultGroupName =
            file.name.replace(".json", "") ||
            `导入-${new Date().toLocaleDateString()}`;

          const formattedEntries = newEntries
            .map((entry, index) => {
              let name = entry.comment || entry.name || "未命名词�?;

              if (!name || name === "未命名词�?) {
                const k = entry.key || entry.keys;
                if (Array.isArray(k) && k.length > 0) name = k[0];
                else if (typeof k === "string") name = k;
              }

              const isEnabled =
                entry.disable !== undefined
                  ? !entry.disable
                  : entry.enabled !== false;

              return {
                id: `wb_${baseTime}_${index}_${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,

                name: name,
                content: entry.content || "",
                enabled: isEnabled,
                group: entry.group || defaultGroupName,
              };
            })
            .filter((e) => e.content);

          if (formattedEntries.length > 0) {
            setWorldBook((prev) => [...prev, ...formattedEntries]);
            showToast(
              "success",
              `已导�?${formattedEntries.length} 条至 "${defaultGroupName}"`,
            );
          } else {
            showToast("error", "未找到有效的世界书词�?);
          }
        } catch (err) {
          console.error(err);
          showToast("error", "JSON 解析失败");
        }
      };
      reader.readAsText(file);
    }
    event.target.value = "";
  };

  const handleAvatarUpload = async (event, setter) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file);
        setter(compressedBase64);
        showToast("success", "头像读取成功");
      } catch (err) {
        console.error("Image Processing Error", err);
        showToast("error", "图片处理失败，请重试");
      }
    }
  };

  const handleStickerUpload = async (
    event,
    type = "char",
    targetGroup = null,
  ) => {
    const file = event.target.files[0];
    if (file) {
      // 替换 window.prompt
      const desc = await customPrompt(
        "请输入表情包的描�?(AI将根据描述决定何时发�?:",
        "开�?,
        "添加表情�?,
      );
      if (!desc) {
        // 处理取消 (null)
        event.target.value = "";
        return;
      }

      try {
        // 2. 压缩图片
        const compressedBase64 = await compressImage(file);

        // 3. [关键修改] 确定分组：如果有传入 targetGroup 就用它，否则用默认�?
        const finalGroup = targetGroup || "自定义表�?;

        const newSticker = {
          id: `s${Date.now()}`,
          url: compressedBase64,
          desc: desc,
          group: finalGroup, // [使用确定的分组]
          enabled: true,
        };

        // 4. 保存数据
        if (type === "char") {
          setCharStickers((prev) => [...prev, newSticker]);
        } else {
          setUserStickers((prev) => [...prev, newSticker]);
        }

        showToast("success", "表情包添加成�?);
      } catch (err) {
        console.error("表情包上传失败详�?", err);
        showToast("error", "表情包处理失�? " + (err.message || "未知错误"));
      }
    }
    // 5. 重置 input value 允许重复上传同一文件
    event.target.value = "";
  };

  // 保存表情包修�?
  const handleSaveSticker = (id, newDesc) => {
    if (editingSticker?.source === "user") {
      setUserStickers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, desc: newDesc } : s)),
      );
    } else {
      setCharStickers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, desc: newDesc } : s)),
      );
    }
    setEditingSticker(null);
    showToast("success", "修改已保�?);
  };

  // 删除表情�?
  const handleDeleteSticker = async (id) => {
    if (await customConfirm("确定删除这个表情包吗�?)) {
      if (editingSticker?.source === "user") {
        setUserStickers((prev) => prev.filter((s) => s.id !== id));
      } else {
        setCharStickers((prev) => prev.filter((s) => s.id !== id));
      }
      setEditingSticker(null);
    }
  };

  // ---------- Backup & Restore ----------\\
  const BACKUP_CATEGORIES = {
    chat: {
      label: "聊天记录",
      keys: ["echoes_chat_history", "echoes_status_history"],
    },
    persona: {
      label: "角色数据",
      keys: ["echoes_persona", "echoes_raw_json", "echoes_char_avatar", "echoes_char_facts", "echoes_shared_events"],
    },
    worldbook: {
      label: "世界�?,
      keys: ["echoes_worldbook"],
    },
    memory: {
      label: "长期记忆",
      keys: ["echoes_memory_config", "echoes_long_memory"],
    },
    stickers: {
      label: "表情�?,
      keys: ["echoes_char_stickers", "echoes_user_stickers", "echoes_stickers_enabled"],
    },
    config: {
      label: "偏好设置",
      keys: [
        "echoes_custom_rules", "echoes_chat_style", "echoes_context_limit",
        "echoes_custom_font_name", "echoes_custom_icons", "echoes_user_name",
        "echoes_user_persona", "echoes_user_avatar", "echoes_interaction_mode",
        "echoes_tracker_config", "echoes_user_facts",
      ],
    },
    social: {
      label: "社交 & 生活",
      keys: [
        "echoes_forum_data", "echoes_forum_settings",
        "echoes_diaries", "echoes_receipts", "echoes_music", "echoes_browser",
      ],
    },
    smartwatch: {
      label: "智能�?,
      keys: ["echoes_sw_locations", "echoes_sw_logs"],
    },
  };

  // 统计分类数据预览
  const getCategoryPreview = (data, catId) => {
    const cat = BACKUP_CATEGORIES[catId];
    if (!cat) return "�?;
    const firstKey = cat.keys[0];
    const val = data[firstKey];
    if (val === undefined) return "�?;
    if (catId === "chat") return val?.length ? `${val.length} 条消息` : "�?;
    if (catId === "persona") return val?.name || "�?;
    if (catId === "worldbook") return val?.length ? `${val.length} 条目` : "�?;
    if (catId === "memory") {
      const mem = data["echoes_long_memory"];
      return mem ? `${mem.length} 字符` : "�?;
    }
    if (catId === "stickers") {
      const total = (data["echoes_char_stickers"]?.length || 0) + (data["echoes_user_stickers"]?.length || 0);
      return total > 0 ? `${total} 组` : "�?;
    }
    if (catId === "config") {
      const rules = data["echoes_custom_rules"];
      const style = data["echoes_chat_style"];
      return rules ? `${style || "default"}` : style || "�?;
    }
    if (catId === "social") {
      const forum = data["echoes_forum_data"];
      const diaries = data["echoes_diaries"];
      const parts = [];
      if (forum?.posts?.length) parts.push(`${forum.posts.length} 帖子`);
      if (diaries?.length) parts.push(`${diaries.length} 日记`);
      return parts.length ? parts.join(" · ") : "�?;
    }
    if (catId === "smartwatch") return val?.length ? `${val.length} 地点` : "�?;
    return "�?;
  };

  const exportFullBackup = () => {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("echoes_")) {
        try { allData[key] = JSON.parse(localStorage.getItem(key)); }
        catch { allData[key] = localStorage.getItem(key); }
      }
    }
    // 所有分类都显示，有数据的默认勾�?
    const categories = Object.keys(BACKUP_CATEGORIES).map((id) => ({
      id,
      selected: BACKUP_CATEGORIES[id].keys.some((k) => allData[k] !== undefined && allData[k] !== null),
    }));
    setExportData({ allData, categories });
    setShowExportModal(true);
  };

  const doExport = () => {
    if (!exportData) return;
    const { allData, categories } = exportData;
    const selectedIds = new Set(categories.filter((c) => c.selected).map((c) => c.id));
    const keysToExport = new Set();
    for (const [id, cat] of Object.entries(BACKUP_CATEGORIES)) {
      if (selectedIds.has(id)) for (const key of cat.keys) keysToExport.add(key);
    }
    const out = {};
    for (const key of keysToExport) {
      if (allData[key] !== undefined) {
        let val = allData[key];
        // 安全处理
        if (key === "echoes_api_config") val = { ...val, key: "" };
        if (key === "echoes_chat_history" && Array.isArray(val)) {
          val = val.map((msg) => { if (msg.imageData) { const { imageData, ...rest } = msg; return rest; } return msg; });
        }
        out[key] = val;
      }
    }
    delete out["echoes_custom_font_url"];
    const blob = new Blob([JSON.stringify({ version: 2, exportDate: new Date().toLocaleString(), data: out }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Echoes_FullBackup_${persona?.name || "Echoes"}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
    setExportData(null);
    showToast("success", "已导出所选数�?);
  };

  const importFullBackup = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = "";
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const raw = JSON.parse(e.target.result);
        const allData = raw.data || raw;
        const categories = Object.keys(BACKUP_CATEGORIES)
          .filter((id) => BACKUP_CATEGORIES[id].keys.some((k) => allData[k] !== undefined))
          .map((id) => ({ id, selected: true }));
        if (categories.length === 0) { showToast("error", "备份文件中没有可识别的数�?); return; }
        setImportData({ allData, categories });
        setShowImportModal(true);
      } catch (err) { console.error(err); showToast("error", "文件解析失败: " + err.message); }
    };
    reader.readAsText(file);
  };

  const doImport = () => {
    if (!importData) return;
    const { allData, categories } = importData;
    const selectedIds = new Set(categories.filter((c) => c.selected).map((c) => c.id));
    const keysToWrite = new Set();
    for (const [id, cat] of Object.entries(BACKUP_CATEGORIES)) {
      if (selectedIds.has(id)) for (const key of cat.keys) keysToWrite.add(key);
    }
    let restored = 0;
    for (const key of keysToWrite) {
      if (allData[key] !== undefined) { localStorage.setItem(key, JSON.stringify(allData[key])); restored++; }
    }
    setShowImportModal(false);
    setImportData(null);
    showToast("success", `已恢�?${restored} 个数据项，请刷新页面使设置生效`);
  };

  // 兼容旧接�?
  const exportChatData = () => exportFullBackup();
  const importChatData = (event) => importFullBackup(event);

  // ── 统一生成前置检查（API > 角色设定）──
  const checkCanGenerate = () => {
    if (!apiConfig.baseUrl || !apiConfig.key) {
      showToast("error", "未配�?API 信息，请在设置中输入 Base URL �?Key");
      return false;
    }
    if (!inputKey) {
      showToast("error", "角色设定为空，请先完善设�?);
      return false;
    }
    return true;
  };

  const fetchModelsList = async () => {
    if (!apiConfig.baseUrl || !apiConfig.key) {
      showToast("error", "请填�?API 地址和密�?);
      return;
    }
    setIsFetchingModels(true);
    try {
      let url = apiConfig.baseUrl.replace(/\/$/, "");
      if (url.endsWith("/chat/completions"))
        url = url.replace("/chat/completions", "");
      let tryUrl = url.endsWith("/models") ? url : `${url}/models`;

      const res = await fetch(tryUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${apiConfig.key}` },
      });
      if (!res.ok) {
        // /models 端点不存在（�?Minimax），降级�?chat completion 测试
        if (res.status === 404) {
          const chatRes = await fetch(`${url}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiConfig.key}`,
            },
            body: JSON.stringify({
              model: "",
              messages: [{ role: "user", content: "hi" }],
              max_tokens: 1,
            }),
          });
          if (chatRes.ok) {
            setAvailableModels([]);
            showToast("success", "连接成功 (�?API 不支持模型列表，请手动输入模型名)");
            setIsFetchingModels(false);
            return;
          }
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();

      if (data.data && Array.isArray(data.data)) {
        const ids = data.data.map((m) => m.id);
        setAvailableModels(ids);
        showToast("success", `已获�?${ids.length} 个模型`);

        if (!ids.includes(apiConfig.model)) {
          const newDefault = ids[0] || "";
          setApiConfig((prev) => ({ ...prev, model: newDefault }));
          if (newDefault) showToast("info", `模型已自动切换为: ${newDefault}`);
        }
      } else {
        showToast("success", "连接成功 (未能解析模型列表)");
      }
    } catch (e) {
      console.error("Fetch Models Failed", e);
      showToast("error", "拉取模型失败，请检查配�?);
    } finally {
      setIsFetchingModels(false);
    }
  };

  const testConnection = async () => {
    if (!apiConfig.baseUrl || !apiConfig.key) {
      showToast("error", "请填写完整配�?);
      return;
    }
    setConnectionStatus("testing");
    try {
      let url = apiConfig.baseUrl.replace(/\/$/, "");

      let tryUrl = url;
      if (url.endsWith("/chat/completions")) {
        tryUrl = url.replace("/chat/completions", "/models");
      } else if (!url.endsWith("/models")) {
        tryUrl = `${url}/models`;
      }

      let res = await fetch(tryUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${apiConfig.key}` },
      });

      // /models 端点不存在（�?Minimax），降级�?chat completion 测试
      if (res.status === 404) {
        const modelToTest = apiConfig.model || "gpt-4o";
        res = await fetch(`${url}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiConfig.key}`,
          },
          body: JSON.stringify({
            model: modelToTest,
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 1,
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          let errMsg = `API Error (${res.status})`;
          try {
            const errJson = JSON.parse(errText);
            if (errJson.error && errJson.error.message) errMsg += `: ${errJson.error.message}`;
          } catch (_) {}
          throw new Error(errMsg);
        }
      } else if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setConnectionStatus("success");
      showToast("success", "连接成功，配置已保存");
      setTimeout(() => setShowLockSettings(false), 1000);
    } catch (e) {
      console.error("Connection Test Failed", e);
      setConnectionStatus("error");
      showToast("error", `连接失败: ${e.message}`);
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    // Force reset all states
    setLoading({});
    setMessageQueue([]);
    setIsTyping(false);
    showToast("info", "已取消生�?);
  };

  // Generator Actions
  const runGenerator = async (type, setter, promptTemplate, p = persona) => {
    if (!p) return;
    setLoading((prev) => ({ ...prev, [type]: true }));

    // Setup AbortController
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Fix: Use replaceAll to ensure all instances are replaced
    // Fallback logic: If userName is empty, use "�? (natural in Chinese) or "User"
    const effectiveUserName = userName || "�?;

    const cleanCharDesc = replacePlaceholders(
      inputKey,
      p.name,
      effectiveUserName,
    );
    const cleanWorldInfo = replacePlaceholders(
      getWorldInfoString(worldBook),
      p.name,
      effectiveUserName,
    );

    let finalSystemPrompt = prompts.system
      .replaceAll("{{NAME}}", p.name)
      .replaceAll(
        "{{CHAR_DESCRIPTION}}",
        cleanCharDesc + "\n" + charTrackerContext,
      )
      .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{CUSTOM_RULES}}", customRules)
      .replaceAll("{{WORLD_INFO}}", cleanWorldInfo);

    const prompt = promptTemplate
      .replaceAll("{{NAME}}", p.name)
      .replaceAll("{{TIME}}", getCurrentTimeObj().toLocaleString())
      .replaceAll("{{HISTORY}}", getContextString(chatHistory, effectiveUserName, p, null, contextLimit))
      .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
      .replaceAll("{{USER_NAME}}", effectiveUserName);

    try {
      const data = await generateContent(
        { prompt, systemInstruction: getFinalSystemPrompt() },
        apiConfig,
        (err) => showToast("error", err),
        abortController.signal,
      );

      if (data) {
        if (type === "browser") {
          const now = Date.now();
          const addTimestamps = (items) =>
            (items || []).map((item, i) => {
              const frac = items.length > 1 ? i / (items.length - 1) : 1;
              const pastMs = (1 + Math.random() * 4) * 86400000;
              const id = now - pastMs + frac * pastMs;
              return { ...item, id };
            });
          const historyItem = {
            date: getCurrentTimeObj().toLocaleDateString(),
            normal: addTimestamps(data.normal),
            incognito: addTimestamps(data.incognito),
          };
          setter((prev) => [historyItem, ...prev]);
        } else if (type === "receipt") {
          const now = Date.now();
          const pastMs = (1 + Math.random() * 4) * 86400000;
          const id = now - pastMs + Math.random() * pastMs;
          setter((prev) => [{ ...data, createdAt: id }, ...prev]);
        } else {
          setter((prev) => [data, ...prev]);
        }
        return true;
      }
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
      abortControllerRef.current = null;
    }
  };

  const generateMusic = (p) =>
    runGenerator("music", setMusic, prompts.music, p);
  const generateDiary = () => runGenerator("diary", setDiaries, prompts.diary);
  const generateReceipt = () =>
    runGenerator("receipt", setReceipts, prompts.receipt);
  const generateBrowser = () =>
    runGenerator("browser", setBrowserHistory, prompts.browser);

  // 事件触发分析：分析聊天历史，决定触发哪些应用更新
  const triggerAppEvents = async () => {
    if (!persona) return;
    const charName = persona.name || "Character";
    const effectiveUserName = userName || "�?;
    const historyText = getContextString(chatHistory, effectiveUserName, persona, null, 10);

    const prompt = prompts.trigger_events
      .replaceAll("{{NAME}}", charName)
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{HISTORY}}", historyText);

    try {
      const abortController = new AbortController();
      const data = await generateContent(
        { prompt, systemInstruction: getFinalSystemPrompt() },
        apiConfig,
        (err) => {},
        abortController.signal,
      );

      if (data) {
        // 在异步调用前保存所有需要的值，避免闭包问题
        const savedPersonaName = persona?.name || "角色";
        const savedCharName = charName;
        const savedUserName = effectiveUserName;
        const savedSmartWatchLocations = [...smartWatchLocations];
        const savedSmartWatchLogs = [...smartWatchLogs];
        const savedWorldBook = worldBook;
        const savedCharTrackerContext = charTrackerContext;
        const savedUserPersona = userPersona;
        const savedTrackerContext = trackerContext;
        const savedCustomRules = customRules;
        const savedInputKey = inputKey;

        // 位置移动触发 �?更新智能家，生成完成后弹�?
        if (data.triggerLocation && savedSmartWatchLocations.length > 0) {
          setTimeout(async () => {
            setLoading((prev) => ({ ...prev, sw_update: true }));
            const prompt = prompts.smartwatch_update
              .replaceAll("{{NAME}}", savedPersonaName)
              .replaceAll("{{TIME}}", getCurrentTimeObj().toLocaleString())
              .replaceAll("{{HISTORY}}", getContextString(chatHistory, savedUserName, null, null, 5))
              .replaceAll("{{LOCATIONS_LIST}}", savedSmartWatchLocations.map((l) => `ID: ${l.id}, Name: ${l.name}`).join("\n"))
              .replaceAll("{{LAST_LOG}}", savedSmartWatchLogs.length > 0 ? JSON.stringify(savedSmartWatchLogs[0]) : "None");
            const systemPrompt = prompts.system
              .replaceAll("{{NAME}}", savedPersonaName)
              .replaceAll("{{CHAR_DESCRIPTION}}", savedInputKey + "\n" + savedCharTrackerContext)
              .replaceAll("{{USER_PERSONA}}", savedUserPersona + "\n" + savedTrackerContext)
              .replaceAll("{{USER_NAME}}", savedUserName)
              .replaceAll("{{CUSTOM_RULES}}", savedCustomRules)
              .replaceAll("{{WORLD_INFO}}", getWorldInfoString(savedWorldBook));
            try {
              const abortCtrl = new AbortController();
              await generateContent({ prompt, systemInstruction: systemPrompt }, apiConfig, (err) => {}, abortCtrl.signal);
              if (typeof showToast === "function") showToast("info", `${savedCharName}的实时位置更新了`);
            } finally {
              setLoading((prev) => ({ ...prev, sw_update: false }));
            }
          }, 1000);
        }
        // 重要事件触发 �?写日记，生成完成后弹�?
        if (data.triggerDiary) {
          setTimeout(async () => {
            const ok = await runGenerator("diary", setDiaries, prompts.diary);
            if (ok && typeof showToast === "function") showToast("info", `${savedCharName}写了一篇日记`);
          }, 2000);
        }
        // 浏览器搜索触�?�?更新浏览器历史，生成完成后弹�?
        if (data.triggerBrowser) {
          setTimeout(async () => {
            const ok = await runGenerator("browser", setBrowserHistory, prompts.browser);
            if (ok && typeof showToast === "function") showToast("info", `${savedCharName}的浏览记录更新了`);
          }, 3000);
        }
        // 购物触发 �?更新账单，生成完成后弹窗
        if (data.triggerReceipt) {
          setTimeout(async () => {
            const ok = await runGenerator("receipt", setReceipts, prompts.receipt);
            if (ok && typeof showToast === "function") showToast("info", `${savedCharName}的账单更新了`);
          }, 4000);
        }
      }
    } catch (e) {
      console.error("triggerAppEvents error:", e);
    }
  };

  const unlockDeviceDirect = () => {
    const localPersona = {
      name: "Char",
      enName: null,
      title: "Connected Soul",
      bio: "手动模式，所有设定需手动填入�?,
      mbti: null,
      tags: [],
    };
    setPersona(localPersona);
    setIsLocked(false);

    // 离线智能家检�?
    if (smartWatchLocations.length > 0 && realTimeEnabled && lastInteractionTimeLoaded) {
      const gapMs = Date.now() - lastInteractionTime;
      if (gapMs > 2 * 3600000) {
        setLastInteractionTime(Date.now());
        setTimeout(() => {
          generateOfflineSmartWatchUpdates(gapMs);
        }, 500);
      }
    }
  };

  const unlockDevice = async () => {
    if (!inputKey) return;
    // 不再检�?apiConfig，也不设�?isConnecting 状态，实现秒开
    try {
      // 1. 本地简易解�?(只提取名�?
      let extractedName = "Unknown";
      // 匹配多种格式: Name: xxx / Name：xxx / 名字：xxx / 姓名：xxx
      const namePatterns = [
        /^name:\s*(.+?)(\n|$)/im,
        /^name：\s*(.+?)(\n|$)/im,
        /^名字：\s*(.+?)(\n|$)/im,
        /^姓名：\s*(.+?)(\n|$)/im,
      ];
      let nameMatch = null;
      for (const p of namePatterns) {
        nameMatch = inputKey.match(p);
        if (nameMatch) break;
      }
      if (nameMatch) {
        extractedName = nameMatch[1].trim();
      } else {
        // 如果没匹配到，尝试用 JSON 解析看看原本�?name 字段
        try {
          const temp = JSON.parse(inputKey);
          if (temp.name) extractedName = temp.name;
        } catch (e) {}
      }

      // 2. 构造基础 Persona，去除无效字�?
      const localPersona = {
        name: extractedName,
        enName: null, // 设为 null，UI层会判断不显�?
        title: "Connected Soul",
        bio: "档案已加载。详细设定将直接用于对话生成�?,
        mbti: null, // 设为 null
        tags: [], // 空数�?
      };

      setPersona(localPersona);
      setIsLocked(false);
      showToast("success", "终端已解�?);

      // 离线智能家检测：三个条件都满足时自动生成角色离线生活轨迹
      if (smartWatchLocations.length > 0 && realTimeEnabled && lastInteractionTimeLoaded) {
        const gapMs = Date.now() - lastInteractionTime;
        const twoHours = 2 * 3600000;
        if (gapMs > twoHours) {
          setLastInteractionTime(Date.now()); // 重置，避免重复触�?
          setTimeout(() => {
            generateOfflineSmartWatchUpdates(gapMs);
          }, 500);
        }
      }

      // 注意：已移除自动生成音乐的逻辑
    } catch (e) {
      console.error("Unlock Error", e);
      showToast("error", "解析失败，请检查文�?);
    }
  };

  const handleLogout = async () => {
    // 加上 async
    if (
      !(await customConfirm(
        // 替换 window.confirm
        "确定要登出吗？这将彻底清除当前角色的所有本地数据，无法恢复�?,
        "清除数据",
      ))
    ) {
      return;
    }

    // Clear specific EchoesOS keys
    const keysToRemove = [
      "echoes_persona",
      "echoes_raw_json",
      "echoes_worldbook",
      "echoes_chat_history",
      "echoes_status_history",
      "echoes_diaries",
      "echoes_receipts",
      "echoes_music",
      "echoes_browser",
      "echoes_char_avatar",
      "echoes_user_avatar",
      "echoes_memory_config",
      "echoes_long_memory",
      "echoes_msg_count",
      "echoes_sw_locations",
      "echoes_sw_logs",
      "echoes_forum_data",
      "echoes_forum_settings",
      "echoes_interaction_mode",
      "echoes_user_facts",
      "echoes_char_facts",
      "echoes_shared_events",
      "echoes_tracker_config",
    ];
    keysToRemove.forEach((k) => localStorage.removeItem(k));

    // Reset State
    setPersona(null);
    setInputKey("");
    setWorldBook([]);
    setChatHistory([]);
    setStatusHistory([]);
    setDiaries([]);
    setReceipts([]);
    setMusic([]);
    setBrowserHistory([]);
    setAvatar(null);
    setUserAvatar(null);
    setSmartWatchLocations([]);
    setSmartWatchLogs([]);
    setForumData({ name: "本地生活�?, posts: [], isInitialized: false });
    setForumSettings({
      userNick: "User本U",
      smurfNick: "不是小号",
      charNick: "匿名用户",
    });
    setUserFacts([]);
    setCharFacts([]);
    setSharedEvents([]);
    setTrackerConfig({ facts: true, events: true });

    // Lock
    setIsLocked(true);
    setActiveApp(null);
    showToast("success", "已重置角色数�?);
  };

  // 打开图片选择弹窗
  const handleOpenImageModal = () => {
    setShowMediaMenu(false);
    setShowImageModal(true);
  };

  // 上传真实图片
  const handleSendRealImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);

      // 同时�?IndexedDB（供 AI 调用）和消息对象（供渲染�?
      const imageKey = `img_${Date.now()}`;
      await echoesDB.setItem(imageKey, compressedBase64);

      // 发送图片消息，imageData 直接存在消息上方便渲�?
      handleUserSend("[图片]", "image", null, {
        imageKey,
        imageData: compressedBase64,
      });
      setShowImageModal(false);
    } catch (err) {
      console.error("图片处理失败:", err);
      showToast("error", "图片处理失败，请重试");
    }

    // 重置 input 允许重复选同一文件
    event.target.value = "";
  };

  // 发送假图片（原有功能）
  const handleSendFakeImage = async () => {
    const desc = await customPrompt(
      "请输入图片描述：",
      "",
      "发送图�?,
    );

    if (!desc || desc.trim() === "") return;

    const msgContent = `${IMG_TAG_START}${desc}`;
    handleUserSend(msgContent, "text");
    setShowImageModal(false);
  };

  // 统一生成系统指令的辅助函�?
  const getFinalSystemPrompt = () => {
    if (!persona) return "";
    const effectiveUserName = userName || "�?;

    // 1. 处理描述和世界书中的 {{user}}/{{char}} 替换
    const cleanCharDesc = replacePlaceholders(
      inputKey,
      persona.name,
      effectiveUserName,
    );
    const cleanWorldInfo = replacePlaceholders(
      getWorldInfoString(worldBook),
      persona.name,
      effectiveUserName,
    );

    // 2. 替换系统模板中的所有大项占位符
    return prompts.system
      .replaceAll("{{NAME}}", persona.name)
      .replaceAll(
        "{{CHAR_DESCRIPTION}}",
        cleanCharDesc + "\n" + charTrackerContext,
      )
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
      .replaceAll("{{CUSTOM_RULES}}", customRules)
      .replaceAll("{{WORLD_INFO}}", cleanWorldInfo)
      .replaceAll("{{LONG_MEMORY}}", longMemory || "暂无长期记忆�?);
  };

  const [isGhostwriting, setIsGhostwriting] = useState(false);

  const handleGhostwrite = async () => {
    if (isGhostwriting) return;

    if (!apiConfig?.key) {
      alert("请先在设置中配置 API Key");
      return;
    }
    if (!persona) return;

    setIsGhostwriting(true);

    try {
      const effectiveUserName = userName || "User";
      const charName = persona.name;
      const cleanCharDesc = replacePlaceholders(
        inputKey,
        charName,
        effectiveUserName,
      );
      const cleanWorldInfo = replacePlaceholders(
        getWorldInfoString(worldBook),
        charName,
        effectiveUserName,
      );

      const historyText = getRecentTurns(chatHistory, contextLimit)
        .map((m) => {
          const senderName = m.sender === "me" ? effectiveUserName : charName;
          let content = m.text || "";

          // 处理语音
          if (m.isVoice) {
            content = `(Sent a Voice Message): ${m.text.replace(
              "[语音消息] ",
              "",
            )}`;
          }
          // 处理表情�?
          if (m.sticker && (!content || !content.trim())) {
            content = `[Sent a Sticker: ${m.sticker.desc}]`;
          }
          // 处理转发
          if (m.isForward && m.forwardData) {
            const fwd = m.forwardData;
            const summary = fwd.content || fwd.query || fwd.action || JSON.stringify(fwd).slice(0, 50);
            const typeLabel = fwd.type === "post" ? "Post" : fwd.type === "comment" ? "Comment" : fwd.type || "Item";
            content += ` [Forwarded ${typeLabel}: "${String(summary).slice(0, 50)}..."]`;
          }
          return `${senderName}: ${content}`;
        })
        .join("\n");

      const modeInstruction =
        interactionMode === "online"
          ? `[Interaction Mode: ONLINE CHAT / MESSAGING]
         - Context: You are chatting with ${charName} via a smartphone.`
          : `[Interaction Mode: REALITY / ACTION RP]
         - Context: This scene takes place in the physical world (Real Life).`;

      const systemInstruction = `
You are an advanced creative writing AI.
You are playing the role of ${effectiveUserName}.

[Target Character (Interaction Partner)]
Name: ${charName}
Description:
${cleanCharDesc}

[Your Role (The User)]
Name: ${effectiveUserName}
Persona: ${userPersona || "A special person to " + charName}

[World Info]
${cleanWorldInfo}
[Long-term Memory]
${longMemory || "None."}

[Literary Style Requirements] Literary Style: Warm, Plain, and Grounded.
1. Narrative Voice: Adopt a calm, leisurely, and kind observer's perspective. Tell the story slowly with warmth, avoiding dramatic or judgmental tones. Maintain a third-person perspective for {{char}} (referring to them by Name/He/She), and a first-person perspective for {{user}} (addressing {{user}} as 'I' or 'me').
2. Diction ("白描/Bai Miao"): Use simple, unadorned spoken language. Avoid flowery adjectives. Rely on precise verbs and nouns to create a clean, "fresh water" texture.
3. Atmosphere: Focus on the "smoke and fire" of daily life. Deeply engage the senses—describe the specific smell of food, the texture of objects, and ambient sounds to make the scene tangible.
4. Emotional Restraint: Do NOT state emotions directly. Reveal deep feelings solely through subtle physical actions, micro-expressions, and environmental details. Keep the emotional temperature constant and gentle.
5. Rhythm: Mimic the bouncy, elastic rhythm of natural speech. Use short, crisp sentences mixed with relaxed narration.
6. Output Structure: This must be a unified, cohesive narrative stream. Output the entire response as **ONE SINGLE, CONTINUOUS** message (IMPORTANT). At least 300 Chinese characters.`;

      let userTask = "";

      // 动态构�?Context 部分
      const contextSection = `
Current Date: ${getCurrentTimeObj().toLocaleString()}
${modeInstruction}

[Conversation History]
${historyText}
`;

      if (chatInput.trim()) {
        // [扩写模式]
        userTask = `
${contextSection}

[User's Draft Input]
"${chatInput}"

Task: Rewrite and expand the User's draft based on the Context History.
Requirements:
- Strictly follow the "Literary Style" defined in system instruction.
- Write from the perspective of {{user}} ('I'/'me').
- Seamlessly continue the flow of the conversation.
- Output ONLY the rewritten text.
`;
      } else {
        // [生成模式]
        userTask = `
${contextSection}

User Input: (Empty)

Task: Generate a natural response or action in Simplified Chinese for {{user}} based on the Context History.
Requirements:
- Strictly follow the "Literary Style" defined in system instruction.
- Write from the perspective of {{user}} ('I'/'me').
- Output ONLY the generated text.
`;
      }

      const result = await generateContent(
        {
          prompt: userTask,
          systemInstruction: systemInstruction,
          isJson: false,
        },
        apiConfig,
        (err) => alert(`代写出错: ${err}`),
      );

      // --- 7. 填入结果 ---
      if (result) {
        setChatInput(result.trim());
        // 自动调整高度
        setTimeout(() => {
          const el = document.getElementById("chat-input");
          if (el) {
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 120) + "px";
          }
        }, 10);
      }
    } catch (error) {
      console.error("Ghostwrite error:", error);
    } finally {
      setIsGhostwriting(false);
    }
  };

  const handleUserSend = (
    content,
    type = "text",
    sticker = null,
    extraData = null,
  ) => {
    let displayText = "";
    const stickerId = sticker?.id;

    if (type === "voice") {
      displayText = `[语音消息] ${content}`;
    } else if (type === "sticker") {
      displayText = `[表情包] ${sticker?.desc || "图片"}`;
    } else if (type === "transfer") {
      // [新增] 文本回退显示包含备注
      const note = extraData?.note ? ` (${extraData.note})` : "";
      displayText = `[转账] ¥${content}${note}`;
    } else if (type === "location") {
      displayText = `[位置] ${extraData?.name || content}`;
    } else if (type === "dice") {
      displayText = `[骰子] 🎲 ${content}`;
    } else if (type === "image") {
      displayText = "[图片]";
    } else {
      displayText = content;
    }

    const newMsg = {
      sender: "me",
      text: displayText,
      isVoice: type === "voice",
      isImage: type === "image",
      imageKey: extraData?.imageKey || null, // IndexedDB 中的 key
      imageData: extraData?.imageData || null, // base64 供渲�?

      // [新增] 转账数据结构更新
      isTransfer: type === "transfer",
      transfer:
        type === "transfer"
          ? {
              amount: content,
              status: "pending",
              note: extraData?.note || "", // 存入备注
            }
          : null,

      isLocation: type === "location",
      location:
        type === "location"
          ? {
              name: extraData?.name || content,
              address: extraData?.address || "",
            }
          : null,

      isDice: type === "dice",
      dice: type === "dice" ? { result: parseInt(content) } : null,

      stickerId: stickerId,
      sticker: stickerId ? null : sticker,
      stickerSource: sticker ? "user" : null,
      time: formatTime(getCurrentTimeObj()),
      ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
    };

    // 跳过下一�?Time Gap Notice（刚开启真实时间感知时�?
    if (skipNextGapNoticeRef.current) {
      skipNextGapNoticeRef.current = false;
      lastUserSendTimeRef.current = Date.now();
      setLastInteractionTime(Date.now());
    }

    setChatHistory((prev) => [...prev, newMsg]);
    setChatInput("");
    lastUserSendTimeRef.current = Date.now();
    setLastInteractionTime(Date.now());
    setMsgCountSinceSummary((prev) => prev + 1);
    setShowUserStickerPanel(false);
  };

  // 2. 触发 AI 回复 (完整替换�?
  const triggerAIResponse = async (
    param1 = null, // 可以是重生成索引(number)，也可以是新消息内容(string)
    hint = "",
    overrideContext = null,
  ) => {
    if (!persona) return;

    // --- 1. 参数智能解析与消息预处理 ---
    const userContent = typeof param1 === "string" ? param1 : null;
    const regenIndex = typeof param1 === "number" ? param1 : null;

    let finalHint = hint;
    if (!finalHint && pendingHint) {
      finalHint = pendingHint;
      setPendingHint(null);
    }

    const backupHistory = [...chatHistory];
    let newHistory = [...chatHistory];

    // 如果是重生成，回滚历�?
    if (regenIndex !== null) {
      newHistory = chatHistory.slice(0, regenIndex);
    }
    // 如果是带内容触发（来自音乐等界面），先插入用户消�?
    else if (userContent) {
      const userMsg = {
        id: `msg_${Date.now()}_u`,
        sender: "me",
        text: userContent,
        time: formatTime(getCurrentTimeObj()),
        ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
      };
      newHistory = [...newHistory, userMsg];
    }

    // 立即同步状态，确保 UI 和后续逻辑基于最新的历史记录
    setChatHistory(newHistory);

    setLoading((prev) => ({ ...prev, chat: true }));
    setIsTyping(true);
    setRegenerateTarget(null);

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const effectiveUserName = userName || "�?;

    // --- 2. 格式化历史记�?(用于发送给 AI) ---
    // 支持多模态：带图片的消息�?image_url 格式，其余用文本
    const recentTurns = getRecentTurns(newHistory, contextLimit);
    let historyText = "";
    let historyMessages = null; // null 表示纯文本模�?
    const imageMsgs = [];

    const formatMsgText = (m) => {
      const senderName =
        m.sender === "me" ? userName || "User" : persona.name;
      let content = m.text || "";

      if (m.isVoice) {
        content = `(发送了一条语�?: ${m.text.replace("[语音消息] ", "")}`;
      }
      if (m.sticker) {
        if (!content || !content.trim()) {
          content = `[发送了表情�? ${m.sticker.desc}]`;
        }
      }
      if (m.isImage && m.imageKey) {
        content = "[发送了一张图片]";
      }
      if (m.isForward && m.forwardData) {
        const fwd = m.forwardData;
        const summary = fwd.content || fwd.query || fwd.action || JSON.stringify(fwd).slice(0, 50);
        const typeLabel = fwd.type === "post" ? "帖子" : fwd.type === "comment" ? "评论" : fwd.type || "内容";
        content += ` [转发�?{typeLabel}: "${String(summary).slice(0, 50)}..."]`;
      }
      return `${senderName}: ${content}`;
    };

    // 检查是否有真实图片消息
    const hasRealImages = recentTurns.some((m) => m.isImage && m.imageKey);

    if (hasRealImages) {
      // 多模态模式：构建 messages 数组
      historyMessages = [];
      for (const m of recentTurns) {
        const role = m.sender === "me" ? "user" : "assistant";
        const textContent = formatMsgText(m);

        if (m.isImage && m.imageKey) {
          // �?IndexedDB 读取图片
          try {
            const imageData = await echoesDB.getItem(m.imageKey);
            if (imageData) {
              historyMessages.push({
                role,
                content: [
                  { type: "text", text: textContent },
                  { type: "image_url", image_url: { url: imageData } },
                ],
              });
            } else {
              // 图片数据丢失，降级为纯文�?
              historyMessages.push({ role, content: textContent });
            }
          } catch (e) {
            console.error("读取图片失败:", e);
            historyMessages.push({ role, content: textContent });
          }
        } else {
          historyMessages.push({ role, content: textContent });
        }
      }
    } else {
      // 纯文本模�?
      historyText = recentTurns.map(formatMsgText).join("\n");
    }

    const currentUserName = userName || "User";
    const cleanCharDesc = replacePlaceholders(
      inputKey,
      persona.name,
      currentUserName,
    );
    const cleanWorldInfo = replacePlaceholders(
      getWorldInfoString(worldBook),
      persona.name,
      currentUserName,
    );

    // --- 3. 构建 Prompt ---
    // --- 3. 构建 Prompt ---
    const stickerInst = getStickerInstruction(charStickers, stickersEnabled);
    let styleInst = stylePrompts[chatStyle];

    const lastCharMsg = [...newHistory]
      .reverse()
      .find((m) => m.sender === "char");
    if (lastCharMsg && lastCharMsg.style && lastCharMsg.style !== chatStyle) {
      styleInst += `\n\n[FORMATTING OVERRIDE]: You have switched to a NEW writing style (${chatStyle}). IGNORE the formatting patterns of previous messages in history. You must strictly adhere to the new style defined above immediately.`;
    }

    // 核心修复：对 finalHint 进行占位符替换处�?
    // 构建独立�?Special Instruction（放�?Directives 之前，模型关注度更高�?
    let specialInst = "";
    if (finalHint) {
      const processedHint = replacePlaceholders(
        finalHint,
        persona.name,
        userName || "�?,
      );
      specialInst = `\n**[USER OVERRIDE - HIGHEST PRIORITY]**: ${processedHint}\nYou MUST follow this instruction above all other style rules.`;
    }

    // 时间流逝感知：用户超过 1 小时未回复（需要真实时间感知开启）
    const gapMs = Date.now() - lastUserSendTimeRef.current;
    if (realTimeEnabled && gapMs > 3600000) {
      const gapH = Math.floor(gapMs / 3600000);
      const gapM = Math.floor((gapMs % 3600000) / 60000);
      const gapDesc = gapH > 0 ? `${gapH} hours${gapM > 0 ? ` ${gapM} minutes` : ""}` : `${gapM} minutes`;
      specialInst += `\n[Time Gap Notice]: The user has been away for ${gapDesc}. Decide whether to continue the previous topic (if it was significant, emotional, or unfinished) or naturally transition to what you have been doing or a new topic. Do not explicitly mention the time gap unless it feels natural.`;
    }

    // 角色日常生活节奏：线上模�?60% 概率触发
    if (interactionMode === "online" && Math.random() < 0.6) {
      specialInst += `\n[Life Context]: Consider whether {{char}} is focusing on chatting with {{user}}, or they might be doing something right now based on their routine and personality (e.g. meal time, bedtime, school, work, hobbies, meeting people). If relevant, they might naturally mention it in conversation.`;
    }

    // 情绪支持：检测用户消息中的危�?情绪关键�?
    // * 作为通配符，匹配任意字符（含零字符）
    const crisisPatterns = [
      "什�?都做不好", "活着*什么意�?, "撑不下去�?, "没有�?听我说话", "活不下去","累了","好累",
      "�?受够�?, "崩溃�?, "完蛋�?, "不知�?怎么�?, "该怎么�?,
      "�?�?, "我是不是*有问�?, "是不�?我的问题", "这种�?都做不好",
      "为什�?就我", "他们*根本不理�?, "他们*根本不懂", "他们*都不�?,
      "没有�?能帮�?, "问你*也没�?, "和你*没用","有点*难受", "�?难受", "�?难受", "有点*难受", "�?难过", "�?难过", "心情*不好", "其实�?�?, "其实�?�?, 
      "算了*你不�?, "是不�?不该存在", "�?没用", "�?说话", "�?无语", "有点*无语", 
      "我感�?怎么�?, "我觉�?怎么�?, "我不�?怎么�?, "服了", "不行�?, "不开�?,
      "我好*�?, "�?担心", "�?害�?, "�?不好", "�?会不�?, "�?不行", "�?不舒�?,
    ];
    const lastUserMsg = userContent || (chatHistory.slice().reverse().find(m => m.sender === "me")?.content || "");
    const crisisMatched = lastUserMsg && crisisPatterns.some(pattern => {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*?"));
      return regex.test(lastUserMsg);
    });
    if (crisisMatched) {
      const emotionalSupportPrompt = `情感支持指令：如果{{USER_NAME}}表现出负面情绪（焦虑、愤怒、悲伤、绝望等），在保持{{NAME}}人设的前提下，遵循如下原则：**1.验证但不放大**：承认{{USER_NAME}}的感受是真实和合理的，但不要情绪化地回应。避�?天哪""太可怕了""我也觉得…�?这类共鸣式表达，不会过度共情到让{{USER_NAME}}停留在情绪中�?*2.赋予掌控�?*：通过提问让{{USER_NAME}}成为决策者�?你觉得最想先处理哪个部分�?"你之前有没有遇到过类似的情况�?让{{USER_NAME}}感到自己有能力应对。如{{USER_NAME}}没有表露出负面情绪，则忽略本指令。`;
      specialInst += `\n[Crisis Support Protocol]: ${emotionalSupportPrompt}`;
    }

    const rawForwardContext = overrideContext || forwardContext;
    // 核心修复：对 forwardContext 进行占位符替换处�?
    const finalForwardSection = rawForwardContext
      ? `\n**Forwarded Content Context**: ${replacePlaceholders(rawForwardContext, persona.name, userName || "�?)}`
      : "";

    const modeInstruction =
      interactionMode === "online"
        ? `[Interaction Mode: ONLINE CHAT / MESSAGING]
        - Context: {{NAME}} is chatting with {{USER_NAME}} via a smartphone/app.
        - Style: Use short texts, emojis, and internet slang.
        - Constraint: {{NAME}} and {{USER_NAME}} are PHYSICALLY SEPARATED. Do not describe touch or physical presence.`
        : `[Interaction Mode: REALITY / ACTION RP]
        - Context: This scene takes place in the physical world (Real Life). {{NAME}} and {{USER_NAME}} are in the same area/space/room. They interact only in person, without the use of smartphones or apps.
        - Style: Use descriptive, sensory narrative (Visuals, Sounds, Smells).`;

    // 多模态模式下，历史已通过 messages 数组传递，prompt 里不需要重�?
    const historyForPrompt = historyMessages ? "" : historyText;

    const prompt = prompts.chat
      .replaceAll("{{NAME}}", persona.name)
      .replaceAll("{{TIME}}", getCurrentTimeObj().toLocaleString())
      .replaceAll("{{HISTORY}}", historyForPrompt)
      .replaceAll(
        "{{LAST_MSG}}",
        historyMessages ? "" : (newHistory.length > 0
          ? JSON.stringify(newHistory[newHistory.length - 1])
          : "Start conversation..."),
      )
      .replaceAll("{{STYLE_INSTRUCTION}}", styleInst)
      .replaceAll("{{STICKER_INSTRUCTION}}", stickerInst)
      .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{MODE_INSTRUCTION}}", modeInstruction)
      .replaceAll("{{FORWARD_CONTEXT}}", finalForwardSection)
      .replaceAll("{{SPECIAL_INSTRUCTION}}", specialInst);

    const systemPrompt = prompts.system
      .replaceAll("{{NAME}}", persona.name)
      .replaceAll(
        "{{CHAR_DESCRIPTION}}",
        cleanCharDesc + "\n" + charTrackerContext,
      )
      .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{CUSTOM_RULES}}", customRules)
      .replaceAll("{{WORLD_INFO}}", cleanWorldInfo)
      .replaceAll(
        "{{LONG_MEMORY}}",
        longMemory || "No long-term memory established yet.",
      );

    // --- 4. 调用 API ---
    try {
      // 构建 messages 数组（多模态模式下带图片）
      let messagesParam = undefined;
      if (historyMessages) {
        // 多模态模式：将完�?prompt 拆成 system + 对话历史消息
        messagesParam = [
          ...historyMessages,
          // 最后一条用户消息包含完�?prompt（含角色设定等）
          // 这样模型既能看到图片，又能读到完整的上下文指�?
          { role: "user", content: prompt },
        ];
      }

      const responseData = await generateContent(
        {
          prompt,
          systemInstruction: systemPrompt,
          isJson: true,
          ...(messagesParam ? { messages: messagesParam } : {}),
        },
        apiConfig,
        (err) => showToast("error", err),
        abortController.signal,
      );

      if (responseData) {
        setForwardContext(null);

        // 处理转账逻辑
        if (responseData.transfer_action) {
          const lastUserTransferIndex = [...newHistory]
            .reverse()
            .findIndex(
              (m) =>
                m.sender === "me" &&
                m.isTransfer &&
                m.transfer?.status === "pending",
            );

          if (lastUserTransferIndex !== -1) {
            const realIndex = newHistory.length - 1 - lastUserTransferIndex;
            setChatHistory((prev) =>
              prev.map((m, i) => {
                if (i === realIndex) {
                  return {
                    ...m,
                    transfer: {
                      ...m.transfer,
                      status: responseData.transfer_action,
                    },
                  };
                }
                return m;
              }),
            );
          }
        }

        // 处理 AI 掷骰�?
        if (responseData.dice && responseData.dice.result) {
          const diceResult = responseData.dice.result;
          newHistory.push({
            sender: "char",
            text: `[骰子] 🎲 ${diceResult}`,
            time: formatTime(getCurrentTimeObj()),
            isDice: true,
            dice: { result: diceResult },
            ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
          });
        }

        // 更新状态历�?
        if (responseData.status) {
          setStatusHistory((prev) => [
            ...prev,
            {
              time: formatTime(getCurrentTimeObj()),
              status: responseData.status,
            },
          ]);
        }

        // 处理 AI 返回的消息内�?
        if (responseData.messages && Array.isArray(responseData.messages)) {
          const newMsgs = responseData.messages.map((item, index) => {
            let actualText =
              typeof item === "object" && item !== null && item.text
                ? item.text
                : String(item);
            let isVoice =
              typeof item === "object" && item !== null && item.isVoice === true;

            // 支持文字标记：「语音」开头也视为语音
            if (!isVoice && typeof actualText === "string" && actualText.startsWith("[语音]")) {
              isVoice = true;
              actualText = actualText.replace("[语音]", "").trim();
            }

            // 语音消息统一加前缀（兼容老渲染逻辑�?
            const displayText = isVoice ? `[语音消息] ${actualText}` : actualText;

            return {
              sender: "char",
              text: displayText,
              isVoice: isVoice || undefined,
              time: formatTime(getCurrentTimeObj()),
              ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
              style: chatStyle,
              status:
                index === responseData.messages.length - 1
                  ? responseData.status
                  : null,
            };
          });

          // 处理表情�?
          if (responseData.stickerId) {
            const sticker = charStickers.find(
              (s) => s.id === responseData.stickerId,
            );
            if (sticker) {
              if (newMsgs.length > 0) delete newMsgs[newMsgs.length - 1].status;
              newMsgs.push({
                sender: "char",
                sticker: sticker,
                time: formatTime(getCurrentTimeObj()),
                ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
                status: responseData.status,
              });
            }
          }

          // 处理 AI 发起的转�?
          if (responseData.transfer && responseData.transfer.amount) {
            if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].status) {
              delete newMsgs[newMsgs.length - 1].status;
            }
            const amount = responseData.transfer.amount;
            const reason = responseData.transfer.reason || "";
            newMsgs.push({
              sender: "char",
              text: `[转账] ¥${amount}${reason ? ` (${reason})` : ""}`,
              isTransfer: true,
              transfer: { amount, status: "pending", note: reason },
              time: formatTime(getCurrentTimeObj()),
              ...(realTimeEnabled ? { timestamp: Date.now() } : {}),
              status: responseData.status,
            });
          }

          const finalizedMsgs = newMsgs.map((msg) => ({
            ...msg,
            id:
              msg.id ||
              `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          }));

          setIsTyping(false);
          setMessageQueue(finalizedMsgs);
          setLastInteractionTime(Date.now());

          // 惊喜逻辑：概率触发发�?
          if (forumData.isInitialized && Math.random() < 0.3) {
            if (window.__forumGenerateChatEventPost) {
              // 立即调用，Forum 组件内部异步处理，成功后自己�?toast
              window.__forumGenerateChatEventPost(true);
            }
          }

          // 惊喜逻辑2：概率触发app事件更新（位�?日记/浏览�?账单�?
          if (Math.random() < 0.1) {
            setTimeout(() => {
              triggerAppEvents();
            }, 5000);
          }

          // 定时检查档案更新与总结
          setTimeout(() => {
            const fullConversation = [...newHistory, ...finalizedMsgs];
            let userTurnCount = 0;
            let lastSender = null;
            for (const msg of fullConversation) {
              if (msg.sender === "me" && lastSender !== "me") userTurnCount++;
              lastSender = msg.sender;
            }
            if (userTurnCount > 0 && userTurnCount % 6 === 0) {
              const lastAiMsg = finalizedMsgs[finalizedMsgs.length - 1];
              if (lastAiMsg && lastAiMsg.id)
                generateTrackerUpdate(lastAiMsg.id);
            }
          }, 3000);

          setTimeout(() => {
            if (
              memoryConfig.enabled &&
              msgCountSinceSummary >= memoryConfig.threshold
            ) {
              generateSummary();
            }
          }, 2000);
        }
      } else {
        if (regenIndex !== null) setChatHistory(backupHistory);
      }
    } finally {
      setLoading((prev) => ({ ...prev, chat: false }));
      abortControllerRef.current = null;
    }
  };
  const handleDeleteChat = (index) =>
    setChatHistory((prev) => prev.filter((_, i) => i !== index));
  const handleDeleteReceipt = (index) =>
    setReceipts((prev) => prev.filter((_, i) => i !== index));
  const handleDeleteDiary = (index) =>
    setDiaries((prev) => prev.filter((_, i) => i !== index));
  const handleDeleteMusic = (index) =>
    setMusic((prev) => prev.filter((_, i) => i !== index));
  const handleDeleteBrowser = (index) =>
    setBrowserHistory((prev) => prev.filter((_, i) => i !== index));
  const toggleWorldBookEntry = (id) =>
    setWorldBook((prev) =>
      prev.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e)),
    );
  const handleTouchStart = (index) => {
    longPressTimerRef.current = setTimeout(() => {
      setActiveMenuIndex(index);
    }, 500); // 500ms 视为长按
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleContextMenu = (e, index) => {
    e.preventDefault(); // 阻止浏览器默认右键菜�?
    setActiveMenuIndex(index);
  };

  // 2. 复制
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("success", "已复�?);
    setActiveMenuIndex(null);
  };

  // 3. 进入编辑模式
  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditContent(text);
    setActiveMenuIndex(null);
  };

  // 4. 保存编辑
  const saveEdit = (index) => {
    const newHistory = [...chatHistory];
    const msg = newHistory[index];
    const newText = editContent;

    msg.text = newText;

    if (msg.isTransfer && msg.transfer) {
      try {
        // 正则匹配: �?¥ 后面的数字，以及可选的括号内的内容
        const match = newText.match(/¥\s*([\d\.]+)(?:\s*\((.*)\))?/);
        if (match) {
          const newAmount = match[1];
          const newNote = match[2] || ""; // 如果没有括号内容，就是空字符�?

          // 更新底层数据，这样气泡UI才会变！
          msg.transfer = {
            ...msg.transfer,
            amount: newAmount,
            note: newNote,
          };
        }
      } catch (e) {
        console.error("解析转账编辑失败", e);
      }
    }

    newHistory[index].text = editContent;
    setChatHistory(newHistory);
    setEditIndex(null);
    showToast("success", "已修�?);
  };

  // 5. 带确认的删除
  const handleDeleteWithConfirm = async (index) => {
    const msgToDelete = chatHistory[index];

    if (await customConfirm("确定要删除这条消息吗�?, "删除消息")) {
      if (msgToDelete && msgToDelete.id) {
        rollbackTrackerData(msgToDelete.id);
      }

      handleDeleteChat(index);
      setActiveMenuIndex(null);
    }
  };

  const toggleMessageSelection = (index) => {
    const newSet = new Set(selectedMsgs);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedMsgs(newSet);
  };

  const handleBatchDelete = async () => {
    if (selectedMsgs.size === 0) return;

    if (
      await customConfirm(
        `确定要删除选中�?${selectedMsgs.size} 条消息吗？`,
        "批量删除",
      )
    ) {
      selectedMsgs.forEach((index) => {
        const msg = chatHistory[index];
        if (msg && msg.id) {
          rollbackTrackerData(msg.id);
        }
      });

      setChatHistory((prev) => prev.filter((_, i) => !selectedMsgs.has(i)));

      setIsMultiSelectMode(false);
      setSelectedMsgs(new Set());
      showToast("success", "已批量删�?);
    }
  };

  const formatTrackerLine = (text) => {
    if (!text) return "";
    return text
      .replace(/{{user}}/gi, userName || "User")
      .replace(/{{char}}/gi, persona.name || "Character");
  };

  const factsList = trackerConfig.facts
    ? userFacts
        .map((f) =>
          formatTrackerLine(
            `- [Facts about {{user}}]: ${f.content} ({{char}}'s Note: ${f.comment})`,
          ),
        )
        .join("\n")
    : "";

  const charFactsList = trackerConfig.facts
    ? charFacts
        .map((f) =>
          formatTrackerLine(
            `- [Facts about {{char}}]: ${f.content} ({{char}}'s Note: ${f.comment})`,
          ),
        )
        .join("\n")
    : "";

  const eventsList = trackerConfig.events
    ? sharedEvents
        .map(
          (e) =>
            `- [${
              e.type === "pending" ? "Unfinished Promise" : "Shared Memory"
            }]: ${e.content} (${
              e.type === "completed" ? "Completed" : "Pending"
            }) - Note: ${e.comment}`,
        )
        .join("\n")
    : "";

  const trackerContext = `
[DYNAMIC USER PROFILE]:
${factsList || "None"}

[SHARED HISTORY & EVENTS]:
${eventsList || "None"}
`;

  const charTrackerContext = `
[DYNAMIC CHARACTER PROFILE]:
${charFactsList || "None"}
`;

  const handleGhostwriteLocation = async (
    draft,
    setLocationName,
    setLocationAddress,
    setIsGenerating,
  ) => {
    if (!apiConfig?.key) return alert("请配�?API Key");

    setIsGenerating(true);
    try {
      const charName = persona?.name || "Character";
      const effectiveUserName = userName || "User";

      const cleanWorldInfo = replacePlaceholders(
        getWorldInfoString(worldBook),
        charName,
        effectiveUserName,
      );

      // --- [核心修改] 处理最�?5 条聊天记�?---
      const historyText = chatHistory
        .slice(-5) // 取最�?5 �?
        .map((m) => {
          // 判断发送�?
          const sender = m.sender === "me" ? effectiveUserName : charName;
          // 判断内容 (处理文本、语音、图片、位置等不同类型)
          let content = m.text || "";
          if (m.isVoice) content = "[语音]";
          if (m.isLocation) content = `[位置: ${m.location.name}, 地址: ${m.location.address}]`;
          // 如果没有文本也没有特殊类型，可能是空
          if (!content) content = "[图片/表情]";

          return `${sender}: ${content}`;
        })
        .join("\n");

      const prompt = `
Task: Generate a fictional location based on the user's draft.
Context: Roleplay setting. Current World Info: ${cleanWorldInfo} Conversation History:${historyText}
User Draft: "${draft || "A random interesting place"}"

Requirements:
1. Name: A realistic or atmospheric name fitting the draft (e.g., "La Crêperie").
2. Address: A detailed, realistic address (e.g., "上海市静安区南京西路1601�?..").
3. Output Format: JSON ONLY. { "name": "...", "address": "..." }
`;

      const result = await generateContent(
        {
          prompt,
          systemInstruction: "You are a location generator.",
          isJson: true,
        },
        apiConfig,
        (err) => alert(err),
      );

      if (result && result.name) {
        setLocationName(result.name);
        setLocationAddress(result.address);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Smart Watch State
  const [
    smartWatchLocations,
    setSmartWatchLocations,
    smartWatchLocationsLoaded,
  ] = useStickyState([], "echoes_sw_locations");
  const [smartWatchLogs, setSmartWatchLogs, smartWatchLogsLoaded] =
    useStickyState([], "echoes_sw_logs");
  // Filter state (transient)
  const [swFilter, setSwFilter] = useState("all");
  // Edit mode for map (transient)
  const [isEditingMap, setIsEditingMap] = useState(false);

  const MAP_LAYOUTS = {
    4: [
      { top: "25%", side: "left", arm: 12 },
      { top: "47%", side: "right", arm: 12 },
      { top: "69%", side: "left", arm: 12 },
      { top: "91%", side: "right", arm: 12 },
    ],
    5: [
      { top: "22%", side: "left", arm: 25 },
      { top: "39%", side: "right", arm: 25 },
      { top: "56%", side: "left", arm: 25 },
      { top: "73%", side: "right", arm: 25 },
      { top: "90%", side: "left", arm: 25 },
    ],
    6: [
      { top: "20%", side: "left", arm: 8 },
      { top: "32%", side: "right", arm: 12 },
      { top: "44%", side: "left", arm: 12 },
      { top: "56%", side: "right", arm: 12 },
      { top: "68%", side: "left", arm: 12 },
      { top: "80%", side: "right", arm: 8 },
    ],
  };

  const currentWorldInfoString = getWorldInfoString(worldBook);

  const initSmartWatch = async () => {
    if (!persona) return;
    if (!checkCanGenerate()) return;
    setLoading((prev) => ({ ...prev, smartwatch: true }));

    try {
      // --- 关键修复：补全占位符替换逻辑 ---
      const effectiveUserName = userName || "User";
      const cleanCharDesc = replacePlaceholders(
        inputKey,
        persona.name,
        effectiveUserName,
      );
      const cleanWorldInfo = replacePlaceholders(
        getWorldInfoString(worldBook),
        persona.name,
        effectiveUserName,
      );

      const systemPrompt = prompts.system
        .replaceAll("{{NAME}}", persona.name)
        // 修复：添加角色描述和 Tracker 上下�?
        .replaceAll(
          "{{CHAR_DESCRIPTION}}",
          cleanCharDesc + "\n" + charTrackerContext,
        )
        // 修复：添加用户人�?
        .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
        .replaceAll("{{USER_NAME}}", effectiveUserName)
        // 修复：添加自定义规则
        .replaceAll("{{CUSTOM_RULES}}", customRules)
        .replaceAll("{{WORLD_INFO}}", cleanWorldInfo)
        // 修复：添加长期记�?
        .replaceAll("{{LONG_MEMORY}}", longMemory || "None");

      const genPrompt = prompts.smartwatch_step1_gen
        .replaceAll("{{NAME}}", persona.name)
        .replaceAll("{{USER_NAME}}", effectiveUserName);

      // 第一发请求：生成地点
      const step1Data = await generateContent(
        { prompt: genPrompt, systemInstruction: systemPrompt },
        apiConfig,
        (err) => showToast("error", "Step 1 Error: " + err),
      );

      if (!step1Data || !step1Data.locations) {
        throw new Error("Failed to generate locations.");
      }

      // --- STEP 2: Match Images ---
      // 准备图片库字符串
      const imageLibraryStr = PRESET_LOCATION_IMAGES.map(
        (img) => `ID: ${img.id}, Desc: ${img.desc}, Keywords: ${img.keywords}`,
      ).join("\n");

      // 准备刚才生成的地点字符串
      const generatedLocsStr = JSON.stringify(step1Data.locations);

      const matchPrompt = prompts.smartwatch_step2_match
        .replaceAll("{{GENERATED_LOCATIONS}}", generatedLocsStr)
        .replaceAll("{{IMAGE_LIBRARY}}", imageLibraryStr);

      // 第二发请求：匹配图片
      const step2Data = await generateContent(
        {
          prompt: matchPrompt,
          systemInstruction: "You are a logical data matcher.",
        },
        apiConfig,
        (err) => showToast("error", "Step 2 Error: " + err),
      );

      if (step2Data && step2Data.locations) {
        // Map layout logic (Rendering)
        const count = Math.min(Math.max(step2Data.locations.length, 4), 6);
        const layout = MAP_LAYOUTS[count] || MAP_LAYOUTS[4];

        const finalLocations = step2Data.locations
          .slice(0, count)
          .map((loc, i) => {
            // Resolve Image URL locally
            const matchedImage = PRESET_LOCATION_IMAGES.find(
              (p) => p.id === loc.imageId,
            );

            return {
              id: `loc_${Date.now()}_${i}`,
              name: loc.name,
              desc: loc.desc,
              img: matchedImage ? matchedImage.url : null, // If null in JSON, it stays null here
              layout: layout[i],
            };
          });

        setSmartWatchLocations(finalLocations);
        // Generate first log immediately
        generateSmartWatchUpdate(finalLocations);
      }
    } catch (e) {
      console.error(e);
      showToast("error", "初始化失�? " + e.message);
    } finally {
      setLoading((prev) => ({ ...prev, smartwatch: false }));
    }
  };

  // 2. Update Status (Generate Log)
  const generateSmartWatchUpdate = async (
    currentLocs = smartWatchLocations,
  ) => {
    if (!persona) return;
    if (!checkCanGenerate()) return;
    setLoading((prev) => ({ ...prev, sw_update: true }));

    const locList = currentLocs
      .map((l) => `ID: ${l.id}, Name: ${l.name}`)
      .join("\n");
    const lastLog =
      smartWatchLogs.length > 0 ? JSON.stringify(smartWatchLogs[0]) : "None";

    const effectiveUserName = userName || "User";
    const cleanCharDesc = replacePlaceholders(
      inputKey,
      persona.name,
      effectiveUserName,
    );
    const cleanWorldInfo = replacePlaceholders(
      getWorldInfoString(worldBook),
      persona.name,
      effectiveUserName,
    );

    const systemPrompt = prompts.system
      .replaceAll("{{NAME}}", persona.name)
      .replaceAll(
        "{{CHAR_DESCRIPTION}}",
        cleanCharDesc + "\n" + charTrackerContext,
      )
      .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{CUSTOM_RULES}}", customRules)
      .replaceAll("{{WORLD_INFO}}", cleanWorldInfo)
      .replaceAll("{{LONG_MEMORY}}", longMemory || "None");

    const prompt = prompts.smartwatch_update
      .replaceAll("{{NAME}}", persona.name)
      .replaceAll("{{USER_NAME}}", effectiveUserName)
      .replaceAll("{{HISTORY}}", getContextString(chatHistory, effectiveUserName, null, null, 5))
      .replaceAll("{{LOCATIONS_LIST}}", locList)
      .replaceAll("{{LAST_LOG}}", lastLog);

    try {
      const data = await generateContent(
        { prompt, systemInstruction: getFinalSystemPrompt() },
        apiConfig,
        (err) => showToast("error", err),
      );

      if (data) {
        const effectiveUserName = userName || "那个�?;

        let jsonString = JSON.stringify(data);

        jsonString = jsonString
          .replaceAll("{{USER_NAME}}", effectiveUserName)
          .replaceAll("{{user}}", effectiveUserName);

        const fixedData = JSON.parse(jsonString);

        const newLog = {
          id: Date.now(),
          timestamp: getCurrentTimeObj().toLocaleString(),
          displayTime: formatTime(getCurrentTimeObj()),
          locationId: fixedData.locationId,
          locationName: fixedData.locationName,
          action: fixedData.action,
          avData: fixedData.avData,
          thought: fixedData.thought,
        };
        setSmartWatchLogs((prev) => [newLog, ...prev]);
        showToast("success", "行踪已更�?);
      }
    } finally {
      setLoading((prev) => ({ ...prev, sw_update: false }));
    }
  };

  // --- 离线批量生成智能家日�?---
  const generateOfflineSmartWatchUpdates = async (gapMs) => {
    if (!persona || smartWatchLocations.length === 0) return;
    if (!checkCanGenerate()) return;
    setLoading((prev) => ({ ...prev, sw_update: true }));

    try {
      const gapH = Math.floor(gapMs / 3600000);
      const gapM = Math.floor((gapMs % 3600000) / 60000);
      const gapDesc = gapH > 0 ? `${gapH}小时${gapM > 0 ? gapM + "分钟" : ""}` : `${gapM}分钟`;

      // 根据离开时长决定生成条数
      let expectedCount;
      if (gapMs < 12 * 3600000) {
        expectedCount = Math.floor(Math.random() * 2) + 1; // 1-2
      } else if (gapMs < 24 * 3600000) {
        expectedCount = Math.floor(Math.random() * 3) + 2; // 2-4
      } else {
        expectedCount = Math.floor(Math.random() * 7) + 4; // 4-10
      }

      // 根据离开时长决定场景切换规则
      let locationRule;
      if (gapMs < 12 * 3600000) {
        locationRule = "May stay in one location or move between 1-2 locations.";
      } else if (gapMs < 24 * 3600000) {
        locationRule = "Very likely to visit 2-3 different locations across the time span.";
      } else {
        locationRule = "Must visit 3+ different locations. Show a complete daily cycle (wake �?activities �?sleep).";
      }

      const effectiveUserName = userName || "User";
      const cleanCharDesc = replacePlaceholders(inputKey, persona.name, effectiveUserName);
      const cleanWorldInfo = replacePlaceholders(getWorldInfoString(worldBook), persona.name, effectiveUserName);

      const systemPrompt = prompts.system
        .replaceAll("{{NAME}}", persona.name)
        .replaceAll("{{CHAR_DESCRIPTION}}", cleanCharDesc + "\n" + charTrackerContext)
        .replaceAll("{{USER_PERSONA}}", userPersona + "\n" + trackerContext)
        .replaceAll("{{USER_NAME}}", effectiveUserName)
        .replaceAll("{{CUSTOM_RULES}}", customRules)
        .replaceAll("{{WORLD_INFO}}", cleanWorldInfo)
        .replaceAll("{{LONG_MEMORY}}", longMemory || "None");

      const locList = smartWatchLocations.map((l) => `ID: ${l.id}, Name: ${l.name}`).join("\n");
      const lastLog = smartWatchLogs.length > 0 ? JSON.stringify(smartWatchLogs[0]) : "None";

      const prompt = prompts.smartwatch_offline_batch
        .replaceAll("{{NAME}}", persona.name)
        .replaceAll("{{USER_NAME}}", effectiveUserName)
        .replaceAll("{{GAP_DURATION}}", gapDesc)
        .replaceAll("{{EXPECTED_COUNT}}", expectedCount.toString())
        .replaceAll("{{LOCATION_RULE}}", locationRule)
        .replaceAll("{{LOCATIONS_LIST}}", locList)
        .replaceAll("{{LAST_LOG}}", lastLog)
        .replaceAll("{{HISTORY}}", getContextString(chatHistory, effectiveUserName, null, null, 5));

      const data = await generateContent(
        { prompt, systemInstruction: systemPrompt, isJson: true },
        apiConfig,
        (err) => showToast("error", err),
      );

      if (data && Array.isArray(data) && data.length > 0) {
        const now = new Date();
        const newLogs = data.map((item, i) => {
          let fixedItem = item;
          try {
            let jsonString = JSON.stringify(item);
            jsonString = jsonString.replaceAll("{{USER_NAME}}", effectiveUserName).replaceAll("{{user}}", effectiveUserName);
            fixedItem = JSON.parse(jsonString);
          } catch (e) { /* keep original */ }

          // 反向推算时间戳：LLM 返回�?"time" 字段（HH:MM）代表角色在离开期间某个时刻
          // 最早的事件对应现在 - gapMs，最晚的事件接近现在
          const frac = data.length > 1 ? i / (data.length - 1) : 1; // 0(最�? �?1(最�?
          const eventMs = now.getTime() - gapMs + frac * gapMs;
          const eventDate = new Date(eventMs);
          // �?LLM 返回�?HH:MM 修正时分
          const llmTime = fixedItem.time || (fixedItem.locationName && item.time) || item.time;
          if (llmTime && /^(\d{1,2}):(\d{2})$/.test(llmTime.trim())) {
            const [h, m] = llmTime.trim().split(":").map(Number);
            eventDate.setHours(h, m, 0, 0);
          }

          return {
            id: eventDate.getTime(),
            timestamp: eventDate.toLocaleString(),
            displayTime: formatTime(eventDate),
            locationId: fixedItem.locationId,
            locationName: fixedItem.locationName,
            action: fixedItem.action,
            avData: fixedItem.avData,
            thought: fixedItem.thought,
          };
        });

        // prompt 要求 LLM 返回最早→最晚，reverse �?prepend 让最新在最前面
        newLogs.reverse();
        setSmartWatchLogs((prev) => [...newLogs, ...prev]);
        showToast("success", `在你离开期间，智能家�?${newLogs.length} 条新活动`);
      }
    } catch (e) {
      console.error("Offline smartwatch update failed:", e);
    } finally {
      setLoading((prev) => ({ ...prev, sw_update: false }));
    }
  };

  // --- FORUM STATE ---
  const [forumData, setForumData, forumDataLoaded] = useStickyState(
    { name: "本地生活�?, posts: [], isInitialized: false }, // Added isInitialized
    "echoes_forum_data",
  );
  // 论坛昵称设置
  const [forumSettings, setForumSettings, forumSettingsLoaded] = useStickyState(
    { userNick: "User本U", smurfNick: "不是小号", charNick: "匿名用户" },
    "echoes_forum_settings",
  );
  // 论坛引导提示�?
  const [forumGuidance, setForumGuidance] = useState("");
  // 当前查看的帖�?ID
  const [activeThreadId, setActiveThreadId] = useState(null);
  // 发帖弹窗状�?
  const [showPostModal, setShowPostModal] = useState(false);
  const [showForumSettings, setShowForumSettings] = useState(false); // ID设置弹窗

  // 发帖表单 (拆分草稿，解决串台问�?
  const [postTab, setPostTab] = useState("me"); // 'me' or 'char'
  const [postDrafts, setPostDrafts] = useState({
    me: { title: "", content: "" },
    char: { title: "", content: "", topic: "" },
  });
  // 转发内容的临时存�?(用于传给 Chat Prompt)
  const [forwardContext, setForwardContext] = useState(null);

  // Chat Multi-select State (聊天多选状�?
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedMsgs, setSelectedMsgs] = useState(new Set());

  /* --- MAIN RENDER --- */

  // 挑选最关键的几个数据作为“准备就绪”的判断依据
  const isDataReady =
    personaLoaded &&
    chatHistoryLoaded &&
    userPersonaLoaded &&
    charStickersLoaded;

  if (!isDataReady) {
    return (
      <div id="echoes-chat" className="h-screen w-full bg-[#EBEBF0] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-gray-400" size={32} />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          正在同步本地数据�?..
        </p>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div id="echoes-chat" className="h-screen w-full bg-[#EBEBF0] flex flex-col items-center justify-start pt-32 p-8 text-[#2C2C2C] relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-100/60 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        {notification && (
          <div
            className={`absolute top-8 left-0 right-0 z-[100] flex justify-center toast-enter pointer-events-none`}
          >
            <div
              className={`glass-panel px-6 py-3 rounded-full shadow-xl flex items-center gap-3 text-xs font-bold ${
                notification.type === "error"
                  ? "text-red-500 border-red-200"
                  : notification.type === "info"
                    ? "text-blue-600 border-blue-200"
                    : "text-green-600 border-green-200"
              }`}
            >
              {notification.type === "error" ? (
                <AlertCircle size={16} />
              ) : notification.type === "info" ? (
                <Activity size={16} />
              ) : (
                <CheckCircle2 size={16} />
              )}
              {notification.message}
            </div>
          </div>
        )}

        {showLockSettings && (
          <div className="absolute inset-0 z-50 bg-[#F2F2F7]/90 backdrop-blur-xl flex flex-col animate-in fade-in slide-in-from-bottom-5">
            <div className="h-16 px-6 flex items-center justify-between shrink-0 bg-white/50 border-b border-gray-200/50 shadow-sm">
              <button
                onClick={() => setShowLockSettings(false)}
                className="flex items-center text-gray-600 hover:text-black transition-colors px-2 py-1 -ml-2 rounded-lg hover:bg-white/50 active:scale-95"
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
                <span className="text-sm font-medium ml-0.5">返回</span>
              </button>
              <span className="text-sm font-bold text-gray-800">连接配置</span>
              <div className="w-20"></div>
            </div>

            <div className="flex-grow overflow-hidden p-6 pt-4">
              <SettingsPanel
                simpleMode={true}
                apiConfig={apiConfig}
                setApiConfig={setApiConfig}
                connectionStatus={connectionStatus}
                isFetchingModels={isFetchingModels}
                fetchModels={fetchModelsList}
                availableModels={availableModels}
                testConnection={testConnection}
                close={() => setShowLockSettings(false)}
              />
            </div>
          </div>
        )}

        <div className="max-w-md w-full space-y-8 z-10 flex flex-col items-center h-auto">
          <div className="text-center flex flex-col items-center space-y-2 mb-4">
            <h1 className="text-7xl font-serif font-extralight text-[#1a1a1a] lock-time mb-3">
              {formatTime(getCurrentTimeObj())}
            </h1>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              {formatDate(getCurrentTimeObj())}
            </p>
          </div>
          <div className="flex flex-col items-center w-full gap-8">
            <div
              className="relative group cursor-pointer"
              onClick={() => avatarInputRef.current.click()}
            >
              <input
                type="file"
                ref={avatarInputRef}
                onChange={(e) => handleAvatarUpload(e, setAvatar)}
                className="hidden"
                accept="image/*"
                id="avatar-input-lock"
                name="avatar-input-lock"
              />
              <div
                className={`w-28 h-28 rounded-full border border-white/50 bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center overflow-hidden ${
                  avatar ? "border-none" : ""
                } hover:scale-105 transition-transform duration-500`}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <Camera className="text-gray-400" strokeWidth={1.5} />
                )}
              </div>
              {!avatar && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 tracking-widest uppercase opacity-60 whitespace-nowrap">
                  点击上传头像
                </div>
              )}
            </div>

            <div
              onClick={() => jsonInputRef.current.click()}
              className={`w-72 h-20 glass-card rounded-2xl flex items-center justify-between px-6 cursor-pointer transition-all duration-500 group border border-white/60 shadow-sm ${
                inputKey
                  ? "bg-green-50/50 border-green-100"
                  : "hover:bg-white/60"
              }`}
            >
              <input
                type="file"
                ref={jsonInputRef}
                onChange={handleJsonUpload}
                className="hidden"
                accept=".json"
                id="json-upload-lock"
                name="json-upload-lock"
              />
              <div className="flex flex-col">
                <span
                  className={`text-xs font-bold tracking-wide ${
                    inputKey ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {inputKey ? "档案已就�? : "导入角色�?}
                </span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">
                  {inputKey ? "Ready to sync" : "Upload .JSON File"}
                </span>
              </div>
              <div
                className={`p-2 rounded-full transition-colors ${
                  inputKey
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400 group-hover:text-[#7A2A3A]"
                }`}
              >
                {inputKey ? <CheckCircle2 size={18} /> : <Upload size={18} />}
              </div>
            </div>

            <div className="w-72 flex flex-col gap-4">
              {/* 分隔�?*/}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-gray-300/50"></div>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">
                  �?
                </span>
                <div className="flex-1 h-[1px] bg-gray-300/50"></div>
              </div>

              {/* 创作助手按钮：仅在核心设定为空时显示 */}
              {!inputKey && (
              <button
                onClick={() => {
                  console.log(
                    "点击�?showCreationAssistant:",
                    showCreationAssistant,
                  );
                  setShowCreationAssistant(true);
                  setTimeout(() => {
                    console.log(
                      "点击�?showCreationAssistant:",
                      showCreationAssistant,
                    );
                  }, 100);
                }}
                className="w-full h-16 glass-card rounded-2xl flex items-center justify-between px-6 cursor-pointer transition-all duration-500 group border border-white/60 shadow-sm hover:bg-white/60 hover:border-[#7A2A3A]/30"
              >
                <div className="flex flex-col items-start text-left">
                  {" "}
                  <span className="text-xs font-bold tracking-wide text-gray-600 group-hover:text-[#7A2A3A]">
                    创作助手
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">
                    用一句话生成角色
                  </span>
                </div>
                <div className="p-2 rounded-full bg-gray-100 text-gray-400 group-hover:bg-[#7A2A3A]/10 group-hover:text-[#7A2A3A] transition-colors">
                  <WandSparkles size={18} />
                </div>
              </button>
              )}

              {/* 直接进入：仅在核心设定为空时显示 */}
              {!inputKey && (
                <button
                  onClick={unlockDeviceDirect}
                  className="w-full text-center text-[11px] text-gray-400 hover:text-[#7A2A3A] transition-colors py-1"
                  style={{ textDecorationLine: "underline", textDecorationThickness: "1px", textUnderlineOffset: "4px" }}
                >
                  直接进入
                </button>
              )}

            </div>

            <div
              className={`transition-all duration-700 ${
                inputKey
                  ? "opacity-100 translate-y-0"
                  : "opacity-30 translate-y-4 pointer-events-none"
              }`}
            >
              <button
                onClick={unlockDevice}
                disabled={isConnecting || !inputKey}
                className="p-5 bg-[#2C2C2C] text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl disabled:opacity-50"
                aria-label={isConnecting ? "正在连接..." : "解锁设备"}
              >
                {isConnecting ? (
                  <RefreshCw
                    className="animate-spin"
                    size={24}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ) : (
                  <Fingerprint size={28} strokeWidth={1.2} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowLockSettings(true)}
            className="text-gray-400 hover:text-[#2C2C2C] transition-colors p-3 rounded-full hover:bg-gray-100/50"
            aria-label="打开设置"
          >
            <SettingsIcon size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        {showCreationAssistant && (
          <CreationAssistantModal
            isOpen={showCreationAssistant}
            onClose={() => {
              setShowCreationAssistant(false);
              setGeneratedPreview(null);
            }}
            inputVal={creationInput}
            setInputVal={setCreationInput}
            isGenerating={isGeneratingCharacter}
            onGenerate={generateCharacterFromDescription}
            previewData={generatedPreview}
            setPreviewData={setGeneratedPreview}
            onApply={applyGeneratedCharacter}
          />
        )}
        {dialogConfig && (
          <CustomDialog
            config={dialogConfig}
            onClose={() => setDialogConfig(null)}
          />
        )}
      </div>
    );
  }

  const generateSummary = async () => {
    if (!persona) return;
    setIsSummarizing(true);

    const recentMsgs = getRecentTurns(chatHistory, memoryConfig.threshold);
    const recentHistoryText = recentMsgs
      .map((m) => getFormattedMessageText(m, userName, persona, chatStyle))
      .join("\n");

    if (!recentHistoryText.trim()) {
      setIsSummarizing(false);
      return;
    }

    const prompt = prompts.summary
      .replaceAll("{{NAME}}", persona.name)
      .replaceAll("{{EXISTING_MEMORY}}", longMemory || "None")
      .replaceAll("{{RECENT_HISTORY}}", recentHistoryText);

    const simpleSystem = "You are a text summarizer.";

    try {
      const summaryText = await generateContent(
        { prompt, systemInstruction: simpleSystem, isJson: false },
        apiConfig,
        (err) => showToast("error", "总结失败: " + err),
      );

      if (summaryText) {
        /* const timeStamp = new Date().toLocaleString("zh-CN", {hour12: false,month: "numeric",day: "numeric",hour: "2-digit",minute: "2-digit",});*/
        const newEntry = `${summaryText}`;

        setLongMemory((prev) => (prev ? prev + "\n\n" + newEntry : newEntry));
        setMsgCountSinceSummary(0);
        showToast("info", "记忆已追�?);
      }
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div id="echoes-chat" className="h-screen w-full bg-[#EBEBF0] flex items-center justify-center text-[#2C2C2C] overflow-hidden relative">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        跳转到主要内�?
      </a>
      
      {/* Screen Reader Announcements */}
      <div
        id="sr-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-50/40 rounded-full blur-3xl pointer-events-none"></div>
      {activeMsgToast && (
        <ActiveMessageToast
          message={activeMsgToast}
          onDismiss={handleDismissActiveMsg}
          onRead={handleReadActiveMsg}
        />
      )}
      {notification && (
        <div
          className={`absolute top-8 left-0 right-0 z-[100] flex justify-center toast-enter pointer-events-none`}
        >
          <div
            className={`glass-panel px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold ${
              notification.type === "error"
                ? "text-red-600 border-red-100"
                : notification.type === "info"
                  ? "text-blue-600 border-blue-200"
                  : "text-green-700 border-green-100"
            }`}
          >
            {notification.type === "error" ? (
              <AlertCircle size={14} />
            ) : notification.type === "info" ? (
              <Activity size={14} />
            ) : (
              <CheckCircle2 size={14} />
            )}
            {notification.message}
          </div>
        </div>
      )}
      <div className="relative w-full h-full md:w-[400px] md:h-[800px] bg-[#F2F2F7] md:rounded-[48px] md:border-[8px] md:border-white shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5">
        {/* Status Bar */}
        <header className="h-12 px-8 flex items-center justify-between text-[10px] text-gray-400 bg-transparent z-20 shrink-0 pt-2" role="banner">
          <span>{formatTime(getCurrentTimeObj())}</span>
          <div className="flex gap-2" role="img" aria-label="状态栏: 信号强度、WiFi、电�?>
            <Signal size={10} aria-hidden="true" />
            <Wifi size={10} aria-hidden="true" />
            <Battery size={10} aria-hidden="true" />
          </div>
        </header>

        <main id="main-content" className="flex-grow relative overflow-hidden" role="main">
          {/* HOME SCREEN */}
          <div
            className={`absolute inset-0 px-8 pt-2 pb-12 flex flex-col transition-all duration-500 ${
              activeApp
                ? "scale-95 opacity-0 pointer-events-none blur-sm"
                : "scale-100 opacity-100 blur-0"
            }`}
          >
            <div className="mb-4 px-2 mt-6">
              <h2 className="text-5xl font-serif text-[#1a1a1a] mb-1 tracking-tight lock-time">
                {formatTime(getCurrentTimeObj())}
              </h2>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                {formatDate(getCurrentTimeObj())}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-6 place-items-center mt-2 relative">
              <div className="col-span-2 relative flex justify-center items-center w-full">
                {persona && userName && <SoulLink />}
                <AppIcon
                  icon={
                    avatar ? (
                      <img
                        src={avatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User />
                    )
                  }
                  label={persona?.name || "身份档案"}
                  onClick={() => setActiveApp("identity")}
                />
                <AppIcon
                  icon={
                    userAvatar ? (
                      <img
                        src={userAvatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserPen strokeWidth={1.5} />
                    )
                  }
                  label={userName || "用户设定"}
                  onClick={() => setActiveApp("persona")}
                />
              </div>
              {/* --- 动态应用列�?(支持自定义图�? --- */}
              {APP_LIST.map((app) => (
                <AppIcon
                  key={app.id}
                  label={app.label}
                  // 核心逻辑：如果有自定义图标，显示图片；否则显示默�?Lucide 图标
                  icon={
                    customIcons[app.id] ? (
                      <img
                        src={customIcons[app.id]}
                        alt={app.label}
                        className="w-full h-full object-cover rounded-[18px]" // 圆角调整以匹配整体风�?
                      />
                    ) : (
                      <app.icon strokeWidth={1.5} />
                    )
                  }
                  onClick={() => {
                    // 特殊处理：如果是设置，重�?previousApp
                    if (app.id === "settings") setPreviousApp(null);
                    setActiveApp(app.id);
                  }}
                />
              ))}

              {/* --- 登出按钮 (保持不变，放在列表最下方) --- */}
              <div className="col-span-4 mt-2">
                <AppIcon
                  icon={<LogOut strokeWidth={1.5} className="text-red-500" />}
                  label="登出"
                  onClick={handleLogout}
                />
              </div>
            </div>
            <div className="mt-auto pb-6">
              <div
                data-app-link="通讯"
                className="glass-panel rounded-[24px] p-2 flex justify-around items-center shadow-lg cursor-pointer hover:bg-white/40 transition-colors mx-2"
                onClick={() => setActiveApp("chat")}
              >
                <div className="w-full h-14 flex items-center justify-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6" data-icon="chat">
                    <MessageCircle
                      size={24}
                      strokeWidth={1.5}
                      className="text-[#2C2C2C]"
                    />
                  </span>
                  <span className="text-sm font-bold text-gray-700 tracking-wide">
                    通讯
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* APP: IDENTITY */}
          <AppWindow
            isOpen={activeApp === "identity"}
            title="身份档案"
            onClose={() => setActiveApp(null)}
          >
            {persona ? (
              <div className="space-y-8 text-center pt-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden relative group bg-gray-100">
                  {avatar ? (
                    <img src={avatar} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl text-gray-300 italic">
                      {persona.name[0]}
                    </span>
                  )}
                  <div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-sm"
                    onClick={() => identityAvatarInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={identityAvatarInputRef}
                      onChange={(e) => handleAvatarUpload(e, setAvatar)}
                      className="hidden"
                      accept="image/*"
                      id="char-avatar-input"
                      name="char-avatar-input"
                    />
                    <Camera className="text-white drop-shadow-md" />
                  </div>
                  <span className="absolute bottom-0 right-0 text-[10px] bg-black text-white px-2 rounded-full">
                    角色
                  </span>
                </div>

                {/* --- 开始：身份档案显示逻辑 (包含编辑和查�? --- */}
                {showEditPersona ? (
                  /* 1. 编辑模式 (Edit Mode) */
                  <div className="glass-card p-4 rounded-2xl text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-xs font-bold uppercase text-gray-500">
                        编辑原始数据 (JSON/Text)
                      </span>
                      <button onClick={() => setShowEditPersona(false)}>
                        <X
                          size={14}
                          className="text-gray-400 hover:text-black"
                        />
                      </button>
                    </div>
                    <textarea
                      id="raw-json-edit"
                      name="raw-json-edit"
                      className="w-full h-48 bg-transparent text-xs text-gray-600 resize-none outline-none custom-scrollbar"
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      placeholder="手动输入人物设定时，首行建议�?Name: 角色�?格式开始�?
                    />
                    <button
                      onClick={() => {
                        setShowEditPersona(false);
                        unlockDevice(); // 保存并重新解�?
                      }}
                      className="w-full py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                    >
                      保存并应用设�?
                    </button>
                  </div>
                ) : (
                  /* 2. 查看模式 (View Mode) - 已修改为显示 Raw Prompt */
                  <>
                    <div className="text-center">
                      <h2 className="text-3xl text-gray-900">{persona.name}</h2>
                      {/* 仅当有英文名时显�?*/}
                      {persona.enName && (
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                          {persona.enName}
                        </p>
                      )}
                    </div>

                    {/* 核心修改：直接显�?Raw Prompt (inputKey) */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-end px-1">
                        <span className="text-[10px] font-bold uppercase text-gray-400">
                          核心设定 (Raw Prompt)
                        </span>
                        <button
                          onClick={() => setShowEditPersona(true)}
                          className="text-[10px] text-[#7A2A3A] hover:underline flex items-center gap-1"
                        >
                          <Edit2 size={10} /> 编辑设定
                        </button>
                      </div>

                      <div
                        className="glass-card p-4 rounded-xl text-left max-h-60 overflow-y-auto custom-scrollbar border border-gray-200/50 cursor-pointer hover:bg-white/60 transition-colors"
                        onClick={() => setShowEditPersona(true)} // 点击卡片也能直接编辑
                        title="点击编辑"
                      >
                        <p className="text-[10px] leading-relaxed text-gray-600 whitespace-pre-wrap">
                          {inputKey ||
                            "暂无设定数据，请点击编辑手动输入... "}
                        </p>
                      </div>
                      <p className="text-[9px] text-gray-400 text-center">
                        *此处信息将直接传给模型，点击卡片可修�?
                      </p>
                    </div>

                    {/* MBTI 等额外信息保留（如果有的话） */}
                    {persona.mbti && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="glass-card p-4 rounded-xl text-left">
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                            MBTI
                          </p>
                          <p className="text-xs font-medium">{persona.mbti}</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl text-left">
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                            Role
                          </p>
                          <p className="text-xs font-medium">{persona.title}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/* --- 结束 --- */}

                {/* --- [修改后] 身份档案界面底部：显示角色信�?(Char Facts) --- */}
                <div className="px-1 text-left mt-8">
                  <div className="flex justify-between items-center mb-3 border-b border-gray-200/50 pb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase text-gray-700">
                        关于TA的一�?
                      </h3>
                      <Sparkles size={12} className="text-[#7A2A3A]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {charFacts.length === 0 && (
                      <div className="text-center py-6 border border-dashed border-gray-300 rounded-xl">
                        <p className="text-[10px] text-gray-400">
                          暂无信息
                          <br />
                          随着对话深入，将了解TA的喜好与秘密
                        </p>
                      </div>
                    )}
                    {charFacts.map((fact) => (
                      <MinimalCard
                        key={fact.id}
                        item={fact}
                        type="fact"
                        onDelete={(id) =>
                          handleDeleteTrackerItem("charFact", id)
                        }
                        onEdit={(id, content) =>
                          handleEditTrackerItem("charFact", id, content)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-300">
                <p>数据加载�?..</p>
              </div>
            )}
          </AppWindow>

          {/* APP: PERSONA (USER SETTINGS) - NEW */}
          <AppWindow
            isOpen={activeApp === "persona"}
            title="设定"
            onClose={() => setActiveApp(null)}
          >
            <div className="space-y-6 pt-4 pb-20">
              <div className="glass-card p-4 rounded-xl space-y-4">
                <div className="flex items-center gap-4 border-b border-gray-200/50 pb-4">
                  <div
                    className="relative group cursor-pointer w-16 h-16"
                    onClick={() => userAvatarInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={userAvatarInputRef}
                      onChange={(e) => handleAvatarUpload(e, setUserAvatar)}
                      className="hidden"
                      accept="image/*"
                      id="user-avatar-input"
                      name="user-avatar-input"
                    />
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-white/50 shadow-inner">
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">
                      我的头像
                    </span>
                    <span className="text-[9px] text-gray-400">
                      在聊天中显示
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-[9px] uppercase text-gray-400 mb-1 font-bold"
                    htmlFor="user-name-input"
                  >
                    我的名字
                  </label>
                  <input
                    id="user-name-input"
                    name="user-name-input"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="请填写姓�?
                    className="w-full p-3 bg-white/50 border border-gray-200 rounded-xl text-xs font-medium focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    className="block text-[9px] uppercase text-gray-400 mb-1 font-bold"
                    htmlFor="user-persona-input"
                  >
                    我是�?
                  </label>
                  <textarea
                    id="user-persona-input"
                    name="user-persona-input"
                    value={userPersona}
                    onChange={(e) => setUserPersona(e.target.value)}
                    placeholder="性别、性格、外貌、职业等..."
                    className="w-full h-32 p-3 bg-white/50 border border-gray-200 rounded-xl text-xs font-medium focus:border-black focus:outline-none transition-colors resize-none custom-scrollbar leading-relaxed"
                  />
                </div>
                <div>
                  <label
                    className="block text-[9px] uppercase text-gray-400 mb-1 font-bold"
                    htmlFor="custom-rules-input"
                  >
                    世界规则
                  </label>
                  <textarea
                    id="custom-rules-input"
                    name="custom-rules-input"
                    value={customRules}
                    onChange={(e) => setCustomRules(e.target.value)}
                    className="w-full h-20 p-3 bg-white/50 border border-gray-200 rounded-xl text-xs font-medium focus:border-black focus:outline-none resize-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase text-gray-700">
                      关于你的一�?
                    </h3>
                    <Sparkles size={12} className="text-[#D4C5A9]" />
                  </div>
                  {/* 开�?*/}
                  <button
                    onClick={() => toggleTrackerConfig("facts")}
                    className={`w-8 h-4 rounded-full relative transition-colors ${
                      trackerConfig.facts ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                        trackerConfig.facts ? "left-4" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {trackerConfig.facts ? (
                  <div className="space-y-2">
                    {userFacts.length === 0 && (
                      <div className="text-center py-6 border border-dashed border-gray-300 rounded-xl bg-white/30">
                        <p className="text-[10px] text-gray-400">
                          暂无信息
                          <br />
                          TA会留意你的喜好和习惯
                        </p>
                      </div>
                    )}
                    {userFacts.map((fact) => (
                      <MinimalCard
                        key={fact.id}
                        item={fact}
                        type="fact"
                        onDelete={(id) => handleDeleteTrackerItem("fact", id)}
                        onEdit={(id, content) =>
                          handleEditTrackerItem("fact", id, content)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-gray-50 rounded-xl">
                    <p className="text-[10px] text-gray-400">功能已关�?/p>
                  </div>
                )}
              </div>
            </div>
          </AppWindow>

          {/* APP: WORLDBOOK (Grouped) */}
          <WorldBook
            isOpen={activeApp === "worldbook"}
            onClose={() => setActiveApp(null)}
            showToast={showToast}
            customPrompt={customPrompt}
            customConfirm={customConfirm}
            worldBook={worldBook}
            setWorldBook={setWorldBook}
          />

          {/* APP: CHAT */}
          <AppWindow
            isOpen={activeApp === "chat"}
            title={persona?.name || "Connection"}
            onClose={() => setActiveApp(null)}
            isChat
            actions={
              <>
                <button
                  onClick={() => {
                    setPreviousApp("chat");
                    setActiveApp("status");
                  }}
                  className="p-2 bg-white/50 rounded-full hover:bg-white text-gray-600 shadow-sm transition-colors"
                >
                  <Activity size={18} />
                </button>
                <button
                  onClick={() => {
                    setPreviousApp("chat");
                    setActiveApp("settings");
                  }}
                  className="p-2 bg-white/50 rounded-full hover:bg-white text-gray-600 shadow-sm transition-colors"
                >
                  <SettingsIcon size={18} />
                </button>
              </>
            }
          >
            <div className="flex flex-col h-full relative">
              {regenerateTarget !== null && (
                <div className="absolute bottom-0 left-0 right-0 glass-panel p-4 z-[120] animate-in slide-in-from-bottom-10 rounded-t-2xl">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-gray-500">
                      重生成指�?
                    </span>
                    <button 
                      onClick={() => setRegenerateTarget(null)}
                      aria-label="关闭重生成面�?
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <input
                    id="regen-hint"
                    name="regen-hint"
                    autoFocus
                    type="text"
                    placeholder="例：语气更温柔一�?.."
                    value={regenHint}
                    onChange={(e) => setRegenHint(e.target.value)}
                    className="w-full p-2 bg-white/50 border border-gray-200 rounded-lg text-sm mb-2 outline-none"
                  />
                  <button
                    onClick={() =>
                      triggerAIResponse(regenerateTarget, regenHint)
                    }
                    className="w-full py-2 bg-black text-white text-xs rounded-lg font-bold"
                  >
                    确认重生�?
                  </button>
                </div>
              )}

              <div
                className="flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-6 custom-scrollbar"
                ref={chatScrollRef}
              >
                <div className="text-center py-4">
                  <span className="text-[9px] text-gray-400 bg-gray-100/50 px-3 py-1 rounded-full">
                    {formatDate(getCurrentTimeObj())}
                  </span>
                </div>
                {chatHistory.map((msg, i) => {
                  const isSelected = selectedMsgs.has(i);

                  if (msg.isSystem) {
                    return (
                      <div
                        key={i}
                        className="relative group flex justify-center my-4 animate-in fade-in duration-300"
                        // 绑定事件，支持菜�?
                        onContextMenu={
                          !isMultiSelectMode
                            ? (e) => handleContextMenu(e, i)
                            : undefined
                        }
                        onTouchStart={
                          !isMultiSelectMode
                            ? () => handleTouchStart(i)
                            : undefined
                        }
                        onTouchEnd={
                          !isMultiSelectMode ? handleTouchEnd : undefined
                        }
                        onMouseDown={
                          !isMultiSelectMode
                            ? () => handleTouchStart(i)
                            : undefined
                        }
                        onMouseUp={
                          !isMultiSelectMode ? handleTouchEnd : undefined
                        }
                        onClick={() => {
                          if (isMultiSelectMode) toggleMessageSelection(i);
                        }}
                      >
                        {/* 胶囊本体 */}
                        <div
                          className={`
                            bg-gray-200/60 backdrop-blur-sm text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm cursor-pointer transition-all
                            ${
                              isMultiSelectMode && isSelected
                                ? "ring-2 ring-[#7A2A3A] bg-white"
                                : ""
                            }
                        `}
                        >
                          {msg.text.replace("[系统通知] ", "")}
                        </div>

                        {/* [新增] 菜单 (复用原有的菜单代码逻辑) */}
                        {!isMultiSelectMode && activeMenuIndex === i && (
                          <div className="absolute top-full mt-2 z-50 flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
                            <div className="bg-[#1a1a1a]/95 backdrop-blur-md text-white rounded-xl shadow-2xl p-1.5 flex gap-1 items-center border border-white/20">
                              {/* 系统消息只需要删除和多�?*/}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsMultiSelectMode(true);
                                  setSelectedMsgs(new Set([i]));
                                  setActiveMenuIndex(null);
                                }}
                                className="flex flex-col items-center gap-1 p-2 hover:bg-white/20 rounded-lg min-w-[40px]"
                              >
                                <span className="text-[11px]">多�?/span>
                              </button>
                              <div className="w-[1px] h-4 bg-white/20"></div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteWithConfirm(i);
                                }}
                                className="flex flex-col items-center gap-1 p-2 hover:bg-red-500/50 rounded-lg min-w-[40px] text-red-300 hover:text-white"
                              >
                                <span className="text-[11px]">删除</span>
                              </button>
                            </div>
                            {/* 遮罩 */}
                            <div
                              className="fixed inset-0 z-[-1]"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuIndex(null);
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  let stickerUrl = null;

                  if (msg.sticker && msg.sticker.url) {
                    stickerUrl = msg.sticker.url;
                  } else if (msg.stickerId) {
                    if (msg.stickerSource === "user") {
                      const found = userStickers.find(
                        (s) => s.id === msg.stickerId,
                      );
                      if (found) stickerUrl = found.url;
                    } else {
                      const found = charStickers.find(
                        (s) => s.id === msg.stickerId,
                      );
                      if (found) stickerUrl = found.url;
                    }
                  }

                  // 时间分隔线：消息间隔超过 1 小时
                  const prevMsg = i > 0 ? chatHistory[i - 1] : null;
                  const showGapMarker =
                    !msg.isSystem &&
                    prevMsg &&
                    !prevMsg.isSystem &&
                    msg.timestamp &&
                    prevMsg.timestamp &&
                    msg.timestamp - prevMsg.timestamp > 3600000;

                  return (
                    <React.Fragment key={i}>
                    {showGapMarker && (
                      <div className="flex justify-center my-3">
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                          {formatSmartTime(msg.timestamp)}
                        </span>
                      </div>
                    )}
                    <div
                      onClick={() => {
                        // 如果在多选模式下，点击任何地方都是切换选中
                        if (isMultiSelectMode) toggleMessageSelection(i);
                      }}
                      className={`flex flex-col gap-1 ${
                        msg.sender === "me" ? "items-end" : "items-start"
                      } group relative animate-in fade-in slide-in-from-bottom-2 ${
                        // 多选模式下增加点击区域和样式提�?
                        isMultiSelectMode
                          ? "cursor-pointer hover:bg-gray-100/50 p-2 rounded-xl transition-colors"
                          : ""
                      }`}
                    >
                      {/* --- 第一行：头像 + 气泡 + (恢复)状态按�?--- */}
                      <div
                        className={`flex gap-3 relative ${
                          msg.sender === "me" ? "flex-row-reverse" : "flex-row"
                        } max-w-full`}
                      >
                        {/* [新增] 多选模式下�?Checkbox */}
                        {isMultiSelectMode && (
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-[#7A2A3A] border-[#7A2A3A]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                        )}
                        {/* 1. 头像 */}
                        <div
                          className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm ${
                            msg.sender === "me"
                              ? "bg-gray-200"
                              : "bg-white border border-gray-100"
                          }`}
                        >
                          {msg.sender === "me" ? (
                            userAvatar ? (
                              <img
                                src={userAvatar}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User size={14} className="text-gray-500" />
                            )
                          ) : avatar ? (
                            <img
                              src={avatar}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-800 text-[10px] font-bold">
                              {persona?.name?.[0]}
                            </span>
                          )}
                        </div>

                        <div
                          className={`flex flex-col ${
                            msg.sender === "me" ? "items-end" : "items-start"
                          } max-w-[72%] relative`}
                        >
                          {/* 编辑模式 */}
                          {editIndex === i ? (
                            <div className="flex flex-col gap-2 w-64 animate-in zoom-in-95">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-2 text-sm border border-gray-300 rounded-xl outline-none focus:border-black transition-colors resize-none h-24 bg-white/90"
                              />
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => setEditIndex(null)}
                                  className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-600"
                                >
                                  取消
                                </button>
                                <button
                                  onClick={() => saveEdit(i)}
                                  className="px-3 py-1 text-xs bg-black text-white rounded-full"
                                >
                                  保存
                                </button>
                              </div>
                            </div>
                          ) : (
                            // 正常显示模式：绑定长按事�?(使得转账也能长按删除)
                            <div
                              className={
                                isMultiSelectMode ? "pointer-events-none" : ""
                              }
                              onContextMenu={
                                !isMultiSelectMode
                                  ? (e) => handleContextMenu(e, i)
                                  : undefined
                              }
                              onTouchStart={
                                !isMultiSelectMode
                                  ? () => handleTouchStart(i)
                                  : undefined
                              }
                              onTouchEnd={
                                !isMultiSelectMode ? handleTouchEnd : undefined
                              }
                              onMouseDown={
                                !isMultiSelectMode
                                  ? () => handleTouchStart(i)
                                  : undefined
                              }
                              onMouseUp={
                                !isMultiSelectMode ? handleTouchEnd : undefined
                              }
                            >
                              {/* === 内容分发逻辑 === */}
                              {(() => {
                                // A. 转账渲染 (放在最优先)
                                if (msg.isTransfer) {
                                  return (
                                    <TransferBubble
                                      msg={msg}
                                      isMe={msg.sender === "me"}
                                      onInteract={(action) =>
                                        handleTransferInteract(i, action)
                                      }
                                    />
                                  );
                                }

                                // B. 图片/表情包逻辑
                                let stickerUrl = msg.sticker?.url;
                                if (!stickerUrl && msg.stickerId) {
                                  let found = charStickers.find(
                                    (s) => s.id === msg.stickerId,
                                  );
                                  if (!found)
                                    found = userStickers.find(
                                      (s) => s.id === msg.stickerId,
                                    );
                                  if (found) stickerUrl = found.url;
                                }

                                if (stickerUrl) {
                                  return (
                                    <div className="w-32 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                      <img
                                        src={stickerUrl}
                                        className="w-full h-auto"
                                      />
                                    </div>
                                  );
                                }

                                // C. 真实图片
                                if (msg.isImage) {
                                  return (
                                    <div className="cursor-pointer overflow-hidden rounded-xl border-2 border-white shadow-sm bg-white relative group/img transition-transform active:scale-95">
                                      {msg.imageData ? (
                                        <img
                                          src={msg.imageData}
                                          alt="发送的图片"
                                          className="w-48 max-h-64 object-cover rounded-xl"
                                        />
                                      ) : (
                                        <div className="w-48 h-32 bg-gray-200 flex items-center justify-center">
                                          <Camera size={24} className="text-gray-400" />
                                        </div>
                                      )}
                                    </div>
                                  );
                                }

                                // D. 假图片逻辑
                                const isFakeImg = isImageMsg(msg.text);

                                if (isFakeImg) {
                                  const imgDesc = getImageDesc(msg.text);

                                  return (
                                    <div
                                      className="cursor-pointer overflow-hidden rounded-xl border-2 border-white shadow-sm bg-white relative group/img transition-transform active:scale-95"
                                      onClick={() =>
                                        customAlert(imgDesc, "图片内容")
                                      }
                                    >
                                      <img
                                        src={PLACEHOLDER_IMG_BASE64} // 【改】：删掉那一长串 Base64，直接填这个变量�?
                                        className="w-48 h-32 object-cover block bg-gray-200"
                                      />
                                    </div>
                                  );
                                }

                                let messageContent = null;

                                if (msg.isLocation) {
                                  return (
                                    <LocationBubble
                                      name={msg.location?.name || "地点"}
                                      address={msg.location?.address || ""}
                                    />
                                  );
                                } else if (msg.isVoice) {
                                  return (
                                    <VoiceMessageBubble
                                      msg={msg}
                                      isMe={msg.sender === "me"}
                                    />
                                  );
                                } else if (msg.isDice) {
                                  return (<DiceFace value={msg.dice?.result || 1} animate={!msg.diceRolled} onDone={() => { msg.diceRolled = true; }} />);
                                }

                                // E. 普通文�?转发卡片 (Fallback)
                                return (
                                  <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap select-text ${
                                      msg.sender === "me"
                                        ? "bg-[#2C2C2C] text-white rounded-tr-none"
                                        : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                                    }`}
                                  >
                                    {msg.isForward ? (
                                      <div className="text-left max-w-[240px] pl-3 border-l-2 border-white/30 my-1">
                                        <div className="flex items-center gap-2 mb-1 opacity-70">
                                          <Share size={10} />
                                          <span className="text-[10px] font-bold uppercase tracking-wider">
                                            {msg.forwardData.type === "post"
                                              ? "帖子"
                                              : "评论"}
                                          </span>
                                        </div>
                                        <div className="text-[10px] text-white/80 mb-1 font-bold">
                                          @{msg.forwardData.author}
                                        </div>
                                        <div className="text-xs text-white/80 line-clamp-3 leading-relaxed font-light">
                                          {msg.forwardData.content}
                                        </div>
                                      </div>
                                    ) : (
                                      msg.text
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* --- 长按弹出的菜�?(现在对转账也生效) --- */}
                          {!isMultiSelectMode && activeMenuIndex === i && (
                            <div
                              className="absolute top-full mt-2 z-[120] flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
                              style={{
                                left: msg.sender === "me" ? "auto" : "0",
                                right: msg.sender === "me" ? "0" : "auto",
                              }}
                            >
                              <div className="bg-[#1a1a1a]/95 backdrop-blur-md text-white rounded-xl shadow-2xl p-1.5 flex gap-1 items-center border border-white/20">
                                {/* 1. 复制按钮 (无条件显�? */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(msg.text); // 转账消息也有 text，完全可以复�?
                                  }}
                                  className="flex flex-col items-center gap-1 p-2 hover:bg-white/20 rounded-lg min-w-[40px]"
                                >
                                  <span className="text-[11px]">复制</span>
                                </button>

                                <div className="w-[1px] h-4 bg-white/20"></div>

                                {/* 2. 改写按钮 (无条件显�? */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEdit(i, msg.text); // 转账消息也可以进入编辑模�?
                                  }}
                                  className="flex flex-col items-center gap-1 p-2 hover:bg-white/20 rounded-lg min-w-[40px]"
                                >
                                  <span className="text-[11px]">改写</span>
                                </button>

                                <div className="w-[1px] h-4 bg-white/20"></div>

                                {/* 3. 多选按�?*/}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMultiSelectMode(true);
                                    setSelectedMsgs(new Set([i]));
                                    setActiveMenuIndex(null);
                                  }}
                                  className="flex flex-col items-center gap-1 p-2 hover:bg-white/20 rounded-lg min-w-[40px]"
                                >
                                  <span className="text-[11px]">多�?/span>
                                </button>

                                <div className="w-[1px] h-4 bg-white/20"></div>

                                {/* 4. 删除按钮 */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteWithConfirm(i);
                                  }}
                                  className="flex flex-col items-center gap-1 p-2 hover:bg-red-500/50 rounded-lg min-w-[40px] text-red-300 hover:text-white"
                                >
                                  <span className="text-[11px]">删除</span>
                                </button>
                              </div>

                              {/* 遮罩 */}
                              <div
                                className="fixed inset-0 z-[-1]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuIndex(null);
                                }}
                              ></div>
                            </div>
                          )}
                        </div>

                        {/* 3. 状态按�?*/}
                        {msg.sender === "char" && msg.status && (
                          <button
                            onClick={() =>
                              setExpandedChatStatusIndex(
                                expandedChatStatusIndex === i ? null : i,
                              )
                            }
                            className={`self-center p-1.5 rounded-full transition-all ${
                              expandedChatStatusIndex === i
                                ? "bg-[#7A2A3A] text-white shadow-md transform scale-110"
                                : "text-gray-300 hover:text-[#7A2A3A] hover:bg-gray-100"
                            }`}
                          >
                            <Activity size={12} />
                          </button>
                        )}
                      </div>

                      {/* --- 第二行：时间 + 重说 --- */}
                      {!isMultiSelectMode && (
                        <div
                          className={`flex gap-3 mt-1 items-center opacity-0 group-hover:opacity-100 transition-opacity ${
                            msg.sender === "me"
                              ? "mr-12 flex-row-reverse"
                              : "ml-12 pl-1 flex-row"
                          }`}
                        >
                          <span className="text-[9px] text-gray-300">
                            {msg.timestamp ? formatSmartTime(msg.timestamp) : msg.time}
                          </span>
                          {msg.sender === "char" && !msg.isTransfer && (
                            <button
                              onClick={() => setRegenerateTarget(i)}
                              className="text-gray-300 hover:text-black transition-colors p-1"
                              title="重生�?
                            >
                              <RotateCcw size={11} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* --- 第三行：状态展开卡片 --- */}
                      {expandedChatStatusIndex === i && msg.status && (
                        <div className="ml-12 mt-1 w-64 glass-card p-3 rounded-xl animate-in slide-in-from-top-2 border border-gray-200/50 relative z-10">
                          {/* ... 状态卡片内�?... */}
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Shirt
                                size={10}
                                className="mt-0.5 text-gray-400 shrink-0"
                              />
                              <span className="text-[10px] text-gray-600 leading-tight">
                                {msg.status.outfit}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Eye
                                size={10}
                                className="mt-0.5 text-gray-400 shrink-0"
                              />
                              <span className="text-[10px] text-gray-600 leading-tight">
                                {msg.status.action}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Heart
                                size={10}
                                className="mt-0.5 text-blue-400 shrink-0"
                              />
                              <span className="text-[10px] text-blue-800 italic leading-tight">
                                "{msg.status.thought}"
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Ghost
                                size={10}
                                className="mt-0.5 text-red-400 shrink-0"
                              />
                              <span className="text-[10px] text-red-800 italic leading-tight">
                                "{msg.status.desire}"
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    </React.Fragment>
                  );
                })}
                {(loading.chat || isTyping) && (
                  <div className="flex gap-2 items-center ml-12 pl-2">
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <span className="text-xs text-gray-400 ml-1">
                      对方正在输入...
                    </span>
                  </div>
                )}
              </div>

              {/* 用户表情包面�?*/}
              {showUserStickerPanel && (
                <div className="absolute bottom-16 left-4 right-4 h-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 z-[110] overflow-y-auto custom-scrollbar border border-white animate-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase text-gray-500">
                      我的表情
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-2">
                        {/* 编辑按钮 */}
                        <button
                          onClick={() =>
                            setIsUserStickerEditMode(!isUserStickerEditMode)
                          }
                          // 这里我建议把 px-1 改成 px-2，这样跟后面两个按钮大小更一致，你可以看看效�?
                          className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                            isUserStickerEditMode
                              ? "bg-red-50 text-red-500 font-bold"
                              : "text-gray-600 hover:text-gray-400"
                          }`}
                        >
                          {isUserStickerEditMode ? "完成" : "编辑"}
                        </button>

                        {/* 上传按钮 - 改为透明灰色风格 */}
                        <label className="text-[10px] text-gray-600 hover:text-gray-400 px-2 py-1 rounded-full cursor-pointer transition-colors flex items-center gap-1">
                          <Plus size={10} /> 上传
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleStickerUpload(e, "user")}
                          />
                        </label>

                        {/* 批量按钮 - 改为透明灰色风格 */}
                        <button
                          onClick={async () => {
                            const input = await customPrompt("请输入链接进行批量导�?, "", "批量导入");
                            if (input) handleBulkImport(input, "user", "我的");
                          }}
                          className="text-[10px] text-gray-600 hover:text-gray-400 px-2 py-1 rounded-full cursor-pointer transition-colors flex items-center gap-1"
                        >
                          {/* 注意：你原代码这里用的是 Download 图标，我保留了，如果需�?Link 图标请自行替�?*/}
                          <Download size={10} /> 批量
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {userStickers.map((s) => (
                      <div
                        key={s.id}
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all relative group ${
                          isUserStickerEditMode
                            ? "ring-2 ring-red-400/50 scale-90"
                            : "hover:scale-105"
                        }`}
                        onClick={() => {
                          if (isUserStickerEditMode) {
                            // 编辑模式：点击进入编辑，标记来源�?user
                            setEditingSticker({ ...s, source: "user" });
                          } else {
                            // 正常模式：发送表�?
                            handleUserSend(null, "sticker", s);
                          }
                        }}
                      >
                        <img
                          src={s.url}
                          className="w-full h-full object-cover"
                        />
                        {/* 编辑模式下的遮罩图标 */}
                        {isUserStickerEditMode && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Edit2
                              size={12}
                              className="text-white drop-shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    {userStickers.length === 0 && (
                      <p className="col-span-5 text-center text-xs text-gray-400 py-4">
                        暂无表情，请上传
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* --- 底部输入�?(V2: 按钮常驻 + 响应式布局) --- */}
              <div className="p-3 glass-panel border-t border-white/50 shrink-0 relative z-[100]">
                {isMultiSelectMode ? (
                  /* 多选操作栏 */
                  <div className="flex items-center justify-between px-2 animate-in slide-in-from-bottom-2">
                    <button
                      onClick={() => {
                        setIsMultiSelectMode(false);
                        setSelectedMsgs(new Set());
                      }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold"
                    >
                      取消
                    </button>
                    <span className="text-xs font-bold text-gray-500">
                      已�?{selectedMsgs.size} �?
                    </span>
                    <button
                      onClick={handleBatchDelete}
                      disabled={selectedMsgs.size === 0}
                      className="px-6 py-2 bg-red-500 text-white rounded-full text-xs font-bold disabled:opacity-50 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      删除
                    </button>
                  </div>
                ) : (
                  <div className="relative flex items-center gap-1.5 md:gap-2">
                    {/* [新增] 媒体菜单 (绝对定位在上�? */}
                    {showMediaMenu && (
                      <div className="absolute bottom-14 left-0 bg-white/90 backdrop-blur-xl border border-gray-200 p-2 rounded-xl shadow-xl flex gap-4 animate-in slide-in-from-bottom-2 z-50">
                        {/* 表情按钮 (搬到这里�? */}
                        <button
                          onClick={() => {
                            setShowUserStickerPanel(!showUserStickerPanel);
                            setShowMediaMenu(false);
                          }}
                          className="flex flex-col items-center gap-1 text-gray-600 hover:text-black min-w-[40px]"
                        >
                          <div className="p-2 bg-gray-100 rounded-full">
                            <Smile size={20} />
                          </div>
                          <span className="text-[10px]">表情</span>
                        </button>

                        {/* [新增] 发图按钮 */}
                        <button
                          onClick={handleOpenImageModal}
                          className="flex flex-col items-center gap-1 text-gray-600 hover:text-black min-w-[40px]"
                        >
                          <div className="p-2 bg-gray-100 rounded-full">
                            <ImageIcon size={20} />
                          </div>
                          <span className="text-[10px]">图片</span>
                        </button>

                        <button
                          onClick={handleSendTransfer}
                          className="flex flex-col items-center gap-1 text-gray-600 hover:text-black min-w-[40px]"
                        >
                          <div className="p-2 bg-gray-100 rounded-full">
                            <Banknote size={20} />
                          </div>
                          <span className="text-[10px]">转账</span>
                        </button>

                        <button
                          onClick={handleOpenLocationModal}
                          className="flex flex-col items-center gap-1 text-gray-600 hover:text-black min-w-[40px]"
                        >
                          <div className="p-2 bg-gray-100 rounded-full">
                            <MapPin size={20} />
                          </div>
                          <span className="text-[10px]">位置</span>
                        </button>

                        <button
                          onClick={handleSendDice}
                          className="flex flex-col items-center gap-1 text-gray-600 hover:text-black min-w-[40px]"
                        >
                          <div className="p-2 bg-gray-100 rounded-full">
                            <Dices size={20} />
                          </div>
                          <span className="text-[10px]">骰子</span>
                        </button>
                      </div>
                    )}
                    {loading.chat ? (
                      <button
                        onClick={stopGeneration}
                        className="w-full py-2.5 bg-red-50 text-red-500 rounded-full text-xs font-bold flex items-center justify-center gap-2 animate-pulse"
                      >
                        <X size={14} /> 取消生成
                      </button>
                    ) : (
                      <>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => {
                              if (showUserStickerPanel) {
                                setShowUserStickerPanel(false);
                              } else {
                                setShowMediaMenu(!showMediaMenu);
                              }
                            }}
                            className={`p-2 md:p-2.5 rounded-full transition-all duration-300 ${
                              showMediaMenu || showUserStickerPanel
                                ? "bg-gray-800 text-white rotate-45 shadow-lg"
                                : "text-gray-500 hover:bg-gray-100"
                            }`}
                          >
                            <Plus size={20} strokeWidth={1.5} />
                          </button>

                          <button
                            onClick={() => setIsVoiceMode(!isVoiceMode)}
                            className={`p-2 md:p-2.5 rounded-full transition-colors ${
                              isVoiceMode
                                ? "bg-[#7A2A3A] text-white shadow-md"
                                : "text-gray-500 hover:bg-gray-100"
                            }`}
                          >
                            <Mic size={20} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="relative flex-grow">
                          <textarea
                            id="chat-input"
                            autoComplete="off"
                            value={chatInput}
                            onChange={(e) => {
                              setChatInput(e.target.value);
                              e.target.style.height = "auto";
                              e.target.style.height =
                                Math.min(e.target.scrollHeight, 120) + "px";
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                if (chatInput.trim()) {
                                  handleUserSend(
                                    chatInput,
                                    isVoiceMode ? "voice" : "text",
                                  );
                                  setTimeout(() => {
                                    const el =
                                      document.getElementById("chat-input");
                                    if (el) el.style.height = "auto";
                                  }, 0);
                                }
                              }
                            }}
                            placeholder={
                              isVoiceMode
                                ? "语音..."
                                : chatStyle === "novel" && !chatInput
                                  ? "点击右侧按钮可AI代写..."
                                  : "发消�?.."
                            }
                            rows={1}
                            // 注意：这里加�?w-full �?pr-10 (右侧留白给按�?，去掉了 flex-grow (因为父容器已经是 flex-grow)
                            className={`w-full min-w-0 border rounded-2xl py-2.5 pl-4 pr-10 text-sm focus:outline-none transition-all shadow-inner resize-none custom-scrollbar ${
                              isVoiceMode
                                ? "bg-[#7A2A3A]/10 border-[#7A2A3A]/30 text-[#7A2A3A] placeholder:text-[#7A2A3A]/50"
                                : "bg-white/60 border-gray-200 text-gray-800 focus:border-gray-400"
                            }`}
                            style={{
                              height: "auto",
                              minHeight: "42px",
                              maxHeight: "120px",
                            }}
                          />

                          {chatStyle === "novel" && !isVoiceMode && (
                            <GhostButton
                              loading={isGhostwriting}
                              onClick={handleGhostwrite}
                              className="absolute right-2 top-1/2 -translate-y-1/2 -mt-[3px]"
                            />
                          )}
                        </div>

                        {/* 右侧：按钮组 (只保留发�?触发按钮) */}
                        <div className="flex gap-1 shrink-0 items-end pb-1">
                          {chatInput.trim().length > 0 ? (
                            /* 发送按�?*/
                            <button
                              onClick={() => {
                                handleUserSend(
                                  chatInput,
                                  isVoiceMode ? "voice" : "text",
                                );
                                setTimeout(() => {
                                  const el =
                                    document.getElementById("chat-input");
                                  if (el) el.style.height = "auto";
                                }, 0);
                              }}
                              className="p-2 md:p-2.5 bg-[#2C2C2C] text-white rounded-full hover:bg-black transition-all shadow-md animate-in zoom-in-50"
                            >
                              <Send size={18} strokeWidth={1.5} />
                            </button>
                          ) : (
                            /* 触发回复按钮 */
                            <button
                              onClick={() => triggerAIResponse()}
                              className="p-2 md:p-2.5 bg-[#2C2C2C] text-white rounded-full hover:bg-gray-200 border border-gray-200 transition-all active:scale-95"
                              title="让对方回�?
                            >
                              <MessageSquare size={18} strokeWidth={1.5} />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </AppWindow>

          {/* APP: SETTINGS */}
          <AppWindow
            isOpen={activeApp === "settings"}
            title="系统设置"
            onClose={() => setActiveApp(previousApp)}
          >
            <div className="h-full pt-4">
              {" "}
              <SettingsPanel
                apiConfig={apiConfig}
                setApiConfig={setApiConfig}
                connectionStatus={connectionStatus}
                isFetchingModels={isFetchingModels}
                fetchModels={fetchModelsList}
                availableModels={availableModels}
                testConnection={testConnection}
                close={() => setActiveApp(previousApp)}
                // 传入上下文限�?
                contextLimit={contextLimit}
                setContextLimit={setContextLimit}
                // 长记忆参�?
                memoryConfig={memoryConfig}
                setMemoryConfig={setMemoryConfig}
                longMemory={longMemory}
                setLongMemory={setLongMemory}
                triggerSummary={generateSummary}
                isSummarizing={isSummarizing}
                // 聊天设置
                chatStyle={chatStyle}
                setChatStyle={setChatStyle}
                interactionMode={interactionMode}
                setInteractionMode={setInteractionMode}
                realTimeEnabled={realTimeEnabled}
                setRealTimeEnabled={setRealTimeEnabled}
                onRealTimeToggle={() => { skipNextGapNoticeRef.current = true; }}
                stickersEnabled={stickersEnabled}
                setStickersEnabled={setStickersEnabled}
                getGroups={getGroups}
                toggleStickerGroup={toggleStickerGroup}
                stickers={charStickers}
                setStickers={setCharStickers}
                setEditingSticker={setEditingSticker}
                stickerInputRef={stickerInputRef}
                handleStickerUpload={handleStickerUpload}
                handleBulkImport={handleBulkImport}
                customPrompt={customPrompt}
                // 指令参数
                prompts={prompts}
                // 传递全屏参�?
                isFullscreen={isFullscreen}
                toggleFullScreen={toggleFullScreen}
                // 字体
                fontName={fontName}
                handleFontUrlSubmit={handleFontUrlSubmit}
                handleResetFont={handleResetFont}
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                // 图标
                appList={APP_LIST}
                customIcons={customIcons}
                handleAppIconUpload={handleAppIconUpload}
                handleResetIcon={handleResetIcon}
                // 导入导出
                onExportChat={exportChatData}
                onImportChat={importChatData}
                addStickerGroup={addStickerGroup}
                deleteStickerGroup={deleteStickerGroup}
                renameStickerGroup={renameStickerGroup}
                activeMsgEnabled={activeMsgEnabled}
                setActiveMsgEnabled={setActiveMsgEnabled}
              />
            </div>
          </AppWindow>

          {/* APP: JOURNAL */}
          {/* APP: JOURNAL (DIARY & EVENTS) */}
          <AppWindow
            isOpen={activeApp === "journal"}
            title={showEventsInDiary ? "共同经历" : "日记"} // 标题随状态变�?
            onClose={() => {
              setActiveApp(null);
              setShowEventsInDiary(false); // 关闭时重�?
            }}
            // [新增] 右上角操作按�?
            actions={
              <button
                onClick={() => setShowEventsInDiary(!showEventsInDiary)}
                className={`p-1.5 rounded-lg transition-all ${
                  showEventsInDiary
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                title="切换日记/经历"
              >
                {/* 如果显示经历，图标变成日记本(表示点它可以回日�?；反之亦�?*/}
                {showEventsInDiary ? (
                  <Book size={16} />
                ) : (
                  <Calendar size={16} />
                )}
              </button>
            }
          >
            <div className="space-y-6 pb-20 pt-4">
              {/* === 内容区：根据开关切换显�?=== */}
              {showEventsInDiary ? (
                /* --- A. 共同经历列表 (�?Identity 里的代码移过�? --- */
                <div className="animate-in slide-in-from-right-4">
                  {/* 统计�?*/}
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 text-center">
                      <div className="text-lg font-bold text-black">
                        {
                          sharedEvents.filter((e) => e.type === "pending")
                            .length
                        }
                      </div>
                      <div className="text-[9px] text-gray-400 uppercase">
                        进行�?
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-transparent text-center">
                      <div className="text-lg font-bold text-gray-400">
                        {
                          sharedEvents.filter((e) => e.type === "completed")
                            .length
                        }
                      </div>
                      <div className="text-[9px] text-gray-400 uppercase">
                        已完�?
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sharedEvents.length === 0 && (
                      <div className="text-center py-10 opacity-50">
                        <p className="text-xs text-gray-400">暂无共同经历</p>
                      </div>
                    )}

                    {/* Pending List */}
                    {sharedEvents
                      .filter((e) => e.type === "pending")
                      .map((evt) => (
                        <MinimalCard
                          key={evt.id}
                          item={evt}
                          type="pending"
                          onDelete={(id) =>
                            handleDeleteTrackerItem("event", id)
                          }
                          onEdit={(id, content) =>
                            handleEditTrackerItem("event", id, content)
                          }
                        />
                      ))}

                    {/* Completed List (Separated) */}
                    {sharedEvents.filter((e) => e.type === "completed").length >
                      0 && (
                      <div className="pt-4 border-t border-gray-200/50 mt-4">
                        <span className="text-[10px] font-bold text-gray-300 uppercase mb-3 block">
                          历史存档
                        </span>
                        {sharedEvents
                          .filter((e) => e.type === "completed")
                          .map((evt) => (
                            <MinimalCard
                              key={evt.id}
                              item={evt}
                              type="completed"
                              onDelete={(id) =>
                                handleDeleteTrackerItem("event", id)
                              }
                              onEdit={(id, content) =>
                                handleEditTrackerItem("event", id, content)
                              }
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* --- B. 原有的日记列�?--- */
                <div className="animate-in slide-in-from-left-4">
                  <button
                    onClick={generateDiary}
                    disabled={loading.diary}
                    className="w-full py-3 bg-[#2C2C2C] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-6"
                  >
                    {loading.diary ? (
                      <RefreshCw className="animate-spin" size={14} />
                    ) : (
                      <FileText size={14} />
                    )}{" "}
                    记录此刻
                  </button>

                  {diaries.length === 0 && (
                    <p className="text-center text-gray-400 text-xs mt-10">
                      暂无日记
                    </p>
                  )}

                  {diaries.map((d, i) => (
                    <div
                      key={i}
                      className="glass-card p-6 rounded-xl relative group hover:bg-white/60 transition-colors mb-4"
                    >
                      <div className="flex justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                          {d.date}
                        </span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Share
                            size={12}
                            className="text-gray-300 cursor-pointer hover:text-black"
                            onClick={() => {
                              const newMsg = {
                                sender: "me",
                                text: `【转�?{persona?.name || "角色"}的日记】\n日期�?{d.date}\n内容�?{d.content.replace(/<[^>]*>/g, "")}`,
                                isForward: true,
                                forwardData: { content: d.content.replace(/<[^>]*>/g, ""), type: "diary", date: d.date },
                                time: formatTime(getCurrentTimeObj()),
                              };
                              setChatHistory((prev) => [...prev, newMsg]);
                              setMsgCountSinceSummary((prev) => prev + 1);
                              setForwardContext(`${userName || "User"} forwarded ${persona?.name || "the character"}'s diary entry. ${persona?.name || "the character"} should react to their own personal thoughts and memories being read back to them.`);
                              setActiveApp("chat");
                            }}
                          />
                          <Trash2
                            size={12}
                            className="text-gray-300 cursor-pointer hover:text-red-400"
                            onClick={() => handleDeleteDiary(i)}
                          />
                        </div>
                      </div>
                      <div
                        className="text-sm leading-loose text-gray-700 whitespace-pre-line diary-content"
                        dangerouslySetInnerHTML={{ __html: d.content }}
                      />
                      {d.quote && (
                        <div className="mt-6 pt-4 border-t border-gray-200/50 flex gap-3">
                          <Quote
                            size={12}
                            className="text-gray-400 flex-shrink-0 mt-0.5"
                          />
                          <p className="italic text-gray-500 text-xs">
                            {d.quote}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AppWindow>

          {/* APP: TRACES (Receipts) */}
          <AppWindow
            isOpen={activeApp === "traces"}
            title="生活痕迹"
            onClose={() => setActiveApp(null)}
          >
            <div className="space-y-6 pb-20 pt-4">
              <button
                onClick={generateReceipt}
                disabled={loading.receipt}
                className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-xs uppercase tracking-widest text-gray-500 hover:text-black hover:border-gray-500 hover:bg-white/50 transition-all flex items-center justify-center gap-2 relative z-10"
              >
                {loading.receipt ? (
                  <RefreshCw className="animate-spin" size={14} />
                ) : (
                  <Plus size={14} />
                )}{" "}
                生成新消费记�?
              </button>
              {receipts.map((r, i) => (
                <div
                  key={i}
                  className="bg-white p-6 shadow-md text-xs relative group rotate-1 hover:rotate-0 transition-transform duration-300"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-dashed pb-2">
                    <div>
                      <span className="font-bold text-sm">{r.store}</span>
                      {r.createdAt && <div className="text-[9px] text-gray-400 mt-0.5">{formatSmartTime(r.createdAt)}</div>}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                      <Share
                        size={12}
                        className="cursor-pointer hover:text-black text-gray-400"
                        onClick={() => {
                          const itemsStr = r.items.map(item => `${item.name}: ${item.price}`).join("\n");
                          const newMsg = {
                            sender: "me",
                            text: `【转�?{persona?.name || "角色"}的消费记录】\n${r.createdAt ? `时间�?{formatSmartTime(r.createdAt)}\n` : ""}商家�?{r.store}\n${itemsStr}\n合计�?{r.total}${r.thought ? `\n\n${persona?.name || "角色"}在作出这笔消费时的心理活动：${r.thought}` : ""}`,
                            isForward: true,
                            forwardData: { store: r.store, items: r.items, total: r.total, thought: r.thought, createdAt: r.createdAt, type: "receipt" },
                            time: formatTime(getCurrentTimeObj()),
                          };
                          setChatHistory((prev) => [...prev, newMsg]);
                          setMsgCountSinceSummary((prev) => prev + 1);
                          setForwardContext(`${userName || "User"} forwarded ${persona?.name || "the character"}'s purchase receipt from ${r.store}. ${persona?.name || "the character"} should react to their own spending habits being read back to them.`);
                          setActiveApp("chat");
                        }}
                      />
                      <Trash2
                        size={12}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDeleteReceipt(i)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 mb-4 text-gray-600">
                    {r.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold border-t border-dashed pt-2">
                    <span>TOTAL</span>
                    <span>{r.total}</span>
                  </div>
                  <CollapsibleThought text={r.thought} />
                  <div
                    className="absolute -bottom-1 left-0 w-full h-2 bg-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%)",
                      backgroundSize: "10px 10px",
                      backgroundRepeat: "repeat-x",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </AppWindow>
          {/* APP: FORUM */}
          <Forum
            isOpen={activeApp === "forum"}
            onClose={() => setActiveApp(null)}
            persona={persona}
            userName={userName}
            userPersona={inputKey} // 或者是你的 charDescription 变量�?
            apiConfig={apiConfig}
            prompts={prompts}
            generateContent={generateContent}
            showToast={showToast}
            worldInfoString={currentWorldInfoString} // 传字符串进去
            getCurrentTimeObj={getCurrentTimeObj}
            getContextString={getContextString}
            customConfirm={customConfirm}
            customRules={customRules}
            getFinalSystemPrompt={getFinalSystemPrompt}
            charTrackerContext={charTrackerContext}
            trackerContext={trackerContext}
            setChatHistory={setChatHistory}
            setMsgCountSinceSummary={setMsgCountSinceSummary}
            setForwardContext={setForwardContext}
            setActiveApp={setActiveApp}
          />
          {/* APP: SMART WATCH (智能看看) */}
          <AppWindow
            isOpen={activeApp === "smartwatch"}
            title="智能�?
            onClose={() => setActiveApp(null)}
          >
            <div className="pb-20">
              {/* Header Actions */}
              <div className="flex justify-between items-center px-4 pt-4 mb-4">
                <button
                  onClick={() => setIsEditingMap(!isEditingMap)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${
                    isEditingMap
                      ? "bg-black text-white border-black"
                      : "text-gray-400 border-gray-200"
                  }`}
                >
                  {isEditingMap ? "完成编辑" : "编辑地图"}
                </button>
                <button
                  onClick={() => generateSmartWatchUpdate()}
                  disabled={
                    loading.sw_update || smartWatchLocations.length === 0
                  }
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-[#2C2C2C] text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-black transition-colors disabled:opacity-50"
                >
                  {loading.sw_update ? (
                    <RefreshCw className="animate-spin" size={10} />
                  ) : (
                    <ScanLine size={10} />
                  )}
                  更新行踪
                </button>
              </div>

              {/* MAP AREA */}
              <div className="relative w-full h-[550px] bg-[#EBEBF0] border-y border-gray-200 overflow-y-auto custom-scrollbar mb-6">
                {smartWatchLocations.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                    <p className="text-xs text-gray-400">暂无监控数据</p>
                    <p className="text-[10px] text-gray-300">
                      请确认已开启世界书，然后初始化系统
                    </p>
                    <button
                      onClick={initSmartWatch}
                      disabled={loading.smartwatch}
                      className="px-6 py-2 bg-black text-white text-xs rounded-lg active:scale-95 transition-transform disabled:bg-gray-400"
                    >
                      {loading.smartwatch ? "初始化中..." : "初始化监控系�?}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="map-line"></div>
                    {smartWatchLocations.map((loc, idx) => {
                      const isActive = smartWatchLogs[0]?.locationId === loc.id;
                      const count = Math.min(
                        Math.max(smartWatchLocations.length, 4),
                        6,
                      );
                      const layout =
                        MAP_LAYOUTS[count][idx] || MAP_LAYOUTS[4][idx];
                      const isLeft = layout.side === "left";

                      return (
                        <div
                          key={loc.id}
                          className="map-node-container"
                          style={{ top: layout.top }}
                        >
                          {/* Dot */}
                          <div
                            className={`map-node-dot ${isActive ? "active" : ""}`}
                            onClick={() =>
                              setSwFilter(swFilter === loc.id ? "all" : loc.id)
                            }
                          ></div>

                          {/* Connector */}
                          <div
                            className="map-connector"
                            style={{
                              width: `${layout.arm}px`,
                              left: isLeft
                                ? `calc(50% - ${layout.arm}px - 8px)`
                                : `calc(50% + 8px)`,
                            }}
                          ></div>

                          {/* Card */}
                          <div
                            className="map-card shadow-sm group"
                            style={{
                              left: isLeft
                                ? `calc(50% - ${layout.arm}px - 118px)`
                                : `calc(50% + ${layout.arm}px + 7px)`,
                              transform: `translateY(-50%)`,
                              border: isActive
                                ? "1px solid #22c55e"
                                : "1px solid #d1d5db",
                            }}
                          >
                            <div className="relative w-full h-[50px] bg-gray-200 mb-2 overflow-hidden flex items-center justify-center rounded-sm">
                              {loc.img ? (
                                <img
                                  src={loc.img}
                                  alt={loc.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <MapPin size={16} className="text-gray-400" />
                              )}
                              {isEditingMap && (
                                <div
                                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                                  onClick={() =>
                                    document
                                      .getElementById(`loc-img-${loc.id}`)
                                      .click()
                                  }
                                >
                                  <Upload size={14} className="text-white" />
                                  <input
                                    type="file"
                                    id={`loc-img-${loc.id}`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      if (e.target.files[0]) {
                                        const base64 = await compressImage(
                                          e.target.files[0],
                                        );
                                        const newLocs = [
                                          ...smartWatchLocations,
                                        ];
                                        newLocs[idx].img = base64;
                                        setSmartWatchLocations(newLocs);
                                      }
                                    }}
                                  />
                                </div>
                              )}
                            </div>

                            {isEditingMap ? (
                              <input
                                className="w-full text-[10px] font-bold bg-white border border-gray-300 px-1 outline-none focus:border-blue-500"
                                value={loc.name}
                                onChange={(e) => {
                                  const newLocs = [...smartWatchLocations];
                                  newLocs[idx].name = e.target.value;
                                  setSmartWatchLocations(newLocs);
                                }}
                              />
                            ) : (
                              <div className="font-bold truncate text-[10px]">
                                {loc.name}
                              </div>
                            )}

                            <div className="text-[8px] text-gray-500 leading-tight mt-1 truncate">
                              {loc.desc}
                            </div>

                            {isEditingMap && (
                              <button
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                onClick={() => {
                                  if (smartWatchLocations.length > 4) {
                                    setSmartWatchLocations(
                                      smartWatchLocations.filter(
                                        (_, i) => i !== idx,
                                      ),
                                    );
                                  } else {
                                    showToast("error", "最少保�?个地�?);
                                  }
                                }}
                              >
                                <X size={8} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {!smartWatchLogs[0]?.locationId &&
                      smartWatchLogs.length > 0 && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <span className="bg-black/70 backdrop-blur text-white text-[10px] px-3 py-1 rounded-full">
                            📍 当前位于: {smartWatchLogs[0].locationName}
                          </span>
                        </div>
                      )}
                  </>
                )}
              </div>

              {/* Logs Section */}
              <div className="px-4">
                <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    监控日志
                  </h3>
                  {swFilter !== "all" && (
                    <button
                      onClick={() => setSwFilter("all")}
                      className="text-[9px] text-blue-500 flex items-center hover:underline"
                    >
                      <X size={10} className="mr-1" /> 清除筛�?
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {smartWatchLogs
                    .filter(
                      (log) =>
                        swFilter === "all" || log.locationId === swFilter,
                    )
                    .map((log, i) => (
                      <div
                        key={log.id}
                        className="glass-card p-4 rounded-xl relative group border border-gray-100 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${i === 0 ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
                            ></div>
                            <span className="text-xs font-bold text-gray-800">
                              {log.locationName}
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-400 font-mono">
                            {formatSmartTime(log.id) || log.displayTime}
                          </span>
                        </div>

                        <div className="text-xs text-gray-600 mb-3 bg-white/60 p-2 rounded-lg border border-white/50">
                          <span className="font-bold mr-1 text-gray-400">
                            状�?
                          </span>{" "}
                          {log.action}
                        </div>

                        <div className="space-y-2">
                          <CollapsibleThought
                            text={log.thought}
                            label="查看心声"
                          />
                          {log.avData && (
                            <details className="group/details">
                              <summary className="list-none cursor-pointer flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 hover:text-red-500 transition-colors mt-2">
                                <Video
                                  size={12}
                                  className="group-open/details:hidden"
                                />
                                <ChevronUp
                                  size={12}
                                  className="hidden group-open/details:block"
                                />
                                <span>
                                  {log.avData ? "音视频数�? : "无信�?}
                                </span>
                              </summary>
                              <div className="mt-2 p-3 bg-black/5 rounded-lg border border-black/10 text-[10px] leading-relaxed text-gray-600 animate-in slide-in-from-top-1">
                                <div className="flex items-center gap-1 text-red-500 mb-1 font-bold animate-pulse">
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>{" "}
                                  REC
                                </div>
                                {log.avData}
                              </div>
                            </details>
                          )}
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              const timeStr = formatSmartTime(log.id) || log.displayTime;
                              const avSuffix = log.avData ? `\n音视频：${log.avData}` : "";
                              const newMsg = {
                                sender: "me",
                                text: `【转�?{persona?.name || "角色"}的监控日志】\n地点�?{log.locationName}\n时间�?{timeStr}\n状态：${log.action}${log.thought ? `\n\n${persona?.name || "角色"}当时的心理活动：${log.thought}` : ""}${avSuffix}`,
                                isForward: true,
                                forwardData: { locationName: log.locationName, action: log.action, time: timeStr, thought: log.thought, type: "smartwatch" },
                                time: formatTime(getCurrentTimeObj()),
                              };
                              setChatHistory((prev) => [...prev, newMsg]);
                              setMsgCountSinceSummary((prev) => prev + 1);
                              setForwardContext(`${userName || "User"} forwarded ${persona?.name || "the character"}'s smart home surveillance log from ${log.locationName}. ${persona?.name || "the character"} should react to being tracked/watched in their own home.`);
                              setActiveApp("chat");
                            }}
                            className="text-gray-300 hover:text-black"
                          >
                            <Share size={12} />
                          </button>
                          <button
                            onClick={() =>
                              setSmartWatchLogs((prev) =>
                                prev.filter((l) => l.id !== log.id),
                              )
                            }
                            className="text-gray-300 hover:text-red-400"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  {smartWatchLogs.length === 0 && (
                    <div className="text-center text-gray-400 text-xs py-8">
                      暂无日志记录
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AppWindow>
          {/* APP: BROWSER */}
          <AppWindow
            isOpen={activeApp === "browser"}
            title="浏览记录"
            onClose={() => setActiveApp(null)}
          >
            <div className="space-y-6 pb-20 pt-4">
              <button
                data-app-link="浏览器刷�?
                onClick={generateBrowser}
                disabled={loading.browser}
                className="w-full py-3 bg-[#2C2C2C] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading.browser ? (
                  <RefreshCw className="animate-spin" size={14} />
                ) : (
                  <Globe size={14} />
                )}{" "}
                刷新记录
              </button>

              {browserHistory.map((session, i) => (
                <div key={i} className="space-y-2 relative group">
                  <div className="absolute -right-4 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2
                      size={14}
                      className="text-red-400 cursor-pointer"
                      onClick={() => handleDeleteBrowser(i)}
                    />
                  </div>
                  <div className="text-[10px] text-center text-gray-400 font-bold uppercase mb-2">
                    {session.date}
                  </div>

                  {/* Normal History */}
                  {session.normal.map((item, idx) => (
                    <div
                      key={`n-${idx}`}
                      className="glass-card p-3 rounded-xl flex flex-col gap-2 hover:bg-white/80 transition-colors relative group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-500">
                          <Search size={14} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-xs font-medium truncate">
                            {item.query}
                          </div>
                          <div className="text-[9px] text-gray-400">
                            {item.id ? formatSmartTime(item.id) : item.timestamp} - {item.detail}
                          </div>
                        </div>
                        <Share
                          size={12}
                          className="text-gray-300 cursor-pointer hover:text-black opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          onClick={() => {
                            const newMsg = {
                              sender: "me",
                              text: `【转�?{persona?.name || "角色"}的浏览记录】\n搜索�?{item.query}\n时间�?{item.id ? formatSmartTime(item.id) : item.timestamp}\n详情�?{item.detail}${item.thought ? `\n\n${persona?.name || "角色"}在搜索时的心理活动：${item.thought}` : ""}`,
                              isForward: true,
                              forwardData: { query: item.query, timestamp: item.timestamp, id: item.id, detail: item.detail, thought: item.thought, type: "browser" },
                              time: formatTime(getCurrentTimeObj()),
                            };
                            setChatHistory((prev) => [...prev, newMsg]);
                            setMsgCountSinceSummary((prev) => prev + 1);
                            setForwardContext(`${userName || "User"} forwarded ${persona?.name || "the character"}'s browser search history. ${persona?.name || "the character"} should react to their own search queries being read back to them.`);
                            setActiveApp("chat");
                          }}
                        />
                      </div>
                      <CollapsibleThought
                        text={item.thought}
                        label="查看想法"
                      />
                    </div>
                  ))}

                  {/* Incognito History */}
                  {session.incognito.map((item, idx) => (
                    <div
                      key={`i-${idx}`}
                      className="bg-[#1a1a1a] text-gray-300 p-3 rounded-xl flex flex-col gap-2 shadow-lg border border-gray-700 relative group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-800 rounded-full text-gray-400">
                          <EyeOff size={14} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            {item.query}
                          </div>
                          <div className="text-[9px] text-gray-500">
                            {item.id ? formatSmartTime(item.id) : item.timestamp} - {item.detail}
                          </div>
                        </div>
                        <Share
                          size={12}
                          className="text-gray-500 cursor-pointer hover:text-white opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          onClick={() => {
                            const newMsg = {
                              sender: "me",
                              text: `【转�?{persona?.name || "角色"}的隐私浏览记录】\n搜索�?{item.query}\n时间�?{item.id ? formatSmartTime(item.id) : item.timestamp}\n详情�?{item.detail}${item.thought ? `\n\n${persona?.name || "角色"}在隐私搜索时的心理活动：${item.thought}` : ""}`,
                              isForward: true,
                              forwardData: { query: item.query, timestamp: item.timestamp, id: item.id, detail: item.detail, thought: item.thought, type: "incognito" },
                              time: formatTime(getCurrentTimeObj()),
                            };
                            setChatHistory((prev) => [...prev, newMsg]);
                            setMsgCountSinceSummary((prev) => prev + 1);
                            setForwardContext(`${userName || "User"} forwarded ${persona?.name || "the character"}'s private/incognito browser search history. ${persona?.name || "the character"} might feel exposed (or not, depending on their personality) and react to their secret searches being revealed.`);
                            setActiveApp("chat");
                          }}
                        />
                      </div>
                      <CollapsibleThought
                        text={item.thought}
                        label="窥探心声"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </AppWindow>

          {/* APP: MUSIC */}
          <AppWindow
            isOpen={activeApp === "music"}
            title="共鸣旋律"
            onClose={() => setActiveApp(null)}
          >
            <MusicApp
              persona={persona}
              userAvatar={userAvatar}
              charAvatar={avatar}
              userName={userName}
              chatHistory={chatHistory}
              useStickyState={useStickyState} // 传入你的异步钩子
              echoesDB={echoesDB} // 传入你的数据库工�?
              triggerAIResponse={triggerAIResponse}
              showToast={showToast}
              audioRef={audioRef}
              apiConfig={apiConfig}
            />
          </AppWindow>
          <AppWindow
            isOpen={activeApp === "status"}
            title="状态监�?
            onClose={() => setActiveApp(previousApp || null)}
          >
            <StatusPanel
              statusHistory={statusHistory}
              onDelete={handleDeleteStatus}
            />
          </AppWindow>
          {/* APP: PERSONALIZATION (个性化) */}
          <AppWindow
            isOpen={activeApp === "personalization"}
            title="个性化"
            onClose={() => setActiveApp(null)}
          >
            <PersonalizationPanel
              // 显示
              isFullscreen={isFullscreen}
              toggleFullScreen={toggleFullScreen}
              // 字体
              fontName={fontName}
              handleResetFont={handleResetFont}
              handleFontUrlSubmit={handleFontUrlSubmit}
              inputUrl={inputUrl}
              setInputUrl={setInputUrl}
              // 图标
              appList={APP_LIST}
              customIcons={customIcons}
              handleAppIconUpload={handleAppIconUpload}
              handleResetIcon={handleResetIcon}
              // 皮肤
              skinCSS={skinCSS}
              setSkinCSS={setSkinCSS}
              selectedSkin={selectedSkin}
              setSelectedSkin={setSelectedSkin}
            />
          </AppWindow>
        </main>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-800/20 rounded-full z-30"></div>
      </div>
      {editingSticker && (
        <StickerEditorModal
          sticker={editingSticker}
          onSave={handleSaveSticker}
          onDelete={handleDeleteSticker}
          onClose={() => setEditingSticker(null)}
        />
      )}
      {showCreationAssistant && (
        <CreationAssistantModal
          isOpen={showCreationAssistant}
          onClose={() => {
            setShowCreationAssistant(false);
            setGeneratedPreview(null);
          }}
          inputVal={creationInput}
          setInputVal={setCreationInput}
          isGenerating={isGeneratingCharacter}
          onGenerate={generateCharacterFromDescription}
          previewData={generatedPreview}
          setPreviewData={setGeneratedPreview}
          onApply={applyGeneratedCharacter}
        />
      )}
      {dialogConfig && (
        <CustomDialog
          config={dialogConfig}
          onClose={() => setDialogConfig(null)}
        />
      )}
      {/* [新增] 位置发送弹�?*/}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <MapPin size={20} className="text-[#7A2A3A]" />
              发送位�?
            </h3>

            {/* 输入区域 */}
            <div className="space-y-3">
              <div className="relative">
                {" "}
                {/* �?relative 为了放按�?*/}
                <label className="block text-xs text-gray-500 mb-1">
                  位置名称
                </label>
                <input
                  id="loc-name-input"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 pr-9 text-sm focus:border-[#7A2A3A] focus:outline-none transition-colors" // pr-9 留出按钮位置
                  placeholder="可输入地点类型如“餐厅”并点击右侧按钮"
                />
                {/* [复用] 位置弹窗里的代写按钮 */}
                <GhostButton
                  loading={isLocGenerating} // 需�?App 里定义此状�?
                  className="absolute right-2 bottom-2" // 定位在输入框右下�?
                  onClick={() => {
                    const nameInput = document.getElementById("loc-name-input");
                    const addrInput = document.getElementById("loc-addr-input");
                    const draft = nameInput.value;

                    // 调用位置代写逻辑
                    handleGhostwriteLocation(
                      draft,
                      (n) => (nameInput.value = n),
                      (a) => (addrInput.value = a),
                      setIsLocGenerating, // 传入设置加载状态的函数
                    );
                  }}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  详细地址
                </label>
                <input
                  id="loc-addr-input"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#7A2A3A] focus:outline-none transition-colors"
                  placeholder="自动生成或手动输�?.."
                />
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLocationModal(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  const name = document.getElementById("loc-name-input").value;
                  const addr = document.getElementById("loc-addr-input").value;
                  if (!name) return alert("请输入位置名�?);

                  handleUserSend(name, "location", null, {
                    name,
                    address: addr,
                  });
                  setShowLocationModal(false);
                }}
                className="flex-1 py-2.5 bg-[#7A2A3A] text-white rounded-xl text-sm font-medium hover:bg-[#963448] shadow-md active:scale-95 transition-all"
              >
                发�?
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 图片发送弹�?*/}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Camera size={20} className="text-[#7A2A3A]" />
              发送图�?
            </h3>

            {/* 上传真实图片 */}
            <button
              onClick={() => imageUploadRef.current?.click()}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#7A2A3A] hover:text-[#7A2A3A] hover:bg-gray-50 transition-all flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus size={20} />
              </div>
              <span className="text-sm font-medium">上传图片</span>
              <span className="text-[10px] text-gray-400">支持 JPG/PNG/GIF/WebP</span>
              <span className="text-[10px] text-amber-500">请确保您所使用的模型支持图片输�?/span>
            </button>
            <input
              ref={imageUploadRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSendRealImage}
            />

            {/* 分隔�?*/}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">�?/span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* 假图片输入（原有功能�?*/}
            <button
              onClick={handleSendFakeImage}
              className="w-full py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Edit2 size={14} />
              输入图片描述
            </button>

            {/* 取消按钮 */}
            <button
              onClick={() => setShowImageModal(false)}
              className="w-full py-2.5 text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 导入备份清单弹窗 */}
      {showImportModal && importData && (
        <div className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-white/50 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800">恢复备份</h3>
              <p className="text-[11px] text-gray-400 mt-1">勾选需要恢复的数据分类</p>
            </div>

            <div className="space-y-1.5">
              {importData.categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      cat.selected
                        ? "bg-black border-black"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setImportData({
                        ...importData,
                        categories: importData.categories.map((c) =>
                          c.id === cat.id ? { ...c, selected: !c.selected } : c
                        ),
                      });
                    }}
                  >
                    {cat.selected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-700">{BACKUP_CATEGORIES[cat.id]?.label || cat.id}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                    {getCategoryPreview(importData.allData, cat.id)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => { setShowImportModal(false); setImportData(null); }}
                className="flex-1 py-2.5 text-gray-500 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={doImport}
                className="flex-1 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                恢复选中
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 导出备份勾选弹�?*/}
      {showExportModal && exportData && (
        <div className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-white/50 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800">导出备份</h3>
              <p className="text-[11px] text-gray-400 mt-1">勾选需要导出的数据分类</p>
            </div>

            <div className="space-y-1.5">
              {exportData.categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      cat.selected
                        ? "bg-black border-black"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setExportData({
                        ...exportData,
                        categories: exportData.categories.map((c) =>
                          c.id === cat.id ? { ...c, selected: !c.selected } : c
                        ),
                      });
                    }}
                  >
                    {cat.selected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-700">{BACKUP_CATEGORIES[cat.id]?.label || cat.id}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                    {getCategoryPreview(exportData.allData, cat.id)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => { setShowExportModal(false); setExportData(null); }}
                className="flex-1 py-2.5 text-gray-500 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={doExport}
                className="flex-1 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                导出选中
              </button>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

const AppIcon = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    data-app-link={label}
    className="flex flex-col items-center gap-2.5 cursor-pointer group w-20"
  >
    <div className="w-16 h-16 rounded-[22px] glass-panel flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden text-gray-700 group-hover:text-black border-white/60">
      {typeof icon === "string" ? (
        <img src={icon} className="w-full h-full object-cover" />
      ) : (
        React.cloneElement(icon, { size: 24, strokeWidth: 1.5 })
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
    <span className="text-[10px] font-medium text-gray-500 tracking-wide group-hover:text-gray-800 transition-colors">
      {label}
    </span>
  </div>
);

const SoulLink = () => (
  // 调整：去掉所有定�?class，只保留绝对定位和居中，尺寸改小
  <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      // 修改2：添加黑色描�?
      stroke="black"
      // 修改3：设置描边宽度（可根据需要微调，例如 1 �?2�?
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-2.25 h-2.5 animate-pulse"
      style={{ animationDuration: "2.5s" }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </div>
);

export default App;

// ==========================================
// [修改后] 表情包分组组�?(功能增强 + 视觉优化)
// ==========================================
const StickerGroup = ({
  group,
  stickers,
  toggleStickerGroup,
  setEditingSticker,
  deleteStickerGroup,
  renameStickerGroup,
  handleStickerUpload,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false); // 默认折叠

  // 过滤出当前组的表情，并排除掉占位�?isPlaceholder)
  const groupStickers = stickers.filter((s) => s.group === group);
  const visibleStickers = groupStickers.filter((s) => !s.isPlaceholder);

  const isGroupEnabled = groupStickers.every((s) => s.enabled !== false);

  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 transition-all mb-3">
      {/* 标题�?*/}
      <div className="flex justify-between items-center h-6">
        {/* 左侧：折�?+ 标题 */}
        <div
          className="flex items-center gap-2 cursor-pointer h-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div
            className={`transition-transform duration-300 text-gray-400 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown size={14} />
          </div>
          <h4 className="text-xs font-bold text-gray-700 select-none">
            {group}
          </h4>
          <span className="text-[9px] text-gray-400">
            ({visibleStickers.length})
          </span>
        </div>

        {/* 右侧：操作按钮组 */}
        <div className="flex items-center gap-2">
          {/* 改名 */}
          <button
            onClick={() => renameStickerGroup(group)}
            className="text-gray-300 hover:text-blue-500 p-1 transition-colors"
            title="重命名库"
          >
            <Edit2 size={12} />
          </button>

          {/* 删除 */}
          <button
            onClick={() => deleteStickerGroup(group)}
            className="text-gray-300 hover:text-red-500 p-1 transition-colors"
            title="删除�?
          >
            <Trash2 size={12} />
          </button>

          {/* 分割�?*/}
          <div className="w-px h-3 bg-gray-200 mx-1"></div>

          {/* 开�?*/}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleStickerGroup(group, !isGroupEnabled);
            }}
          >
            {isGroupEnabled ? (
              <ToggleRight
                size={18}
                className="text-[#7A2A3A] drop-shadow-sm"
              />
            ) : (
              <ToggleLeft size={18} className="text-gray-300" />
            )}
          </div>
        </div>
      </div>

      {/* 表情网格 (折叠区域) */}
      {isExpanded && (
        <div
          className={`pt-3 mt-2 border-t border-gray-200/50 transition-all animate-in slide-in-from-top-1 ${
            isGroupEnabled
              ? "opacity-100"
              : "opacity-40 grayscale pointer-events-none"
          }`}
        >
          {visibleStickers.length === 0 && (
            <div className="text-center py-4 text-[10px] text-gray-400 italic">
              暂无表情，请上传
            </div>
          )}

          <div className="grid grid-cols-4 gap-3">
            {visibleStickers.map((s) => (
              <div
                key={s.id}
                className="aspect-square bg-white rounded-xl overflow-hidden relative group cursor-pointer border border-gray-100"
                onClick={() => setEditingSticker({ ...s, source: "char" })}
              >
                <img src={s.url} className="w-full h-full object-cover" />

                {/* 选中/禁用遮罩 */}
                {!s.enabled && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
                )}
              </div>
            ))}

            {/* [修改] 组内上传按钮 - 对应当前分组 */}
            <label
              className="
                    aspect-square border border-dashed border-gray-300 rounded-xl 
                    flex flex-col items-center justify-center cursor-pointer 
                    text-gray-400 hover:text-[#7A2A3A] hover:border-[#7A2A3A] hover:bg-white
                    transition-all duration-300 relative
                "
            >
              <Plus size={16} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                // 关键点：调用 handleStickerUpload 时，传入当前�?group 名字
                onChange={(e) => handleStickerUpload(e, "char", group)}
                // 点击时清空，确保能连续上传同一张图
                onClick={(e) => (e.target.value = null)}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
