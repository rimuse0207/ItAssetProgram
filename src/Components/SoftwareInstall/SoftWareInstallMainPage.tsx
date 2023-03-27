import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../Models';
import { ChangeAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { MenuAccessType } from '../PCAssetMainPage/PcAssetMainPage';
import SoftwareInstallContainer from './SoftwareInstallContainer/SoftwareInstallContainer';

const SoftWareInstallMainPageMainDivBox = styled.div`
    width: 100%;
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

    .MainContent_Div_Box {
    }
`;

const SoftWareInstallMainPage = () => {
    const dispatch = useDispatch();
    const CompanySelectAccessKey = useSelector((state: RootState) => state.AccessKeyMenuBarData.CompanySelectAccessKey);
    const handleCompanyClicks = async (data: MenuAccessType) => {
        const ChangeCompany = CompanySelectAccessKey.map((list: MenuAccessType, i: number) => {
            if (list.name === data.name) {
                list.AccessKey = true;
            } else {
                list.AccessKey = false;
            }
            return list;
        });
        dispatch(ChangeAccessKeyMenuBarRedux(ChangeCompany));
    };

    return (
        <SoftWareInstallMainPageMainDivBox>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>
            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <div key={list.name} className="MainContent_Div_Box">
                        <SoftwareInstallContainer SelectCompany={list.name}></SoftwareInstallContainer>
                    </div>
                ) : (
                    ''
                )
            )}
        </SoftWareInstallMainPageMainDivBox>
    );
};

export default SoftWareInstallMainPage;
