import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Grid } from "../../components/Grid";
import { Quadrant } from "../../components/Quadrant";
import { TaskDetailModal } from "../../components/TaskDetailModal";
import thoughtsService from "../../services/thoughts";

const UNSORTED = "UNSORTED";

// Turns the flat list of thoughts the server gives us into buckets keyed by
// quadrant, e.g. { UNSORTED: [...], DO: [...], PLAN: [...], ... } — this is
// the shape Grid/Quadrant need to render each column. Anything without a
// quadrant assigned yet (quadrant is null, fresh from Stage 1) falls into
// UNSORTED.
function groupByQuadrant(thoughts) {
  const groups = { [UNSORTED]: [], DO: [], PLAN: [], DELEGATE: [], "PUT OFF": [] };
  thoughts.forEach((thought) => {
    const key = thought.quadrant || UNSORTED;
    const bucket = groups[key] || groups[UNSORTED];
    bucket.push(thought);
  });
  return groups;
}

// Stage 3: Sort.
//
// Everything saved in Stage 1 (and, eventually, elaborated on in Stage 2)
// ends up here, starting in UNSORTED, ready to be dragged into whichever
// Eisenhower quadrant it belongs in.
class Sort extends React.Component {
  state = {
    thoughts: [],
    activeTask: null,
  };

  componentDidMount() {
    thoughtsService.getAll().then((thoughts) => {
      this.setState({ thoughts });
    });
  }

  handleTaskClick = (task) => {
    this.setState({ activeTask: task });
  };

  handleModalClose = () => {
    this.setState({ activeTask: null });
  };

  // Same update path drag-and-drop uses: update local state right away,
  // persist in the background, then close the modal.
  handleModalSave = (id, patch) => {
    this.setState((prevState) => ({
      thoughts: prevState.thoughts.map((thought) =>
        thought.id === id ? { ...thought, ...patch } : thought
      ),
      activeTask: null,
    }));

    thoughtsService.update(id, patch);
  };

  // Fires once per drag, whether it landed on a valid drop target or not.
  // `result` tells us which item moved (draggableId) and where it started
  // and ended up (source/destination droppableId + index).
  handleDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    // Dropped outside of any droppable — destination is null. Nothing to do.
    if (!destination) {
      return;
    }

    // Dropped back into the exact spot it started in — no real change.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // The droppableId *is* the quadrant name (see Quadrant/index.js), except
    // UNSORTED, which maps back to `quadrant: null` in our data model.
    const newQuadrant =
      destination.droppableId === UNSORTED ? null : destination.droppableId;

    // Update local state immediately (so the card visually moves the
    // instant you drop it) and persist the change to the server in the
    // background — we don't need to wait for the response before the UI
    // reflects the move.
    this.setState((prevState) => ({
      thoughts: prevState.thoughts.map((thought) =>
        thought.id === draggableId
          ? { ...thought, quadrant: newQuadrant }
          : thought
      ),
    }));

    thoughtsService.update(draggableId, { quadrant: newQuadrant });
  };

  render() {
    const tasksByQuadrant = groupByQuadrant(this.state.thoughts);

    return (
      // DragDropContext must wrap every Droppable a card might be dragged
      // between. Grid's 4 quadrants and the standalone Unsorted quadrant
      // below it all need to live under the same context, or dragging
      // between them won't work.
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Grid tasksByQuadrant={tasksByQuadrant} onTaskClick={this.handleTaskClick} />
        <Quadrant
          name={UNSORTED}
          color="black"
          tasks={tasksByQuadrant[UNSORTED]}
          onTaskClick={this.handleTaskClick}
        />
        <TaskDetailModal
          task={this.state.activeTask}
          onClose={this.handleModalClose}
          onSave={this.handleModalSave}
        />
      </DragDropContext>
    );
  }
}

export { Sort };
