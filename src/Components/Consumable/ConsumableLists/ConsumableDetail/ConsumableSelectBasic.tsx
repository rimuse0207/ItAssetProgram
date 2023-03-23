import moment from 'moment';
import React from 'react';
import { ConsumableListsMainPageMainDivBox } from '../ConsumableListsMainPage';
import { Detail_ConsumableTypes, MenuSelectTypes } from './ConsumableDetailMainPage';
import styled from 'styled-components';
import { ConsumableHistoryMainDivBox } from './ConsumableDisplay/ConsumableHistory';
import { RiChatHistoryFill } from 'react-icons/ri';

const ConsumableSelectBasicMainDivBox = styled.div`
    .List_Container {
        .Registered_List_Container {
            border: none;
            :hover {
                cursor: default;
                opacity: 1;
            }
        }
    }
`;

export type ConsumableSelectBasicPropsTypes = {
    Detail_Consumable: Detail_ConsumableTypes | null;
    Select_Company?: string;
    Consumable_Detail_Data_Getting: () => void;
    MenuSelect: MenuSelectTypes[];
};

const ConsumableSelectBasic = ({ Detail_Consumable, MenuSelect }: ConsumableSelectBasicPropsTypes) => {
    return (
        <ConsumableSelectBasicMainDivBox>
            <ConsumableListsMainPageMainDivBox>
                <h2>선택 항목</h2>
                <div className="List_Container">
                    <div
                        className="Registered_List_Container"
                        key={Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_indexs}
                    >
                        <div>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/license/${
                                    Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_image_src.split('.')[0]
                                }_resize.jpg`}
                                width="150px"
                                alt={Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_name}
                            ></img>
                        </div>
                        <div className="Registered_List_Title">
                            <h4>{Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_name}</h4>
                            <h4>
                                현재 재고 :{' '}
                                {Number(Detail_Consumable?.Consumable_list_Data_Rows.consumable_count_info_count) -
                                    Number(Detail_Consumable?.Consumable_list_Data_Rows.user_count)}
                                개
                            </h4>
                            <div>
                                최근 등록 날짜 :
                                {moment(Detail_Consumable?.Consumable_list_Data_Rows.consumable_count_info_update_date).format(
                                    'YYYY-MM-DD'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ConsumableListsMainPageMainDivBox>
            <div style={{ maxHeight: '50vh' }}>
                {MenuSelect.map(list =>
                    list.menu_value !== 'user_insert' ? (
                        <ConsumableHistoryMainDivBox>
                            <h2>
                                수량 등록 내역<RiChatHistoryFill></RiChatHistoryFill>
                            </h2>
                            <div className="History_Table_Container">
                                <table className="type09">
                                    <thead>
                                        <tr className="Thead_tr_table">
                                            <th>NO.</th>
                                            <th>등록자 이름</th>
                                            <th>등록 수량</th>
                                            <th>등록 날짜</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Detail_Consumable?.Consumable_count_lists_Data_Rows.map((list, i) => {
                                            return (
                                                <tr>
                                                    <td>{Detail_Consumable?.Consumable_count_lists_Data_Rows.length - i}</td>
                                                    <td>{list.name}</td>
                                                    <td>{list.consumable_count_info_count} 개</td>
                                                    <td>{moment(list.consumable_count_info_update_date).format('YYYY-MM-DD')}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </ConsumableHistoryMainDivBox>
                    ) : (
                        <ConsumableHistoryMainDivBox>
                            <h2>
                                지급 내역<RiChatHistoryFill></RiChatHistoryFill>
                            </h2>
                            <div className="History_Table_Container">
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
                    )
                )}
            </div>
        </ConsumableSelectBasicMainDivBox>
    );
};

export default ConsumableSelectBasic;
