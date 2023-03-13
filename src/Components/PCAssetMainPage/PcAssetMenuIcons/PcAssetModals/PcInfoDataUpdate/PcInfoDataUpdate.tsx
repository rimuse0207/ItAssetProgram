import React, { useEffect, useState } from 'react';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';
import moment from 'moment';
import { BsPencilSquare } from 'react-icons/bs';
import styled from 'styled-components';
import { request } from '../../../../../Apis/core';
type PcInfoDataUpdateProps = {
    SelectAssetData: DeskTopInfoDataType | null;
    setAssetDataChangeCheck: () => void;
};

const PcInfoDataUpdateMainDivBox = styled.div`
    .type03 {
        position: relative;
        .UpdateButton {
            position: absolute;
            top: -30px;
            right: 0px;
        }
    }
`;
type asset_Disk_Type = {
    label: string;
    value: string;
};

export type DetailDataTypes = {
    asset_cpu: string;
    asset_destroy_check: number;
    asset_disk: asset_Disk_Type[];
    asset_disk_info: null | string;
    asset_disk_info_code: null | string;
    asset_disk_info_name: null | string;
    asset_distribute_date: string;
    asset_division: string;
    asset_ip_address: null | string;
    asset_mac_address: null | string;
    asset_mac_indexs: null | string;
    asset_mac_info: string;
    asset_mac_random_key: null | string;
    asset_maker: string;
    asset_management_number: string;
    asset_model: string;
    asset_newcode: string;
    asset_notepad: null | string;
    asset_personal_code: string;
    asset_pride: string;
    asset_purchase_date: string;
    asset_ram: string;
    company_info_company_code: string;
    companyinfo_companycode: string;
    email: string;
    inservice: number;
    name: string;
    position: string;
    team: string;
    updatedate: string;
    userinfo_email: string;
    userinfo_ip: null | string;
    userinfo_mac: null | string;
};

const PcInfoDataUpdate = ({ SelectAssetData, setAssetDataChangeCheck }: PcInfoDataUpdateProps) => {
    const [DetailData, setDetailData] = useState<DetailDataTypes | any>();
    const [DiskInfoData, setDiskInfoData] = useState<asset_Disk_Type[]>();

    const Sending_Detail_Data = async () => {
        try {
            const Sending_Detail_Data_Axios = await request.post(`/Asset_app_server/Detail_Asset_Data`, { SelectAssetData });

            if (Sending_Detail_Data_Axios.data.dataSuccess) {
                setDetailData(Sending_Detail_Data_Axios.data.Select_Asset_Detail_Data_Rows[0]);
                setDiskInfoData(Sending_Detail_Data_Axios.data.Select_Asset_Detail_Disk_Data_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Sending_Detail_Data();
    }, []);

    return (
        <PcInfoDataUpdateMainDivBox>
            <div>
                <h2>PC 자산 유저 추가</h2>
            </div>
            <div>
                <table className="type03">
                    <div className="UpdateButton">
                        <button onClick={() => setAssetDataChangeCheck()}>
                            <BsPencilSquare></BsPencilSquare>자산 정보 수정 하기
                        </button>
                    </div>
                    <tr>
                        <th scope="row">관리 번호</th>
                        <td>{DetailData ? DetailData.asset_personal_code : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">사용자</th>
                        <td>{DetailData ? `${DetailData.team}_${DetailData.name}` : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">MAC 주소</th>
                        <td>{DetailData ? DetailData?.asset_mac_address : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">IP 주소</th>
                        <td>{DetailData ? DetailData?.asset_ip_address : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">종류</th>
                        <td>{DetailData ? DetailData?.asset_division : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">제조사</th>
                        <td>{DetailData ? DetailData?.asset_maker : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">모델명</th>
                        <td>{DetailData ? DetailData?.asset_model : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">구매날짜</th>
                        <td>{DetailData ? moment(DetailData?.asset_purchase_date).format('YYYY-MM-DD') : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">구입 금액</th>
                        <td>
                            {DetailData ? (DetailData?.asset_pride ? Number(DetailData.asset_pride).toLocaleString('ko-KR') : '-') : ''}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">CPU</th>
                        <td>{DetailData ? DetailData?.asset_cpu : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">RAM</th>
                        <td>{DetailData ? DetailData?.asset_ram : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">DISK</th>
                        <td>{DiskInfoData ? DiskInfoData?.map(list => list.value + ' , ') : ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">자산코드</th>
                        <td>{DetailData?.asset_newcode ? DetailData?.asset_newcode : '-'}</td>
                    </tr>

                    <tr>
                        <th scope="row">비고</th>
                        <td>{DetailData ? DetailData?.asset_notepad : ''}</td>
                    </tr>
                </table>
            </div>
        </PcInfoDataUpdateMainDivBox>
    );
};

export default PcInfoDataUpdate;
