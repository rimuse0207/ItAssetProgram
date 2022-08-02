import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LicenseUserInfoGet } from '../../../../Apis/core/api/AuthNeedApi/LicenseApi';
import moment from 'moment';

const LogTablesMainPageMainDivBox = styled.div`
    table {
        font-size: 0.8em;
        position: relative;
        width: 100%;
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
    }
    table.type09 tbody th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
    }
`;

type LogTablesMainPagePropsType = {
    SelectCompany: string;
};

type logsDataTypes = {
    update_log_indexs: number;
    update_log_update_desc: string;
    update_log_update_write_email: string;
    update_log_update_date: string;
};

const LogTablesMainPage = ({ SelectCompany }: LogTablesMainPagePropsType) => {
    const [logsData, setLogsData] = useState<logsDataTypes[]>([]);
    useEffect(() => {
        getLogsDataFromServer();
    }, [SelectCompany]);
    const getLogsDataFromServer = async () => {
        try {
            const getLogsData = await LicenseUserInfoGet('/LoginCheck_app_server/Logs_data', { SelectCompany });

            if (getLogsData.data.dataSuccess) {
                setLogsData(getLogsData.data.Logs_data);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <LogTablesMainPageMainDivBox>
            <table className="type09">
                <thead>
                    <tr className="Thead_tr_table">
                        <th>인덱스</th>
                        <th>변경 사항</th>
                        <th>변경자</th>
                        <th>변경 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {logsData.map((list, i) => {
                        return (
                            <tr>
                                <td>{logsData.length - i}</td>
                                <td>{list.update_log_update_desc}</td>
                                <td>{list.update_log_update_write_email}</td>
                                <td>{moment(list.update_log_update_date).format('YYYY-MM-DD HH:MM:DD')}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </LogTablesMainPageMainDivBox>
    );
};
export default LogTablesMainPage;
