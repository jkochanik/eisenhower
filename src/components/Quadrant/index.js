import React from 'react';
import ColorBlock from "./Block";
import styled from "styled-components";

const SectionName = styled.text`
    color: white;
`;

class SectionBlock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            name: props.name
        }
    }

    render() {
        return <ColorBlock fillColor={this.props.color}>
            <SectionName> {this.props.name} </SectionName>
        </ColorBlock>
    }
}

export { SectionBlock }