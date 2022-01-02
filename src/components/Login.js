import React from "react";
import styled from "styled-components";

const Auth = styled.a`
    color: #fefefe;
    padding: 10px 20px;
    background: #44c767;
    border: 1px #44c767;
    border-radius: 4px;
    font-size: 16px;
`;

const Login = (props) => {

    return (
        <>
            <Auth href="/auth/login">{props.loginText}</Auth>
        </>
    );
};

export default Login;
