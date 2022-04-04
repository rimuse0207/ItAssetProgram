import React, { useState } from 'react';
import { BsFileEarmarkBarGraphFill, BsCalendar2PlusFill } from 'react-icons/bs';
import styled from 'styled-components';
import AddUserModalMainPage from './ModalMainPage/AddUserModalMainPage';
import ExcelDowloadModalMainPage from './ModalMainPage/ExcelDowloadModalMainPage';
import NewDataInsertMainPage from './ModalMainPage/NewDataInsertMainPage';
import { LicenseDataType } from '../VolumeLicenseDataTypes';
const DonwLoadMianPageMainDivBox = styled.div`
    width: 100%;
    margin-top: 30px;

    .IconsClickMenu {
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
    }
    .DownLoadIcons {
        width: 100px;
        font-size: 2em;
        color: green;
        text-align: center;
        :hover {
            cursor: pointer;
        }
    }
    .NewDataIcons {
        width: 100px;
        font-size: 2em;
        color: #368;
        text-align: center;
        :hover {
            cursor: pointer;
        }
    }
    .IconText {
        text-align: center;
        font-weight: bold;
    }
`;
type DownLoadMainPageProps = {
    UserAddModals: boolean;
    setUserAddModals: (data: boolean) => void;
    setUserClickLicenseData: (data: null) => void;
    SelectCompany: string;
    UserClickLicenseData: LicenseDataType | null;
    type: string;
    SortTable: any;
    ModalType: string;
};
const DownLoadMainPage = ({
    UserAddModals,
    setUserAddModals,
    setUserClickLicenseData,
    UserClickLicenseData,
    SelectCompany,
    type,
    SortTable,
    ModalType,
}: DownLoadMainPageProps) => {
    const [SelectClicksModals, setSelectClicksModals] = useState({
        NewDataModal: false,
        ExcelDownloadModal: false,
    });

    return (
        <DonwLoadMianPageMainDivBox>
            <div></div>
            <div className="IconsClickMenu">
                <div>
                    <div
                        className="NewDataIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                NewDataModal: true,
                                ExcelDownloadModal: false,
                            })
                        }
                    >
                        <BsCalendar2PlusFill></BsCalendar2PlusFill>
                    </div>
                    <div className="IconText">라이선스 추가</div>
                </div>

                <div>
                    <div
                        className="DownLoadIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                NewDataModal: false,
                                ExcelDownloadModal: true,
                            })
                        }
                    >
                        <BsFileEarmarkBarGraphFill></BsFileEarmarkBarGraphFill>
                    </div>
                    <div className="IconText">EXCEL</div>
                </div>
            </div>

            <div>
                {SelectClicksModals.NewDataModal ? (
                    <NewDataInsertMainPage
                        SelectClicksModals={SelectClicksModals.NewDataModal}
                        setSelectClicksModals={() =>
                            setSelectClicksModals({
                                NewDataModal: false,
                                ExcelDownloadModal: false,
                            })
                        }
                    ></NewDataInsertMainPage>
                ) : (
                    ''
                )}
            </div>
            <div>
                {SelectClicksModals.ExcelDownloadModal ? (
                    <ExcelDowloadModalMainPage
                        SelectClicksModals={SelectClicksModals.ExcelDownloadModal}
                        setSelectClicksModals={() =>
                            setSelectClicksModals({
                                NewDataModal: false,
                                ExcelDownloadModal: false,
                            })
                        }
                    ></ExcelDowloadModalMainPage>
                ) : (
                    ''
                )}
            </div>
            <div>
                {UserAddModals && ModalType === 'Show_info' ? (
                    <AddUserModalMainPage
                        SelectCompany={SelectCompany}
                        SelectClicksModals={UserAddModals}
                        setSelectClicksModals={() => {
                            setUserClickLicenseData(null);
                            setUserAddModals(false);
                        }}
                        UserClickLicenseData={UserClickLicenseData}
                        type={type}
                        SortTable={SortTable}
                    ></AddUserModalMainPage>
                ) : (
                    <div></div>
                )}
            </div>
        </DonwLoadMianPageMainDivBox>
    );
};

export default DownLoadMainPage;
