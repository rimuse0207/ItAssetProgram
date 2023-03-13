import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import SpinnerMainPage from '../../../PublicComponents/SpinnerMainPage/SpinnerMainPage';
import { BsInfoCircleFill } from 'react-icons/bs';
import DownLoadMainPage from './DownloadMainPage/DownLoadMainPage';
import { VolumeLicenseMainPageProps, LicenseDataType, purchase_License_Type, basic_License_Type } from './VolumeLicenseDataTypes';
import { License_getLicenseDataThunk } from '../../../Models/LicenseDataReduxThunk/LicenseDataThunks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Models';
import LicenseGoogleGraphMainPage from '../LicenseGoogleGraphMainPage/LicenseGoogleGraphMainPage';
import { BiMessageAdd } from 'react-icons/bi';
import AddLicenseDetailMainPage from './DownloadMainPage/ModalMainPage/AddLicenseDetailMainPage';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import AddUserModalMainPage from './DownloadMainPage/ModalMainPage/AddUserModalMainPage';

export const LicensMainTableIncludeBox = styled.div`
    td,
    th {
        vertical-align: middle !important;
    }
    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        font-size: 0.5em;
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
    const windowScrollss = useRef<any>(null);
    const [LoadingState, setLoadingState] = useState(false);
    const [UserAddModals, setUserAddModals] = useState(false);
    const [DetailLicenseAdd, setDetailLicenseAdd] = useState(false);
    const [ModalType, setModalType] = useState('');
    const [DetailLicenseClicksData, setDetailLicenseClicksData] = useState<LicenseDataType | null>(null);
    const [UserClickLicenseData, setUserClickLicenseData] = useState<LicenseDataType | null>(null);
    const [LicenseAllShow, setLicenseAllShow] = useState(false);
    const dispatch = useDispatch();
    const LicenseData = useSelector((state: RootState) => state.LicenseData.LicenseData);
    const LicenseFilteringData = useSelector((state: RootState) => state.LicenseFilteringData);
    const [SelectClickData, setSelectClickData] = useState<basic_License_Type | null>(null);

    useEffect(() => {
        GetInfoLicensData();
    }, [type]);

    const handleClicksUserAdd = (data: LicenseDataType) => {
        console.log(data);
        setModalType('Add_license_uers_used');
        setDetailLicenseAdd(true);
        setSelectClickData(data.basic_License);
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

    return (
        <div style={{ marginBottom: '100px' }} ref={windowScrollss}>
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
                windowScrollss={windowScrollss}
            ></DownLoadMainPage>
            <div className="MainContentBoxCotainer">
                <div>
                    <h2>{type === 'volume_license' ? '라이선스' : ''}</h2>
                </div>
                <div onChange={() => setLicenseAllShow(!LicenseAllShow)} className="AllShowButtons">
                    <input id="allShow" name="allShow" type="checkbox" checked={LicenseAllShow}></input>
                    <label htmlFor="allShow">전체보기</label>
                </div>
                <LicensMainTableIncludeBox>
                    {LoadingState ? (
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">No.</th>
                                    <th scope="cols">라이선스 명</th>
                                    <th scope="cols">전체 인원</th>
                                    <th scope="cols">사용 인원</th>
                                    <th scope="cols">구매 이력 추가</th>
                                    <th scope="cols">유저 등록 </th>
                                    <th scope="cols">등록 수</th>
                                    <th scope="cols">구입날짜</th>
                                    <th scope="cols">만료날짜</th>
                                    <th scope="cols">구입가격</th>
                                    <th scope="cols">구입업체</th>
                                    <th scope="cols">등록 허용 인원</th>
                                    <th scope="cols">자산코드</th>
                                    <th scope="cols">메모</th>
                                    <th scope="cols">정보 보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LicenseData.loading ? (
                                    LicenseData.data.map((list: LicenseDataType, i: number) => {
                                        return (
                                            <React.Fragment key={list.basic_License.asset_license_list_info_code}>
                                                <tr key={list.basic_License.asset_license_list_info_code}>
                                                    <th scope="row" rowSpan={LicenseAllShow ? list.purchase_License.length + 1 : 1}>
                                                        {i + 1}
                                                    </th>
                                                    <td rowSpan={LicenseAllShow ? list.purchase_License.length + 1 : 1}>
                                                        {list.basic_License.asset_license_list_info_name}
                                                    </td>
                                                    <td rowSpan={LicenseAllShow ? list.purchase_License.length + 1 : 1}>
                                                        {list.basic_License.license_permit_count_sum} 명
                                                    </td>
                                                    <td rowSpan={LicenseAllShow ? list.purchase_License.length + 1 : 1}>
                                                        {list.basic_License.license_user_used_count_sum}명
                                                    </td>
                                                    <td
                                                        rowSpan={LicenseAllShow ? list.purchase_License.length + 1 : 1}
                                                        onClick={() => {
                                                            setModalType('Add_license');
                                                            setDetailLicenseClicksData(list);
                                                            setDetailLicenseAdd(true);
                                                        }}
                                                        style={{ fontSize: '2.5em' }}
                                                    >
                                                        <BiMessageAdd></BiMessageAdd>
                                                    </td>
                                                    <td
                                                        rowSpan={LicenseAllShow ? list.purchase_License.length + 1 : 1}
                                                        onClick={() => handleClicksUserAdd(list)}
                                                        style={{ fontSize: '2.5em' }}
                                                    >
                                                        <AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>
                                                    </td>
                                                    {!LicenseAllShow && list.purchase_License[list.purchase_License.length - 1] ? (
                                                        <>
                                                            <td>{list.purchase_License.length}개</td>

                                                            <td>
                                                                {moment(
                                                                    list.purchase_License[list.purchase_License.length - 1]
                                                                        .asset_license_purchase_info_purchase_date
                                                                ).format('YYYY-MM-DD')}
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    list.purchase_License[list.purchase_License.length - 1]
                                                                        .asset_license_purchase_info_finish_date
                                                                ).format('YYYY-MM-DD')}
                                                            </td>
                                                            <td>
                                                                {list.purchase_License[
                                                                    list.purchase_License.length - 1
                                                                ].asset_license_purchase_info_pride.toLocaleString('ko-KR')}
                                                            </td>
                                                            <td>
                                                                {list.purchase_License[list.purchase_License.length - 1]
                                                                    .asset_license_purchase_info_purchase_company_info
                                                                    ? list.purchase_License[list.purchase_License.length - 1]
                                                                          .asset_license_purchase_info_purchase_company_info
                                                                    : '-'}
                                                            </td>
                                                            <td>
                                                                {
                                                                    list.purchase_License[list.purchase_License.length - 1]
                                                                        .asset_license_purchase_info_permit_count
                                                                }{' '}
                                                                명
                                                            </td>
                                                            <td>
                                                                {list.purchase_License[list.purchase_License.length - 1]
                                                                    .asset_license_purchase_info_newcode
                                                                    ? list.purchase_License[list.purchase_License.length - 1]
                                                                          .asset_license_purchase_info_newcode
                                                                    : '-'}
                                                            </td>
                                                            <td>
                                                                {list.purchase_License[list.purchase_License.length - 1]
                                                                    .asset_license_purchase_info_notepad
                                                                    ? list.purchase_License[list.purchase_License.length - 1]
                                                                          .asset_license_purchase_info_notepad
                                                                    : '-'}
                                                            </td>

                                                            <td
                                                                // onClick={() =>
                                                                //     handleClicksUserAdd(
                                                                //         list.purchase_License[list.purchase_License.length - 1]
                                                                //     )
                                                                // }
                                                                style={{ fontSize: '2em' }}
                                                            >
                                                                <BsInfoCircleFill></BsInfoCircleFill>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </tr>

                                                {LicenseAllShow
                                                    ? list.purchase_License.map((item: purchase_License_Type, j: number) => {
                                                          return (
                                                              <tr
                                                                  key={item.asset_license_purchase_info_indexs}
                                                                  style={
                                                                      item.asset_license_purchase_info_permit_count -
                                                                          item.asset_license_purchase_info_indexs <
                                                                      0
                                                                          ? { backgroundColor: '#edafaf' }
                                                                          : {}
                                                                  }
                                                              >
                                                                  <td>{j + 1}</td>

                                                                  <td>
                                                                      {moment(item.asset_license_purchase_info_purchase_date).format(
                                                                          'YYYY-MM-DD'
                                                                      )}
                                                                  </td>
                                                                  <td>
                                                                      {moment(item.asset_license_purchase_info_finish_date).format(
                                                                          'YYYY-MM-DD'
                                                                      )}
                                                                  </td>
                                                                  <td>{item.asset_license_purchase_info_pride.toLocaleString('ko-KR')}</td>
                                                                  <td>
                                                                      {item.asset_license_purchase_info_purchase_company_info
                                                                          ? item.asset_license_purchase_info_purchase_company_info
                                                                          : '-'}
                                                                  </td>
                                                                  <td>{item.asset_license_purchase_info_permit_count} 명</td>
                                                                  <td>
                                                                      {item.asset_license_purchase_info_newcode
                                                                          ? item.asset_license_purchase_info_newcode
                                                                          : '-'}
                                                                  </td>
                                                                  <td>
                                                                      {item.asset_license_purchase_info_notepad
                                                                          ? item.asset_license_purchase_info_notepad
                                                                          : '-'}
                                                                  </td>

                                                                  <td
                                                                      //   onClick={() => handleClicksUserAdd(item)}
                                                                      style={{ fontSize: '2em' }}
                                                                  >
                                                                      <BsInfoCircleFill></BsInfoCircleFill>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })
                                                    : ''}
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
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
                        GetInfoLicensData={() => GetInfoLicensData()}
                    ></AddLicenseDetailMainPage>
                ) : (
                    ''
                )}
                {DetailLicenseAdd && ModalType === 'Add_license_uers_used' ? (
                    <AddUserModalMainPage
                        setSelectClicksModals={() => setDetailLicenseAdd(false)}
                        SelectClicksModals={DetailLicenseAdd}
                        SelectClickData={SelectClickData}
                        SelectCompany={SelectCompany}
                    ></AddUserModalMainPage>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default VolumeLicenseMainPage;
