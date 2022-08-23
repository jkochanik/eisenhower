import React from "react";
import styled from "styled-components";

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
            <TBlock>
                <text>{this.props.name}</text>
            </TBlock>
        );
    }
}

export { Task }

