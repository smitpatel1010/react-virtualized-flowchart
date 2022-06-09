import React from 'react';

const MINIMAP_WIDTH = 350;
const MINIMAP_HEIGHT = 250;
const MINIMAP_PADDING = 20;

const Minimap = ({ vertices, extremeX, extremeY, viewport }) => {
  const scalingFactor = {
    x: MINIMAP_WIDTH / extremeX,
    y: MINIMAP_HEIGHT / extremeY,
  };

  const minimapViewport = {
    top: viewport.yMin * scalingFactor.y,
    left: viewport.xMin * scalingFactor.x,
    width: Math.min((viewport.xMax - viewport.xMin) * scalingFactor.x, MINIMAP_WIDTH + 2 * MINIMAP_PADDING),
    height: Math.min((viewport.yMax - viewport.yMin) * scalingFactor.y, MINIMAP_HEIGHT + 2 * MINIMAP_PADDING),
  };

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
      style={{
        boxSizing: 'content-box',
        border: '2px solid black',
        backgroundColor: 'rgba(20, 20, 20, 0.04)',
        width: `${MINIMAP_WIDTH}px`,
        height: `${MINIMAP_HEIGHT}px`,
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: `${MINIMAP_PADDING}px`,
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
