import React from "react";
import Login from "./Login";

import styled from "styled-components";

const Transfer = styled.section`
    color: #fefefe;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;

    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

const Step1 = styled.div`
    padding: 30px 0;

    div {
        display: flex;
        justify-content: center;
    }
`;

const Step2 = styled.div`
    padding: 30px 0;
`;

const H2 = styled.h2`
    padding-bottom: 30px;
`;

const Img = styled.img`
    width: 100%;
    max-width: 600px;
`;

const TransferPlayback = (props) => {
    return (
        <Transfer>
            <Step1 className={props.token == "" ? "" : "disabled"}>
                <H2>1. Login with Spotify.</H2>
                <div>
                    <Login loginText="Login" />
                </div>
            </Step1>
            <Step2 className={props.token != "" ? "" : "disabled"}>
                <H2>2. Transfer your playback using another Spotify app.</H2>
                <Img src={props.image} alt="Transfer Playback" />
            </Step2>
        </Transfer>
    );
};

export default TransferPlayback;
