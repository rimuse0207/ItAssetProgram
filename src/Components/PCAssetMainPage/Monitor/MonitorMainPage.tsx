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
    console.log('COmponents', MonitorInfo);
    useEffect(() => {
        getDataAssetDeskTop();
    }, [SelectCompany, FilteringData]);

    const getDataAssetDeskTop = async () => {
        try {
            const ParamasData = {
                types: 'monitor',
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
            console.log(data);
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
                toast.show({ title: `자산(${data.type})에 유저 등록 해제 하였습니다.`, successCheck: true, duration: ToastTime });
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
                                    <th scope="cols">코드</th>
                                    <th scope="cols">유형</th>
                                    <th scope="cols">구매 날짜</th>
                                    <th scope="cols">유효 날짜</th>
                                    <th scope="cols">사용자</th>
                                    <th scope="cols">팀명</th>
                                    <th scope="cols">사용처</th>
                                    <th scope="cols">등록 확인</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MonitorInfo.data.length > 0 ? (
                                    MonitorInfo.data.map((list: DeskTopInfoDataType, i: number) => {
                                        return (
                                            <tr key={list.code}>
                                                <td>{i + 1}</td>
                                                <td>{list.code}</td>
                                                <td>{list.asset_explain}</td>
                                                <td>{moment(list.asset_purchasedate).format('YYYY-MM-DD')}</td>
                                                <td>{moment(list.asset_purchasedate).clone().add(5, 'years').format('YYYY-MM-DD')}</td>
                                                <td>{list.name ? list.name : '-'}</td>
                                                <td>{list.team ? list.team : '-'}</td>
                                                <td>
                                                    {list.companyname}_{list.companylocation}
                                                </td>
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
