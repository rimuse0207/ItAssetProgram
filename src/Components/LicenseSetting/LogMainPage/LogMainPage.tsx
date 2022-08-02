import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Models';
import { ChangeAccessKeyMenuBarRedux } from '../../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import CompanySelectMenuBar from '../../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { LicenseMainPageContentMainPageDiv, MenuAccessType } from '../../PCAssetMainPage/PcAssetMainPage';
import LogTablesMainPage from './LogTables/LogTablesMainPage';

const LogMainPage = () => {
    const CompanySelectAccessKey = useSelector((state: RootState) => state.AccessKeyMenuBarData.CompanySelectAccessKey);
    const dispatch = useDispatch();
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
        <LicenseMainPageContentMainPageDiv>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>

            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <div key={list.name}>
                        <LogTablesMainPage SelectCompany={list.name}></LogTablesMainPage>
                    </div>
                ) : (
                    ''
                )
            )}
        </LicenseMainPageContentMainPageDiv>
    );
};

export default LogMainPage;
