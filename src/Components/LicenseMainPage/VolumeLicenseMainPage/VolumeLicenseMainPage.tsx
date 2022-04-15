import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SpinnerMainPage from '../../../PublicComponents/SpinnerMainPage/SpinnerMainPage';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import DownLoadMainPage from './DownloadMainPage/DownLoadMainPage';
import { VolumeLicenseMainPageProps, LicenseDataType } from './VolumeLicenseDataTypes';
import { License_getLicenseDataThunk } from '../../../Models/LicenseDataReduxThunk/LicenseDataThunks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Models';
import LicenseGoogleGraphMainPage from '../LicenseGoogleGraphMainPage/LicenseGoogleGraphMainPage';
import { BiMessageAdd } from 'react-icons/bi';
import AddLicenseDetailMainPage from './DownloadMainPage/ModalMainPage/AddLicenseDetailMainPage';

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
    // const [getData, setGetData] = useState<LicenseDataType[]>([]);
    // const [SelectCode, setSelectCode] = useState('');
    const [LoadingState, setLoadingState] = useState(false);

    const [UserAddModals, setUserAddModals] = useState(false);
    const [DetailLicenseAdd, setDetailLicenseAdd] = useState(false);
    const [ModalType, setModalType] = useState('');
    const [DetailLicenseClicksData, setDetailLicenseClicksData] = useState({});
    const [UserClickLicenseData, setUserClickLicenseData] = useState<LicenseDataType | null>(null);
    const [LicenseAllShow, setLicenseAllShow] = useState(true);
    const dispatch = useDispatch();
    const LicenseData = useSelector((state: RootState) => state.LicenseData.LicenseData);
    const LicenseFilteringData = useSelector((state: RootState) => state.LicenseFilteringData);

    useEffect(() => {
        GetInfoLicensData();
    }, [type]);

    const handleClicksUserAdd = (data: LicenseDataType) => {
        setModalType('Show_info');
        setUserClickLicenseData(data);
        setUserAddModals(true);
    };

    const GetInfoLicensData = async () => {
        try {
            setLoadingState(false);
            const ParamasData = {
                company: SelectCompany,
                license: type,
                SortTable: LicenseFilteringData,
            };
            dispatch(License_getLicenseDataThunk(ParamasData));
            setLoadingState(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicksProveData = (proveData: any) => {
        try {
            for (var i = 0; i < proveData.length; i++) {
                if (proveData[i].prove_type === 'URLS') {
                    window.open(proveData[i].prove_origin_name);
                } else {
                    window.open(`${process.env.REACT_APP_API_URL}/license/${proveData[i].prove_change_name}`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginBottom: '100px' }}>
            <LicenseGoogleGraphMainPage SelectCompany={SelectCompany} type={type}></LicenseGoogleGraphMainPage>
            <DownLoadMainPage
                SelectCompany={SelectCompany}
                UserAddModals={UserAddModals}
                setUserAddModals={setUserAddModals}
                setUserClickLicenseData={setUserClickLicenseData}
                UserClickLicenseData={UserClickLicenseData}
                type={type}
                SortTable={LicenseFilteringData}
                ModalType={ModalType}
            ></DownLoadMainPage>
            <div>
                <div>
                    <h2>{type === 'volume_license' ? '볼륨라이선스' : ''}</h2>
                    <h2>{type === 'package_license' ? '패키지라이선스' : ''}</h2>
                    <h2>{type === 'usbtype_license' ? 'USB타입라이선스' : ''}</h2>
                    <h2>{type === 'network_license' ? '네트워크라이선스' : ''}</h2>
                </div>
                <div>
                    <input type="checkbox" checked={LicenseAllShow} onChange={() => setLicenseAllShow(!LicenseAllShow)}></input>
                    <label>전체보기</label>
                </div>
                <LicensMainTableIncludeBox>
                    {LoadingState ? (
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols"></th>
                                    <th scope="cols">코드</th>
                                    <th scope="cols">라이선스 명</th>
                                    <th scope="cols">전체 인원</th>
                                    <th scope="cols">사용 인원</th>
                                    <th scope="cols">구매 이력 추가</th>
                                    <th scope="cols"></th>
                                    <th scope="cols">관리번호</th>
                                    <th scope="cols">구입날짜</th>
                                    <th scope="cols">만료날짜</th>
                                    <th scope="cols">구입가격</th>
                                    <th scope="cols">구입업체</th>
                                    <th scope="cols">라이선스 키</th>
                                    <th scope="cols">자산코드</th>
                                    <th scope="cols">전체 인원</th>
                                    <th scope="cols">사용 인원</th>
                                    <th scope="cols">사용 가능 인원</th>
                                    <th scope="cols">정보 보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LicenseData.data.map((list: LicenseDataType, i: number) => {
                                    return (
                                        <React.Fragment key={list.license_product_code + list.asset_info_asset_management_number}>
                                            <tr key={list.license_product_code}>
                                                <th scope="row" rowSpan={LicenseAllShow ? list.datas.length + 1 : ''}>
                                                    {i + 1}
                                                </th>
                                                <td rowSpan={LicenseAllShow ? list.datas.length + 1 : ''}>{list.license_product_code}</td>
                                                <td rowSpan={LicenseAllShow ? list.datas.length + 1 : ''}>{list.license_product_name}</td>
                                                <td rowSpan={LicenseAllShow ? list.datas.length + 1 : ''}>{list.sumpermit} 명</td>
                                                <td rowSpan={LicenseAllShow ? list.datas.length + 1 : ''}>{list.all_user_used_count}명</td>
                                                <td
                                                    rowSpan={LicenseAllShow ? list.datas.length + 1 : ''}
                                                    onClick={() => {
                                                        setModalType('Add_license');
                                                        setDetailLicenseClicksData(list);
                                                        setDetailLicenseAdd(true);
                                                    }}
                                                >
                                                    <BiMessageAdd></BiMessageAdd>
                                                </td>
                                                {!LicenseAllShow ? (
                                                    <>
                                                        <td>{list.datas.length}</td>
                                                        <td>{list.datas[list.datas.length - 1].license_manage_code}</td>
                                                        <td>
                                                            {moment(list.datas[list.datas.length - 1].license_purchase_date).format(
                                                                'YYYY-MM-DD'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {moment(list.datas[list.datas.length - 1].license_purchase_finish_date).format(
                                                                'YYYY-MM-DD'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {list.datas[list.datas.length - 1].license_purchase_pride.toLocaleString(
                                                                'ko-KR'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {list.datas[list.datas.length - 1].license_purchase_company
                                                                ? list.datas[list.datas.length - 1].license_purchase_company
                                                                : '-'}
                                                        </td>
                                                        <td>
                                                            {list.datas[list.datas.length - 1].license_prove_code ? (
                                                                list.datas[list.datas.length - 1].proveData?.length === 0 ? (
                                                                    '-'
                                                                ) : (
                                                                    <div
                                                                        onClick={() =>
                                                                            handleClicksProveData(
                                                                                list.datas[list.datas.length - 1].proveData
                                                                                    ? list.datas[list.datas.length - 1].proveData
                                                                                    : []
                                                                            )
                                                                        }
                                                                    >
                                                                        클릭
                                                                    </div>
                                                                )
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {list.datas[list.datas.length - 1].license_newcode
                                                                ? list.datas[list.datas.length - 1].license_newcode
                                                                : '-'}
                                                        </td>
                                                        <td>{list.datas[list.datas.length - 1].license_permit_count} 명</td>
                                                        <td>{list.datas[list.datas.length - 1].userData[0].useUserCount} 명</td>
                                                        <td>
                                                            {list.datas[list.datas.length - 1].license_permit_count -
                                                                list.datas[list.datas.length - 1].userData[0].useUserCount}{' '}
                                                            명
                                                        </td>
                                                        <td onClick={() => handleClicksUserAdd(list.datas[list.datas.length - 1])}>
                                                            <BsFillPersonPlusFill></BsFillPersonPlusFill>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </tr>

                                            {LicenseAllShow
                                                ? list.datas.map((item: LicenseDataType, j: number) => {
                                                      return (
                                                          <tr
                                                              key={item.license_manage_code}
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
                                                              <td>
                                                                  {item.license_prove_code ? (
                                                                      item.proveData?.length === 0 ? (
                                                                          '-'
                                                                      ) : (
                                                                          <div
                                                                              onClick={() =>
                                                                                  handleClicksProveData(
                                                                                      item.proveData ? item.proveData : []
                                                                                  )
                                                                              }
                                                                          >
                                                                              클릭
                                                                          </div>
                                                                      )
                                                                  ) : (
                                                                      '-'
                                                                  )}
                                                              </td>
                                                              <td>{item.license_newcode ? item.license_newcode : '-'}</td>
                                                              <td>{item.license_permit_count} 명</td>
                                                              <td>{item.userData[0].useUserCount} 명</td>
                                                              <td>{item.license_permit_count - item.userData[0].useUserCount} 명</td>
                                                              <td onClick={() => handleClicksUserAdd(item)}>
                                                                  <BsFillPersonPlusFill></BsFillPersonPlusFill>
                                                              </td>
                                                          </tr>
                                                      );
                                                  })
                                                : ''}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <SpinnerMainPage></SpinnerMainPage>
                    )}
                </LicensMainTableIncludeBox>
            </div>
            <div>
                {DetailLicenseAdd && ModalType === 'Add_license' ? (
                    <AddLicenseDetailMainPage
                        SelectCompany={SelectCompany}
                        type={type}
                        SortTable={LicenseFilteringData}
                        setSelectClicksModals={() => setDetailLicenseAdd(false)}
                        SelectClicksModals={DetailLicenseAdd}
                        DetailLicenseClicksData={DetailLicenseClicksData}
                    ></AddLicenseDetailMainPage>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default VolumeLicenseMainPage;
