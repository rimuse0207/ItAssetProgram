import React, { useState, useEffect } from 'react';
import NavigationMenuBarMainPage from '../Navigation/NavigationMenuBarMainPage';
import { useParams } from 'react-router-dom';
import VolumeLicenseMainPage from './VolumeLicenseMainPage/VolumeLicenseMainPage';
import styled from 'styled-components';
import {CompanySelectTypes} from "../Navigation/CompanySelectMenuBar/CompanySelectTypes"
import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';

type URLParamsType = {
    type: string;
};



const LicenseMainPageContentMainPageDiv = styled.div`
    padding-left: 20px;
    min-height: 100vh;
    width: 100%;
    background-color: #efefef;
    max-height: 100vh;
    overflow: auto;
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
        background-color: gray;
    }
`;

const LicenseMainPage = () => {
    let { type } = useParams<URLParamsType>();

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
        // <div>
        //     <div style={{ display: 'flex' }}>
        //         <div>
        //             <NavigationMenuBarMainPage></NavigationMenuBarMainPage>
        //         </div>
                <LicenseMainPageContentMainPageDiv>
                  <CompanySelectMenuBar CompanySelectAccessKey={CompanySelectAccessKey} handleCompanyClicks={handleCompanyClicks}></CompanySelectMenuBar>
                    {CompanySelectAccessKey.map((list, i) =>
                        list.AccessKey ? (
                            <VolumeLicenseMainPage SelectCompany={list.name} type={type} key={list.name}></VolumeLicenseMainPage>
                        ) : (
                            ''
                        )
                    )}
                </LicenseMainPageContentMainPageDiv>
        //     </div>
        // </div>
    );
};

export default LicenseMainPage;
