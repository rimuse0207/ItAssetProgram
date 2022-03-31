import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import UserUsedMainPage from '../UserUsedMainPage/UserUsedMainPage';
import { LicenseInfoGet } from '../../../Apis/core/api/AuthNeedApi/LicenseApi';
import SpinnerMainPage from '../../../PublicComponents/SpinnerMainPage/SpinnerMainPage';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// import DownLoadMainPage from './DownloadMainPage/DownLoadMainPage';
import { VolumeLicenseMainPageProps, LicenseDataType } from './VolumeLicenseDataTypes';
import { License_getLicenseDataThunk } from '../../../Models/LicenseDataReduxThunk/LicenseDataThunks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Models';
// import LicenseGoogleGraphMainPage from '../LicenseGoogleGraphMainPage/LicenseGoogleGraphMainPage';
export const LicensMainTableIncludeBox = styled.div`
    td,
    th {
        vertical-align: middle !important;
    }
    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        font-size: 0.8em;
        width: 100%;
        margin-top: 30px;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border-bottom: 3px solid #036;
    }
    table.type09 tbody th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
    }
    table.type09 td {
        padding: 10px;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
    }
    table {
        thead {
            tr {
                th {
                    position: relative;
                    .SortIcons {
                        :hover {
                            cursor: pointer;
                        }
                        font-size: 1em;
                        position: absolute;
                        top: 10px;
                        right: 40px;
                    }
                }
            }
        }
    }
    table {
        tbody {
            tr {
                :hover {
                    background-color: #fff;

                    cursor: pointer;
                }
            }
        }
    }
    .HoverCheck {
        :hover {
            cursor: pointer;
            color: #036;
            font-weight: bold;
        }
    }
`;

const VolumeLicenseMainPage = ({ SelectCompany, type }: VolumeLicenseMainPageProps) => {
    const [getData, setGetData] = useState<LicenseDataType[]>([]);
    const [SelectCode, setSelectCode] = useState('');
    const [LoadingState, setLoadingState] = useState(false);
    const [SortTable, setSortTable] = useState({
        Name: 'code',
        ASC: false,
        DESC: false,
    });
    const [UserAddModals, setUserAddModals] = useState(false);
    const [UserClickLicenseData, setUserClickLicenseData] = useState<LicenseDataType | null>(null);
    const dispatch = useDispatch();
    const LicenseData = useSelector((state: RootState) => state.LicenseData.LicenseData);
    useEffect(() => {
        GetInfoLicensData();
    }, [SortTable, type]);

    useEffect(() => {
        setSelectCode('');
    }, [type]);

    const handleClicksUserAdd = (data: LicenseDataType) => {
        setUserClickLicenseData(data);
        setUserAddModals(true);
    };

    const GetInfoLicensData = async () => {
        try {
            setLoadingState(false);
            const ParamasData = {
                company: SelectCompany,
                license: type,
                SortTable,
            };
            dispatch(License_getLicenseDataThunk(ParamasData));
            setLoadingState(true);
            // const getInfoLicenseData = await LicenseInfoGet('/license_app_server/LicenseSelect', ParamasData);

            // if (getInfoLicenseData.data.dataSuccess) {
            //     setGetData(getInfoLicenseData.data.data);
            //     setLoadingState(true);
            // } else {
            //     alert('에러발생');
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginBottom: '100px' }}>
            {/* <LicenseGoogleGraphMainPage SelectCompany={SelectCompany} type={type}></LicenseGoogleGraphMainPage>
            <DownLoadMainPage
                SelectCompany={SelectCompany}
                UserAddModals={UserAddModals}
                setUserAddModals={setUserAddModals}
                setUserClickLicenseData={setUserClickLicenseData}
                UserClickLicenseData={UserClickLicenseData}
                type={type}
                SortTable={SortTable}
            ></DownLoadMainPage> */}
            <div>
                <div>
                    <h2>{type}</h2>
                </div>
                <LicensMainTableIncludeBox>
                    {LicenseData.loading ? (
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">인덱스</th>
                                    <th scope="cols">관리번호</th>
                                    {/* <th scope="cols" style={{ width: '150px' }}>
                                        <div>이름</div>
                                        <div className="SortIcons">
                                            {SortTable.Name === 'name' && SortTable.ASC ? (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'name',
                                                            ASC: false,
                                                            DESC: true,
                                                        })
                                                    }
                                                >
                                                    <FaSortUp></FaSortUp>
                                                </div>
                                            ) : SortTable.Name === 'name' && SortTable.DESC ? (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'name',
                                                            ASC: false,
                                                            DESC: false,
                                                        })
                                                    }
                                                >
                                                    <FaSortDown></FaSortDown>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'name',
                                                            ASC: true,
                                                            DESC: false,
                                                        })
                                                    }
                                                >
                                                    <FaSort></FaSort>
                                                </div>
                                            )}
                                        </div>
                                    </th> */}
                                    <th scope="cols">설명</th>
                                    {/* <th scope="cols" style={{ width: '150px' }}>
                                        <div>구매 날짜</div>
                                        <div className="SortIcons">
                                            {SortTable.Name === 'ContractDate' && SortTable.ASC ? (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'ContractDate',
                                                            ASC: false,
                                                            DESC: true,
                                                        })
                                                    }
                                                >
                                                    <FaSortUp></FaSortUp>
                                                </div>
                                            ) : SortTable.Name === 'ContractDate' && SortTable.DESC ? (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'ContractDate',
                                                            ASC: false,
                                                            DESC: false,
                                                        })
                                                    }
                                                >
                                                    <FaSortDown></FaSortDown>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'ContractDate',
                                                            ASC: true,
                                                            DESC: false,
                                                        })
                                                    }
                                                >
                                                    <FaSort></FaSort>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                    <th scope="cols" style={{ width: '150px' }}>
                                        <div>종료 날짜</div>
                                        <div className="SortIcons">
                                            {SortTable.Name === 'TerminatedDate' && SortTable.ASC ? (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'TerminatedDate',
                                                            ASC: false,
                                                            DESC: true,
                                                        })
                                                    }
                                                >
                                                    <FaSortUp></FaSortUp>
                                                </div>
                                            ) : SortTable.Name === 'TerminatedDate' && SortTable.DESC ? (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'TerminatedDate',
                                                            ASC: false,
                                                            DESC: false,
                                                        })
                                                    }
                                                >
                                                    <FaSortDown></FaSortDown>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        setSortTable({
                                                            Name: 'TerminatedDate',
                                                            ASC: true,
                                                            DESC: false,
                                                        })
                                                    }
                                                >
                                                    <FaSort></FaSort>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                    <th scope="cols">키 확인</th> */}
                                    <th scope="cols">전체 사용 가능 인원</th>
                                    <th scope="cols">전체 사용 중인 인원</th>
                                    <th scope="cols">인덱스</th>
                                    <th scope="cols">관리번호</th>
                                    <th scope="cols">구입날짜</th>
                                    <th scope="cols">만료날짜</th>
                                    <th scope="cols">구입가격</th>
                                    <th scope="cols">구입업체</th>
                                    <th scope="cols">라이선스 키</th>
                                    <th scope="cols">자산코드</th>
                                    <th scope="cols">허용 인원</th>
                                    <th scope="cols">사용 중인 인원</th>
                                    <th scope="cols">사용 가능 인원</th>
                                    <th scope="cols">정보 보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LicenseData.data.map((list: LicenseDataType, i: number) => {
                                    return (
                                        <>
                                            <tr key={list.license_product_code}>
                                                <th scope="row" rowSpan={list.datas.length + 1}>
                                                    {i + 1}
                                                </th>

                                                <td rowSpan={list.datas.length + 1}>{list.license_product_code}</td>
                                                <td rowSpan={list.datas.length + 1}>{list.license_product_name}</td>
                                                <td rowSpan={list.datas.length + 1}>{list.sumpermit} 명</td>
                                                <td rowSpan={list.datas.length + 1}>{list.all_user_used_count}명</td>

                                                {/* <td onClick={() => handleClicksUserAdd(list)}>
                                                    <BsFillPersonPlusFill></BsFillPersonPlusFill>
                                                </td>
                                                <td className="HoverCheck" onClick={() => setSelectCode(list.license_manage_code)}>
                                                    클릭
                                                </td> */}
                                            </tr>
                                            {list.datas.map((item: LicenseDataType, j: number) => {
                                                return (
                                                    <tr
                                                        style={
                                                            item.license_permit_count - item.userData[0].useUserCount < 0
                                                                ? { backgroundColor: '#edafaf' }
                                                                : {}
                                                        }
                                                    >
                                                        <td>{j + 1}</td>
                                                        <td>{item.license_manage_code}</td>
                                                        <td>{moment(item.license_purchase_date).format('YYYY-MM-DD')}</td>
                                                        <td>{moment(item.license_purchase_finish_date).format('YYYY-MM-DD')}</td>
                                                        <td>{item.license_purchase_pride.toLocaleString('ko-KR')}</td>
                                                        <td>{item.license_purchase_company ? item.license_purchase_company : '-'}</td>
                                                        <td>{item.license_prove_code ? '클릭' : '-'}</td>
                                                        <td>{item.license_newcode ? item.license_newcode : '-'}</td>
                                                        <td>{item.license_permit_count} 명</td>
                                                        <td>{item.userData[0].useUserCount} 명</td>
                                                        <td>{item.license_permit_count - item.userData[0].useUserCount} 명</td>
                                                        <td>클릭</td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <SpinnerMainPage></SpinnerMainPage>
                    )}
                </LicensMainTableIncludeBox>
            </div>
            {/* <div>
                <UserUsedMainPage
                    SelectCompany={SelectCompany}
                    license={type}
                    SelectCode={SelectCode}
                    SortTable={SortTable}
                ></UserUsedMainPage>
            </div> */}
        </div>
    );
};

export default VolumeLicenseMainPage;
