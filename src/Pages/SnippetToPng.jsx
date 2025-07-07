import React, { useState, useRef, useEffect } from "react";
import domtoimage from 'dom-to-image';
import { codeToHtml } from 'shiki';


const themes = {
  "🧛 Dracula": {
    background: "linear-gradient(to right, #282a36, #44475a)",
    textColor: "#f8f8f2"
  },
  "☀️ Light": {
    background: "#f5f5f5",
    textColor: "#333"
  },
  "🌊 Ocean": {
    background: "linear-gradient(to right, #2e8b57, #4682b4)",
    textColor: "#ffffff"
  },
  "🌃 Midnight": {
    background: "#1e1e2f",
    textColor: "#dcdcdc"
  },
  "🧙 Magic": {
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    textColor: "#ffffff"
  },
  "🔥 Sunset": {
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    textColor: "#fff"
  },
  "🌅 Peach": {
    background: "linear-gradient(to right, #ffecd2, #fcb69f)",
    textColor: "#333"
  },
  "🌵 Mint": {
    background: "linear-gradient(to right, #b5f4c4, #6dd5ed)",
    textColor: "#222"
  },
  "🧡 Coral": {
    background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
    textColor: "#222"
  },
  "🦄 Unicorn": {
    background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
    textColor: "#222"
  },
  "🌈 Rainbow": {
    background: "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)",
    textColor: "#000"
  },
  "🌪 Storm": {
    background: "linear-gradient(to right, #2c3e50, #4ca1af)",
    textColor: "#f0f0f0"
  },
  "🍁 Autumn": {
    background: "linear-gradient(to right, #ff9966, #ff5e62)",
    textColor: "#fff"
  },
  "🧊 Ice": {
    background: "linear-gradient(to right, #74ebd5, #acb6e5)",
    textColor: "#000"
  },
  "🩵 Breeze": {
    background: "linear-gradient(to right, #43cea2, #185a9d)",
    textColor: "#fff"
  },
  "🪐 Galaxy": {
    background: "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)",
    textColor: "#fff"
  },
  "🍀 Forest": {
    background: "linear-gradient(to right, #56ab2f, #a8e063)",
    textColor: "#1e1e1e"
  },
  "💖 Love": {
    background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
    textColor: "#333"
  },
  "🏔 Mountains": {
    background: "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)",
    textColor: "#fff"
  },
  "⚡ Electric": {
    background: "linear-gradient(to right, #fc00ff, #00dbde)",
    textColor: "#fff"
  },
  "🧁 Pastel": {
    background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    textColor: "#000"
  },
  "🚀 Space": {
    background: "linear-gradient(to right, #000428, #004e92)",
    textColor: "#eee"
  },
  "🎨 Artist": {
    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
    textColor: "#fff"
  },
  "🌌 Nebula": {
    background: "linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)",
    textColor: "#fff"
  },
  "🌹 Rose": {
    background: "linear-gradient(to right, #f857a6, #ff5858)",
    textColor: "#fff"
  },
  "🌞 Solar": {
    background: "linear-gradient(to right, #f12711, #f5af19)",
    textColor: "#fff"
  },
  "🌑 Eclipse": {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    textColor: "#fff"
  },
  "🍫 Chocolate": {
    background: "linear-gradient(to right, #614385, #516395)",
    textColor: "#fff"
  },
  "🦚 Peacock": {
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    textColor: "#fff"
  },
  "🌻 Sunflower": {
    background: "linear-gradient(to right, #fdc830, #f37335)",
    textColor: "#fff"
  },
  "🍇 Grape": {
    background: "linear-gradient(to right, #4776e6, #8e54e9)",
    textColor: "#fff"
  },
  "🌠 Starlight": {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    textColor: "#ffffff"
  },
  "🎆 Fireworks": {
    background: "linear-gradient(to right, #f857a6, #ff5858, #ffcc70)",
    textColor: "#fff"
  },
  "🌲 Pine": {
    background: "linear-gradient(to right, #134e4a, #2c7a7b)",
    textColor: "#e0f2f1"
  },
  "🪄 Dream": {
    background: "linear-gradient(to right, #d38312, #a83279)",
    textColor: "#ffffff"
  },
  "🌀 Whirlpool": {
    background: "linear-gradient(to right, #360033, #0b8793)",
    textColor: "#fff"
  },
  "🥶 Glacier": {
    background: "linear-gradient(to right, #e0eafc, #cfdef3)",
    textColor: "#111"
  },
  "🌴 Tropical": {
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    textColor: "#fff"
  },
  "🧠 Neural": {
    background: "linear-gradient(to right, #485563, #29323c)",
    textColor: "#fff"
  },
  "🌾 Wheat": {
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    textColor: "#333"
  },
  "🛸 UFO": {
    background: "linear-gradient(to right, #654ea3, #eaafc8)",
    textColor: "#fff"
  }
};

// Syntax highlighting themes mapping
const syntaxThemes = {
  "andromeeda": "Andromeeda",
  "aurora-x": "Aurora X",
  "ayu-dark": "Ayu Dark",
  "catppuccin-frappe": "Catppuccin Frappe",
  "catppuccin-latte": "Catppuccin Latte",
  "catppuccin-macchiato": "Catppuccin Macchiato",
  "catppuccin-mocha": "Catppuccin Mocha",
  "dark-plus": "Dark Plus",
  "dracula": "Dracula",
  "dracula-soft": "Dracula Soft",
  "github-dark": "GitHub Dark",
  "github-dark-dimmed": "GitHub Dark Dimmed",
  "github-light": "GitHub Light",
  "houston": "Houston",
  "light-plus": "Light Plus",
  "material-theme": "Material Theme",
  "material-theme-darker": "Material Theme Darker",
  "material-theme-lighter": "Material Theme Lighter",
  "material-theme-ocean": "Material Theme Ocean",
  "material-theme-palenight": "Material Theme Palenight",
  "min-dark": "Min Dark",
  "min-light": "Min Light",
  "monokai": "Monokai",
  "night-owl": "Night Owl",
  "nord": "Nord",
  "one-dark-pro": "One Dark Pro",
  "poimandres": "Poimandres",
  "rose-pine": "Rose Pine",
  "rose-pine-dawn": "Rose Pine Dawn",
  "rose-pine-moon": "Rose Pine Moon",
  "slack-dark": "Slack Dark",
  "slack-ochin": "Slack Ochin",
  "solarized-dark": "Solarized Dark",
  "solarized-light": "Solarized Light",
  "vitesse-dark": "Vitesse Dark",
  "vitesse-light": "Vitesse Light"

};

// Supported languages
const languages = [
  { name: "HTML", value: "html" },
  { name: "CSS", value: "css" },
  { name: "SCSS", value: "scss" },
  { name: "Less", value: "less" },
  { name: "XML", value: "xml" },
  { name: "Vue", value: "vue" },
  { name: "React (JSX)", value: "jsx" },
  { name: "React (TSX)", value: "tsx" },
  { name: "Svelte", value: "svelte" },
  { name: "Handlebars", value: "handlebars" },
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "typescript" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
  { name: "C", value: "c" },
  { name: "C++", value: "cpp" },
  { name: "C#", value: "csharp" },
  { name: "Go", value: "go" },
  { name: "Ruby", value: "ruby" },
  { name: "Swift", value: "swift" },
  { name: "Kotlin", value: "kotlin" },
  { name: "PHP", value: "php" },
  { name: "Rust", value: "rust" },
  { name: "Scala", value: "scala" },
  { name: "SQL", value: "sql" },
  { name: "Bash", value: "bash" },
  { name: "JSON", value: "json" },
  { name: "Markdown", value: "markdown" },
  { name: "YAML", value: "yaml" },
  { name: "Dart", value: "dart" },
  { name: "R", value: "r" },
  { name: "MATLAB", value: "matlab" }

];

const CodeToImage = () => {
  const exportRef = useRef(null);
  const [code, setCode] = useState(`function hello() {\n  console.log("Hello, world!");\n}`);
  const [theme, setTheme] = useState("🧛 Dracula");
  const [customBg, setCustomBg] = useState(themes[theme].background);
  const [bgPadding, setBgPadding] = useState(32);
  const [codePadding, setCodePadding] = useState(20);
  const [headerHeight, setHeaderHeight] = useState(40);
  const [showBg, setShowBg] = useState(true);
  const [showDots, setShowDots] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [title, setTitle] = useState("Untitled-1");
  const [bgWidth, setBgWidth] = useState(475);
  const [codeFontSize, setCodeFontSize] = useState(14);
  const [titleFontSize, setTitleFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState("monospace");
  const [darkMode, setDarkMode] = useState(true);
  const [highlightedCode, setHighlightedCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [syntaxTheme, setSyntaxTheme] = useState("github-dark");
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExport = async (format) => {
    if (!exportRef?.current) return;
    const node = exportRef.current;

    try {
      if (format === "png") {
        const dataUrl = await domtoimage.toPng(node, { quality: 2 });
        triggerDownload(dataUrl, `${title}.png`);
      } else if (format === "jpeg") {
        const dataUrl = await domtoimage.toJpeg(node, { quality: 1 });
        triggerDownload(dataUrl, `${title}.jpeg`);
      } else if (format === "svg") {
        const dataUrl = await domtoimage.toSvg(node);
        triggerDownload(dataUrl, `${title}.svg`);
      } else if (format === "copy") {
        const blob = await domtoimage.toBlob(node);
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        alert("📋 Image copied to clipboard!");
      }
      setOpen(false);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const triggerDownload = (dataUrl, filename) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };
  // Highlight code when inputs change
  useEffect(() => {
    const highlightCode = async () => {
      if (!code.trim()) return;

      setIsHighlighting(true);
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: syntaxTheme
        });
        setHighlightedCode(html);
      } catch (err) {
        console.error("Syntax highlighting failed:", err);
        // Fallback to plain text
        setHighlightedCode(`<pre>${code}</pre>`);
      } finally {
        setIsHighlighting(false);
      }
    };

    highlightCode();
  }, [code, language, syntaxTheme]);





  const renderCodeWithLines = () => {
    if (isHighlighting) {
      return code.split("\n").map((line, i) => (
        <div key={i} className="flex" style={{ lineHeight: '1.5' }}>
          {showLineNumbers && (
            <span style={{
              display: 'inline-block',
              width: '30px',
              textAlign: 'right',
              marginRight: '10px',
              opacity: 0.6,
              userSelect: 'none'
            }}>
              {i + 1}
            </span>
          )}
          <pre style={{
            margin: 0,
            padding: 0,
            flex: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: fontFamily
          }}>{line || " "}</pre>
        </div>
      ));
    }

    // Process highlighted code
    const lines = highlightedCode.split('\n').map(line =>
      line.replace(/^<span[^>]*>|<\/span>$/g, '')
    );

    return lines.map((lineHtml, i) => (
      <div key={i} className="flex" style={{ lineHeight: '1.5' }}>
        {showLineNumbers && (
          <span style={{
            display: 'inline-block',
            width: '30px',
            textAlign: 'right',
            marginRight: '10px',
            opacity: 0.6,
            userSelect: 'none'
          }}>
            {i + 1}
          </span>
        )}
        <pre
          style={{
            background: 'transparent',
            margin: 0,
            padding: 0,
            flex: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: fontFamily
          }}
          dangerouslySetInnerHTML={{ __html: lineHtml || '&nbsp;' }}
        />
      </div>
    ));
  };

  const currentTheme = themes[theme] || themes["🧛 Dracula"];

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
      style={{ width: '100vw', maxWidth: '100%' }}
    >
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            SnippetToImage
          </h1>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="sticky top-4">
              <div
                ref={exportRef}
                id="export-area"
                className="flex justify-center items-center mx-auto rounded-xl"
                style={{
                  display: "inline-block",
                  maxWidth: "800px",
                  background: "transparent", // or match outer bg
                }}
              >
                <div
                  className="rounded-xl shadow-2xl flex justify-center items-center mx-auto transition-all duration-300"
                  style={{
                    background: showBg ? customBg : darkMode ? "#1e1e1e" : "#fff",
                    padding: `${bgPadding}px`,
                    width: `${bgWidth}px`,  // Don't limit it to 450px!
                    maxWidth: "100%",
                    // minWidth: "min-content",
                    boxSizing: "border-box",
                    overflow: "auto" // ✅ Add this to prevent cutting
                  }}
                // ref={exportRef}
                >
                  <div
                    className="rounded-lg shadow-xl transition-all duration-300 ease-in-out w-max min-w-full"
                    style={{
                      background: darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)",
                      color: currentTheme.textColor,
                      padding: `${codePadding}px`,
                      fontSize: `${codeFontSize}px`,
                      lineHeight: 1.5,
                      fontFamily,

                      whiteSpace: "pre", // ✅ ensures code lines don't wrap in image
                      overflowX: "auto"   // ✅ allows scroll on long lines
                    }}
                  >
                    <div
                      className="flex items-center justify-between mb-4 relative"
                      style={{
                        height: `${headerHeight}px`,
                      }}
                    >
                      {showDots && (
                        <div className="flex gap-2 absolute left-0">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: currentTheme.textColor }}
                            ></div>
                          ))}
                        </div>
                      )}
                      {showTitle && (
                        <div
                          className="opacity-70 font-light absolute left-1/2 transform -translate-x-1/2"
                          style={{
                            fontSize: `${titleFontSize}px`,
                            color: currentTheme.textColor,
                            transition: 'font-size 0.2s ease'
                          }}
                        >
                          {title}
                        </div>
                      )}
                    </div>
                    <div
                      className="overflow-x-auto"
                      style={{ width: "100%", whiteSpace: "pre", fontFamily }}
                    >
                      {renderCodeWithLines()}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Controls Section */}
          <div className="space-y-6">
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white/80'}`}>
              <h2 className="text-xl font-semibold mb-4">Code Editor</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Syntax Theme</label>
                  <select
                    value={syntaxTheme}
                    onChange={(e) => setSyntaxTheme(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  >
                    {Object.entries(syntaxThemes).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea
                className={`w-full h-40 p-4 rounded-lg font-mono text-sm ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                placeholder="Enter your code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ fontFamily }}
              />
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white/80'}`}>
              <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => {
                      setTheme(e.target.value);
                      setCustomBg(themes[e.target.value].background);
                    }}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  >
                    {Object.keys(themes).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Custom Background</label>
                  <input
                    type="text"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Background Padding</label>
                    <input
                      type="number"
                      value={bgPadding}
                      onChange={(e) => setBgPadding(parseInt(e.target.value))}
                      className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Background Width</label>
                    <input
                      type="number"
                      value={bgWidth}
                      max={800}
                      // maxLength={}
                      onChange={(e) => setBgWidth(parseInt(e.target.value))}
                      className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={bgPadding ? 1 : 0}
                    checked={bgPadding > 0}
                    onChange={(e) => setBgPadding(e.target.checked ? 10 : 0)}
                    className="w-4 h-4"
                  />
                  <label>Show Background</label>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white/80'}`}>
              <h2 className="text-xl font-semibold mb-4">Code Box Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Code Padding</label>
                    <input
                      type="number"
                      value={codePadding}
                      onChange={(e) => setCodePadding(parseInt(e.target.value))}
                      className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Font Size</label>
                    <input
                      type="number"
                      value={codeFontSize}
                      onChange={(e) => setCodeFontSize(parseInt(e.target.value))}
                      className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  >
                    <option value="monospace">Monospace</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Fira Code">Fira Code</option>
                    <option value="Roboto Mono">Roboto Mono</option>
                    <option value="Source Code Pro">Source Code Pro</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showLineNumbers}
                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label>Show Line Numbers</label>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white/80'}`}>
              <h2 className="text-xl font-semibold mb-4">Header Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Header Height</label>
                    <input
                      type="number"
                      value={headerHeight}
                      onChange={(e) => setHeaderHeight(parseInt(e.target.value))}
                      className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Title Font Size</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="8"
                        max="24"
                        value={titleFontSize}
                        onChange={(e) => setTitleFontSize(parseInt(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                      />
                      <span className={`text-sm w-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {titleFontSize}px
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showTitle}
                    onChange={(e) => setShowTitle(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label>Show Title</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showDots}
                    onChange={(e) => setShowDots(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label>Show Dots</label>
                </div>
              </div>
            </div>
            <div className="relative inline-block w-full text-center">
              <button
                onClick={() => setOpen(!open)}
                className="py-3 px-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
              >
                Export {open ? '▲' : '▼'}
              </button>

              {open && (
                <div className="absolute bottom-14 right-0 w-56 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 z-50">
                  {[
                    { label: "🖼 Export as PNG", type: "png" },
                    { label: "📸 Export as JPEG", type: "jpeg" },
                    { label: "🧾 Export as SVG", type: "svg" },
                    { label: "📋 Copy to Clipboard", type: "copy" },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => {
                        handleExport(item.type);
                        setOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeToImage;