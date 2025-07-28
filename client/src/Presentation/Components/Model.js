
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../Styles/Model.css';
import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { atomDark as dark } from "@codesandbox/sandpack-themes";


const OutputRenderer = ({ data }) => {
  
    return (
      <div style={{boxSizing:"border-box",overflowY:"scroll",scrollbarWidth:"none"}}>
        <Sandpack
          template="react"
          theme={dark}
          options={{
            showLineNumbers: true,
            wrapContent: true,
            editorHeight: '80vh',
            showTabs: false,
          }}
          files={{
            "/App.js": {
              code: data?.jsx || "// JSX code not found",
              active: true,
            },
            "/index.js": {
              code: `
                import React from "react";
                import { createRoot } from "react-dom/client";
                import App from "./App";
                
                const container = document.getElementById("root");
                const root = createRoot(container);
                root.render(<App />);
              `.trim(),
            },
            "/index.html": {
              code: `<div id="root"></div>`,
            },
          }}
        />
      </div>
    );
  };

const Model = ({ closeModel, miniMize, data, showModel }) => {
    return (
        showModel &&
        <div className="model-container">
            <div className="file-card-main">
                <div className="file-card-header">
                    <h3>{data?.filename}</h3>
                    <div className="file-card-header-right">
                        <button onClick={miniMize} className="file-card-max-button">-</button>
                        <button onClick={closeModel} className="file-card-close-button">x</button>
                    </div>
                </div>

                
                
                    <OutputRenderer data={data}/>
                
              
            </div>
        </div>
    )
}

export default Model;