import React from "react";
import styled from "styled-components";
import {Quadrant} from "../Quadrant";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`;

// The 2x2 Eisenhower grid. `tasksByQuadrant` is an object keyed by quadrant
// name (e.g. { DO: [...], PLAN: [...], ... }) built by the Sort page — Grid
// itself doesn't fetch or own any task data, it just distributes it.
class Grid extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const tasksByQuadrant = this.props.tasksByQuadrant || {};

        const { onTaskClick } = this.props;

        return <GridContainer>
            <Quadrant name="DO"       color="#94D564" tasks={tasksByQuadrant.DO} onTaskClick={onTaskClick}></Quadrant>
            <Quadrant name="PLAN"     color="#57BFCA" tasks={tasksByQuadrant.PLAN} onTaskClick={onTaskClick}></Quadrant>
            <Quadrant name="DELEGATE" color="#EF965D" tasks={tasksByQuadrant.DELEGATE} onTaskClick={onTaskClick}></Quadrant>
            <Quadrant name="PUT OFF"  color="#EC635D" tasks={tasksByQuadrant["PUT OFF"]} onTaskClick={onTaskClick}></Quadrant>
        </GridContainer>
    }
}

export { Grid }
