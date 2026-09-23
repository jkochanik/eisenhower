import styled from 'styled-components'

const ColorBlock = styled.div`
    border: 2px ${props => props.fillColor || "black"} solid;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    /* stretch (not center) so the TaskList below can fill the full width/
       height of the quadrant — otherwise an empty TaskList shrinks to zero
       size and there's nothing to drop a card onto. */
    align-items: stretch;
    min-height: 400px;
    min-width: min-content;
    margin: 10px;
    `
;



export default ColorBlock;