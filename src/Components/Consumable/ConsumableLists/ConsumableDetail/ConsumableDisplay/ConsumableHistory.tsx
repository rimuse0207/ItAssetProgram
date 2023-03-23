import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { ConsumableSelectBasicPropsTypes } from '../ConsumableSelectBasic';
import { RiChatHistoryFill } from 'react-icons/ri';

export const ConsumableHistoryMainDivBox = styled.div`
    .History_Table_Container {
        max-height: 40vh;
        overflow: auto;
        direction: ltr;
        scrollbar-color: #d4aa70 #036;
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
            background-color: #036;
        }
        table.type09 {
            font-size: 0.8em;
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
            vertical-align: center;
            border-bottom: 1px solid #ccc;
        }
        .table_color_on {
            background-color: #e8e8e8;

            :first-child {
                border-top: 5px solid black;
            }
        }
    }
`;

const ConsumableHistory = ({ Detail_Consumable, Consumable_Detail_Data_Getting }: ConsumableSelectBasicPropsTypes) => {
    return (
        <ConsumableHistoryMainDivBox>
            <h2>
                지급 내역<RiChatHistoryFill></RiChatHistoryFill>
            </h2>
            <div className="History_Table_Container" style={{ maxHeight: '70vh' }}>
                <table className="type09">
                    <thead>
                        <tr className="Thead_tr_table">
                            <th>NO.</th>
                            <th>이름</th>
                            <th>팀명</th>
                            <th>직급</th>
                            <th>지급 수량</th>
                            <th>지급 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Detail_Consumable?.Consumable_list_USer_Data_Rows.map((list, j) => {
                            return (
                                <tr key={list.consumable_user_count_info_indexs}>
                                    <td>{Detail_Consumable?.Consumable_list_USer_Data_Rows.length - j}</td>
                                    <td>{list.name ? list.name : list.consumable_user_count_info_id}</td>
                                    <td>{list.team}</td>
                                    <td>{list.position}</td>
                                    <td>{list.consumable_user_count_info_count} 개</td>
                                    <td>{list.consumable_user_count_info_use_date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </ConsumableHistoryMainDivBox>
    );
};

export default ConsumableHistory;
