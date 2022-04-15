import React, { useState } from 'react';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';
import { BsPencilSquare } from 'react-icons/bs';
import moment from 'moment';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import { AssetUserAdd } from '../../../../../Apis/core/api/AuthUnNeedApi/AssetUserAdd/AssetAdd';

registerLocale('ko', ko);
type PcInfoChangeDataProps = {
    SelectAssetData: DeskTopInfoDataType | null;
    setAssetDataChangeCheck: () => void;
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

const PcInfoChangeData = ({ SelectAssetData, setAssetDataChangeCheck }: PcInfoChangeDataProps) => {
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
    });

    const handleChangeAssetData = async () => {
        try {
            console.log(ChangeAssetData);

            const ChangeAssetDatass = await AssetUserAdd('/Asset_app_server/Asset_data_update', { ChangeAssetData });
            console.log(ChangeAssetDatass);

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
                } = ChangeAssetDatass.data.data[0];
                setChangeAssetData({
                    ...ChangeAssetData,

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
                            <input
                                defaultValue={ChangeAssetData.asset_ram}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_ram: e.target.value })}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">DISK</th>
                        <td>
                            <input
                                defaultValue={ChangeAssetData.asset_disk}
                                onChange={e => setChangeAssetData({ ...ChangeAssetData, asset_disk: e.target.value })}
                            ></input>
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
                        <th scope="row">사용처</th>
                        <td>
                            {SelectAssetData?.company_name}_{SelectAssetData?.company_location}
                        </td>
                    </tr>
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
