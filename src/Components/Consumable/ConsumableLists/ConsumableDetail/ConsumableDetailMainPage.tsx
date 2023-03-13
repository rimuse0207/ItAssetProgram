import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ConsumableSelectBasic from './ConsumableSelectBasic';
import { FaArrowLeft } from 'react-icons/fa';
import { request } from '../../../../Apis/core';
import ConsumableHistory from './ConsumableDisplay/ConsumableHistory';
import ConsumableUserInsert from './ConsumableDisplay/ConsumableUserInsert';
import ConsumableInsert from './ConsumableDisplay/ConsumableInsert';

const ConsumableDetailMainPageMainDivBox = styled.div`
    width: 100%;
    padding: 10px;

    ul {
        display: flex;
        .Move_To_Lists {
            font-size: 2em;
            margin-right: 30px;
            margin-left: 10px;
            padding: 5px;
            text-align: center;
            :hover {
                cursor: pointer;
            }
        }
        li {
            @media only screen and (max-width: 1600px) {
                font-size: 0.9em;
                .LineText {
                    padding: 0 30px !important;
                }
            }

            :hover {
                cursor: pointer;
            }
            .LineText {
                font-size: 1em;
                color: #999;
                background-color: transparent;
                height: 40px;
                line-height: 38px;
                padding: 0 40px;
            }
            position: relative;
            .LineActions {
                position: absolute;
                animation-name: slidings;
                animation-duration: 0.8s;
                @keyframes slidings {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
                border-bottom: 2px solid #515151;
                width: 100%;
            }
        }
    }

    .Consumable_Detail_Info_Float_Container {
        width: 100%;
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        .Consumable_Detail_Info_Float_Left {
            min-width: 40%;
        }
        .Consumable_Detail_Info_Float_Middle {
            border: 1px dashed lightgray;
            min-height: 80vh;
        }
        .Consumable_Detail_Info_Float_Right {
            min-width: 58%;
            padding-left: 50px;
        }
    }
`;

type MenuSelectTypes = {
    indexs: number;
    menu_name: string;
    menu_value: string;
    Select_Check: boolean;
};
type ParamsTypes = {
    It_Code: string;
    Select_Company: string;
};

type Consumable_list_USer_Data_RowsTypes = {
    companyinfo_companycode: string;
    consumable_user_count_info_code: string;
    consumable_user_count_info_count: number;
    consumable_user_count_info_id: string;
    consumable_user_count_info_indexs: number;
    consumable_user_count_info_update_date: string;
    consumable_user_count_info_use_date: string;
    email: string;
    inservice: number;
    name: string;
    position: string;
    team: string;
};

export type Detail_ConsumableTypes = {
    Consumable_list_Data_Rows: {
        consumable_count_info_code: string;
        consumable_count_info_count: number;
        consumable_count_info_indexs: number;
        consumable_count_info_name: string;
        consumable_count_info_update_date: string;
        consumable_lists_info_code: string;
        consumable_lists_info_image_src: string;
        consumable_lists_info_indexs: number;
        consumable_lists_info_name: string;
        consumable_lists_write_company: string;
        consumable_lists_write_id: string;
        user_count: number;
    };
    Consumable_list_USer_Data_Rows: Consumable_list_USer_Data_RowsTypes[];
    Consumable_count_lists_Data_Rows: Consumable_count_lists_Data_RowsTypes[];
};

type Consumable_count_lists_Data_RowsTypes = {
    companyinfo_companycode: string;
    consumable_count_info_code: string;
    consumable_count_info_count: number;
    consumable_count_info_id: string;
    consumable_count_info_indexs: number;
    consumable_count_info_update_date: string;
    email: string;
    inservice: number;
    name: string;
    position: string;
    team: string;
    updatedate: string;
};

const ConsumableDetailMainPage = () => {
    const history = useHistory();
    const { It_Code, Select_Company } = useParams<ParamsTypes>();
    const [MenuSelect, setMenuSelect] = useState<MenuSelectTypes[]>([
        {
            indexs: 1,
            menu_name: '지급 내역',
            menu_value: 'history',
            Select_Check: true,
        },
        {
            indexs: 2,
            menu_name: '사용자 지급',
            menu_value: 'user_insert',
            Select_Check: false,
        },
        {
            indexs: 3,
            menu_name: '재고 추가 등록',
            menu_value: 'insert',
            Select_Check: false,
        },
    ]);
    const [Detail_Consumable, setDetail_Consumable] = useState<Detail_ConsumableTypes | null>(null);

    const handleCompanyClicks = (data: MenuSelectTypes) => {
        setMenuSelect(
            MenuSelect.map(list => (list.indexs === data.indexs ? { ...list, Select_Check: true } : { ...list, Select_Check: false }))
        );
    };

    const Consumable_Detail_Data_Getting = async () => {
        try {
            const Consumable_List_Data_Getting_Axios = await request.get(`/IT_Consumable_app_server/Consumable_Detail_Data_Getting`, {
                params: {
                    SelectCompany: Select_Company,
                    It_Code,
                },
            });

            if (Consumable_List_Data_Getting_Axios.data.dataSuccess) {
                setDetail_Consumable(Consumable_List_Data_Getting_Axios.data.Consumable_Data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Consumable_Detail_Data_Getting();
    }, []);

    return (
        <ConsumableDetailMainPageMainDivBox>
            <div>
                <ul>
                    <li className="Move_To_Lists" onClick={() => history.goBack()}>
                        <FaArrowLeft></FaArrowLeft>
                    </li>
                    {MenuSelect.map((list, i) => {
                        return (
                            <li key={list.indexs} onClick={() => handleCompanyClicks(list)}>
                                {list.Select_Check ? (
                                    <>
                                        <div className="LineText" style={{ color: '#050404', fontWeight: 'bold' }}>
                                            {list.menu_name}
                                        </div>
                                        <div className="LineActions"></div>
                                    </>
                                ) : (
                                    <div className="LineText">{list.menu_name}</div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="Consumable_Detail_Info_Float_Container">
                <div className="Consumable_Detail_Info_Float_Left">
                    <ConsumableSelectBasic
                        Detail_Consumable={Detail_Consumable}
                        Consumable_Detail_Data_Getting={() => Consumable_Detail_Data_Getting()}
                    ></ConsumableSelectBasic>
                </div>
                <div className="Consumable_Detail_Info_Float_Middle"></div>
                <div className="Consumable_Detail_Info_Float_Right">
                    {MenuSelect.map(list => {
                        return list.menu_value === 'history' && list.Select_Check ? (
                            <ConsumableHistory
                                key={list.indexs}
                                Detail_Consumable={Detail_Consumable}
                                Consumable_Detail_Data_Getting={() => Consumable_Detail_Data_Getting()}
                            ></ConsumableHistory>
                        ) : list.menu_value === 'user_insert' && list.Select_Check ? (
                            <ConsumableUserInsert
                                key={list.indexs}
                                Detail_Consumable={Detail_Consumable}
                                Select_Company={Select_Company}
                                Consumable_Detail_Data_Getting={() => Consumable_Detail_Data_Getting()}
                            ></ConsumableUserInsert>
                        ) : list.menu_value === 'insert' && list.Select_Check ? (
                            <ConsumableInsert
                                key={list.indexs}
                                Detail_Consumable={Detail_Consumable}
                                Select_Company={Select_Company}
                                Consumable_Detail_Data_Getting={() => Consumable_Detail_Data_Getting()}
                            ></ConsumableInsert>
                        ) : (
                            <div></div>
                        );
                    })}
                </div>
            </div>
        </ConsumableDetailMainPageMainDivBox>
    );
};

export default ConsumableDetailMainPage;
