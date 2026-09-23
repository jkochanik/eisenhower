import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
`;

const TaskName = styled.h3`
  margin: 0 0 16px;
  font-family: Oxygen;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-family: Oxygen;
  font-weight: 700;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 64px;
  font-size: 16px;
  font-family: Oxygen;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid black;
  resize: vertical;
  box-sizing: border-box;
`;

const ToggleRow = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid black;
  font-family: Oxygen;
  background-color: ${(props) => (props.$active ? "black" : "white")};
  color: ${(props) => (props.$active ? "white" : "black")};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

// The guided prompts that make up a task's elaboration. This list is the
// one place to add/reorder/reword a prompt — everything else (initial
// state, change handling, rendering) reads from it rather than hardcoding
// each field, since these prompts are expected to keep evolving.
//
// Every answer here, plus the task's own title (task.text), feeds the
// later clustering/categorization step, so prompts should stay short,
// free-text answers rather than pushing toward a rigid schema.
const QUESTIONS = [
  { key: "what", label: "What?", type: "textarea", placeholder: "What needs to happen?" },
  { key: "actionable", label: "Is it actionable?", type: "boolean" },
  { key: "why", label: "Why?", type: "textarea", placeholder: "Why does this matter?" },
  {
    key: "doingLooksLike",
    label: "What does doing look like?",
    type: "textarea",
    placeholder: "The first concrete step(s) of working on this.",
  },
  {
    key: "doneLooksLike",
    label: "What does done look like?",
    type: "textarea",
    placeholder: "How you'll know this is finished.",
  },
  { key: "next", label: "What would be next?", type: "textarea", placeholder: "What follows once this is done." },
];

// Builds a fresh { [questionKey]: answer } object, pulling from an
// existing `details` blob where present and defaulting to "" (or null for
// booleans, meaning "unanswered") otherwise.
function buildDetails(source) {
  const details = source || {};
  return QUESTIONS.reduce((acc, question) => {
    const existing = details[question.key];
    acc[question.key] = question.type === "boolean" ? existing ?? null : existing || "";
    return acc;
  }, {});
}

// Pop-up for extending a task's one-line text with a guided set of
// elaboration prompts (see QUESTIONS above). `onSave(id, patch)` stays
// generic — Sort/Elaborate just merge whatever patch this hands back.
class TaskDetailModal extends React.Component {
  state = {
    details: buildDetails(this.props.task && this.props.task.details),
  };

  // Sort/Elaborate keep a single modal instance mounted and just swap which
  // task it points at, so local edit state has to resync whenever a new
  // task is opened.
  componentDidUpdate(prevProps) {
    const prevId = prevProps.task && prevProps.task.id;
    const nextId = this.props.task && this.props.task.id;
    if (nextId && nextId !== prevId) {
      this.setState({ details: buildDetails(this.props.task.details) });
    }
  }

  handleFieldChange = (key, value) => {
    this.setState((prevState) => ({
      details: { ...prevState.details, [key]: value },
    }));
  };

  handleSave = () => {
    this.props.onSave(this.props.task.id, { details: this.state.details });
  };

  renderField = (question, isFirst) => {
    const value = this.state.details[question.key];

    if (question.type === "boolean") {
      return (
        <ToggleRow>
          <ToggleButton
            type="button"
            $active={value === true}
            onClick={() => this.handleFieldChange(question.key, true)}
          >
            Yes
          </ToggleButton>
          <ToggleButton
            type="button"
            $active={value === false}
            onClick={() => this.handleFieldChange(question.key, false)}
          >
            No
          </ToggleButton>
        </ToggleRow>
      );
    }

    return (
      <TextArea
        id={`task-${question.key}`}
        autoFocus={isFirst}
        placeholder={question.placeholder}
        value={value}
        onChange={(event) => this.handleFieldChange(question.key, event.target.value)}
      />
    );
  };

  render() {
    const { task, onClose } = this.props;

    if (!task) {
      return null;
    }

    return (
      <Overlay onClick={onClose}>
        {/* Stop clicks inside the box from bubbling to the overlay, so
            clicking a field/button doesn't close the modal. */}
        <ModalBox onClick={(event) => event.stopPropagation()}>
          <TaskName>{task.text}</TaskName>
          {QUESTIONS.map((question, index) => (
            <Field key={question.key}>
              <FieldLabel htmlFor={`task-${question.key}`}>{question.label}</FieldLabel>
              {this.renderField(question, index === 0)}
            </Field>
          ))}
          <ButtonRow>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={this.handleSave}>
              Save
            </Button>
          </ButtonRow>
        </ModalBox>
      </Overlay>
    );
  }
}

export { TaskDetailModal };
