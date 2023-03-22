import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CompanyInfoGet, LicenseSettingDuplicate, InertPersonalData } from '../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { RootState } from '../../Models';
import { IoMdAddCircle } from 'react-icons/io';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { toast } from '../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../Configs/ToastTimerConfig';
import LicenseSettingMenuBar from './LicenseSettingMenuBar';
import { LicenseSettingProps } from './LicenseSettingTypes';

export const LicenseSettingMainPageMainDivBox = styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;

    select {
        border: 1px solid lightgray;
        width: 40%;
        height: 35px;
        padding-left: 10px;
        margin-top: 10px;
    }

    .License_setting_Select_Container {
        ::after {
            clear: both;
            display: block;
            content: '';
        }
        .License_setting_Select_Left {
            width: 40%;
            float: left;

            input {
                border: 1px solid lightgray;
                width: 100%;
                height: 35px;
                padding-left: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
        .License_setting_Select_Right {
            width: 40%;
            float: right;
            margin-top: 45px;
        }

        ul {
            margin-top: 10px;
            padding: 10px;
            overflow-y: auto;
            height: 40vh;
            border: 1px dashed gray;
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
    }

    .LicenseSetting_title_inputcontainer {
        margin-top: 20px;
        margin-bottom: 20px;
        input {
            border: 1px solid lightgray;
            width: 40%;
            height: 40px;
            padding-left: 15px;
            font-size: 1.1em;
            margin-top: 10px;
        }
        label {
            font-size: 1.3em;
            font-weight: bold;
        }
    }
`;

export const ModalButtonMainDivBox = styled.div`
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

// type LicenseSettingProps = {
//     license_company_name: string;
//     license_info_indexs: number;
//     license_product_code: string;
//     license_product_name: string;
//     license_types: string;
// };

const LicenseSettingMainPage = () => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [LicenseSelectResult, setLicenseSelectResult] = useState<LicenseSettingProps[]>([]);
    const [SelectedLicenseData, setSelectedLicenseData] = useState<LicenseSettingProps[]>([]);
    const [SearchLicense, setSearchLicense] = useState('');
    const [LicenseSettingTitle, setLicenseSettingTitle] = useState('');

    useEffect(() => {
        setSelectedLicenseData([]);
        getLicneseData();
    }, []);

    const getLicneseData = async () => {
        try {
            const email = LoginInfoData.email;
            const getLicenseDatas = await CompanyInfoGet('/UserInfo_app_server/LicenseSettingInfo', {
                email,
            });
            if (getLicenseDatas.data.dataSuccess) {
                setLicenseSelectResult(getLicenseDatas.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버와의 연결이 끊김 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    const handleClicksLicense = (licenseData: LicenseSettingProps) => {
        //데이터 삭제
        const DeleteLicenseData = LicenseSelectResult.filter((item, j) =>
            item.asset_license_list_info_code === licenseData.asset_license_list_info_code ? '' : item
        );
        setLicenseSelectResult(DeleteLicenseData);

        //데이터 추가
        const dataAdd = SelectedLicenseData.concat(licenseData);
        setSelectedLicenseData(dataAdd);
    };

    const handleClicksLicenseDelete = (licenseData: LicenseSettingProps) => {
        //데이터 삭제
        const DeleteLicenseData = SelectedLicenseData.filter((item, j) =>
            item.asset_license_list_info_code === licenseData.asset_license_list_info_code ? '' : item
        );
        setSelectedLicenseData(DeleteLicenseData);

        //데이터 추가
        const dataAdd = LicenseSelectResult.concat(licenseData);
        setLicenseSelectResult(dataAdd);
    };

    const handleCheckTitle = async () => {
        try {
            if (!LicenseSettingTitle) {
                return;
            }
            const email = LoginInfoData.email ? LoginInfoData.email : '';

            const getLicenseDatas = await LicenseSettingDuplicate(
                '/UserInfo_app_server/LicenseSetting_Title_duplicateCheck',
                email,
                LicenseSettingTitle
            );
            if (getLicenseDatas.data.dataSuccess) {
                if (getLicenseDatas.data.data) {
                    return;
                } else {
                    setLicenseSettingTitle('');
                    toast.show({
                        title: `라이선스의 설정 제목이 중복됩니다.`,
                        successCheck: false,
                        duration: ToastTime,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버와의 연결이 끊김 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    const handleSaveUser = async () => {
        try {
            if (!LicenseSettingTitle) {
                toast.show({
                    title: `라이선스 설정 제목을 작성 해주세요.`,
                    successCheck: false,
                    duration: ToastTime,
                });
                return;
            } else {
                const email = LoginInfoData.email;
                const params = {
                    email,
                };
                const sendLicenseDataSave = await InertPersonalData('/UserInfo_app_server/LicenseSetting_Data_save', {
                    params,
                    SelectedLicenseData,
                    LicenseSettingTitle,
                });
                if (sendLicenseDataSave.data.dataSuccess) {
                    getLicneseData();
                    setSelectedLicenseData([]);
                    setLicenseSettingTitle('');
                    toast.show({
                        title: `라인선스 설정이 완료되었습니다.`,
                        successCheck: true,
                        duration: ToastTime,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버와의 연결이 끊김 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    return (
        <LicenseSettingMainPageMainDivBox>
            <LicenseSettingMenuBar></LicenseSettingMenuBar>
            <div style={{ marginTop: '30px' }}>
                <h2>라이선스 설정 추가하기</h2>
            </div>
            <div className="LicenseSetting_title_inputcontainer">
                <div className="input-contain">
                    <label className="placeholder-text" htmlFor="fname" id="placeholder-fname">
                        <div className="text">라이선스 설정 제목</div>
                    </label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        autoComplete="off"
                        value={LicenseSettingTitle}
                        onChange={e => setLicenseSettingTitle(e.target.value)}
                        onBlur={handleCheckTitle}
                        placeholder="라인선스 설정 제목"
                    />
                </div>
            </div>
            <div>
                <div className="License_setting_Select_Container">
                    <div className="License_setting_Select_Left">
                        <div>
                            <h3>라이선스 조회</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="조회 하실 라이선스명"
                                    value={SearchLicense}
                                    onChange={e => setSearchLicense(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    {LicenseSelectResult.filter((item, j) =>
                                        item.asset_license_list_info_name.toLowerCase().includes(SearchLicense.toLowerCase())
                                    ).map(list => {
                                        return (
                                            <li key={list.asset_license_list_info_code}>
                                                <div>{list.asset_license_list_info_name}</div>
                                                <div className="IconsClickPlus" onClick={() => handleClicksLicense(list)}>
                                                    <IoMdAddCircle></IoMdAddCircle>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="License_setting_Select_Right">
                        <div>
                            <h3>라이선스 선택</h3>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    {SelectedLicenseData.map(list => {
                                        return (
                                            <li key={list.asset_license_list_info_code}>
                                                <div>{list.asset_license_list_info_name}</div>
                                                <div className="IconsClickMinus" onClick={() => handleClicksLicenseDelete(list)}>
                                                    <AiOutlineMinusCircle></AiOutlineMinusCircle>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalButtonMainDivBox>
                <div>
                    <button onClick={() => handleSaveUser()}>저장</button>
                </div>
            </ModalButtonMainDivBox>
        </LicenseSettingMainPageMainDivBox>
    );
};

export default LicenseSettingMainPage;
