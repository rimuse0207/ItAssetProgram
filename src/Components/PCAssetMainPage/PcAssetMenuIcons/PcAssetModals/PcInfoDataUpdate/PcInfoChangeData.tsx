import React, { useEffect, useState } from 'react';
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
import { toast } from '../../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../../Configs/ToastTimerConfig';
import { useParams } from 'react-router-dom';
import { DetailDataTypes } from './PcInfoDataUpdate';
import { request } from '../../../../../Apis/core';
import Select from 'react-select';

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

type paramasType = {
    type: string;
};

type Detail_Disk_Data_Types = {
    value: string;
    label: string;
};

const PcInfoChangeData = ({ SelectAssetData, setAssetDataChangeCheck, setSelectAssetData, SelectCompany }: PcInfoChangeDataProps) => {
    const dispatch = useDispatch();
    const { type } = useParams<paramasType>();
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
        asset_mac_info: SelectAssetData?.asset_mac_address ? SelectAssetData?.asset_mac_address : '',
        asset_ip_info: SelectAssetData?.asset_ip_address ? SelectAssetData?.asset_ip_address : '',
    });

    const [DetailData, setDetailData] = useState<DetailDataTypes | any>(null);
    const [Detail_Disk_Data, setDetail_Disk_Data] = useState<Detail_Disk_Data_Types[]>([]);

    const NowDiskState = [
        { label: 'SSD 128GB', value: 'SSD_128GB' },
        { label: 'SSD 512GB', value: 'SSD_512GB' },
        { label: 'SSD 1TB', value: 'SSD_1TB' },
        { label: 'HDD 256GB', value: 'HDD_256GB' },
        { label: 'HDD 512GB', value: 'HDD_512GB' },
        { label: 'HDD 1TB', value: 'HDD_1TB' },
        { label: 'HDD 2TB', value: 'HDD_2TB' },
    ];

    const Sending_Detail_Data = async () => {
        try {
            const Sending_Detail_Data_Axios = await request.post(`/Asset_app_server/Detail_Asset_Data`, { SelectAssetData });

            if (Sending_Detail_Data_Axios.data.dataSuccess) {
                setDetailData(Sending_Detail_Data_Axios.data.Select_Asset_Detail_Data_Rows[0]);
                setDetail_Disk_Data(Sending_Detail_Data_Axios.data.Select_Asset_Detail_Disk_Data_Rows);
                console.log(Sending_Detail_Data_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChanges = (e: any) => {
        setDetail_Disk_Data(e);
    };

    useEffect(() => {
        Sending_Detail_Data();
    }, []);

    const handleChangeAssetData = async () => {
        try {
            const ChangeAssetDatass = await AssetUserAdd('/Asset_app_server/Asset_data_update', { DetailData, Detail_Disk_Data });
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
                    asset_notepad,
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
                    asset_notepad,
                });

                const paramasData = {
                    company: SelectCompany,
                    type,
                    FilteringData,
                };
                if (ChangeAssetDatass.data.dataSuccess) {
                    dispatch(DeskTopAsset_getDeskTopAssetDataThunk(paramasData));
                    toast.show({
                        title: `자산 정보 수정을 완료하였습니다.`,
                        successCheck: true,
                        duration: ToastTime,
                    });

                    setAssetDataChangeCheck();
                } else {
                    toast.show({
                        title: `자산 정보 수정을 실패하였습니다.`,
                        successCheck: false,
                        duration: ToastTime,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `에러 발생 IT팀에 문의 바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
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
                        <button style={{ color: 'red', fontWeight: 'bolder' }} onClick={() => setAssetDataChangeCheck()}>
                            <BsPencilSquare></BsPencilSquare>취소하기
                        </button>
                        <button onClick={handleChangeAssetData} style={{ marginLeft: '30px', color: 'green', fontWeight: 'bolder' }}>
                            <BsPencilSquare></BsPencilSquare>자산 정보 수정 하기
                        </button>
                    </div>
                    <tr>
                        <th scope="row">관리 번호</th>
                        <td>
                            <input
                                placeholder="관리번호를 입력해주세요."
                                value={DetailData ? DetailData.asset_personal_code : ''}
                                onChange={e => setDetailData({ ...DetailData, asset_personal_code: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">MAC 주소</th>
                        <td>
                            <input
                                placeholder="MAC 주소를 입력해주세요."
                                value={DetailData ? DetailData.asset_mac_address : ''}
                                onChange={e => setDetailData({ ...DetailData, asset_mac_address: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">IP 주소</th>
                        <td>
                            <input
                                placeholder="IP 주소를 입력해주세요."
                                value={DetailData?.asset_ip_address ? DetailData.asset_ip_address : ''}
                                onChange={e => setDetailData({ ...DetailData, asset_ip_address: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">종류</th>
                        <td>
                            <select
                                defaultValue={DetailData?.asset_division}
                                onChange={e => setDetailData({ ...DetailData, asset_division: e.target.value })}
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
                                defaultValue={DetailData?.asset_maker}
                                onChange={e => setDetailData({ ...DetailData, asset_maker: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">모델명</th>
                        <td>
                            <input
                                defaultValue={DetailData?.asset_model}
                                onChange={e => setDetailData({ ...DetailData, asset_model: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">구매날짜</th>
                        <td>
                            <DatePicker
                                selected={new Date(DetailData ? DetailData.asset_purchase_date : new Date())}
                                onChange={(date: any) => setDetailData({ ...DetailData, asset_purchase_date: date })}
                                locale={ko}
                                dateFormat="yyyy-MM-dd"
                                maxDate={new Date()}
                                showMonthDropdown
                                useShortMonthInDropdown
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">구입 금액</th>
                        <td>
                            <input
                                defaultValue={DetailData?.asset_pride}
                                onChange={e => setDetailData({ ...DetailData, asset_pride: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">CPU</th>
                        <td>
                            <input
                                defaultValue={DetailData?.asset_cpu}
                                onChange={e => setDetailData({ ...DetailData, asset_cpu: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">RAM</th>
                        <td>
                            <select
                                className="select"
                                onChange={e => setDetailData({ ...DetailData, asset_ram: e.target.value })}
                                value={DetailData?.asset_ram}
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
                            <Select
                                value={Detail_Disk_Data}
                                onChange={(e: any) => handleChanges(e)}
                                isMulti
                                name="colors"
                                options={NowDiskState}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">자산코드</th>
                        <td>
                            <input
                                defaultValue={DetailData?.asset_newcode}
                                onChange={e => setDetailData({ ...DetailData, asset_newcode: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">메모</th>
                        <td>
                            <input
                                placeholder="비고사항을 입력 해 주세요."
                                value={DetailData ? DetailData.asset_notepad : ''}
                                onChange={e => setDetailData({ ...DetailData, asset_notepad: e.target.value })}
                            ></input>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">사용자</th>
                        <td>
                            {DetailData?.team}_{DetailData?.name}
                        </td>
                    </tr>
                </table>
            </div>
        </PcInfoChangeDataMainDivBox>
    );
};

export default PcInfoChangeData;
