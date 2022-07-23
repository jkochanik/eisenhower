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
            <Quadrant name="DO"       color="#94D564"></Quadrant>
            <Quadrant name="PLAN"     color="#57BFCA"></Quadrant>
            <Quadrant name="DELEGATE" color="#EF965D"></Quadrant>
            <Quadrant name="PUT OFF"  color="#EC635D"></Quadrant>
        </GridContainer>
    }
}

export { Grid }