import styled from 'styled-components'

const ColorBlock = styled.div`
    background-color: ${props => props.fillColor || "blue"};
    flex-grow: 1;
    height: 800px;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 5px solid black;

    &:hover {
      background-color: ${(props) => props.hoverFillColor || "white"};
    }
    `
;



export default ColorBlock;