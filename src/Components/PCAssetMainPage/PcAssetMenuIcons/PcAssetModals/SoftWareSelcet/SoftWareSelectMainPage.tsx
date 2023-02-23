import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DLP_LicenseTypes } from '../../../../PersonalMainPage/PersonalMainPage';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';

import { LicenseDataTypes } from '../LicenseRegister/LicenseRegisterMainPage';

export const SoftWareSelectMainPageMainDivBox = styled.div`
    max-height: 60vh;
    overflow: auto;
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
        background-color: gray;
    }
    table {
        font-size: 0.6em;
        position: relative;
        display: inline-block;
        margin-top: 20px;
        border: 1px solid #ccc;
        margin-right: 30px;
        background-color: #fff;
        border-radius: 5px;
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
        text-align: center;
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
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }
`;

export type SoftWareSelectMainPagePropsType = {
    SelectAssetData: DeskTopInfoDataType | null;
    SelectCompany: string;
    setBasicLicenseData: (data: LicenseDataTypes[]) => void;
    setChangeBasicLicenseData: (data: LicenseDataTypes[]) => void;
};

const SoftWareSelectMainPage = ({
    SelectAssetData,
    SelectCompany,
    setBasicLicenseData,
    setChangeBasicLicenseData,
}: SoftWareSelectMainPagePropsType) => {
    const [SoftWareData, setSoftWareData] = useState<DLP_LicenseTypes[]>([]);

    useEffect(() => {
        if (SelectAssetData?.asset_mac_address) Get_Ueser_SoftWare_From_DLP();
    }, []);

    const Get_Ueser_SoftWare_From_DLP = async () => {
        try {
            const Get_User_SoftWare_From_DLP_Axios_Post = await axios.post(
                `${process.env.REACT_APP_API_URL}/Asset_app_server/User_SoftWare_Search_From_DLP`,
                {
                    SelectAssetData,
                    SelectCompany,
                }
            );

            if (Get_User_SoftWare_From_DLP_Axios_Post.data.dataSuccess) {
                console.log(Get_User_SoftWare_From_DLP_Axios_Post);
                setSoftWareData(Get_User_SoftWare_From_DLP_Axios_Post.data.rows3);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SoftWareSelectMainPageMainDivBox>
            <table className="type09">
                <thead>
                    <tr>
                        <th scope="cols">인덱스</th>
                        <th scope="cols">소프트웨어</th>
                        <th scope="cols">제조사</th>
                        <th scope="cols">구분</th>
                        <th scope="cols">라이선스 필요 여부</th>
                    </tr>
                </thead>
                {SoftWareData.map((list, i) => {
                    return (
                        <tr key={list.InName} style={list.Type === 1 ? { background: 'lightgray' } : {}}>
                            <td>{i + 1}</td>
                            <td>{list.InName}</td>
                            <td>{list.Company}</td>
                            <td>{list.Name}</td>
                            <td>{list.Type === 1 ? '상용' : '프리'}</td>
                        </tr>
                    );
                })}
            </table>
        </SoftWareSelectMainPageMainDivBox>
    );
};

export default SoftWareSelectMainPage;
