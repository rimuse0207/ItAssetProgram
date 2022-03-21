import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { LicenseDataType } from '../../VolumeLicenseDataTypes';
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
        width: '800px',
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
                justify-content: space-around;
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
`;

Modal.setAppElement('#ModalMainDiv');

type NewDataInsertMainPageProps = {
    setSelectClicksModals: (data: boolean) => void;
    SelectClicksModals: boolean;
    UserClickLicenseData: LicenseDataType | null;
    SelectCompany: string;
    type: string;
    SortTable: any;
};

type selectUserInfoDataType = {
    name: string;
    email: string;
    team: string;
};

const AddUserModalMainPage = ({
    setSelectClicksModals,
    SelectClicksModals,
    UserClickLicenseData,
    SelectCompany,
    type,
    SortTable,
}: NewDataInsertMainPageProps) => {
    const [SearchSomething, setSearchSomething] = useState<string | null>('');
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
    const [SelectedInfoUserData, setSelectedInfoUserData] = useState<selectUserInfoDataType[]>([]);
    const dispatch = useDispatch();
    function closeModal() {
        setSelectedInfoUserData([]);
        setInfoUserData([]);
        setSelectClicksModals(false);
    }

    const filterSearchedSomething = (inputValue: string) => {
        return InfoUserData.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    };
    const loadOptions = (inputValue: string, callback: (options: PersonOption[]) => void) => {
        setTimeout(() => {
            callback(filterSearchedSomething(inputValue));
        }, 100);
    };

    useEffect(() => {
        UserInfoGetApi();
    }, []);
    const UserInfoGetApi = async () => {
        const ParamasData = {
            code: UserClickLicenseData?.code,
            type,
            SelectCompany,
        };
        try {
            const personOptionsData = await UserInfoGet('/license_app_server/UserSelect', ParamasData);

            if (personOptionsData.data.dataSuccess) {
                setInfoUserData(personOptionsData.data.data);
            } else {
                alert('error');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSelectedName = (e: any) => {
        setSearchSomething(e.value);
        const getChoiceData = {
            name: e.name,
            team: e.team,
            email: e.email,
        };
        for (var i = 0; i < SelectedInfoUserData.length; i++) {
            if (SelectedInfoUserData[i].email === e.email) {
                alert('중복되어 추가가 불가합니다.');
                return;
            }
        }

        const DeleteUserData = InfoUserData.filter((item, j) => (item.email === e.email ? '' : item));
        setInfoUserData(DeleteUserData);
        const SortData = ObjectNameSortData(SelectedInfoUserData.concat(getChoiceData));
        setSelectedInfoUserData(SortData);
    };

    const handleSelectClickIconsUserAadd = (userData: PersonOption) => {
        const getChoiceData = {
            name: userData.name,
            team: userData.team,
            email: userData.email,
        };
        const DeleteUserData = InfoUserData.filter((item, j) => (item.email === userData.email ? '' : item));
        setInfoUserData(DeleteUserData);

        const SortData = ObjectNameSortData(SelectedInfoUserData.concat(getChoiceData));
        setSelectedInfoUserData(SortData);
    };

    const handleSelectClickIconsUserDelete = (userData: selectUserInfoDataType) => {
        const getChoiceData = {
            name: userData.name,
            team: userData.team,
            email: userData.email,
            value: userData.email,
            label: `${userData.email} || ${userData.name} || ${userData.team} `,
        };
        const DeleteUserData = SelectedInfoUserData.filter((item, j) => (item.email === userData.email ? '' : item));
        setSelectedInfoUserData(DeleteUserData);
        const SortData = ObjectNameSortData(InfoUserData.concat(getChoiceData));
        setInfoUserData(SortData);
    };

    const handleSaveUser = async () => {
        const ParamasData = {
            code: UserClickLicenseData?.code,
            type,
            SelectCompany,
            SelectedInfoUserData,
        };
        try {
            const UserDataOn = await LicenseUserAdd('/license_app_server/AddUserLicense', ParamasData);
            if (UserDataOn.data.dataSuccess) {
                const ParamasData = {
                    company: SelectCompany,
                    license: type,
                    SortTable,
                };
                dispatch(License_getLicenseDataThunk(ParamasData));
                closeModal();
                toast.show({
                    title: `${type}에 유저 등록 성공`,
                    successCheck: true,
                    duration: ToastTime,
                });
            } else {
                alert('에러발생');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal isOpen={SelectClicksModals} style={customStyles} contentLabel="데이터 입력 Modal">
                <ModalMainDivBox>
                    <div style={{ textAlign: 'end' }}>
                        <button className="ModalCloseButton" onClick={closeModal}>
                            <MdCancel></MdCancel>
                        </button>
                    </div>
                    <h2>라이선스 유저 추가</h2>

                    <div>
                        {UserClickLicenseData ? (
                            <TableMainDivBox>
                                <div>
                                    <div>
                                        <table className="type03">
                                            <tr>
                                                <th scope="row">라이선스 코드</th>
                                                <td>{UserClickLicenseData.code}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">라이선스 이름</th>
                                                <td>{UserClickLicenseData.name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">라이선스 설명</th>
                                                <td>{UserClickLicenseData.explaindesc}</td>
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
                <SelectUserInfoMainDivBox>
                    <div style={{ marginBottom: '10px' }}>
                        <div>
                            <div>
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    defaultOptions
                                    onChange={(e: any) => handleSelectedName(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="FloatMainDivBox">
                        <div className="FloatLeftDivBox">
                            <h4>선택 가능 인원</h4>
                            <ul>
                                {InfoUserData.map((list, i) => {
                                    return (
                                        <li key={list.email}>
                                            <div>
                                                {list.name} || {list.team}
                                            </div>
                                            <div className="IconsClickPlus" onClick={() => handleSelectClickIconsUserAadd(list)}>
                                                <IoMdAddCircle></IoMdAddCircle>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="FloatRightDivBox">
                            <h4>선택 인원</h4>
                            <ul>
                                {SelectedInfoUserData.map((list, i) => {
                                    return (
                                        <li key={list.email}>
                                            <div>
                                                {list.name} || {list.team}
                                            </div>
                                            <div className="IconsClickMinus" onClick={() => handleSelectClickIconsUserDelete(list)}>
                                                <AiOutlineMinusCircle></AiOutlineMinusCircle>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </SelectUserInfoMainDivBox>
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
