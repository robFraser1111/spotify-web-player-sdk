import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Controls from "./Controls";
import TransferPlayback from "./TransferPlayback";
import Header from "./Header";

import PlaybackImage from "../images/spotify-transfer-playback-01.png";

const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
`;

const Wrapper = styled.div`
    padding-top: 45px;
    align-items: center;
    display: flex;
    height: 100%;
    margin: 0 auto;
    justify-content: center;
    position: relative;
    width: 80%;
    z-index: 1;

    @media (max-width: 900px) {
        width: 100%;
        flex-direction: column;
    }
`;

const Player = styled.section`
    display: grid;
    height: 100vh;
    grid-template-rows: 100px auto 200px;
`;

const Cover = styled.img`
    border-radius: 8px;
    float: left;
    margin-right: 10px;
    text-align: right;
    width: 500px;
    height: 500px;

    @media (max-width: 900px) {
        margin-right: 0;
        width: 300px;
        height: 300px;
    }
`;

const Side = styled.div`
    margin-left: 2%;
    width: 45%;

    @media (max-width: 900px) {
        width: 100%;
        margin-left: 0%;
        max-width: 600px;
        padding: 20px;
    }
`;

const NowPlaying = styled.div`
    font-size: 1.5em;
    margin-bottom: 0.2em;
`;

const Artist = styled.div`
    margin-bottom: 1em;
`;

const track = {
    uri: "", // Spotify URI
    id: "", // Spotify ID from URI (can be null)
    type: "", // Content type: can be "track", "episode" or "ad"
    media_type: "", // Type of file: can be "audio" or "video"
    name: "", // Name of content
    is_playable: true, // Flag indicating whether it can be played
    album: {
        uri: "", // Spotify Album URI
        name: "",
        images: [{ url: "" }],
    },
    artists: [{ uri: "", name: "" }],
};

const WebPlayback = (props) => {
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [next_tracks, setNextTrack] = useState("");
    const [volume, setVolume] = useState(0.2);

    const [token, setToken] = useState("");

    // Step 1 is to authenticate the user and receive a token
    useEffect(() => {
        async function getToken() {
            const response = await fetch("/auth/token");
            const json = await response.json();
            setToken(json.access_token);
        }

        getToken();
    }, []);

    // Step 2 is to give the web player control once the token has been created
    useEffect(() => {
        if (token === "") {
            return;
        }

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "Web Playback SDK",
                getOAuthToken: (cb) => {
                    cb(token);
                },
                volume,
            });

            setPlayer(player);

            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
            });

            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            player.addListener("player_state_changed", (state) => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setNextTrack(state.track_window.next_tracks[0]);

                setPaused(state.paused);

                player.getCurrentState().then((state) => {
                    !state ? setActive(false) : setActive(true);
                });
            });

            player.connect().then((success) => {
                if (success) {
                    console.log(
                        "The Web Playback SDK successfully connected to Spotify!"
                    );
                }
            });
        };
    }, [token]);

    // Volume control
    useEffect(() => {
        if (player === undefined) {
            return;
        }

        player.setVolume(volume).then(() => {
            console.log("Volume updated to " + volume);
        });
    }, [volume]);

    const previousTrack = () => {
        player.previousTrack();
    };

    const togglePlay = () => {
        player.togglePlay();
    };

    const nextTrack = () => {
        player.nextTrack();
    };

    const seek = () => {
        player.seek(60 * 1000);
    };

    const changeVolume = (e) => {
        setVolume(e.target.value);
    };

    const toggleMute = () => {
        if (volume != 0) {
            setVolume(0);
        } else {
            setVolume(0.2);
        }

        player.setVolume(volume).then(() => {
            console.log("Volume updated!");
        });
    };

    const disconnect = () => {
        player.disconnect();
        props.background("");

        console.log("Disconnected App");

        setActive(false);
    };

    // Set background image
    useEffect(() => {
        props.background(current_track.album.images[0].url);
    }, [current_track]);

    if (!is_active) {
        return (
            <>
                <TransferPlayback token={token} image={PlaybackImage} />
            </>
        );
    } else {
        return (
            <Player>
                <Header disconnect={disconnect} />
                <Container>
                    <Wrapper>
                        <Cover
                            src={current_track.album.images[0].url}
                            alt="Album cover"
                        />

                        <Side>
                            <NowPlaying>{current_track.name}</NowPlaying>
                            <Artist>{current_track.artists[0].name}</Artist>

                            <div>{current_track.album.name}</div>
                        </Side>
                    </Wrapper>
                </Container>

                <Controls
                    upComingTracks={next_tracks.name}
                    previousTrack={previousTrack}
                    togglePlay={togglePlay}
                    nextTrack={nextTrack}
                    seek={seek}
                    paused={is_paused}
                    volume={volume}
                    mute={toggleMute}
                    changeVolume={changeVolume}
                    disconnect={disconnect}
                />
            </Player>
        );
    }
};

export default WebPlayback;
