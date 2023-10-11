import React from "react";
import {NavLink} from "react-router-dom";

function Nav(){
    return(
        <ul>
            <li>
                <NavLink to="/merch1">Товар 1</NavLink>
            </li>
            <li>
                <NavLink to="/merch2">Товар 2</NavLink>
            </li>
            <li>
                <NavLink to="/merch3">Товар 3</NavLink>
            </li>
            <li>
                <NavLink to="/merch4">Товар 4</NavLink>
            </li>
            <li>
                <NavLink to="/merch5">Товар 5</NavLink>
            </li>
        </ul>
    )
}

export default Nav