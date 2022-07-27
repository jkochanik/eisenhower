import React from 'react';
import ColorBlock from "./Block";
import styled from "styled-components";
import {TaskList} from "./TaskList";


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

    render() {
        return <ColorBlock fillColor={this.props.color}>
            <QuadrantName color={this.props.color}> {this.props.name} </QuadrantName>
            <TaskList/>
        </ColorBlock>
    }
}

export { Quadrant }