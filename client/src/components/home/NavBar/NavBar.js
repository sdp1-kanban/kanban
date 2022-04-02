import React from "react";
import { Nav, NavLink, NavMenu, NavTitle } from './NavBar.styled'

function NavBar() {
    return (
        <Nav>
            <NavLink to="/#">
                <NavTitle><span style={{ color: '#d39624' }}>PFC </span><span style={{ color: 'white' }}> Flexible Circuits</span></NavTitle>
            </NavLink>
            <NavMenu>
                <NavLink to={{
                    pathname: "/addjob",
                    state:{
                        mode: "add"
                    },
                }}>Add Job</NavLink>
                <NavLink to="/#">Job History</NavLink>
            </NavMenu>
        </Nav>
    );
}

export default NavBar;