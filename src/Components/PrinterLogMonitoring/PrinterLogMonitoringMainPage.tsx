import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../Models';
import { ChangeAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { MenuAccessType } from '../PCAssetMainPage/PcAssetMainPage';
import PrinterLogContentMainPage from './PrinterLogContent/PrinterLogContentMainPage';

const PrinterLogMonitoringMainPageMainDivBox = styled.div`
    border: 1px solid black;
    width: 100%;
`;

const PrinterLogMonitoringMainPage = () => {
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
        await dispatch(ChangeAccessKeyMenuBarRedux(ChangeCompany));
    };

    return (
        <PrinterLogMonitoringMainPageMainDivBox>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>

            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <div key={list.name}>
                        <PrinterLogContentMainPage SelectCompany={list.name}></PrinterLogContentMainPage>
                    </div>
                ) : (
                    ''
                )
            )}
        </PrinterLogMonitoringMainPageMainDivBox>
    );
};

export default PrinterLogMonitoringMainPage;
