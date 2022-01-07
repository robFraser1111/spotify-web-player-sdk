import React, { useState } from "react";
import WebPlayback from "./components/WebPlayback";
import "./App.css";
import styled from "styled-components";

const Wrapper = styled.div`
    background-color: #333333;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    overflow: auto;
`;

function App() {
    const [backgroundImage, setBackgroundImage] = useState("");

    const changeBackground = (image) => {
        setBackgroundImage(image);
    };

    return (
        <Wrapper style={{ backgroundImage: `url(${backgroundImage})` }}>
            <WebPlayback background={changeBackground} />
        </Wrapper>
    );
}

export default App;
