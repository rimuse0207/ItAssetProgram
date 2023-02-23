import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrinterLogGraphMainPage from './PrinterLogGraph/PrinterLogGraphMainPage';

const PrinterLogContentMainPageMainDivBox = styled.div`
    border: 1px solid black;
`;
type PrinterLogContentMainPageProps = {
    SelectCompany: string;
};

type PrinterLogDataTypes = {
    PrintCnt: number;
};
export type GraphDatasTypes = {
    x: string;
    y: number;
};

const PrinterLogContentMainPage = ({ SelectCompany }: PrinterLogContentMainPageProps) => {
    const [NowPrinterLogData, setNowPrinterLogData] = useState<PrinterLogDataTypes[]>([]);
    const [PrePrinterLogData, setPrePrinterLogData] = useState<PrinterLogDataTypes[]>([]);

    const [Time_Labels, setTime_Labels] = useState<any>([]);
    const [GraphDatas, setGraphDatas] = useState<GraphDatasTypes[]>([]);

    const GetPrinterLogDatasForEachCompany = async () => {
        const Send_Times = moment().subtract(1, 'minutes').format('YYYY-MM-DD HH:mm');
        try {
            const GetPrinterLogDatasForEachCompanyAxios = await axios.get(
                `${process.env.REACT_APP_API_URL}/Asset_app_server/GetPrinterLogDatasForEachCompanyAxios`,
                {
                    params: {
                        Time: Send_Times,
                    },
                }
            );

            if (GetPrinterLogDatasForEachCompanyAxios.data.dataSuccess) {
                console.log(GetPrinterLogDatasForEachCompanyAxios);
                console.log('GraphDatas.length', GraphDatas.length);
                if (GraphDatas.length <= 15) {
                    const resultData = GraphDatas.concat({
                        x: moment(Send_Times).format('HH:mm'),
                        y: GetPrinterLogDatasForEachCompanyAxios.data.DHKS.length,
                    });

                    console.log('resultData', resultData);

                    setGraphDatas(resultData);
                } else {
                    const GraphDataLength: any = GraphDatas;
                    GraphDataLength.pop();
                    const dass = GraphDataLength.push(GetPrinterLogDatasForEachCompanyAxios.data.DHKS.length);
                    setGraphDatas(dass);
                }
                setPrePrinterLogData(NowPrinterLogData);
                setNowPrinterLogData(GetPrinterLogDatasForEachCompanyAxios.data.DHKS);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetPrinterLogDatasForEachCompany();
    }, [SelectCompany]);

    // useEffect(() => {
    //     const playAlert = setInterval(function () {
    //         GetPrinterLogDatasForEachCompany();
    //     }, 37000);
    // }, []);

    return (
        <PrinterLogContentMainPageMainDivBox>
            <PrinterLogGraphMainPage GraphDatas={GraphDatas}></PrinterLogGraphMainPage>
        </PrinterLogContentMainPageMainDivBox>
    );
};

export default PrinterLogContentMainPage;
