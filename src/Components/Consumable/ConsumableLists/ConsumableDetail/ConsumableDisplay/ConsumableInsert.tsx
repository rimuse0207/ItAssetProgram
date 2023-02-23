import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ConsumableSelectBasicPropsTypes } from '../ConsumableSelectBasic';
import { RiUserShared2Fill } from 'react-icons/ri';
import { FilterSearchMainPageDivBox } from '../../../../PCAssetMainPage/PcAssetMenuIcons/PcAssetMenuIconsMainPage';
import { BsFillPencilFill, BsCalendarDateFill, BsDashSquare, BsPlusSquare } from 'react-icons/bs';
import Select from 'react-select';
import { PersonOption } from '../../../../LicenseMainPage/VolumeLicenseMainPage/DownloadMainPage/ModalMainPage/docs/data';
import { UserInfoGet } from '../../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { request } from '../../../../../Apis/core';
import { toast } from '../../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../../Configs/ToastTimerConfig';
import { ConsumableUserInsertMainDivBox } from './ConsumableUserInsert';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Models';

const ConsumableInsert = ({ Detail_Consumable, Select_Company, Consumable_Detail_Data_Getting }: ConsumableSelectBasicPropsTypes) => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [ConsumableInsertData, setConsumableInsertData] = useState({
        Consumable_Name: Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_name,
        Consumable_Code: Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_code,
        Consumable_Purchase_Date: new Date(),
        Consumable_Purchase_Count: 1,
    });

    const saveData = async () => {
        try {
            const Consumable_Insert_Data_Axios = await request.post('/IT_Consumable_app_server/Consumable_Insert_Data', {
                ID: LoginInfoData.email,
                ConsumableInsertData,
            });

            if (Consumable_Insert_Data_Axios.data.dataSuccess) {
                Consumable_Detail_Data_Getting();
                toast.show({
                    title: `${ConsumableInsertData.Consumable_Name}을 수량 ${ConsumableInsertData.Consumable_Purchase_Count}개를 추가 하였습니다.`,
                    successCheck: true,
                    duration: ToastTime,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ConsumableUserInsertMainDivBox>
            <h3>
                재고 추가 등록<RiUserShared2Fill></RiUserShared2Fill>
            </h3>
            <FilterSearchMainPageDivBox>
                <div className="FilteringContainer">
                    <div className="SearchInputContainer">
                        <div className="SearchInputContainerTitle">
                            <h4>지급명.</h4>
                        </div>
                        <div className="SearchInputContainerSubTitle">
                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                <div className="IconsDivBox">
                                    <label>
                                        <BsFillPencilFill></BsFillPencilFill>
                                    </label>
                                </div>
                                <div className="InputDivBox">
                                    <input
                                        type="text"
                                        value={Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_name}
                                        readOnly
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="SearchInputContainer">
                        <div className="SearchInputContainerTitle">
                            <h4>구매 날짜.</h4>
                        </div>
                        <div className="SearchInputContainerSubTitle">
                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                <div className="IconsDivBox">
                                    <label>
                                        <BsCalendarDateFill></BsCalendarDateFill>
                                    </label>
                                </div>

                                <div className="InputDivBox">
                                    <DatePicker
                                        selected={ConsumableInsertData.Consumable_Purchase_Date}
                                        onChange={(date: Date) =>
                                            setConsumableInsertData({ ...ConsumableInsertData, Consumable_Purchase_Date: date })
                                        }
                                        locale={ko}
                                        dateFormat="yyy-MM-dd"
                                        maxDate={new Date()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SearchInputContainer">
                        <div className="SearchInputContainerTitle">
                            <h4>구매 수량.</h4>
                        </div>
                        <div className="SearchInputContainerSubTitle">
                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                <div className="IconsDivBox">
                                    <button
                                        className="Icons_button"
                                        onClick={() => {
                                            setConsumableInsertData({
                                                ...ConsumableInsertData,
                                                Consumable_Purchase_Count:
                                                    ConsumableInsertData.Consumable_Purchase_Count - 1 <= 0
                                                        ? 1
                                                        : ConsumableInsertData.Consumable_Purchase_Count - 1,
                                            });
                                        }}
                                    >
                                        <BsDashSquare></BsDashSquare>
                                    </button>
                                </div>
                                <div className="InputDivBox">
                                    <input
                                        type="number"
                                        value={ConsumableInsertData.Consumable_Purchase_Count}
                                        onChange={e =>
                                            setConsumableInsertData({
                                                ...ConsumableInsertData,
                                                Consumable_Purchase_Count: Number(e.target.value),
                                            })
                                        }
                                        style={{ textAlign: 'center' }}
                                    ></input>
                                </div>
                                <div className="IconsDivBox">
                                    <button
                                        className="Icons_button"
                                        onClick={() => {
                                            setConsumableInsertData({
                                                ...ConsumableInsertData,
                                                Consumable_Purchase_Count: ConsumableInsertData.Consumable_Purchase_Count + 1,
                                            });
                                        }}
                                    >
                                        <BsPlusSquare></BsPlusSquare>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btns">
                    <button className="btn btn-confirm" onClick={() => saveData()}>
                        저장
                    </button>
                </div>
            </FilterSearchMainPageDivBox>
        </ConsumableUserInsertMainDivBox>
    );
};

export default ConsumableInsert;
