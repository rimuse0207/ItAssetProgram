import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';
import { AssetTableMainDivBox } from '../../../DeskTop/DeskTopMainPage';
import moment from 'moment';
type HistortyMainPageProps = {
    asset_management_number: string | null | any;
};

type HistoryDataType = {
    asset_destroy_date: string | null;
    asset_destroy_reason: string | null;
    asset_destroy_restore_date: string | null;
    asset_destroy_restore_reason: string | null;
    asset_info_asset_management: string;
    asset_return_date: string | null;
    asset_return_reason: string | null;
    asset_transfer_date: string | null;
    asset_transfer_reason: string | null;
    companyInfo_companycode: string | null;
    company_building: string | null;
    company_code: string | null;
    company_floor: string | null;
    company_info_company_code: string | null;
    company_location: string | null;
    company_name: string | null;
    email: string | null;
    entercompany: string | null;
    exitcompany: string | null;
    indexs: number;
    inservice: number;
    name: string | null;
    position: string | null;
    team: string | null;
    update_date: string | null;
    updatedate: string | null;
    userinfo_email: string | null;
};

const HistoryMainPage = ({ asset_management_number }: HistortyMainPageProps) => {
    const [historySelected, sethistorySelected] = useState([]);

    useEffect(() => {}, [asset_management_number]);

    useEffect(() => {
        gethistoryData();
    }, [asset_management_number]);

    const gethistoryData = async () => {
        try {
            const gethistoryDataFromServer = await axios.get(`${process.env.REACT_APP_API_URL}/Asset_app_server/historyData`, {
                params: { historySelected: asset_management_number },
            });

            if (gethistoryDataFromServer.data.dataSuccess) {
                sethistorySelected(gethistoryDataFromServer.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div style={{ marginBottom: '20px', borderTop: '1px solid lightgray', paddingTop: '40px' }}>
            <div>
                <div style={{ marginBottom: '40px' }}>
                    <h2>이전 사용 내역 조회</h2>
                </div>
                <AssetTableMainDivBox>
                    <table className="type09">
                        <thead>
                            <tr>
                                <th scope="cols">인덱스</th>
                                <th scope="cols">유형</th>
                                <th scope="cols">날짜</th>
                                <th scope="cols">사유</th>
                                {/* <th scope="cols">장소</th> */}
                                <th scope="cols">이전 사용자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historySelected.length > 0 ? (
                                historySelected.reverse().map((list: HistoryDataType, i: number) => {
                                    return (
                                        <tr key={list.indexs}>
                                            <td>{i + 1}</td>
                                            <td>
                                                {list.asset_destroy_date
                                                    ? '파기'
                                                    : list.asset_return_date
                                                    ? '반납'
                                                    : list.asset_transfer_date
                                                    ? '이관'
                                                    : list.asset_destroy_restore_date
                                                    ? '파기 복원'
                                                    : '-'}
                                            </td>
                                            <td>
                                                {list.asset_destroy_date
                                                    ? moment(list.asset_destroy_date).format('YYYY-MM-DD')
                                                    : list.asset_return_date
                                                    ? moment(list.asset_return_date).format('YYYY-MM-DD')
                                                    : list.asset_transfer_date
                                                    ? moment(list.asset_transfer_date).format('YYYY-MM-DD')
                                                    : list.asset_destroy_restore_date
                                                    ? moment(list.asset_destroy_restore_date).format('YYYY-MM-DD')
                                                    : '-'}
                                            </td>
                                            <td>
                                                {list.asset_destroy_date
                                                    ? list.asset_destroy_reason
                                                    : list.asset_return_date
                                                    ? list.asset_return_reason
                                                    : list.asset_transfer_date
                                                    ? list.asset_transfer_reason
                                                    : list.asset_destroy_restore_date
                                                    ? list.asset_destroy_restore_reason
                                                    : '-'}
                                            </td>
                                            {/* <td>
                                                {list.companyInfo_companycode
                                                    ? `${list.company_name}_${list.company_location}_${list.company_building}_${list.company_floor}`
                                                    : `-`}
                                            </td> */}
                                            <td>{list.name ? `${list.name}` : '-'}</td>
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
                </AssetTableMainDivBox>
            </div>
        </div>
    );
};

export default React.memo(HistoryMainPage);
