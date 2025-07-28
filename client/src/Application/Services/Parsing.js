const parseToJSX = (text) => {
    const lines = text.split('\n');
  
    return (
      <div>
        {lines.map((line, index) => {
          // Match bold like **something**
          const boldRegex = /\*\*(.*?)\*\*/g;
          const boldParts = [];
          let lastIndex = 0;
          let match;
  
          while ((match = boldRegex.exec(line)) !== null) {
            const [fullMatch, boldText] = match;
            boldParts.push(line.slice(lastIndex, match.index));
            boldParts.push(<strong key={`${index}-${match.index}`}>{boldText}</strong>);
            lastIndex = match.index + fullMatch.length;
          }
  
          boldParts.push(line.slice(lastIndex));
  
          // Render bullet points
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return (
              <li key={index} style={{ marginBottom: '4px' }}>
                {boldParts}
              </li>
            );
          }
  
          // Render paragraphs
          return (
            <p key={index} style={{ marginBottom: '8px' }}>
              {boldParts}
            </p>
          );
        })}
      </div>
    );

}

export default parseToJSX;