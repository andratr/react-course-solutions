import React from "react";
import { useState } from "react";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";
import Button from "./components/UI/Button/Button";
function App() {
  console.log("App running");
  const [showParagraph, setShowParagraph] = useState();

  const toggleParagraphHandler = () => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
