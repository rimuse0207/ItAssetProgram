import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { DeskTopInfoDataType, DeskTopMainPageProps } from '../PCAssetDataType';
import { NothingAssetCheckFunc } from '../../../PublicFunc/NothingAssetData';
import { GiLaptop } from 'react-icons/gi';
import { BsInfoCircleFill } from 'react-icons/bs';
import { AssetTableMainDivBox } from '../DeskTop/DeskTopMainPage';
import SpinnerMainPage from '../../../PublicComponents/SpinnerMainPage/SpinnerMainPage';
import { NoteBookAsset_getNoteBookAssetDataThunk } from '../../../Models/AssetDataReduxThunk/AssetNotBookDataThunks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Models';
import { AssetDelete } from '../../../Apis/core/api/AuthUnNeedApi/DeleteAssetUser/AssetDelete';
import { toast } from '../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../Configs/ToastTimerConfig';
import NewPcAssetUserData from '../PcAssetMenuIcons/PcAssetModals/NewPcAssetUserDataModal';
import UpdatePcAssetUserDataModal from '../PcAssetMenuIcons/PcAssetModals/UpdatePcAssetUserDataModal';

const NoteBookMainPage = ({ SelectCompany, type }: DeskTopMainPageProps) => {
    const [UserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
    const [SelectAssetData, setSelectAssetData] = useState<DeskTopInfoDataType | null>(null);
    const NoteBookInfo = useSelector((state: RootState) => state.NoteBookAssetData.NoteBookAssetData);
    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    const dispatch = useDispatch();
    useEffect(() => {
        getDataAssetDeskTop();
    }, [SelectCompany, FilteringData]);

    const getDataAssetDeskTop = async () => {
        try {
            const ParamasData = {
                types: '노트북',
                SelectCompany,
                FilteringData,
            };

            await dispatch(NoteBookAsset_getNoteBookAssetDataThunk(ParamasData));
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
        <div style={{ marginTop: '50px' }}>
            <div>
                <AssetTableMainDivBox>
                    {NoteBookInfo.loading ? (
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">
                                        <div>
                                            <GiLaptop></GiLaptop>노트북
                                        </div>
                                        <div>
                                            ( {NoteBookInfo.data.length - NothingAssetCheckFunc(NoteBookInfo.data)}/
                                            {NothingAssetCheckFunc(NoteBookInfo.data)}/{NoteBookInfo.data.length} )
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
                                </tr>
                            </thead>
                            <tbody>
                                {NoteBookInfo.data.length > 0 ? (
                                    NoteBookInfo.data.map((list: DeskTopInfoDataType, i: number) => {
                                        return (
                                            <tr key={list.asset_management_number}>
                                                <td>{i + 1}</td>
                                                <td>{list.asset_management_number}</td>
                                                <td>{list.asset_maker}</td>
                                                <td>{list.asset_model}</td>
                                                <td>{moment(list.asset_purchase_date).format('YYYY-MM-DD')}</td>
                                                <td>{moment(list.asset_purchase_date).clone().add(4, 'years').format('YYYY-MM-DD')}</td>
                                                <td>{list.asset_pride ? Number(list.asset_pride).toLocaleString('ko-KR') : '-'}</td>
                                                <td>{list.asset_cpu}</td>
                                                <td>{list.asset_ram}</td>
                                                <td>{list.asset_disk}</td>
                                                <td>{list.asset_newcode ? list.asset_newcode : '-'}</td>
                                                <td>
                                                    {list.company_location}_{list.company_building}_{list.company_floor}
                                                </td>
                                                <td>{list.name ? list.name : '-'}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="UserPlusIcons" onClick={() => handleMinusUsered(list)}>
                                                        <BsInfoCircleFill></BsInfoCircleFill>
                                                    </div>
                                                </td>
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
                    setSelectAssetData={(data: any) => setSelectAssetData(data)}
                ></UpdatePcAssetUserDataModal>
            ) : (
                ''
            )}
        </div>
    );
};

export default NoteBookMainPage;
