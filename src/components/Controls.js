import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    solid,
    regular,
    brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 900px) {
        grid-template-rows: 1fr 1fr 1fr;
    }
`;

const Button = styled.button`
    background-color: transparent;
    border: 2px transparent;
    border-radius: 50px;
    color: #fefefe;
    margin: 20px;
    width: 80px;
    transition: 0.1s;
    cursor: pointer;

    &:hover {
        color: #44c767;
        font-size: 105%;
    }

    @media (max-width: 900px) {
        width: 40px;

        &:hover {
            font-size: revert;
        }
    }
`;

const PlayButtons = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    grid-column-start: 2;
    grid-column-end: 3;

    @media (max-width: 900px) {
        grid-row-start: 2;
    }
`;

const Queue = styled.div`
    padding-left: 30px;
    align-self: center;

    @media (max-width: 900px) {
        grid-column-start: 1;
        grid-column-end: 3;
        padding-left: 20px;
    }
`;

const VolumeControls = styled.div`
    display: flex;
    justify-self: end;
    grid-column-start: 3;
    grid-column-end: 4;
    padding-right: 30px;

    svg {
        float: left;
        padding-left: 20px;
    }

    @media (max-width: 900px) {
        grid-row-start: 3;
        grid-column-start: 1;
        grid-column-end: 4;
        justify-self: center;
        width: 100%;
        padding: 0 20px;
        margin-bottom: 20px;

        Button {
            margin: 20px 40px 20px 0;
        }

        svg {
            padding-left: 0;
        }

        input {
            width: 100%;
        }
    }
`;

const Controls = (props) => {
    const [volumeIcon, setVolumeIcon] = useState(undefined);

    useEffect(() => {
        if (props.volume < 0.1) {
            setVolumeIcon(
                <FontAwesomeIcon icon={solid("volume-mute")} size="2x" />
            );
        } else if (props.volume >= 0.6) {
            setVolumeIcon(
                <FontAwesomeIcon icon={solid("volume-up")} size="2x" />
            );
        } else {
            setVolumeIcon(
                <FontAwesomeIcon icon={solid("volume-down")} size="2x" />
            );
        }
    }, [props.volume]);

    return (
        <Wrapper>
            <Queue>
                <p>
                    <strong>Next track:</strong>
                    <br />
                    {props.upComingTracks}
                </p>
            </Queue>
            <PlayButtons>
                <Button onClick={props.previousTrack}>
                    <FontAwesomeIcon icon={solid("step-backward")} size="2x" />
                </Button>

                <Button onClick={props.togglePlay}>
                    {props.paused ? (
                        <FontAwesomeIcon icon={solid("play")} size="3x" />
                    ) : (
                        <FontAwesomeIcon icon={solid("pause")} size="3x" />
                    )}
                </Button>

                <Button onClick={props.nextTrack}>
                    <FontAwesomeIcon icon={solid("step-forward")} size="2x" />
                </Button>
            </PlayButtons>

            <VolumeControls>
                <Button onClick={props.mute}>{volumeIcon}</Button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    value={props.volume}
                    onChange={props.changeVolume}
                    step="0.1"
                    id="volume"
                />
            </VolumeControls>
        </Wrapper>
    );
};

export default Controls;
