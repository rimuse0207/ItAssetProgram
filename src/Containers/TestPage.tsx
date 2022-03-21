import React from 'react';
import styled from 'styled-components';

const TestPageMainDivBox = styled.div`
    border: 3px solid black;
    min-height: 100vh;
    min-width: 100vw;

    .First {
        border: 1px solid black;
        width: 300px;
        height: 30px;
    }
    .Second {
        border: 1px solid black;
        width: 300px;
        height: 30px;
    }
    .Third {
        border: 1px solid black;
        width: 300px;
        height: 30px;
    }
`;

const TestPage = () => {
    return (
        <TestPageMainDivBox>
            <ul className="First">
                <li>
                    <ul className="Second">
                        <li>
                            <ul>
                                <li className="Third"></li>
                                <li className="Third"></li>
                                <li className="Third"></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className="Second">
                        <li>
                            <ul>
                                <li className="Third"></li>
                                <li className="Third"></li>
                                <li className="Third"></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </TestPageMainDivBox>
    );
};

export default TestPage;
