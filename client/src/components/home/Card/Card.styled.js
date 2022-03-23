import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'

export const CardContainer = styled.div`
    font-family: 'Open Sans', sans-serif;
    user-select: none;
    padding: 16px;
    margin: 0px 0px 15px 0px;
    min-height: 100px;
    border-left: 10px solid black;
    background-color: white;
    border-radius: 5px;
    color: black;
    box-shadow: 0px 3px 10px rgb(0 0 0 / 0.2);
    &h1{
        font-size: 1rem;
        font-weight: 400;
    }
    &h2{
        font-size: 0.5rem;
        font-weight: 300;
    }
`
export const CardTitle = styled(Link)`
    cursor: pointer;
    &.active{
        color: black;
    }
    &:hover{
        color: #d39624;
    }
    font-size: 1.17rem;
    font-weight: 800;
    text-decoration: none;
`
export const CardDueDate = styled.p`
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    padding-right: 8px;
    padding-left: 8px;
    color: white;
    margin: 0;
    background-color: #dc3545;
    border-radius: 3px;
`

export const Row1 = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0px;
    padding: 0px;
    margin-bottom: 15px;
`
export const Row2 = styled.div`
    display: block;
    margin: 0px;
    margin-bottom: 15px;
    padding: 0px;
`
export const Row2LeftCol = styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin: 0px;
    padding-bottom: 2px;
    text-align: left;
`
export const Row2RightCol = styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin: 0px;
    padding-bottom: 2px;
    text-align: right;
`
export const Table = styled.table`
    width: 100%;
    margin: 0px;
    padding: 0px;
`
export const ComboBox = styled.select`
    float: right;
    width: 100px;
    height: 25px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
`
export const Row3 = styled.div`
    display: block;
    margin: 0px;
    padding: 0px;
`
export const JobShortDescription = styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin: 0px;
    text-align: left;
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: end; 
`
export const MenuButton = styled.div`
    float: right;
    cursor: pointer;
    font-size: 2rem;
    line-height: 0;
    margin-bottom: 25px;
`
// Needs rework, temp card color is black until Ata 
// explains how he wants color coding done
/*function setCardColor(priority) {
    let color = '';
    
    if (priority == 'high') {
        color = '#e53529';
    } else if (priority == 'medium') {
        color = '#fee46d';
    } else {
        color = '#0ec275'
    }
    return color;
}*/