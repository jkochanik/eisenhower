import React from "react";
import styled from "styled-components";
import {Draggable} from 'react-beautiful-dnd';

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


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.name
        }
    };

    render() {
        return (
            <Draggable DraggableId={this.props.column.id} index={this.props.index}>
                {provided => (
                    <TBlock
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                    >
                        <text>{this.props.name}</text>
                    </TBlock>
                )}
            </Draggable>
        );
    }
}

export { Task }

