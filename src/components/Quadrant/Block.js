import styled from 'styled-components'

const ColorBlock = styled.div`
    border-color: ${props => props.fillColor || "black"};
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-content: center;
    `
;



export default ColorBlock;