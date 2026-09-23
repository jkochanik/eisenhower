import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import { Task } from "../Task";

// flex: 1 makes this fill whatever space is left in the quadrant instead of
// shrinking to fit its content — without that, an empty list (0 tasks) has
// zero height, so there'd be nothing to actually drop a card onto. The
// min-height is a floor for that same reason, in case the quadrant itself
// hasn't grown yet (e.g. before layout settles).
//
// $isDraggingOver is a "transient prop" (the $ prefix): styled-components
// strips it before passing props down to the underlying <div>, so React
// doesn't warn about an unknown DOM attribute.
const DropZone = styled.div`
  flex: 1;
  width: 100%;
  min-height: 120px;
  padding: 8px;
  border-radius: 12px;
  transition: 0.2s ease background-color;
  background-color: ${(props) => (props.$isDraggingOver ? "rgba(0, 0, 0, 0.08)" : "transparent")};
`;

// Renders one droppable column of tasks. `droppableId` is how the parent
// <DragDropContext>'s onDragEnd knows which list a drag started/ended in —
// we use the quadrant name itself ("DO", "PLAN", ... or "UNSORTED") so it
// lines up directly with the `quadrant` field stored on each thought.
class TaskList extends React.Component {
  render() {
    const { tasks, droppableId, onTaskClick } = this.props;

    return (
      <Droppable droppableId={droppableId}>
        {/* Same render-prop pattern as <Draggable>: `provided` gives us the
            ref/props the droppable container needs (attach `innerRef` to
            the actual drop-target DOM node), and `snapshot` tells us things
            like whether a card is currently being dragged over this list —
            that's what drives the highlight below. */}
        {(provided, snapshot) => (
          <DropZone
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                id={task.id}
                index={index}
                name={task.text}
                onClick={() => onTaskClick && onTaskClick(task)}
              />
            ))}
            {/* placeholder reserves space for the item being dragged in,
                so the list doesn't jump around while you drag. */}
            {provided.placeholder}
          </DropZone>
        )}
      </Droppable>
    );
  }
}

export { TaskList };
