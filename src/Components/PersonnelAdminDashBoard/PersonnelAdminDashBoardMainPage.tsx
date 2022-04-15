import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Models';
import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { useDispatch } from 'react-redux';
import { ChangeAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import PersonnelAdminDashBoardContainer from './PersonnelAdminDashBoardContainer';

type MenuAccessType = {
    name: string;
    AccessKey: boolean;
};

const PersonnelAdminDashBoardMainPage = () => {
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
        <div>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>
            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <PersonnelAdminDashBoardContainer SelectCompany={list.name} key={list.name}></PersonnelAdminDashBoardContainer>
                ) : (
                    ''
                )
            )}
        </div>
    );
};

export default PersonnelAdminDashBoardMainPage;
