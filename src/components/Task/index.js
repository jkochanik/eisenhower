import React from "react";
import styled from "styled-components";

const TBlock = styled.div`
  flex-basis: 25px;
  flex-shrink: 0;
  height: 25px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;
  transition: 0.3s ease background-color;

  &:hover {
    background-color: var(--grey-2);
  }

  svg {
    width: 100%;
    height: 100%;
    stroke: white;
    display: flex;
    align-items: center;
    justify-content: center;
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
                <text>{this.name}</text>
            </TBlock>
        );
    }
}

export { Task }

