import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Models';
import { ChangeAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { MenuAccessType } from '../PCAssetMainPage/PcAssetMainPage';
import styled from 'styled-components';
import ConsumableListsMainPage from './ConsumableLists/ConsumableListsMainPage';

const ConsumableMainPageMainDivBox = styled.div`
    width: 100%;
    padding: 10px;
`;

const ConsumableMainPage = () => {
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
        <ConsumableMainPageMainDivBox>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>

            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <div key={list.name}>
                        <ConsumableListsMainPage SelectCompany={list.name}></ConsumableListsMainPage>
                    </div>
                ) : (
                    ''
                )
            )}
        </ConsumableMainPageMainDivBox>
    );
};

export default ConsumableMainPage;
