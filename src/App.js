import "./App.css";
import React, { useState, useEffect } from "react";
import A from "./components/A";
import B from "./components/B";

function App() {
  const [value, setvalue] = useState("");
  const [posts, setposts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json()) //받아온 데이터를 json형식으로 받겠다.
      .then((posts) => setposts(posts)); // 받아온 posts데이터를 setposts에 저장한다.
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <input value={value} onChange={(e) => setvalue(e.target.value)} />

      <div style={{ display: "flex" }}>
        <A message={value} posts={posts} />
        <B message={value} posts={posts} />
      </div>
    </div>
  );
}

export default App;
