import React, { useCallback, useReducer } from 'react';

import Flow from '../../src/ReactFlow/ReactFlowDiagram';

function init({ vertices, edges }) {
  return { vertices: vertices, edges: edges };
}

function reducer(state, action) {
  switch (action.type) {
    case 'ITEM_DRAGGED': {
      const vertices = state.vertices.map(vertex =>
        vertex.id === action.payload.vertexEl.dataset.id
          ? {
              ...vertex,
              left: action.payload.finalPos[0],
              top: action.payload.finalPos[1],
            }
          : vertex
      );
      return { ...state, vertices };
    }
    case 'NODE_CHANGE': {
      const newState = {
        ...state,
        vertices: action.payload.changedVertices,
      };
      return newState;
    }
  }
}

function Vertex({ vertex, index }) {
  return (
    <div
      id={vertex.id}
      className="vertex"
      style={{
        height: vertex.height,
        width: vertex.width,
        left: vertex.left,
        top: vertex.top,
      }}
      data-id={vertex.id}
      data-index={index}
    >
      <span>{index}</span>
    </div>
  );
}

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`clicked on ${id}`);
};

export default function DiagramExample({ initialState, enableZoom }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const renderVertex = useCallback(({ vertex, index }) => <Vertex vertex={vertex} index={index} />, []);
  const renderBackground = useCallback(
    (x, y) => <div className="sq-bg" style={{ height: `${y}px`, width: `${x}px` }} />,
    []
  );
  const renderOverlays = useCallback(
    id => (
      <button className="edgebutton" onClick={event => onEdgeClick(event, id)}>
        +
      </button>
    ),
    []
  );

  return (
    <Flow
      onAction={dispatch}
      vertices={state.vertices}
      edges={state.edges}
      renderVertex={renderVertex}
      renderBackground={renderBackground}
      renderOverlays={renderOverlays}
      enableZoom={enableZoom}
    />
  );
}
