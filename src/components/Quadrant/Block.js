import styled from 'styled-components'

const ColorBlock = styled.div`
    border: 2px ${props => props.fillColor || "black"} solid;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 400px;
    min-width: min-content;
    margin: 10px;
    `
;



export default ColorBlock;