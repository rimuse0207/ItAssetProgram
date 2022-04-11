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
import axios from 'axios';
import moment from 'moment';
import { AssetDeleteLicense, GetDataFromServerLicenseInfos } from '../../../../../Apis/core/api/AuthNeedApi/LicenseApi';

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
            width: 50%;
            border-right: 1px solid lightgray;
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
    asset_division: string;
    asset_management_number: string;
};

const AddUserModalMainPage = ({
    setSelectClicksModals,
    SelectClicksModals,
    UserClickLicenseData,
    SelectCompany,
    type,
    SortTable,
}: NewDataInsertMainPageProps) => {
    const [SelectedLicenseData, setSelectedLicenseData] = useState<LicenseDataType[]>([]);
    const [SearchSomething, setSearchSomething] = useState<string | null>('');
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
    const [SearchNames, setSearchNames] = useState('');
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
        if (UserClickLicenseData?.license_manage_code) {
            getInfoDataLicenseInfo();
        }
    }, [UserClickLicenseData?.license_manage_code]);
    const getInfoDataLicenseInfo = async () => {
        const ParamasData = {
            license_manage_code: UserClickLicenseData?.license_manage_code,
        };
        try {
            const getDataFromServerLicenseInfo = await GetDataFromServerLicenseInfos(
                `license_app_server/getDataFromServerLicenseInfo`,
                ParamasData
            );
            setSelectedLicenseData(getDataFromServerLicenseInfo.data.data);
            console.log(getDataFromServerLicenseInfo);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        UserInfoGetApi();
    }, []);
    const UserInfoGetApi = async () => {
        const ParamasData = {
            code: UserClickLicenseData?.license_manage_code,
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
            asset_division: e.asset_division,
            asset_management_number: e.asset_management_number,
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
        const assetCount =
            SelectedLicenseData[0].license_permit_count -
            (SelectedLicenseData[0].license_license_manage_code ? SelectedLicenseData.length : 0);

        if (SelectedInfoUserData.length >= assetCount) {
            const permissionCheck = window.confirm('라이선스 사용자가 많습니다. 그래도 추가 하시 겠습니까?');
            if (!permissionCheck) {
                return;
            }
        }
        const getChoiceData = {
            name: userData.name,
            team: userData.team,
            email: userData.email,
            asset_division: userData.asset_division,
            asset_management_number: userData.asset_management_number,
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
            asset_division: userData.asset_division,
            asset_management_number: userData.asset_management_number,
            label: `${userData.asset_management_number} || ${userData.asset_division} || ${userData.email} || ${userData.name} || ${userData.team} `,
        };
        const DeleteUserData = SelectedInfoUserData.filter((item, j) => (item.email === userData.email ? '' : item));
        setSelectedInfoUserData(DeleteUserData);
        const SortData = ObjectNameSortData(InfoUserData.concat(getChoiceData));
        setInfoUserData(SortData);
    };

    const handleSaveUser = async () => {
        const ParamasData = {
            code: UserClickLicenseData?.license_manage_code,
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

    const handleDeleteDataLicense = async (data: LicenseDataType) => {
        const checkDelete = window.confirm('정말 삭제할까요?');
        if (!checkDelete) {
            return;
        }
        try {
            const ParamasData = {
                company: SelectCompany,
                license: type,
                data,
            };
            const deleteData = await AssetDeleteLicense('/license_app_server/license_delete_data', {
                ParamasData,
            });
            if (deleteData.data.dataSuccess) {
                dispatch(License_getLicenseDataThunk(ParamasData));
                getInfoDataLicenseInfo();
                toast.show({
                    title: `${type}에 라이선스 해제 성공`,
                    successCheck: true,
                    duration: ToastTime,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteData = async () => {
        const checkDelete = window.confirm('해당 라이선스를 정말 삭제할까요? \n삭제하시면 등록된 모든 사용자가 삭제 됩니다.');
        if (!checkDelete) {
            return;
        }
        try {
            const ParamasData = {
                company: SelectCompany,
                license: type,
                UserClickLicenseData,
                SortTable,
            };
            const DeleteDataFromLicense = await AssetDeleteLicense('/license_app_server/DeleteLicenseDetails', {
                ParamasData,
            });
            if (DeleteDataFromLicense.data.dataSuccess) {
                dispatch(License_getLicenseDataThunk(ParamasData));
                closeModal();
                toast.show({
                    title: ` 라이선스 삭제 성공`,
                    successCheck: true,
                    duration: ToastTime,
                });
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
                        {SelectedLicenseData.length > 0 ? (
                            <TableMainDivBox>
                                <div className="license_Float_Main_div">
                                    <div className="license_Float_left">
                                        <table className="type03">
                                            <tr>
                                                <th scope="row">코드</th>
                                                <td>{SelectedLicenseData[0].license_manage_code}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">이름</th>
                                                <td>{SelectedLicenseData[0].license_product_name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">구매 날짜</th>
                                                <td>{moment(SelectedLicenseData[0].license_purchase_date).format('YYYY-MM-DD')}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">허용 인원</th>
                                                <td>{SelectedLicenseData[0].license_permit_count}명</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">사용 인원</th>
                                                <td>
                                                    {SelectedLicenseData[0].license_license_manage_code ? SelectedLicenseData.length : 0}명
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">사용 가능 인원 수</th>
                                                <td>
                                                    {SelectedLicenseData[0].license_permit_count -
                                                        (SelectedLicenseData[0].license_license_manage_code
                                                            ? SelectedLicenseData.length
                                                            : 0)}
                                                    명
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="license_Float_right">
                                        <input
                                            type="text"
                                            placeholder="이름 또는 팀명 검색..."
                                            className="InputSearchUsers"
                                            value={SearchNames}
                                            onChange={e => setSearchNames(e.target.value)}
                                        ></input>
                                        <div className="License_descktop_user_float_container">
                                            <div className="License_descktop_user_float_left">
                                                <h4>데스크탑</h4>
                                                {SelectedLicenseData.filter(
                                                    list =>
                                                        list.name?.toLowerCase().includes(SearchNames) ||
                                                        list.team?.toLowerCase().includes(SearchNames) ||
                                                        list.email?.toLowerCase().includes(SearchNames)
                                                ).map((list, i) => {
                                                    return list.asset_division === '데스크탑' ? (
                                                        <div className="license_asset_delete" key={list.asset_management_number}>
                                                            <div>
                                                                {list.asset_management_number ? list.asset_management_number : ''}_
                                                                {list.team ? list.team : '사용자'}_{list.name ? list.name : '없음'}
                                                            </div>
                                                            <div className="IconsClickMinus" onClick={() => handleDeleteDataLicense(list)}>
                                                                <AiOutlineMinusCircle></AiOutlineMinusCircle>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    );
                                                })}
                                            </div>
                                            <div className="License_descktop_user_float_left">
                                                <h4>노트북</h4>
                                                {SelectedLicenseData.map((list, i) => {
                                                    return list.asset_division === '노트북' ? (
                                                        <div className="license_asset_delete" key={list.asset_management_number}>
                                                            <div>
                                                                {list.asset_management_number ? list.asset_management_number : ''}_
                                                                {list.team ? list.team : '사용자'}_{list.name ? list.name : '없음'}
                                                            </div>
                                                            <div className="IconsClickMinus" onClick={() => handleDeleteDataLicense(list)}>
                                                                <AiOutlineMinusCircle></AiOutlineMinusCircle>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    );
                                                })}
                                            </div>
                                        </div>
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
                                                {list.asset_management_number} || {list.asset_division} || {list.name} || {list.team}
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
                    <button onClick={() => DeleteData()}>삭제</button>
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
