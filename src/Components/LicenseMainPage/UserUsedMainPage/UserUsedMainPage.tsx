import React, { useEffect, useState } from 'react';
import { LicensMainTableIncludeBox } from '../VolumeLicenseMainPage/VolumeLicenseMainPage';
import moment from 'moment';
import { LicenseUserInfoGet } from '../../../Apis/core/api/AuthNeedApi/LicenseApi';
import styled from 'styled-components';
import { LicenseUserDelete } from '../../../Apis/core/api/AuthUnNeedApi/LicenseUserAdd/LicenseUserDelete';
import { useDispatch } from 'react-redux';
import { License_getLicenseDataThunk } from '../../../Models/LicenseDataReduxThunk/LicenseDataThunks';
import { toast } from '../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../Configs/ToastTimerConfig';

type UserUsedMainPageProps = {
    SelectCode: string;
    SelectCompany: string;
    license: string;
    SortTable: any;
};

type GetUserDataType = {
    CompanyInfo_CompanyCode: string;
    EnterCompany: string | null;
    ExitCompany: string | null;
    InService: number;
    UpdateDate: string;
    UserInfo_email: string;
    UserUsedIndex: number;
    Volume_License_Code: string;
    dependency: number;
    email: string;
    name: string;
    position: string;
    registerDate: string;
    team: string;
};

const TableIncludeInput = styled.div`
    input {
        border: none;
        background: none;
        font-size: 0.9em;
        width: 150px;
        border-bottom: 1px solid #368;
        :focus {
            outline: none;
            border-bottom: 3px solid #368;
        }
    }
    input::-webkit-input-placeholder {
        background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
        background-size: contain;
        background-position: 1px center;
        background-repeat: no-repeat;
        text-align: center;
        text-indent: 0;
    }
`;

const UserUsedMainPage = ({ SelectCode, SelectCompany, license, SortTable }: UserUsedMainPageProps) => {
    const [getUserData, setGetUserData] = useState<GetUserDataType[]>([]);
    const [SearchedType, setSearchedType] = useState({
        name: '',
        team: '',
    });
    const dispatch = useDispatch();
    useEffect(() => {
        GetInfoLicensData();
    }, [SelectCode]);

    const GetInfoLicensData = async () => {
        try {
            const ParamasData = {
                SelectCode,
                license,
                SelectCompany,
            };
            const getInfoLicenseData = await LicenseUserInfoGet('/license_app_server/LicenseUserSelect', ParamasData);

            if (getInfoLicenseData.data.dataSuccess) {
                setGetUserData(getInfoLicenseData.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteLicenseUser = async (data: GetUserDataType) => {
        const ParamasData = {
            data,
            license,
        };
        const LicenseParams = {
            company: SelectCompany,
            license: license,
            SortTable,
        };
        try {
            const userLicenseDetele = await LicenseUserDelete('/license_app_server/LicenseUserDelete', ParamasData);
            if (userLicenseDetele.data.dataSuccess) {
                GetInfoLicensData();
                dispatch(License_getLicenseDataThunk(LicenseParams));
                toast.show({
                    title: `${license}에 사용자 등록 해제`,
                    successCheck: true,
                    duration: ToastTime,
                });
            } else {
                alert('에러 발생');
            }
        } catch (error) {
            console.log(error);
            alert('에러 발생');
        }
    };

    return (
        <div style={{ marginTop: '30px' }}>
            {SelectCode !== '' ? (
                <div>
                    <div>
                        <h2>사용자 등록 정보</h2>
                    </div>
                    <LicensMainTableIncludeBox>
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">인덱스</th>
                                    <th scope="cols">
                                        <div>이름</div>
                                        <TableIncludeInput>
                                            <input
                                                type="text"
                                                placeholder="찾으실 이름..."
                                                value={SearchedType.name}
                                                onChange={e => setSearchedType({ ...SearchedType, name: e.target.value })}
                                            ></input>
                                        </TableIncludeInput>
                                    </th>
                                    <th scope="cols">직급</th>
                                    <th scope="cols">
                                        <div>팀명</div>
                                        <TableIncludeInput>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="찾으실 팀명..."
                                                value={SearchedType.team}
                                                onChange={e => setSearchedType({ ...SearchedType, team: e.target.value })}
                                            ></input>
                                        </TableIncludeInput>
                                    </th>
                                    <th scope="cols">라이선스 등록 날짜</th>
                                    <th scope="cols">라이선스 등록 해제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getUserData.length === 0 ? (
                                    <tr>
                                        <th colSpan={6}>데이터가 없습니다.</th>
                                    </tr>
                                ) : (
                                    getUserData
                                        .filter((item, j) => item.name.toLowerCase().includes(SearchedType.name.toLowerCase()))
                                        .filter((item, j) => item.team.toLowerCase().includes(SearchedType.team.toLowerCase()))
                                        .map((list, i) => {
                                            return (
                                                <tr key={list.email}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{list.name}</td>
                                                    <td>{list.position}</td>
                                                    <td>{list.team}</td>
                                                    <td>{moment(list.registerDate).format('YYYY-MM-DD')}</td>
                                                    <td>
                                                        <button onClick={() => handleDeleteLicenseUser(list)}>등록 해제</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                )}
                            </tbody>
                        </table>
                    </LicensMainTableIncludeBox>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default UserUsedMainPage;
