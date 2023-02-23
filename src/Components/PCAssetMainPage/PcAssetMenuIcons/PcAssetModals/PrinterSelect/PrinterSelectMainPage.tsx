import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SoftWareSelectMainPageMainDivBox, SoftWareSelectMainPagePropsType } from '../SoftWareSelcet/SoftWareSelectMainPage';

const PrinterSelectMainPageMainDivBox = styled.div`
    border: 1px solid black;
`;

type DLP_PrinterTypes = {
    Time: string;
    PrintCnt: number;
    DocName: string;
    UserName: string;
    DrvName: string;
    Server: string;
};

const PrinterSelectMainPage = ({
    SelectAssetData,
    SelectCompany,
    setBasicLicenseData,
    setChangeBasicLicenseData,
}: SoftWareSelectMainPagePropsType) => {
    const [PrinterData, setPrinterData] = useState<DLP_PrinterTypes[]>([]);

    useEffect(() => {
        if (SelectAssetData?.asset_mac_address) Get_Ueser_SoftWare_From_DLP();
    }, []);

    const Get_Ueser_SoftWare_From_DLP = async () => {
        try {
            const Get_User_SoftWare_From_DLP_Axios_Post = await axios.post(
                `${process.env.REACT_APP_API_URL}/Asset_app_server/User_Printer_Search_From_DLP`,
                {
                    SelectAssetData,
                    SelectCompany,
                }
            );

            if (Get_User_SoftWare_From_DLP_Axios_Post.data.dataSuccess) {
                console.log(Get_User_SoftWare_From_DLP_Axios_Post);
                setPrinterData(Get_User_SoftWare_From_DLP_Axios_Post.data.rows3);
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
                        <th scope="cols">인쇄명(인쇄 수)</th>
                        <th scope="cols">인쇄 서버</th>
                        <th scope="cols">인쇄 날짜</th>
                        <th scope="cols">인쇄드라이버</th>
                    </tr>
                </thead>
                {PrinterData.map((list, i) => {
                    return (
                        <tr key={`${list.Time}_${list.DocName}`}>
                            <td>{i + 1}</td>
                            <td>{`${list.DocName} (${list.PrintCnt})`}</td>
                            <td>{list.Server}</td>
                            <td>{moment(list.Time).format('YYYY-MM-DD hh:mm')}</td>
                            <td>{list.DrvName}</td>
                        </tr>
                    );
                })}
            </table>
        </SoftWareSelectMainPageMainDivBox>
    );
};

export default PrinterSelectMainPage;
