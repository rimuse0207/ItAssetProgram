import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { PersonalInfoGetData, InertPersonalData } from '../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import PersonnelAdminInfoModalMainPage from './PersonnelAdminInfoModal/PersonnelAdminInfoModalMainPage';
import { toast } from '../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../Configs/ToastTimerConfig';
import PersonnelAdminDeleteModal from './PersonnelAdminInfoModal/PersonnelAdminDeleteModal';

const AdminDashBoardShowUsersTableMainDivBox = styled.div`
    max-height: 85vh;
    overflow-y: auto;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    border-radius: 10px;
    padding: 10px;

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

    table.type09 {
        border: none !important;
        width: 100%;
        font-size: 0.8em;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        table-layout: fixed;

        tr {
            :hover {
                cursor: pointer;
                background-color: #f3f6f7;
            }
        }
    }
    table.type09 thead th {
        padding: 5px;
        font-weight: bold;
        vertical-align: center;
        color: #369;
        border: none;
        background-color: #fff;
        border-bottom: 3px solid #036;
        font-size: 0.9em;
        input {
            width: 80%;
        }
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: center;
        border: none;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        font-size: 0.8em;
    }
    table.type09 td {
        width: 300px;

        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
    .DeleteButton {
        svg {
            font-size: 1.3em !important;
        }
        :hover {
            cursor: pointer;
            color: red;
        }
    }
    .InfoButton {
        svg {
            font-size: 1.3em !important;
        }
        :hover {
            cursor: pointer;
            color: green;
        }
    }
`;

type PersonnelAdminInsertContentProps = {
    SelectCompany: string;
};

type UserInfoDataTypes = {
    companyInfo_companycode: string;
    email: string;
    entercompany: string | null;
    exitcompany: string | null;
    inservice: number;
    name: string;
    position: string;
    team: string;
    updatedate: string;
    company_building: string;
    company_code: string;
    company_floor: string;
    company_location: string;
    company_name: string;
};

type assetInfoDataTypes = {
    asset_cpu: string;
    asset_destroy_check: number;
    asset_disk: string;
    asset_distribute_date: string | null;
    asset_division: string;
    asset_maker: string;
    asset_management_number: string;
    asset_model: string;
    asset_newcode: string | null;
    asset_pride: string;
    asset_purchase_date: string;
    asset_ram: string;
    company_info_company_code: string;
    userinfo_email: string;
};

export type PesonnelInfoTypes = {
    companyInfo_companycode: string;
    email: string;
    entercompany: string | null;
    exitcompany: string | null;
    inservice: number;
    name: string;
    position: string;
    team: string;
    updatedate: string;
    company_building: string;
    company_code: string;
    company_floor: string;
    company_location: string;
    company_name: string;
    assetData: [];
};

const PersonnelAdminInsertContent = ({ SelectCompany }: PersonnelAdminInsertContentProps) => {
    const [SearchNames, setSearchNames] = useState('');
    const [SearchCompanys, setSearchCompanys] = useState('');
    const [SearchEmail, setSearchEmail] = useState('');
    const [getLoginInfoData, setGetLoginInfoData] = useState<PesonnelInfoTypes[]>([]);
    const [InfoModalOpen, setInfoModalOpen] = useState(false);
    const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [CilcksData, setClicksData] = useState<PesonnelInfoTypes | null>(null);

    useEffect(() => {
        getLoginInfoDataAxios();
    }, []);

    const getLoginInfoDataAxios = async () => {
        try {
            const GetLoginInfoDataFromServer = await PersonalInfoGetData('/UserInfo_app_server/CompanyUersShowData', SelectCompany);
            if (GetLoginInfoDataFromServer.data.dataSuccess) {
                setGetLoginInfoData(GetLoginInfoDataFromServer.data.datas);
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버 연결 해제 IT팀에 문의 바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    const handleResetPassword = async (data: PesonnelInfoTypes) => {
        const CheckPasswordReset = window.confirm(`${data.name} ${data.position}의 비밀번호를 초기화 하시겠습니까?`);
        if (!CheckPasswordReset) {
            return;
        }
        try {
            const ResetChangePasswordFromServer = await InertPersonalData(`/UserInfo_app_server/ResetPassword`, {
                data,
            });
            if (ResetChangePasswordFromServer.data.dataSuccess) {
                toast.show({
                    title: `${data.name} ${
                        data.position
                    }의 비밀번호 초기화 완료. \n 초기 비밀번호는 !@${data.company_name.toLowerCase()}입니다.`,
                    successCheck: true,
                    duration: ToastTime,
                });
            } else {
                toast.show({
                    title: `비밀번호 초기화 에러 IT팀에 문의 바랍니다.`,
                    successCheck: false,
                    duration: ToastTime,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버 연결 해제 IT팀에 문의 바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    const handleDeleteData = async (data: PesonnelInfoTypes) => {
        const CheckPasswordReset = window.confirm(`${data.name} ${data.position} 퇴사처리를 하시겠습니까?`);
        if (!CheckPasswordReset) {
            return;
        }
        let CheckAssetData = false;
        if (data.assetData.length >= 1) {
            CheckAssetData = window.confirm(`등록된 PC(${data.assetData.length}대)가 존재합니다. \n전부 반납처리 하시겠습니까?`);
        }

        try {
            const ParamasData = {
                data,
                CheckAssetData,
            };
            const ResetChangePasswordFromServer = await InertPersonalData('/UserInfo_app_server/DeleteInfoUsers', {
                ParamasData,
            });
            if (ResetChangePasswordFromServer.data.dataSuccess) {
                getLoginInfoDataAxios();
                toast.show({
                    title: `${data.name} ${data.position} 퇴사처리 완료`,
                    successCheck: true,
                    duration: ToastTime,
                });
            } else {
                toast.show({
                    title: `퇴사처리 실패 IT팀에 문의 바랍니다.`,
                    successCheck: false,
                    duration: ToastTime,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버 연결 해제 IT팀에 문의 바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    const handleDoubleClicks = (data: PesonnelInfoTypes) => {};

    return (
        <div>
            <AdminDashBoardShowUsersTableMainDivBox>
                <table className="type09">
                    <thead>
                        <tr>
                            <th scope="cols">
                                <div>이름</div>
                                <div>
                                    <input
                                        type="text"
                                        value={SearchNames}
                                        onChange={e => setSearchNames(e.target.value)}
                                        placeholder="이름 검색...."
                                    ></input>
                                </div>
                            </th>
                            <th scope="cols">
                                <div>회사</div>
                                {/* <div>
                                    <input
                                        type="text"
                                        value={SearchCompanys}
                                        onChange={e => setSearchCompanys(e.target.value)}
                                        placeholder="회사 검색...."
                                    ></input>
                                </div> */}
                            </th>
                            <th scope="cols">팀명</th>
                            <th scope="cols">직급</th>
                            <th scope="cols">
                                <div>Email(ID)</div>
                                <div>
                                    <input
                                        type="text"
                                        value={SearchEmail}
                                        onChange={e => setSearchEmail(e.target.value)}
                                        placeholder="이메일 검색...."
                                    ></input>
                                </div>
                            </th>
                            <th scope="cols">비밀번호 초기화</th>
                            <th scope="cols">정보 보기</th>
                            <th scope="cols">퇴사 처리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getLoginInfoData
                            .filter((item, j) => item.name.toLowerCase().includes(SearchNames.toLowerCase()))
                            .filter(
                                (item, j) =>
                                    item.company_name.toLowerCase().includes(SearchCompanys.toLowerCase()) ||
                                    item.company_location.toLowerCase().includes(SearchCompanys.toLowerCase()) ||
                                    item.company_building.toLowerCase().includes(SearchCompanys.toLowerCase()) ||
                                    item.company_floor.toLowerCase().includes(SearchCompanys.toLowerCase())
                            )
                            .filter((item, j) => item.email.toLowerCase().includes(SearchEmail.toLowerCase()))
                            .map((list, i) => {
                                return (
                                    <tr onDoubleClick={() => handleDoubleClicks(list)} key={list.email}>
                                        <th scope="row">{list.name}</th>
                                        <td>{list.company_name}</td>
                                        <td>{list.team}</td>
                                        <td>{list.position}</td>
                                        <td>{list.email}</td>
                                        <td>
                                            <div>
                                                <button onClick={() => handleResetPassword(list)}>비밀번호 초기화</button>
                                            </div>
                                        </td>
                                        <td
                                            className="InfoButton"
                                            onClick={() => {
                                                setInfoModalOpen(true);
                                                setClicksData(list);
                                            }}
                                        >
                                            <BsFillInfoCircleFill></BsFillInfoCircleFill>
                                        </td>
                                        <td className="DeleteButton" onClick={() => handleDeleteData(list)}>
                                            <RiDeleteBin6Fill></RiDeleteBin6Fill>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </AdminDashBoardShowUsersTableMainDivBox>
            {InfoModalOpen ? (
                <PersonnelAdminInfoModalMainPage
                    InfoModalOpen={InfoModalOpen}
                    setInfoModalOpen={() => setInfoModalOpen(false)}
                    CilcksData={CilcksData}
                ></PersonnelAdminInfoModalMainPage>
            ) : (
                ''
            )}
            {DeleteModalOpen ? (
                <PersonnelAdminDeleteModal
                    DeleteModalOpen={DeleteModalOpen}
                    setDeleteModalOpen={() => setDeleteModalOpen(false)}
                    CilcksData={CilcksData}
                ></PersonnelAdminDeleteModal>
            ) : (
                ''
            )}
        </div>
    );
};

export default PersonnelAdminInsertContent;
