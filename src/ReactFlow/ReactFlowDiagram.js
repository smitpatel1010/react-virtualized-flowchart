import React from 'react';

import ReactFlow, { MiniMap, Controls, applyNodeChanges } from 'react-flow-renderer';

import CustomeNode from '../../src/ReactFlow/CustomNode';
import CustomEdge from '../../src/ReactFlow/CustomEdge';

import { getExtremeVertices, getXUpper, getYUpper } from '../../src/helper';
import { MARGIN } from '../../src/constants';

function getExtremeXAndY(vertices) {
  const { rightMostVertex, bottomMostVertex } = getExtremeVertices(vertices);

  const extremeX = getXUpper(rightMostVertex) + MARGIN;
  const extremeY = getYUpper(bottomMostVertex) + MARGIN;

  return [extremeX, extremeY];
}

function mapVertices(vertices, renderVertex) {
  return vertices.map((vertex, index) => {
    return {
      id: vertex.id,
      position: {
        x: vertex.left,
        y: vertex.top,
      },
      data: {
        label: vertex.label,
        vertex: vertex,
        renderVertex: renderVertex,
        index: index,
      },
      style: {
        width: vertex.width,
        height: vertex.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
      },
      type: 'customNode',
    };
  });
}

function mapEdges(edges, renderOverlays) {
  return edges.map(edge => ({
    id: edge.id,
    source: edge.sourceId,
    target: edge.targetId,
    type: 'customEdge',
    data: {
      renderOverlays: renderOverlays,
    },
  }));
}

const nodeTypes = { customNode: CustomeNode };
const edgeTypes = { customEdge: CustomEdge };

export default function Flow(props) {
  const onNodesChange = changes => {
    const changedVertices = applyNodeChanges(changes, initialNodes).map(v => {
      if (v.position.x != v.data.vertex.left) {
        const newVertex = {
          ...v.data.vertex,
          left: v.position.x,
          top: v.position.y,
        };
        return newVertex;
      }
      return v.data.vertex;
    });
    props.onAction({ type: 'NODE_CHANGE', payload: { changedVertices } });
  };

  const [extremeX, extremeY] = getExtremeXAndY(props.vertices);
  const initialNodes = mapVertices(props.vertices, props.renderVertex);
  const initialEdges = mapEdges(props.edges, props.renderOverlays);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      minZoom={0.2}
      maxZoom={1.8}
      onlyRenderVisibleElements
      translateExtent={[
        [0, 0],
        [extremeX, extremeY],
      ]}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      panOnScroll
      nodesDraggable
    >
      {props.renderBackground(extremeX, extremeY)}
      <MiniMap nodeColor="#999" nodeStrokeColor="#777" nodeStrokeWidth={5} />
      {props.enableZoom && <Controls />}
    </ReactFlow>
  );
}
