import React, { useState } from 'react';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';
import { BsPencilSquare } from 'react-icons/bs';
import moment from 'moment';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import { AssetUserAdd } from '../../../../../Apis/core/api/AuthUnNeedApi/AssetUserAdd/AssetAdd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../Models/index';
import { DeskTopAsset_getDeskTopAssetDataThunk } from '../../../../../Models/AssetDataReduxThunk/AssetDeskTopDataThunks';
import { NoteBookAsset_getNoteBookAssetDataThunk } from '../../../../../Models/AssetDataReduxThunk/AssetNotBookDataThunks';
import { MonitorAsset_getMonitorAssetDataThunk } from '../../../../../Models/AssetDataReduxThunk/AssetMonitorDataThunks';
import { toast } from '../../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../../Configs/ToastTimerConfig';

registerLocale('ko', ko);
type PcInfoChangeDataProps = {
    SelectAssetData: DeskTopInfoDataType | null;
    setAssetDataChangeCheck: () => void;
    setSelectAssetData: any;
    SelectCompany: string;
};

const PcInfoChangeDataMainDivBox = styled.div`
    .type03 {
        position: relative;
        td {
            input,
            select {
                width: 100%;
                height: 40px;
                padding-left: 15px;
            }
        }
        .UpdateButton {
            position: absolute;
            top: -30px;
            right: 0px;
        }
    }
`;

const PcInfoChangeData = ({ SelectAssetData, setAssetDataChangeCheck, setSelectAssetData, SelectCompany }: PcInfoChangeDataProps) => {
    const dispatch = useDispatch();
    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    const [ChangeAssetData, setChangeAssetData] = useState({
        asset_management_number: SelectAssetData?.asset_management_number,
        asset_division: SelectAssetData?.asset_division ? SelectAssetData?.asset_division : '',
        asset_maker: SelectAssetData?.asset_maker ? SelectAssetData?.asset_maker : '',
        asset_model: SelectAssetData?.asset_model ? SelectAssetData?.asset_model : '',
        asset_purchase_date: moment(SelectAssetData?.asset_purchase_date).format('YYYY-MM-DD'),
        asset_pride: SelectAssetData?.asset_pride ? SelectAssetData?.asset_pride : '',
        asset_cpu: SelectAssetData?.asset_cpu ? SelectAssetData?.asset_cpu : '',
        asset_ram: SelectAssetData?.asset_ram ? SelectAssetData?.asset_ram : '',
        asset_disk: SelectAssetData?.asset_disk ? SelectAssetData?.asset_disk : '',
        asset_newcode: SelectAssetData?.asset_newcode ? SelectAssetData?.asset_newcode : '',
        usercheck: false,
        userinfo_email: '',
        asset_distribute_date: new Date(),
        company_code: '',
        asset_notepad: '',
    });

    const handleChangeAssetData = async () => {
        try {
            const ChangeAssetDatass = await AssetUserAdd('/Asset_app_server/Asset_data_update', { ChangeAssetData });
            if (ChangeAssetDatass.data.dataSuccess) {
                const {
                    asset_cpu,
                    asset_disk,
                    asset_division,
                    asset_maker,
                    asset_model,
                    asset_purchase_date,
                    asset_ram,
                    asset_pride,
                    asset_newcode,
                } = ChangeAssetData;

                setSelectAssetData({
                    ...SelectAssetData,
                    asset_division: asset_division,
                    asset_maker,
                    asset_model,
                    asset_purchase_date: moment(asset_purchase_date).format('YYYY-MM-DD'),
                    asset_pride,
                    asset_cpu,
                    asset_ram,
                    asset_disk,
                    asset_newcode,
                });

                const ParamasDatasDesktop = {
                    types: '데스크탑',
                    SelectCompany,
                    FilteringData,
                };
                const ParamasDatasNoteBook = {
                    types: '노트북',
                    SelectCompany,
                    FilteringData,
                };
                const ParamasDatasMonitor = {
                    types: '모니터',
                    SelectCompany,
                    FilteringData,
                };
                await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(ParamasDatasDesktop));
                await dispatch(NoteBookAsset_getNoteBookAssetDataThunk(ParamasDatasNoteBook));
                await dispatch(MonitorAsset_getMonitorAssetDataThunk(ParamasDatasMonitor));

                toast.show({
                    title: `자산 정보 수정을 완료하였습니다.`,
                    successCheck: true,
                    duration: ToastTime,
                });

                setAssetDataChangeCheck();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PcInfoChangeDataMainDivBox>
            <div>
                <h2>PC 자산 유저 추가</h2>
            </div>
            <div>
                <table className="type03">
                    <div className="UpdateButton">
                        <button onClick={handleChangeAssetData}>
                            <BsPencilSquare></BsPencilSquare>자산 정보 저장 하기
                        </button>
                    </div>
                    <tr>
                        <th scope="row">관리 번호</th>
                        <td>{ChangeAssetData.asset_management_number}</td>
                    </tr>
                    <tr>
                        <th scope="row">종류</th>
                        <td>
                            <select
                                defaultValue={ChangeAssetData.asset_division}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_division: e.target.value })}
                            >
                                <option value="데스크탑">데스크탑</option>
                                <option value="노트북">노트북</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">제조사</th>
                        <td>
                            <input
                                defaultValue={ChangeAssetData.asset_maker}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_maker: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">모델명</th>
                        <td>
                            <input
                                defaultValue={ChangeAssetData.asset_model}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_model: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">구매날짜</th>
                        <td>
                            <DatePicker
                                selected={new Date(ChangeAssetData.asset_purchase_date)}
                                onChange={(date: any) => setChangeAssetData({ ...ChangeAssetData, asset_purchase_date: date })}
                                withPortal
                                locale={ko}
                                dateFormat="yyy-MM-dd"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">구입 금액</th>
                        <td>
                            <input
                                defaultValue={ChangeAssetData.asset_pride}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_pride: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">CPU</th>
                        <td>
                            <input
                                defaultValue={ChangeAssetData.asset_cpu}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_cpu: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">RAM</th>
                        <td>
                            {/* <input
                                defaultValue={ChangeAssetData.asset_ram}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_ram: e.target.value })}
                            ></input> */}
                            <select
                                className="select"
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_ram: e.target.value })}
                                value={ChangeAssetData.asset_ram}
                            >
                                <option defaultValue="4GB" value={'4GB'}>
                                    4GB
                                </option>
                                <option defaultValue="8GB" value={'8GB'}>
                                    8GB
                                </option>
                                <option defaultValue="16GB" value={'16GB'}>
                                    16GB
                                </option>
                                <option defaultValue="32GB" value={'32GB'}>
                                    32GB
                                </option>
                                <option defaultValue="64GB" value={'64GB'}>
                                    64GB
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">DISK</th>
                        <td>
                            {/* <input
                                defaultValue={ChangeAssetData.asset_disk}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_disk: e.target.value })}
                            ></input> */}
                            <select
                                className="select"
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_disk: e.target.value })}
                                value={ChangeAssetData.asset_disk}
                            >
                                <option defaultValue="SSD_256GB" value={'SSD_256GB'}>
                                    SSD_256GB
                                </option>
                                <option defaultValue="SSD_512GB" value={'SSD_512GB'}>
                                    SSD_512GB
                                </option>
                                <option defaultValue="SSD_1TB" value={'SSD_1TB'}>
                                    SSD_1TB
                                </option>
                                <option defaultValue="HDD_512GB" value={'HDD_512GB'}>
                                    HDD_512GB
                                </option>
                                <option defaultValue="HDD_1TB" value={'HDD_1TB'}>
                                    HDD_1TB
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">자산코드</th>
                        <td>
                            <input
                                defaultValue={ChangeAssetData.asset_newcode}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_newcode: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">메모</th>
                        <td>
                            <input
                                placeholder="비고사항을 입력 해 주세요."
                                defaultValue={ChangeAssetData.asset_notepad}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_notepad: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    {/* <tr>
                        <th scope="row">사용처</th>
                        <td>
                            {SelectAssetData?.company_name}_{SelectAssetData?.company_location}
                        </td>
                    </tr> */}
                    <tr>
                        <th scope="row">사용자</th>
                        <td>
                            {SelectAssetData?.team}_{SelectAssetData?.name}
                        </td>
                    </tr>
                </table>
            </div>
        </PcInfoChangeDataMainDivBox>
    );
};

export default PcInfoChangeData;
