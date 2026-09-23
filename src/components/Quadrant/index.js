import React from 'react';
import ColorBlock from "./Block";
import styled from "styled-components";
import {TaskList} from "./TaskList";


const QuadrantName = styled.h2`
    color: ${props => props.color || "black"};
    font-style: normal;
    font-family: Oxygen;
    font-weight: 700;
    /* ColorBlock now stretches its children full-width (see Block.js), so
       this has to center its own text instead of relying on the parent
       flexbox to center the whole element. */
    text-align: center;
    margin: 8px 0;
`;

// A single quadrant (DO/PLAN/DELEGATE/PUT OFF/UNSORTED). It's now
// presentational: the Sort page owns the actual task data and just hands
// this component the slice (`tasks`) that belongs in this quadrant.
class Quadrant extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            name: props.name,
        }
    }

    render() {
        return <ColorBlock fillColor={this.props.color}>
            <QuadrantName color={this.props.color}> {this.props.name} </QuadrantName>
            {/* The quadrant's name doubles as its droppableId (e.g. "DO"),
                which is also the exact value we store in a thought's
                `quadrant` field — keeps the drag-and-drop id and the data
                model in sync with no extra mapping. */}
            <TaskList
                tasks={this.props.tasks || []}
                droppableId={this.props.name}
                onTaskClick={this.props.onTaskClick}
            />
        </ColorBlock>
    }
}

export { Quadrant }
