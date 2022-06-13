import React from 'react';
import { useRef, useEffect } from 'react';

const MINIMAP_WIDTH = 350;
const MINIMAP_HEIGHT = 250;

const Minimap = ({ vertices, extremeX, extremeY, viewport, changeScrollHandler }) => {
  const scalingFactor = {
    x: MINIMAP_WIDTH / extremeX,
    y: MINIMAP_HEIGHT / extremeY,
  };

  viewport.width = viewport.xMax - viewport.xMin;
  viewport.height = viewport.yMax - viewport.yMin;

  const minimapViewport = {
    top: viewport.yMin * scalingFactor.y,
    left: viewport.xMin * scalingFactor.x,
    width: Math.min(viewport.width * scalingFactor.x, MINIMAP_WIDTH),
    height: Math.min(viewport.height * scalingFactor.y, MINIMAP_HEIGHT),
  };

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const handleClick = event => {
      const newScrollPosition = {
        scrollLeft: (event.clientX - element.offsetLeft - (viewport.width * scalingFactor.x) / 2) / scalingFactor.x,
        scrollTop: (event.clientY - element.offsetTop - (viewport.height * scalingFactor.y) / 2) / scalingFactor.y,
      };
      changeScrollHandler(newScrollPosition);
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  });

  const nodes = vertices.map(vertex => {
    return (
      <div
        key={vertex.id}
        style={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: `${vertex.top * scalingFactor.y}px`,
          left: `${vertex.left * scalingFactor.x}px`,
          width: `${vertex.width * scalingFactor.x}px`,
          height: `${vertex.height * scalingFactor.y}px`,
          backgroundColor: 'gold',
          border: '1px solid black',
        }}
      />
    );
  });
  return (
    <div
      className="minimap"
      ref={ref}
      style={{
        boxSizing: 'content-box',
        border: '2px solid black',
        backgroundColor: 'rgba(20, 20, 20, 0.04)',
        width: `${MINIMAP_WIDTH}px`,
        height: `${MINIMAP_HEIGHT}px`,
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      }}
    >
      {nodes}
      <div
        style={{
          position: 'absolute',
          top: `${minimapViewport.top}px`,
          left: `${minimapViewport.left}px`,
          width: `${minimapViewport.width}px`,
          height: `${minimapViewport.height}px`,
          backgroundColor: 'rgba(240, 240, 240, 0.3)',
          border: '1px solid blue',
        }}
      ></div>
    </div>
  );
};

export default Minimap;
