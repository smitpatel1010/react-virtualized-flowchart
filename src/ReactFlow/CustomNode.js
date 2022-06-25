import { Handle, Position } from 'react-flow-renderer';

function CustomeNode({ data }) {
  const { vertex, label, index, renderVertex } = data;
  return (
    <div
      id={vertex.id}
      className="vertex"
      style={{
        height: vertex.height,
        width: vertex.width,
      }}
      data-id={vertex.id}
      data-index={label}
    >
      <Handle type="target" position={Position.Top} />
      {renderVertex({ vertex, index })}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomeNode;
