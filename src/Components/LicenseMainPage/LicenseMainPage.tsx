import React from 'react';
import { useParams } from 'react-router-dom';
import VolumeLicenseMainPage from './VolumeLicenseMainPage/VolumeLicenseMainPage';
import styled from 'styled-components';

import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Models';
import { ChangeAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';

type URLParamsType = {
    type: string;
};
type MenuAccessType = {
    name: string;
    AccessKey: boolean;
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

    const dispatch = useDispatch();
    const CompanySelectAccessKey = useSelector((state: RootState) => state.AccessKeyMenuBarData.CompanySelectAccessKey);

    const handleCompanyClicks = async (data: MenuAccessType) => {
        const ChangeCompany = CompanySelectAccessKey.map((list: MenuAccessType) => {
            if (list.name === data.name) {
                list.AccessKey = true;
            } else {
                list.AccessKey = false;
            }
            return list;
        });

        await dispatch(ChangeAccessKeyMenuBarRedux(ChangeCompany));
    };

    return (
        <LicenseMainPageContentMainPageDiv>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>
            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? <VolumeLicenseMainPage SelectCompany={list.name} type={type} key={list.name}></VolumeLicenseMainPage> : ''
            )}
        </LicenseMainPageContentMainPageDiv>
    );
};

export default LicenseMainPage;
