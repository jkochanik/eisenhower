import React from "react";
import styled from "styled-components";
import thoughtsService from "../../services/thoughts";
import { TaskDetailModal } from "../../components/TaskDetailModal";

const Wrapper = styled.div`
  padding: 24px;
`;

const ThoughtsList = styled.ul`
  max-width: 600px;
  padding: 0;
  list-style: none;
`;

const ThoughtItem = styled.li`
  background-color: gray;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: 0.3s ease background-color;

  &:hover {
    background-color: var(--grey-2);
  }
`;

// Stage 2: Elaborate & Categorize.
//
// This is intentionally just a skeleton for now — it proves the thoughts
// saved in Stage 1 flow through to here, but the actual
// elaborating/categorizing UI is TBD (more details to come). For now it's
// a read-only list so there's a working page to build on top of.
class Elaborate extends React.Component {
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

  handleModalSave = (id, patch) => {
    this.setState((prevState) => ({
      thoughts: prevState.thoughts.map((thought) =>
        thought.id === id ? { ...thought, ...patch } : thought
      ),
      activeTask: null,
    }));

    thoughtsService.update(id, patch);
  };

  render() {
    return (
      <Wrapper>
        <h2>Elaborate &amp; Categorize</h2>
        <p>
          Placeholder page — categorization UI coming soon. Click a thought
          to add notes. Here's every thought saved so far:
        </p>
        <ThoughtsList>
          {this.state.thoughts.map((thought) => (
            <ThoughtItem key={thought.id} onClick={() => this.handleTaskClick(thought)}>
              {thought.text}
            </ThoughtItem>
          ))}
        </ThoughtsList>
        <TaskDetailModal
          task={this.state.activeTask}
          onClose={this.handleModalClose}
          onSave={this.handleModalSave}
        />
      </Wrapper>
    );
  }
}

export { Elaborate };
