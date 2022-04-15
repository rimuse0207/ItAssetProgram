import React from 'react';
import PersonnelAdminInsertContent from './PersonnelAdminContent/PersonnelAdminInsertContent';
import PersonnelAdminInsertData from './PersonnelAdminContent/PersonnelAdminInsertData';
import { useParams } from 'react-router-dom';

type PersonnelAdminDashBoardContainerProps = {
    SelectCompany: string;
};
type URLParamsType = {
    type: string;
};
const PersonnelAdminDashBoardContainer = ({ SelectCompany }: PersonnelAdminDashBoardContainerProps) => {
    let { type } = useParams<URLParamsType>();
    console.log(type);
    return (
        <div>
            <div>
                {type === 'Select' ? (
                    <PersonnelAdminInsertContent SelectCompany={SelectCompany}></PersonnelAdminInsertContent>
                ) : (
                    <div></div>
                )}
                {type === 'AddData' ? <PersonnelAdminInsertData SelectCompany={SelectCompany}></PersonnelAdminInsertData> : <div></div>}
            </div>
        </div>
    );
};

export default PersonnelAdminDashBoardContainer;
