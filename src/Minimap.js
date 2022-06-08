import React from 'react';

const MINIMAP_WIDTH = 350;
const MINIMAP_HEIGHT = 250;

const Minimap = ({ vertices, extremeX, extremeY }) => {
  const nodes = vertices.map(vertex => {
    return (
      <div
        key={vertex.id}
        style={{
          position: 'absolute',
          top: `${(vertex.top / extremeY) * MINIMAP_HEIGHT}px`,
          left: `${(vertex.left / extremeX) * MINIMAP_WIDTH}px`,
          width: '12px',
          height: '8px',
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
        backgroundColor: 'rgba(20, 20, 20, 0.4)',
        width: `${MINIMAP_WIDTH}px`,
        height: `${MINIMAP_HEIGHT}px`,
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '20px',
      }}
    >
      {nodes}
    </div>
  );
};

export default Minimap;
