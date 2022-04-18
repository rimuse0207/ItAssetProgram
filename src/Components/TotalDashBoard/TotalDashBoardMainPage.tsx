import React from 'react';
import styled from 'styled-components';
import { IoDesktopSharp } from 'react-icons/io5';
import { SiMicrosoftoffice } from 'react-icons/si';

const TotalDashBoardMainPageMainDivBox = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    .TotalDashBoardMainPage_ContainerBox {
        h2 {
            margin-top: 30px;
            margin-bottom: 30px;
        }
        ul {
            display: flex;
            justify-content: space-between;
            li {
                width: 23%;
                height: 300px;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px lightgray;
                background-color: #e0e2e5;
                .TotalDashBoardMainPage_BoxTitle {
                    height: 60px;
                    background-color: #4672c9;
                    border-radius: 10px 10px 0px 0px;
                    h4 {
                        font-size: 1.5em;
                        color: white;
                        padding: 10px;
                        padding-left: 20px;
                    }
                }

                .TotalDashBoardMainPage_IconCotainer {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    .TotalDashBoardMainPage_Icons {
                        margin-top: 20px;
                        width: 45%;
                        height: 160px;
                        background-color: #fff;
                        border-radius: 10px;
                        h4 {
                            text-align: center;
                            margin-top: 20px;
                            color: #6b7edb;
                        }
                        h5 {
                            text-align: center;
                            font-size: 1.8em;
                        }
                        .icons {
                            font-size: 2.5em;
                            text-align: center;
                            color: #6b7edb;
                        }
                    }
                }
            }
        }
    }
    .ScrollProgressBarContainer {
        display: flex;
        font-size: 0.8em;
        height: 60px;
        justify-content: space-around;
        align-items: center;
        .ProgressBar {
            width: 60%;
            height: 10px;
            display: inline-block;
            border-radius: 30px;
            position: relative;
            background-color: gray;
            .ProgressBarIsgoing {
                position: absolute;
                top: 0px;
                left: 0px;
                background-color: #1452b7;
                height: 10px;
                border-radius: 30px;
            }
        }
    }
`;

const TotalDashBoardMainPage = () => {
    return (
        <TotalDashBoardMainPageMainDivBox>
            <div className="TotalDashBoardMainPage_ContainerBox">
                <h2>메인 대시보드</h2>
                <div>
                    <ul>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>YIKC</h4>
                            </div>
                            <div className="TotalDashBoardMainPage_IconCotainer">
                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>자산</h4>
                                    <div className="icons">
                                        <IoDesktopSharp></IoDesktopSharp>
                                    </div>
                                    <h5>2</h5>
                                </div>

                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>소프트웨어</h4>
                                    <div className="icons">
                                        <SiMicrosoftoffice></SiMicrosoftoffice>
                                    </div>
                                    <h5>2</h5>
                                </div>
                            </div>
                            <div className="ScrollProgressBarContainer">
                                <div>자산 사용률</div>
                                <div className="ProgressBar">
                                    <div style={{ width: '50%' }} className="ProgressBarIsgoing"></div>
                                </div>
                                <div>50%</div>
                            </div>
                        </li>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>EXICON</h4>
                            </div>
                            <div className="TotalDashBoardMainPage_IconCotainer">
                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>자산</h4>
                                    <div className="icons">
                                        <IoDesktopSharp></IoDesktopSharp>
                                    </div>
                                    <h5>2</h5>
                                </div>

                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>소프트웨어</h4>
                                    <div className="icons">
                                        <SiMicrosoftoffice></SiMicrosoftoffice>
                                    </div>
                                    <h5>2</h5>
                                </div>
                            </div>
                            <div className="ScrollProgressBarContainer">
                                <div>자산 사용률</div>
                                <div className="ProgressBar">
                                    <div style={{ width: '70%' }} className="ProgressBarIsgoing"></div>
                                </div>
                                <div>70%</div>
                            </div>
                        </li>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>SEMCNS</h4>
                            </div>
                            <div className="TotalDashBoardMainPage_IconCotainer">
                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>자산</h4>
                                    <div className="icons">
                                        <IoDesktopSharp></IoDesktopSharp>
                                    </div>
                                    <h5>2</h5>
                                </div>

                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>소프트웨어</h4>
                                    <div className="icons">
                                        <SiMicrosoftoffice></SiMicrosoftoffice>
                                    </div>
                                    <h5>2</h5>
                                </div>
                            </div>
                            <div className="ScrollProgressBarContainer">
                                <div>자산 사용률</div>
                                <div className="ProgressBar">
                                    <div style={{ width: '80%' }} className="ProgressBarIsgoing"></div>
                                </div>
                                <div>80%</div>
                            </div>
                        </li>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>DHKS</h4>
                            </div>
                            <div className="TotalDashBoardMainPage_IconCotainer">
                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>자산</h4>
                                    <div className="icons">
                                        <IoDesktopSharp></IoDesktopSharp>
                                    </div>
                                    <h5>2</h5>
                                </div>

                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>소프트웨어</h4>
                                    <div className="icons">
                                        <SiMicrosoftoffice></SiMicrosoftoffice>
                                    </div>
                                    <h5>2</h5>
                                </div>
                            </div>
                            <div className="ScrollProgressBarContainer">
                                <div>자산 사용률</div>
                                <div className="ProgressBar">
                                    <div style={{ width: '30%' }} className="ProgressBarIsgoing"></div>
                                </div>
                                <div>30%</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </TotalDashBoardMainPageMainDivBox>
    );
};

export default TotalDashBoardMainPage;
