function extractCodeParts(text) {
    const codeMatch = text.match(/```jsx([\s\S]*?)```/);
  
    const jsx = codeMatch ? codeMatch[1].trim() : "";
  
    const explanationStartIndex = codeMatch ? codeMatch.index + codeMatch[0].length : 0;
    const explanation = text.slice(explanationStartIndex).trim();
  
    return { jsx, explanation };
  }
  
  module.exports = extractCodeParts;
  