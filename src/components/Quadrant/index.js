import React from 'react';
import ColorBlock from "./Block";
import styled from "styled-components";
import {TaskList} from "./TaskList";
import {DragDropContext} from "react-beautiful-dnd";


const QuadrantName = styled.h2`
    color: ${props => props.color || "black"};
    font-style: normal;
    font-family: Oxygen;
    font-weight: 700;
  
`;

class Quadrant extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            name: props.name,
        }
    }

    onDragEnd = result => {
        //TODO Reoreder Column
    }

    render() {
        return <DragDropContext onDragEnd={this.onDragEnd}>
         <ColorBlock fillColor={this.props.color}>
                <QuadrantName color={this.props.color}> {this.props.name} </QuadrantName>
                <TaskList/>
            </ColorBlock>
        </DragDropContext>
    }
}

export { Quadrant }