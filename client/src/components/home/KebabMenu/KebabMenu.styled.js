import styled from "styled-components";

export const MenuContainer = styled.div`
    background: white;
    box-shadow: 0px 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 5px;
    display: inline-block;
    position: absolute;
    left: ${props => props.location.pageX + 'px'};
    top: ${props => props.location.pageY + 'px'};
    visibility: ${props => props.showMenu ? 'visible' : 'hidden' }
`;

export const MenuList = styled.ul`
    padding: 0;
    margin: 10px 0;
`

export const MenuItem = styled.li`
    padding: 0 10px;    
    list-style: none;
    &:hover {
        background: #f4f5f6;
        cursor: pointer;
    }
`
