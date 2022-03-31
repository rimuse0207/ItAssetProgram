import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import { LicensMainTableIncludeBox } from '../../LicenseMainPage/VolumeLicenseMainPage/VolumeLicenseMainPage';
// import { AssetDesktopInfoGet } from '../../../Apis/core/api/AuthNeedApi/LicenseApi';
import { NothingAssetCheckFunc } from '../../../PublicFunc/NothingAssetData';
import { DeskTopInfoDataType, DeskTopMainPageProps } from '../PCAssetDataType';
import SpinnerMainPage from '../../../PublicComponents/SpinnerMainPage/SpinnerMainPage';
import { CgDesktop } from 'react-icons/cg';
import { BsInfoCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { DeskTopAsset_getDeskTopAssetDataThunk } from '../../../Models/AssetDataReduxThunk/AssetDeskTopDataThunks';
import { RootState } from '../../../Models';
import UpdatePcAssetUserDataModal from '../PcAssetMenuIcons/PcAssetModals/UpdatePcAssetUserDataModal';

export const AssetTableMainDivBox = styled.div`
    max-height: 60vh;
    overflow: auto;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding-top: 20px;
    padding-left: 10px;
    margin-right: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
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
        background-color: #368;
    }
    table {
        font-size: 0.8em;
        position: relative;
        width: 100%;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border-bottom: 3px solid #036;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
    }
    .UserMinusIcons,
    .UserPlusIcons {
        font-size: 1.5em;
        display: inline-block;
    }
    .UserMinusIcons {
        :hover {
            cursor: pointer;
            color: red;
        }
    }
    .UserPlusIcons {
        :hover {
            cursor: pointer;
            color: limegreen;
        }
    }
`;

const DeskTopMainPage = ({ SelectCompany, type }: DeskTopMainPageProps) => {
    const [UserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
    const [SelectAssetData, setSelectAssetData] = useState<DeskTopInfoDataType | null>(null);

    const DeskTopInfo = useSelector((state: RootState) => state.DeskTopAssetData.DeskTopAssetData);
    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    const dispatch = useDispatch();
    useEffect(() => {
        getDataAssetDeskTop();
    }, [SelectCompany, FilteringData]);

    const getDataAssetDeskTop = async () => {
        try {
            const ParamasData = {
                types: '데스크탑',
                SelectCompany,
                FilteringData,
            };

            await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(ParamasData));
        } catch (error) {
            console.log(error);
        }
    };

    const handleMinusUsered = async (data: DeskTopInfoDataType) => {
        try {
            setSelectAssetData(data);
            setUserUpdateModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <AssetTableMainDivBox>
                    {DeskTopInfo.data ? (
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">
                                        <div>
                                            <CgDesktop></CgDesktop>
                                            데스크탑
                                        </div>
                                        <div>
                                            ( {DeskTopInfo.data.length - NothingAssetCheckFunc(DeskTopInfo.data)}/
                                            {NothingAssetCheckFunc(DeskTopInfo.data)}/{DeskTopInfo.data.length} )
                                        </div>
                                    </th>
                                    <th scope="cols">관리번호</th>
                                    <th scope="cols">제조사</th>
                                    <th scope="cols">모델명</th>
                                    <th scope="cols">구입일</th>
                                    <th scope="cols">유효일</th>
                                    <th scope="cols">취득가</th>
                                    <th scope="cols">CPU</th>
                                    <th scope="cols">RAM</th>
                                    <th scope="cols">DISK</th>
                                    <th scope="cols">자산코드</th>
                                    <th scope="cols">사용장소</th>
                                    <th scope="cols">사용자</th>
                                    <th scope="cols">정보 조회</th>
                                    <th scope="cols">폐기 여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DeskTopInfo.data.length > 0 ? (
                                    DeskTopInfo.data.map((list: DeskTopInfoDataType, i: number) => {
                                        return (
                                            <tr key={list.asset_management_number}>
                                                <td>{i + 1}</td>
                                                <td>{list.asset_management_number}</td>
                                                <td>{list.asset_maker}</td>
                                                <td>{list.asset_model}</td>
                                                <td>{moment(list.asset_purchase_date).format('YYYY-MM-DD')}</td>
                                                <td>{moment(list.asset_purchase_date).clone().add(5, 'years').format('YYYY-MM-DD')}</td>
                                                <td>{list.asset_pride ? Number(list.asset_pride).toLocaleString('ko-KR') : '-'}</td>
                                                <td>{list.asset_cpu}</td>
                                                <td>{list.asset_ram}</td>
                                                <td>{list.asset_disk}</td>
                                                <td>{list.asset_newcode ? list.asset_newcode : '-'}</td>
                                                <td>
                                                    {list.companyInfo_companycode ? (
                                                        <div>
                                                            <div>{list.company_location}</div>
                                                            <div>{list.company_building}</div>
                                                            <div>{list.company_floor}</div>
                                                        </div>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td>
                                                    {list.name ? (
                                                        <div>
                                                            <div>{list.team}</div>
                                                            <div>{list.name}</div>
                                                        </div>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {list.asset_destroy_check === 0 ? (
                                                        <div className="UserPlusIcons" onClick={() => handleMinusUsered(list)}>
                                                            <BsInfoCircleFill></BsInfoCircleFill>
                                                        </div>
                                                    ) : (
                                                        <div>불가</div>
                                                    )}
                                                </td>
                                                <td>{list.asset_destroy_check === 0 ? 'X' : 'O'}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={10}>데이터 없음</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <SpinnerMainPage></SpinnerMainPage>
                    )}
                </AssetTableMainDivBox>
            </div>

            {UserUpdateModalOpen ? (
                <UpdatePcAssetUserDataModal
                    UserAddModalOpen={UserUpdateModalOpen}
                    setUserAddModalOpen={() => setUserUpdateModalOpen(false)}
                    SelectAssetData={SelectAssetData}
                    SelectCompany={SelectCompany}
                ></UpdatePcAssetUserDataModal>
            ) : (
                ''
            )}
        </div>
    );
};

export default DeskTopMainPage;
