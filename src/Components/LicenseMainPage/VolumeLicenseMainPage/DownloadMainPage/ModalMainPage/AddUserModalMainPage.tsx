import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { basic_License_Type, LicenseDataType } from '../../VolumeLicenseDataTypes';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import { PersonOption } from './docs/data';
import { UserInfoGet } from '../../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { IoMdAddCircle } from 'react-icons/io';
import { ObjectNameSortData } from '../../../../../PublicFunc/ObjectNameSort';
import { LicenseUserAdd } from '../../../../../Apis/core/api/AuthUnNeedApi/LicenseUserAdd/LicenseUserAdd';
import { useDispatch } from 'react-redux';
import { License_getLicenseDataThunk } from '../../../../../Models/LicenseDataReduxThunk/LicenseDataThunks';
import { toast } from '../../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../../Configs/ToastTimerConfig';
import axios from 'axios';
import moment from 'moment';
import { AssetDeleteLicense, GetDataFromServerLicenseInfos } from '../../../../../Apis/core/api/AuthNeedApi/LicenseApi';
import { LicenseDataTypes } from '../../../../PCAssetMainPage/PcAssetMenuIcons/PcAssetModals/LicenseRegister/LicenseRegisterMainPage';
import { request } from '../../../../../Apis/core';
import Select from 'react-select';
import { BsNodeMinusFill, BsNodePlusFill } from 'react-icons/bs';

const ModalMainDivBox = styled.div`
    padding: 10px;
    .ModalCloseButton {
        border: none;
        font-size: 1.1em;
        background: none;
        color: red;
        :hover {
            cursor: pointer;
        }
    }
    p {
        position: relative;
        height: 50px;
        margin: 10px;
        width: 50%;
        margin-left: 50px;
    } /* 기본세팅 */
    .InputTypeMainDivBox {
        position: relative;
        height: 50px;
        margin: 10px;

        border-bottom: 1px solid black;
        .InputTypeIcons {
            font-size: 1.5em;
            width: 50px;
            line-height: 50px;
            text-align: center;
        }
        input {
            box-sizing: border-box;
            padding: 20px 0 0;
            width: 100%;
            height: 100%;
            border: none;
            color: #595f63;
            outline: none;
        }
    }
    p input {
        box-sizing: border-box;
        padding: 20px 0 0;
        width: 100%;
        height: 100%;
        border: 0 none;
        color: #595f63;
        outline: none;
    }
    p label {
        position: absolute;
        left: 0%;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #000;
        text-align: left;
        pointer-events: none;
    }
    p label:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 0;
        height: 100%;
        border-bottom: 3px solid #369;
        transition: all 0.3s ease;
    } /* 파란색 가로줄 */
    p label span {
        position: absolute;
        left: 0;
        bottom: 5px;
        transition: all 0.3s ease;
    }
    p input:focus + label span,
    p input:valid + label span {
        transform: translateY(-150%);
        font-size: 14px;
        color: #369;
    }
    p input:focus + label::after,
    p input:valid + label::after {
        width: 100%;
        transform: translateX(0);
    }

    .InputSpanIcons {
        position: absolute;
        top: 25px;
        left: -40px;
        font-size: 1.3em;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        animation: 'smoothAppear 0.5s ease',
        zIndex: '105',
        width: '90%',
        padding: '20px',
        height: '90%',
    },
};

const SelectUserInfoMainDivBox = styled.div`
    .FloatMainDivBox {
        height: 200px;
        min-width: 500px;
        .FloatLeftDivBox {
            border: 0.5px solid gray;
            width: 43%;
            height: 100%;
            min-width: 200px;
            float: left;
            overflow: auto;
            padding: 5px;
        }
        .FloatRightDivBox {
            border: 0.5px solid gray;
            width: 43%;
            height: 100%;
            min-width: 200px;
            float: right;
            overflow: auto;
            padding: 5px;
        }
        ul {
            margin-top: 10px;
            li {
                border: 1px dashed black;
                padding: 5px;
                width: 90%;
                font-size: 0.8em;
                margin-bottom: 5px;
                display: flex;
                flex-flow: wrap;
                justify-content: space-between;
                .IconsClickPlus {
                    font-size: 1.2em;
                    :hover {
                        color: green;
                        cursor: pointer;
                    }
                }
                .IconsClickMinus {
                    font-size: 1.2em;
                    :hover {
                        color: red;
                        cursor: pointer;
                    }
                }
            }
        }
        ::after {
            clear: both;
            display: block;
            content: '';
        }
    }
`;

const ModalButtonMainDivBox = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: end;
    button {
        width: 70px;
        height: 30px;
        color: #fff;
        background: #368;
        font-size: 0.8em;
        border: none;
        border-radius: 20px;
        box-shadow: 0 4px 16px rgba(0, 79, 255, 0.3);
        transition: 0.3s;
        font-weight: bold;
        margin-right: 10px;
        margin-left: 10px;
    }
    button:focus {
        outline: 0;
    }
    button:hover {
        background: rgba(0, 79, 255, 0.9);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 79, 255, 0.6);
    }
`;

const TableMainDivBox = styled.div`
    table.type03 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        border-top: 1px solid #ccc;
        border-left: 3px solid #369;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    table.type03 th {
        width: 20%;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #153d73;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    table.type03 td {
        width: 80%;
        padding: 10px;
        vertical-align: top;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .license_Float_Main_div {
        ::after {
            clear: both;
            display: block;
            content: '';
        }
        .license_Float_left {
            float: left;
            width: 90%;
            padding-right: 30px;
        }
        .license_Float_right {
            width: 50%;
            padding-left: 30px;
            max-height: 40vh;
            overflow: auto;
            float: right;
            .InputSearchUsers {
                width: 100%;
                padding: 5px;
                height: 40px;
                border: 1px solid lightgray;
            }
            .License_descktop_user_float_container {
                height: 100%;
                ::after {
                    clear: both;
                    display: block;
                    content: '';
                }
                h4 {
                    text-align: center;
                    border-bottom: 1px solid gray;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .license_asset_delete {
                    display: flex;
                    justify-content: space-between;
                    border: 1px dashed lightgray;
                    padding: 10px;
                    margin-bottom: 10px;
                }
                .License_descktop_user_float_left {
                    width: 50%;
                    float: left;
                    height: 100%;
                    padding: 10px;
                }
                .License_descktop_user_float_right {
                    width: 50%;
                    float: right;

                    height: 100%;
                    padding: 10px;
                }
                .IconsClickMinus {
                    font-size: 1.2em;
                    :hover {
                        color: red;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;

const UserSelectContainer = styled.div`
    ::after {
        clear: both;
        display: block;
        content: '';
    }
    .Float_Left_Container {
        width: 45%;
        float: left;
    }
    .Float_Right_Container {
        width: 45%;
        float: right;
    }
    .UserSelect_Container {
        max-height: 30vh;
        overflow: auto;
        padding: 10px;
        text-align: center;
        .User_Container {
            display: flex;
            justify-content: space-between;
            width: 60%;
            border: 1px dashed gray;
            padding: 10px;
            margin-bottom: 10px;
        }
    }
`;

Modal.setAppElement('#ModalMainDiv');

type NewDataInsertMainPageProps = {
    setSelectClicksModals: () => void;
    SelectClicksModals: boolean;
    SelectClickData: basic_License_Type | null;
    SelectCompany: string;
};

type selectUserInfoDataType = {
    name: string;
    email: string;
    team: string;
    asset_division: string;
    asset_management_number: string;
};

type UserSelectType = {
    value: string;
    label: string;
    name: string;
    team: string;
    asset_personal_code: string;
    division: string;
};

const AddUserModalMainPage = ({
    setSelectClicksModals,
    SelectClicksModals,
    SelectClickData,
    SelectCompany,
}: NewDataInsertMainPageProps) => {
    console.log(SelectClickData);
    const [NowSelectUser, setNowSelectUser] = useState<UserSelectType[]>([]);
    const [ImposableSelectUser, setImposableSelectUser] = useState<UserSelectType[]>([]);

    function closeModal() {
        setSelectClicksModals();
    }

    //유저 등록 API
    const handleSaveUser = async () => {
        try {
            const UserDataOn = await LicenseUserAdd('/license_app_server/AddUserLicense', {
                SelectClicksModals,
            });
            if (UserDataOn.data.dataSuccess) {
                toast.show({
                    title: `${SelectClickData?.asset_license_list_info_name}에 유저 등록 성공`,
                    successCheck: true,
                    duration: ToastTime,
                });
                closeModal();
            } else {
                alert('에러발생');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const User_Getting_Show = async () => {
        try {
            const User_Getting_Show_Axios = await request.get(`/license_app_server/license_User_Data_Getting`, {
                params: {
                    company: SelectCompany,
                    license_code: SelectClickData?.asset_license_list_info_code,
                },
            });

            if (User_Getting_Show_Axios.data.dataSuccess) {
                setNowSelectUser(User_Getting_Show_Axios.data.Regi_User_Data);
                setImposableSelectUser(User_Getting_Show_Axios.data.Not_Regi_User_Data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        User_Getting_Show();
    }, []);

    return (
        <div>
            <Modal isOpen={SelectClicksModals} style={customStyles} contentLabel="데이터 입력 Modal">
                <ModalMainDivBox>
                    <div style={{ textAlign: 'end' }}>
                        <button className="ModalCloseButton" onClick={setSelectClicksModals}>
                            <MdCancel></MdCancel>
                        </button>
                    </div>
                    <h2>라이선스 유저 등록</h2>
                    <div>
                        {SelectClickData ? (
                            <TableMainDivBox>
                                <div className="license_Float_Main_div">
                                    <div className="license_Float_left">
                                        <table className="type03">
                                            <tr>
                                                <th scope="row">코드</th>
                                                <td>{SelectClickData?.asset_license_list_info_code}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">이름</th>
                                                <td>{SelectClickData?.asset_license_list_info_name}</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">허용 인원</th>
                                                <td>{SelectClickData?.license_permit_count_sum}명</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">사용 인원</th>
                                                <td>{SelectClickData?.license_user_used_count_sum}명</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">사용 가능 인원 수</th>
                                                <td>
                                                    {SelectClickData?.license_permit_count_sum -
                                                        SelectClickData?.license_user_used_count_sum}
                                                    명
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </TableMainDivBox>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </ModalMainDivBox>
                <UserSelectContainer>
                    <h2>사용자</h2>
                    <div>
                        <div className="Float_Left_Container">
                            <h5>사용등록 가능인원</h5>
                            <div>
                                <div>
                                    <Select
                                        options={ImposableSelectUser}
                                        // onChange={(value: any) => setUserInsertData({ ...UserInsertData, Consumable_User_ID: value.value })}
                                    ></Select>
                                </div>
                                <div className="UserSelect_Container">
                                    <div>
                                        {ImposableSelectUser.map(list => {
                                            return (
                                                <div className="User_Container">
                                                    <div>
                                                        {list.team} {list.name} {list.asset_personal_code} {list.division}
                                                    </div>
                                                    <div style={{ color: 'green' }}>
                                                        <BsNodePlusFill></BsNodePlusFill>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Float_Right_Container">
                            <h5>현재등록 인원</h5>
                            <div>
                                <div>
                                    <Select
                                        options={NowSelectUser}
                                        // onChange={(value: any) => setUserInsertData({ ...UserInsertData, Consumable_User_ID: value.value })}
                                    ></Select>
                                </div>
                                <div className="UserSelect_Container">
                                    <div>
                                        {NowSelectUser.map(list => {
                                            return (
                                                <div className="User_Container">
                                                    <div>
                                                        {list.team} {list.name} {list.asset_personal_code} {list.division}
                                                    </div>
                                                    <div style={{ color: 'red' }}>
                                                        <BsNodeMinusFill></BsNodeMinusFill>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </UserSelectContainer>

                <ModalButtonMainDivBox>
                    <div>
                        <button onClick={() => handleSaveUser()}>저장</button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            취소
                        </button>
                    </div>
                </ModalButtonMainDivBox>
            </Modal>
        </div>
    );
};

export default AddUserModalMainPage;
