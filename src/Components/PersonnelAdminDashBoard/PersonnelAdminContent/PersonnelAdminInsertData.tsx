import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PersonalInfoGetData, InertPersonalData } from '../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { toast } from '../../../PublicComponents/ToastMessage/ToastManager';

const PersonnelAdminInsertDataMainDivBox = styled.div`
    padding-left: 40px;
    padding-right: 20px;

    table.type09 {
        width: 500px;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        font-size: 0.9em;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
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
        vertical-align: top;
        border: none;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        font-size: 0.9em;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
    .SubmitButtonDiv {
        width: 500px;
        text-align: right;
        margin-top: 20px;

        button {
            border: none;
            width: 150px;
            height: 40px;
            background-color: #369;
            color: #fff;
            font-size: 1em;
            font-weight: bolder;
            border-radius: 5px;
            :hover {
                cursor: pointer;
                background-color: #efefef;
                color: #369;
            }
        }
    }

    .InputCheckTBody {
        td {
            padding: 10px !important;
        }
        select {
            margin-left: 20px;
            height: 30px;
            border: none;
            border-bottom: 2px solid #168;
            padding-left: 20px;
            width: 80%;
            background: none;
        }
        input {
            margin-left: 20px;
            height: 30px;
            border: none;
            border-bottom: 2px solid #168;
            padding-left: 20px;
            width: 80%;
            background: none;

            :focus {
                animation-name: FofusOnandlineOn;
                animation-duration: 0.5s;
                outline: none;
                border-bottom: 2px solid #e08d8d;
                @keyframes FofusOnandlineOn {
                    from {
                        width: 10%;
                    }
                    to {
                        width: 80%;
                    }
                }
            }
        }
    }
`;

type PersonnelAdminInsertDataProps = {
    SelectCompany: string;
};

type CompanyPropsType = {
    company_building: string;
    company_code: string;
    company_floor: string;
    company_location: string;
    company_name: string;
};

const PersonnelAdminInsertData = ({ SelectCompany }: PersonnelAdminInsertDataProps) => {
    const [UpdateUserData, setUpdateUserData] = useState({
        name: '',
        email: '',
        position: '',
        team: '',
        company: '',
    });

    const [CompanyInfoData, setCompanyInfoData] = useState<CompanyPropsType[]>([]);

    const handleSaveData = async () => {
        try {
            const DataSavePersonalData = await InertPersonalData('/UserInfo_app_server/DataSavePersonalData', UpdateUserData);
            if (DataSavePersonalData.data.dataSuccess) {
                toast.show({
                    title: `임직원 추가 완료하였습니다.`,
                    successCheck: true,
                    duration: 3000,
                });
                setUpdateUserData({
                    name: '',
                    email: '',
                    position: '',
                    team: '',
                    company: UpdateUserData.company,
                });
            } else {
                toast.show({
                    title: `임직원 추가 실패`,
                    successCheck: false,
                    duration: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            alert('에러발생');
        }
    };

    useEffect(() => {
        getCompanyInfo();
    }, []);

    const getCompanyInfo = async () => {
        try {
            const GetCompanyInfosData = await PersonalInfoGetData('/UserInfo_app_server/CompanyInfoData', SelectCompany);

            if (GetCompanyInfosData.data.dataSuccess) {
                setCompanyInfoData(GetCompanyInfosData.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PersonnelAdminInsertDataMainDivBox>
            <div>
                <table className="type09">
                    <thead>
                        <tr>
                            <th scope="cols"></th>

                            <th scope="cols">임직원 정보 입력</th>
                        </tr>
                    </thead>
                    <tbody className="InputCheckTBody">
                        <tr>
                            <th scope="row">Email(ID)</th>
                            <td>
                                <input
                                    value={UpdateUserData.email}
                                    placeholder="sjyoo@dhk.co.kr"
                                    onChange={e => setUpdateUserData({ ...UpdateUserData, email: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">이름</th>

                            <td>
                                <input
                                    value={UpdateUserData.name}
                                    placeholder="유성재 ... "
                                    onChange={e => setUpdateUserData({ ...UpdateUserData, name: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">근무 장소</th>

                            <td>
                                <select onChange={e => setUpdateUserData({ ...UpdateUserData, company: e.target.value })}>
                                    <option value="">근무장소를 선택 해 주세요.</option>
                                    {CompanyInfoData.map(list => {
                                        return (
                                            <option value={list.company_code} key={list.company_code}>
                                                {list.company_name}_{list.company_location}_{list.company_building}_{list.company_floor}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">팀명</th>

                            <td>
                                <input
                                    value={UpdateUserData.team}
                                    placeholder="경영지원, S/W ...."
                                    onChange={e => setUpdateUserData({ ...UpdateUserData, team: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">직급</th>

                            <td>
                                <input
                                    value={UpdateUserData.position}
                                    placeholder="프로, 임원 ..."
                                    onChange={e => setUpdateUserData({ ...UpdateUserData, position: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="SubmitButtonDiv">
                    <button onClick={handleSaveData}>등록</button>
                </div>
            </div>
        </PersonnelAdminInsertDataMainDivBox>
    );
};

export default PersonnelAdminInsertData;
