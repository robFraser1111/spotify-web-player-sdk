import React from "react";
import styled from "styled-components";

const Nav = styled.header`
    display: flex;
    justify-content: end;
    align-items: center;

    div {
        padding-right: 30px;
    }
`;

const Logout = styled.button`
    color: #fefefe;
    padding: 10px 20px;
    background: transparent;
    border: 2px #fefefe solid;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
`;

const Header = (props) => {
    return (
        <Nav>
            <div>
                <Logout onClick={props.disconnect}>Logout</Logout>
            </div>
        </Nav>
    );
};

export default Header;
