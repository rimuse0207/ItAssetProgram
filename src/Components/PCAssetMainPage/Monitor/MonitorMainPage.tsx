import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { AssetTableMainDivBox } from '../DeskTop/DeskTopMainPage';
import { DeskTopInfoDataType, DeskTopMainPageProps } from '../PCAssetDataType';
import { NothingAssetCheckFunc } from '../../../PublicFunc/NothingAssetData';
import { ImUserMinus, ImUserPlus } from 'react-icons/im';
import { FiMonitor } from 'react-icons/fi';
import SpinnerMainPage from '../../../PublicComponents/SpinnerMainPage/SpinnerMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { MonitorAsset_getMonitorAssetDataThunk } from '../../../Models/AssetDataReduxThunk/AssetMonitorDataThunks';
import { RootState } from '../../../Models';
import NewPcAssetUserData from '../PcAssetMenuIcons/PcAssetModals/NewPcAssetUserDataModal';
import { toast } from '../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../Configs/ToastTimerConfig';
import { AssetDelete } from '../../../Apis/core/api/AuthUnNeedApi/DeleteAssetUser/AssetDelete';

const MoniterMainPage = ({ SelectCompany, type }: DeskTopMainPageProps) => {
    const [UserAddModalOpen, setUserAddModalOpen] = useState(false);
    const [SelectAssetData, setSelectAssetData] = useState<DeskTopInfoDataType | null>(null);
    const MonitorInfo = useSelector((state: RootState) => state.MonitorAssetData.MonitorAssetData);
    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    const dispatch = useDispatch();

    useEffect(() => {
        getDataAssetDeskTop();
    }, [SelectCompany, FilteringData]);

    const getDataAssetDeskTop = async () => {
        try {
            const ParamasData = {
                types: '모니터',
                SelectCompany,
                FilteringData,
            };

            await dispatch(MonitorAsset_getMonitorAssetDataThunk(ParamasData));
        } catch (error) {
            console.log(error);
        }
    };
    const handlePlusUsered = async (data: DeskTopInfoDataType) => {
        try {
            setSelectAssetData(data);
            setUserAddModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMinusUsered = async (data: DeskTopInfoDataType) => {
        try {
            const deleteData = await AssetDelete('/Asset_app_server/AssetDeleteData', data);
            if (deleteData.data.dataSuccess) {
                getDataAssetDeskTop();
                toast.show({
                    title: `관리번호(${data.asset_management_number})에 유저 등록 해제 하였습니다.`,
                    successCheck: true,
                    duration: ToastTime,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div>
                <AssetTableMainDivBox>
                    {MonitorInfo.loading ? (
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">
                                        <div>
                                            <FiMonitor></FiMonitor>모니터
                                        </div>
                                        <div>
                                            ( {MonitorInfo.data.length - NothingAssetCheckFunc(MonitorInfo.data)}/
                                            {NothingAssetCheckFunc(MonitorInfo.data)}/{MonitorInfo.data.length} )
                                        </div>
                                    </th>
                                    <th scope="cols">관리번호</th>
                                    <th scope="cols">제조사</th>
                                    <th scope="cols">모델명</th>
                                    <th scope="cols">구입일</th>
                                    <th scope="cols">유효일</th>
                                    <th scope="cols">취득가</th>
                                    <th scope="cols">유형</th>
                                    <th scope="cols">자산코드</th>
                                    <th scope="cols">사용장소</th>
                                    <th scope="cols">사용자</th>
                                    <th scope="cols">폐기여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MonitorInfo.data.length > 0 ? (
                                    MonitorInfo.data.map((list: DeskTopInfoDataType, i: number) => {
                                        return (
                                            <tr key={list.asset_management_number}>
                                                <td>{i + 1}</td>
                                                <td>{list.asset_management_number}</td>
                                                <td>{list.asset_maker}</td>
                                                <td>{list.asset_model}</td>
                                                <td>{moment(list.asset_purchase_date).format('YYYY-MM-DD')}</td>
                                                <td>{moment(list.asset_purchase_date).clone().add(5, 'years').format('YYYY-MM-DD')}</td>
                                                <td>{list.asset_pride}</td>
                                                <td>{list.asset_cpu}</td>
                                                <td>{list.asset_newcode ? list.asset_newcode : '-'}</td>
                                                <td>
                                                    {list.company_location}_{list.company_building}_{list.company_floor}
                                                </td>
                                                <td>{list.name ? list.name : '-'}</td>
                                                <td>{list.asset_destroy_check ? 'O' : '-'}</td>
                                                <td>
                                                    {list.name ? (
                                                        <div className="UserMinusIcons" onClick={() => handleMinusUsered(list)}>
                                                            <ImUserMinus></ImUserMinus>
                                                        </div>
                                                    ) : (
                                                        <div className="UserPlusIcons" onClick={() => handlePlusUsered(list)}>
                                                            <ImUserPlus></ImUserPlus>
                                                        </div>
                                                    )}
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
            {UserAddModalOpen ? (
                <NewPcAssetUserData
                    UserAddModalOpen={UserAddModalOpen}
                    setUserAddModalOpen={() => setUserAddModalOpen(false)}
                    SelectAssetData={SelectAssetData}
                ></NewPcAssetUserData>
            ) : (
                ''
            )}
        </div>
    );
};

export default MoniterMainPage;
