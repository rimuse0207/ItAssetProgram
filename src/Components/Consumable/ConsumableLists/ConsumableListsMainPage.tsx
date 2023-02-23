import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiSlideshowFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { BsCartPlusFill } from 'react-icons/bs';
import moment from 'moment';
import { request } from '../../../Apis/core';
import { ConsumableTypes } from '../ConsumableTypes';
import { useHistory } from 'react-router-dom';
import { TiPlus } from 'react-icons/ti';
import ConsumableListsInsert from './ConsumableListsInsert';

export const ConsumableListsMainPageMainDivBox = styled.div`
    .ADD_Insert_Container {
        position: fixed;
        bottom: 80px;
        right: 80px;
        border: 1px solid lightgray;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        .ADD_Insert_Icon {
            :hover {
                cursor: pointer;
                opacity: 0.5;
            }
        }
    }
    .Registered_Container {
        position: relative;
        .Update_Icons {
            position: absolute;
            top: 10px;
            right: 40px;
            color: green;
            :hover {
                cursor: pointer;
            }
        }
        .textOn {
            display: none;
        }
        :hover {
            cursor: pointer;
            opacity: 0.5;
            transition: 0.5s all;
            .textOn {
                display: block;
                position: absolute;
                bottom: 30px;
                right: 30px;
                font-size: 3em;
            }
        }
    }
    .List_Container {
        width: 80%;
    }
    .Registered_List_Container {
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 10px;
        border-bottom: 1px solid lightgray;
        position: relative;
        height: 100%;
        min-height: 150px;

        .Registered_List_Title {
            flex-flow: column;
            display: flex;
            justify-content: space-around;
            margin-left: 10px;
            /* height: 100%; */
        }
    }
`;

type ConsumableListsMainPagePropsType = {
    SelectCompany: string;
};

const ConsumableListsMainPage = ({ SelectCompany }: ConsumableListsMainPagePropsType) => {
    const history = useHistory();
    const [Consumable_Data, setConsumable_Data] = useState<ConsumableTypes[]>([]);
    const [ModalisOpen, setModalisOpen] = useState(false);

    const Consumable_List_Data_Getting = async () => {
        try {
            const Consumable_List_Data_Getting_Axios = await request.get(`/IT_Consumable_app_server/Consumable_List_Data_Getting`, {
                params: {
                    SelectCompany,
                },
            });

            if (Consumable_List_Data_Getting_Axios.data.dataSuccess) {
                setConsumable_Data(Consumable_List_Data_Getting_Axios.data.Consumable_list_Data_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const HandleClicksDetailData = (data: ConsumableTypes) => {
        history.push(`/ITConsumable/Detail/${data.consumable_lists_info_code}/${SelectCompany}`);
    };

    useEffect(() => {
        Consumable_List_Data_Getting();
    }, []);

    return (
        <ConsumableListsMainPageMainDivBox>
            <div>
                <h3>IT 소모품 목록</h3>
                <div className="List_Container">
                    {Consumable_Data.map((list, j) => {
                        return (
                            <div className="Registered_Container" key={list.consumable_lists_info_indexs}>
                                <div className="Registered_List_Container" onClick={() => HandleClicksDetailData(list)}>
                                    <div>{j + 1} </div>
                                    <div>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/license/${list.consumable_lists_info_image_src}`}
                                            width="150px"
                                            alt={list.consumable_lists_info_name}
                                        ></img>
                                    </div>
                                    <div className="Registered_List_Title">
                                        <h4>{list.consumable_lists_info_name}</h4>
                                        <h4>재고 : {list.consumable_count_info_count - list.user_count} 개</h4>
                                        <div>{moment(list.consumable_count_info_update_date).format('YYYY-MM-DD')}</div>
                                    </div>

                                    {/* <div className="textOn">
                                    <CgArrowLongLeft></CgArrowLongLeft>
                                </div> */}
                                </div>
                                <div className="Update_Icons" style={{ top: '0px', color: 'red' }}>
                                    <RiDeleteBin2Fill></RiDeleteBin2Fill>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="ADD_Insert_Container">
                <div
                    className="ADD_Insert_Icon"
                    style={{ fontSize: '2em', textAlign: 'center', lineHeight: '57px' }}
                    onClick={() => setModalisOpen(true)}
                >
                    <TiPlus></TiPlus>
                </div>
            </div>
            <div>
                {ModalisOpen ? (
                    <ConsumableListsInsert ModalisOpen={ModalisOpen} setModalisOpen={() => setModalisOpen(false)}></ConsumableListsInsert>
                ) : (
                    <></>
                )}
            </div>
        </ConsumableListsMainPageMainDivBox>
    );
};

export default ConsumableListsMainPage;
