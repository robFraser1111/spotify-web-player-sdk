import React from "react";
import styled from "styled-components";

const Disclaimer = styled.footer`
    text-align: center;
    font-size: 1rem;
    padding: 1rem;
`;

const Link = styled.a`
    color: #fefefe;
`

const currentYear = new Date().getUTCFullYear();

const Footer = (props) => {
    return (
        <Disclaimer>
            <p>
                <Link
                    href="https://github.com/robFraser1111"
                    target="_blank"
                    rel="noopener"
                >
                    {props.text} {currentYear}
                </Link>
            </p>
        </Disclaimer>
    );
};

export default Footer;
