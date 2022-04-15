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
                width: 24%;
                height: 300px;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px lightgray;
                background-color: #e0e2e5;
                .TotalDashBoardMainPage_BoxTitle {
                    height: 60px;
                    background-color: #58678e;
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
                        height: 150px;
                        background-color: #fff;
                        border-radius: 10px;
                        h4 {
                            text-align: center;
                        }
                        .icons {
                            font-size: 2.5em;
                            text-align: center;
                        }
                    }
                }
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
                                    <h4>2</h4>
                                    <div>
                                        <span>O 2</span>
                                        <span>O 0</span>
                                        <span>O 0</span>
                                    </div>
                                </div>

                                <div className="TotalDashBoardMainPage_Icons">
                                    <h4>자산</h4>
                                    <div className="icons">
                                        <SiMicrosoftoffice></SiMicrosoftoffice>
                                    </div>
                                    <h4>2</h4>
                                    <div>
                                        <span>O 2</span>
                                        <span>O 0</span>
                                        <span>O 0</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>EXICON</h4>
                            </div>
                        </li>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>SEMCNS</h4>
                            </div>
                        </li>
                        <li>
                            <div className="TotalDashBoardMainPage_BoxTitle">
                                <h4>DHKS</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </TotalDashBoardMainPageMainDivBox>
    );
};

export default TotalDashBoardMainPage;
