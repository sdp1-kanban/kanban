import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'

export const Nav = styled.nav`
    display: grid;
    grid-template-columns: repeat(12, auto);
    grid-gap: 10px;
    height: auto;
    width: 100%;
    background-color: black;
    margin-bottom: 50px;
`;

export const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    font-family: 'Nunito', sans-serif;
    font-size: 1.5rem;
    color: black;
    text-decoration: none;
    margin-right: 40px;

    cursor: pointer;
    &.active{
        color: white;
    }
    &:hover{
        color: #d39624;
    }
`;

export const NavMenu = styled.div`
    grid-column: 12;
    display: flex;
    justify-content: right;
`;

export const NavTitle = styled.h1`
    margin-left: 40px;
`;