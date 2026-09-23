import React from "react";
import styled from "styled-components";
import thoughtsService from "../../services/thoughts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const DumpBox = styled.textarea`
  width: 100%;
  max-width: 600px;
  height: 120px;
  font-size: 16px;
  font-family: Oxygen;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid black;
  resize: vertical;
`;

const SaveButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const ThoughtsList = styled.ul`
  width: 100%;
  max-width: 600px;
  margin-top: 24px;
  padding: 0;
  list-style: none;
`;

const ThoughtItem = styled.li`
  background-color: gray;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
`;

// Stage 1: Brain Dump.
//
// The whole point of this page is to get a thought out of your head and
// saved with as little friction as possible — no categorizing, no deciding
// which quadrant it belongs in, just type and save. That sorting work
// happens later, in Elaborate/Sort.
class BrainDump extends React.Component {
  state = {
    text: "",
    thoughts: [],
  };

  // Load whatever's already been saved so this page isn't a total blank
  // slate with no feedback that saving is actually working.
  componentDidMount() {
    thoughtsService.getAll().then((thoughts) => {
      this.setState({ thoughts });
    });
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = (event) => {
    // Prevent the default full-page form submit/reload.
    event.preventDefault();

    const text = this.state.text.trim();
    if (!text) {
      return;
    }

    thoughtsService.create(text).then((thought) => {
      this.setState((prevState) => ({
        text: "",
        // New thought goes on top so the most recent one is easy to spot.
        thoughts: [thought, ...prevState.thoughts],
      }));
    });
  };

  // Enter saves, Shift+Enter still inserts a newline in the textarea — the
  // same convention as chat apps, so it should feel familiar.
  handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      this.handleSubmit(event);
    }
  };

  render() {
    return (
      <Wrapper>
        <h2>Brain Dump</h2>
        <form onSubmit={this.handleSubmit}>
          <DumpBox
            autoFocus
            placeholder="What's on your mind? (Enter to save, Shift+Enter for a new line)"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <br />
          <SaveButton type="submit">Save thought</SaveButton>
        </form>

        <ThoughtsList>
          {this.state.thoughts.map((thought) => (
            <ThoughtItem key={thought.id}>{thought.text}</ThoughtItem>
          ))}
        </ThoughtsList>
      </Wrapper>
    );
  }
}

export { BrainDump };
