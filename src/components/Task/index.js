import React from "react";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";

const TBlock = styled.div`
  display: flex;
  background-color: gray;
  flex-shrink: 0;
  height: Auto;
  min-width: min-content;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.3s ease background-color;

  &:hover {
    background-color: var(--grey-2);
  }
`;

// A single draggable task card. `id` and `index` are required by
// react-beautiful-dnd/@hello-pangea/dnd's <Draggable>:
//   - id tells it *which* item is being dragged (must be unique and stable)
//   - index tells it *where* the item currently sits within its list, so it
//     can figure out reordering when you drop it somewhere new
function Task({ id, index, name, onClick }) {
  return (
    <Draggable draggableId={id} index={index}>
      {/* <Draggable> uses the "render prop" pattern: instead of JSX
          children, it hands us a function that receives `provided` —
          the ref and drag-handling props we must spread onto our DOM
          node for dragging to actually work. */}
      {(provided) => (
        <TBlock
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <span>{name}</span>
        </TBlock>
      )}
    </Draggable>
  );
}

export { Task };
