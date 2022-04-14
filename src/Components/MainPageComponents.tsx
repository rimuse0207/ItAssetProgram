import React, { useEffect, useState } from 'react';
import NavigationMenuBarMainPage from './Navigation/NavigationMenuBarMainPage';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DeskTopMainPage from './PCAssetMainPage/DeskTop/DeskTopMainPage';

type URLParamsType = {
    type: string;
};

const LicenseMainPageMainDivBox = styled.div`
    width: 100%;
    border-bottom: 2px solid lightgray;
    margin-top: 20px;
    margin-bottom: 20px;
    ul {
        display: flex;
        li {
            :hover {
                cursor: pointer;
            }
            .LineText {
                font-size: 1em;
                color: #999;
                background-color: transparent;
                height: 40px;
                line-height: 38px;
                padding: 0 40px;
            }
            position: relative;
            .LineActions {
                position: absolute;
                animation-name: slidings;
                animation-duration: 0.8s;
                @keyframes slidings {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
                border-bottom: 2px solid #515151;
                width: 100%;
            }
        }
    }
    
`;

const LicenseMainPageContentMainPageDiv = styled.div`
    padding-left: 20px;
    min-height: 100vh;
    width: 100%;
    background-color: #efefef;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 7px solid transparent;
        background-clip: content-box;
        background-color: #368;
    }

    .AssetDocs{
        width: 80%;
        
        ul{
            padding-left:20px;
            li{
                padding-left:10px;
                margin-top: 20px;
                list-style-type: circle;
            }

        }
    }
`;
type CompanySelectTypes = {
    name: string;
    AccessKey: boolean;
};
const PcAssetMainPage = () => {
    let { type } = useParams<URLParamsType>();

    return (
        <LicenseMainPageContentMainPageDiv>
            <LicenseMainPageMainDivBox>
                <div>
                    <ul></ul>
                </div>
            </LicenseMainPageMainDivBox>

            <h1>IT 자산 프로그램</h1>
            
            <div>
                <div className="AssetDocs">
                    <h3>컴퓨터 취급관리</h3>
                    <ul>
                        <li>
                            <p>
                                회사에서 지급된 컴퓨터(데스크톱,
                                노트북, 일체형, 태블릿, 그 밖의 형태의 정보처리기기를 포함하여 이하)는
                                취급자에게 책임이 있다.
                            </p>
                        </li>
                        <li>
                            <p>
                                개인용 컴퓨터로 전산망을 사용하고자 하는 직원은 스마트IT팀에
                                등록요청을 하여야 하며 스마트IT팀의 등록에 의하여 사용한다
                            </p>
                        </li>
                        <li>
                            <p>
                                개인 소유의 개인용 컴퓨터를 주요정보가 처리, 보관되는 연구원 내부에
                                반입하여 사용할 수 없다. 다만, 부득이한 경우에는 소속 부서의 장의 승인을
                                받아 반입할 수 있다.
                            </p>
                        </li>
                        <li>
                            <p>
                                회사 소유의 개인용 컴퓨터를 수리 또는 교체하는 경우 정보자료를 모두
                                삭제하거나 하드디스크를 분리 제거를 위해 스마트IT팀에 수리의뢰 하여야 한다.
                            </p>
                        </li>
                        <li>
                            <p>
                                개인용 컴퓨터 사용자는 암호 설정 및 백신프로그램을 설치하여 보안에 만전을기한다
                            </p>
                        </li>
                        <li>
                            <p>
                                임직원은 전체 개인용 컴퓨터의 전산보안을 강화하기 위하여 패치관리시스템
                                및 보안관리 클라이언트 프로그램을 이용할 수 있고, 업무용 모든 개인용
                                컴퓨터는 보안관리 클라이언트 프로그램을 의무적으로 설치해야 하며 미설치
                                개인용 컴퓨터는 외부망 접속을 차단할 수 있다.
                            </p>

                        </li>
                    </ul>
                </div>
            </div>
        </LicenseMainPageContentMainPageDiv>
    );
};

export default PcAssetMainPage;
