import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { PersonalInfoGetData } from '../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import PersonnelAdminInfoModalMainPage from './PersonnelAdminInfoModal/PersonnelAdminInfoModalMainPage';

const AdminDashBoardShowUsersTableMainDivBox = styled.div`
    padding-left: 40px;
    padding-right: 30px;
    max-height: 90vh;
    overflow-y: auto;

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
        padding: 10px;
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
};

const PersonnelAdminInsertContent = ({ SelectCompany }: PersonnelAdminInsertContentProps) => {
    const [SearchNames, setSearchNames] = useState('');
    const [SearchCompanys, setSearchCompanys] = useState('');
    const [SearchEmail, setSearchEmail] = useState('');
    const [getLoginInfoData, setGetLoginInfoData] = useState<PesonnelInfoTypes[]>([]);
    const [InfoModalOpen, setInfoModalOpen] = useState(false);
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
        }
    };

    const handleResetPassword = async (data: PesonnelInfoTypes) => {
        //    try {
        //        const ResetChangePasswordFromServer = await axios.post(
        //            `${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/ResetPassword`,
        //            {
        //                data,
        //            }
        //        );
        //        if (ResetChangePasswordFromServer.data.dataSuccess) {
        //        } else {
        //        }
        //    } catch (error) {
        //        console.log(error);
        //    }
    };

    const handleDeleteData = async (data: PesonnelInfoTypes) => {
        console.log(data);
        try {
            //    const ConfrimCheck = window.confirm(`${data.name}님의 데이터를 삭제 하시겠습니까?`);
            //    if (!ConfrimCheck) return;
            //    const ResetChangePasswordFromServer =
            //    if (ResetChangePasswordFromServer.data.dataSuccess) {
            //        getLoginInfoDataAxios();
            //    }
        } catch (error) {
            console.log(error);
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
                                <div>
                                    <input
                                        type="text"
                                        value={SearchCompanys}
                                        onChange={e => setSearchCompanys(e.target.value)}
                                        placeholder="회사 검색...."
                                    ></input>
                                </div>
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
                            <th scope="cols">자세한 정보</th>
                            <th scope="cols">삭제</th>
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
                                        <td>
                                            {list.company_name}_{list.company_location}_{list.company_building}_{list.company_floor}
                                        </td>
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
        </div>
    );
};

export default PersonnelAdminInsertContent;
