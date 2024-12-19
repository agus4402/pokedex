import { useState } from "react";

const Tabs = ({ tabs }) => {
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
          gap: "5px",
          background: "#ddd9",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: activeTab === index ? "var(--active-button-color)" : "var(--button-color)",
              border: "0.5px solid var(--border-color)",
              borderRadius: "20px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ height: "calc(100% - 61px)", overflow: "auto" }}>
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
