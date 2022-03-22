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
`;
type CompanySelectTypes = {
    name: string;
    AccessKey: boolean;
};
const PcAssetMainPage = () => {
    let { type } = useParams<URLParamsType>();
    useEffect(() => {
        console.log(type);
    }, [type]);
    const [CompanySelectAccessKey, setCompanySelectAccessKey] = useState<CompanySelectTypes[]>([
        { name: 'DHKS', AccessKey: true },
        { name: 'YIKC', AccessKey: false },
        { name: 'EXICON', AccessKey: false },
        { name: 'SEMCNS', AccessKey: false },
        { name: 'SEMTEK', AccessKey: false },
        { name: 'DDDIA', AccessKey: false },
        { name: 'YIKJ', AccessKey: false },
        { name: 'DAS', AccessKey: false },
        { name: 'SEMMICRO', AccessKey: false },
    ]);

    const handleCompanyClicks = (data: { name: string }) => {
        const ChangeCompany = CompanySelectAccessKey.map((list, i) => {
            if (list.name === data.name) {
                list.AccessKey = true;
            } else {
                list.AccessKey = false;
            }
            return list;
        });
        setCompanySelectAccessKey(ChangeCompany);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    <NavigationMenuBarMainPage></NavigationMenuBarMainPage>
                </div>
                <LicenseMainPageContentMainPageDiv>
                    <LicenseMainPageMainDivBox>
                        <div>
                            <ul>
                                {CompanySelectAccessKey.map((list, i) => {
                                    return (
                                        <li key={list.name} onClick={() => handleCompanyClicks(list)}>
                                            {list.AccessKey ? (
                                                <>
                                                    <div className="LineText" style={{ color: '#050404', fontWeight: 'bold' }}>
                                                        {list.name}
                                                    </div>
                                                    <div className="LineActions"></div>
                                                </>
                                            ) : (
                                                <div className="LineText">{list.name}</div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </LicenseMainPageMainDivBox>

                    {/* {CompanySelectAccessKey.map((list, i) =>
                        list.AccessKey ? <DeskTopMainPage SelectCompany={list.name} type={type} key={list.name}></DeskTopMainPage> : ''
                    )} */}
                    <h1>IT 자산 프로그램</h1>
                </LicenseMainPageContentMainPageDiv>
            </div>
        </div>
    );
};

export default PcAssetMainPage;
