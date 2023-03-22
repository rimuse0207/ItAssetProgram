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

export const ConsumableUserInsertMainDivBox = styled.div`
    .FilteringContainer {
        display: block;
        .SearchInputContainer {
            width: 100%;

            .Icons_button {
                border: none;
                width: 100%;
                height: 100%;
                font-size: 1.5em;
                text-align: center;
                background: none;
                margin-top: 3px;
                :hover {
                    cursor: pointer;
                }
            }
        }
        .btns {
            padding: 30px 0 0 200px;
            border-radius: 10px;
            .btn {
                display: inline-block;
                margin-right: 2px;
                padding: 10px 25px;
                background: none;
                border: 1px solid #c0c0c0;
                border-radius: 2px;
                color: #666;
                font-size: 1.125em;
                outline: none;
                transition: all 100ms ease-out;
                &:hover,
                &:focus {
                    transform: translateY(-3px);
                    cursor: pointer;
                }
                &-confirm {
                    border: 1px solid #2962ff;
                    background: #2962ff;
                    color: #fff;
                }
            }
        }
    }
`;

const ConsumableUserInsert = ({ Detail_Consumable, Select_Company, Consumable_Detail_Data_Getting }: ConsumableSelectBasicPropsTypes) => {
    const [UserInsertData, setUserInsertData] = useState({
        Consumable_Name: Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_name,
        Consumable_Code: Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_code,
        Consumable_User_ID: '',
        Consumable_User_Write_Date: new Date(),
        Consumable_User_Count: 1,
    });

    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);

    const saveData = async () => {
        try {
            if (!UserInsertData.Consumable_User_ID) {
                alert('사용자를 선택 해주세요.');
                return;
            }
            const Consumable_User_ID_Sending_Axios = await request.post(`/IT_Consumable_app_server/Consumable_User_ID_Sending`, {
                UserInsertData,
            });
            if (Consumable_User_ID_Sending_Axios.data.dataSuccess) {
                setUserInsertData({
                    Consumable_Name: Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_name,
                    Consumable_Code: Detail_Consumable?.Consumable_list_Data_Rows.consumable_lists_info_code,
                    Consumable_User_ID: '',
                    Consumable_User_Write_Date: new Date(),
                    Consumable_User_Count: 1,
                });
                Consumable_Detail_Data_Getting();
                toast.show({
                    title: `${UserInsertData.Consumable_Name}을 사용자 등록 하였습니다.`,
                    successCheck: true,
                    duration: ToastTime,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserInfo = async () => {
        const ParamasData = {
            SelectCompany: Select_Company,
        };
        try {
            const personOptionsData = await UserInfoGet('/Asset_app_server/UserSelect', ParamasData);

            if (personOptionsData.data.dataSuccess) {
                setInfoUserData(personOptionsData.data.data);
            } else {
                alert('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <ConsumableUserInsertMainDivBox>
            <h3>
                사용자 지급<RiUserShared2Fill></RiUserShared2Fill>
            </h3>
            <FilterSearchMainPageDivBox Select_Menu={'ConsumableFiltering'}>
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
                            <h4>사용자.</h4>
                        </div>
                        <div className="SearchInputContainerSubTitle">
                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                <div className="IconsDivBox">
                                    <label>
                                        <BsFillPencilFill></BsFillPencilFill>
                                    </label>
                                </div>
                                <div className="InputDivBox">
                                    <Select
                                        options={InfoUserData}
                                        onChange={(value: any) => setUserInsertData({ ...UserInsertData, Consumable_User_ID: value.value })}
                                    ></Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SearchInputContainer">
                        <div className="SearchInputContainerTitle">
                            <h4>지급 날짜.</h4>
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
                                        selected={UserInsertData.Consumable_User_Write_Date}
                                        onChange={(date: Date) =>
                                            setUserInsertData({ ...UserInsertData, Consumable_User_Write_Date: date })
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
                            <h4>수량.</h4>
                        </div>
                        <div className="SearchInputContainerSubTitle">
                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                <div className="IconsDivBox">
                                    <button
                                        className="Icons_button"
                                        onClick={() => {
                                            setUserInsertData({
                                                ...UserInsertData,
                                                Consumable_User_Count:
                                                    UserInsertData.Consumable_User_Count - 1 <= 0
                                                        ? 1
                                                        : UserInsertData.Consumable_User_Count - 1,
                                            });
                                        }}
                                    >
                                        <BsDashSquare></BsDashSquare>
                                    </button>
                                </div>
                                <div className="InputDivBox">
                                    <input
                                        type="number"
                                        value={UserInsertData.Consumable_User_Count}
                                        onChange={e =>
                                            setUserInsertData({ ...UserInsertData, Consumable_User_Count: Number(e.target.value) })
                                        }
                                        style={{ textAlign: 'center' }}
                                    ></input>
                                </div>
                                <div className="IconsDivBox">
                                    <button
                                        className="Icons_button"
                                        onClick={() => {
                                            setUserInsertData({
                                                ...UserInsertData,
                                                Consumable_User_Count: UserInsertData.Consumable_User_Count + 1,
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

export default ConsumableUserInsert;
