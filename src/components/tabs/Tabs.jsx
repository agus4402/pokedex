import { useState } from "react";

const Tabs = ({ tabs, beforeTabs, afterTabs, title }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid var(--border-color)",
          backdropFilter: "blur(10px)",
          padding: "10px 0px 10px 0px",
          background: "#ddd9",
        }}
      >
        <div style={{ position: "absolute", left: 10, top: 0, bottom: 0 }}>{title}</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {beforeTabs}
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                color: "var(--text-color)",
                background:
                  activeTab === index
                    ? "var(--active-button-color)"
                    : "var(--button-color)",
                border: "0.5px solid var(--border-color)",
                borderRadius: "20px",
              }}
            >
              {tab.label}
            </button>
          ))}
          {afterTabs}
        </div>
      </div>

      <div style={{ height: "calc(100% - 61px)", overflow: "auto" }}>
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
