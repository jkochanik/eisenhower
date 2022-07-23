import React from "react";
import styled from "styled-components";
import {Quadrant} from "../Quadrant";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`;

class Grid extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <GridContainer>
            <Quadrant name="DO" color="blue"></Quadrant>
            <Quadrant name="PLAN"></Quadrant>
            <Quadrant name="DELEGATE"></Quadrant>
            <Quadrant name="PUT OFF"></Quadrant>
        </GridContainer>
    }
}

export { Grid }