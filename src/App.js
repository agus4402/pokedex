import React, { useState } from "react";
import "./App.css";
import Tabs from "./components/tabs/Tabs";
import Pokedex from "./components/Pokedex";
import DebouncedSearch from "./components/common/DebouncedSearch";

function App() {
  const [search, setSearch] = useState("");

  const tabs = [{ label: "Cards", content: <Pokedex search={search} /> }];

  return (
    <div className="App">
      <main className="App-main">
        <Tabs
          tabs={tabs}
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "100%",
                justifyContent: "center",
                margin: "0 20px 0 0",
              }}
            >
              <h1>Pokemon TCG</h1>
              <h2>Search</h2>
            </div>
          }
          afterTabs={
            <DebouncedSearch
              id="searchInput"
              stopTyping={setSearch}
              placeholder={"Search"}
            />
          }
        />
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
