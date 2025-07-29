import React, { useState, useEffect } from 'react';

const UniqueLoadingComponent = () => {
  const mainColor = "#353957"; 
  const numberOfDots = 5;
  const baseSize = 10; 
  const peakSize = 25; 
  const animationDuration = 1200; 
  const delayFactor = 0.18;

  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) % animationDuration;
      const progress = elapsedTime / animationDuration;
      setAnimationProgress(progress);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationDuration]); 

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const getDotStyle = (index) => {
    
    const dotPhase = (animationProgress + index * delayFactor) % 1;

    const sizeFactor = (Math.sin(dotPhase * Math.PI * 2) + 1) / 2;
    const currentSize = baseSize + sizeFactor * (peakSize - baseSize);

    const opacityFactor = (Math.sin(dotPhase * Math.PI * 2 - Math.PI / 2) + 1) / 2;
    const currentOpacity = 0.5 + opacityFactor * 0.5; 

    return {
      width: `${currentSize}px`,
      height: `${currentSize}px`,
      backgroundColor: mainColor,
      borderRadius: '50%', 
      margin: '0px 4px', 
      opacity: currentOpacity,
    };
  };

  return (
    <div style={containerStyle}>
      {Array.from({ length: numberOfDots }).map((_, index) => (
        <div key={index} style={getDotStyle(index)} />
      ))}
    </div>
  );
};

export default UniqueLoadingComponent;