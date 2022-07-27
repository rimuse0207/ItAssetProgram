import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';
import { LicenseSettingProps } from '../../../../LicenseSetting/LicenseSettingTypes';
import { CompanyInfoGet, LicenseSettingDuplicate, PersonalInfoGetData } from '../../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Models';
import { toast } from '../../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../../Configs/ToastTimerConfig';

export type LicenseDataTypes = {
    license_company_name: string;
    license_info_indexs: number;
    license_info_license_product_code: string;
    license_manage_code: string;
    license_newcode: null | string;
    license_permit_count: number;
    license_product_code: string;
    license_product_name: string;
    license_prove_code: null | string;
    license_purchase_company: null | string;
    license_purchase_date: string;
    license_purchase_finish_date: string;
    license_purchase_pride: number;
    license_types: string;
};

const LicenseRegisterMainDivBox = styled.div`
    .BigBoxContent {
        ::after {
            clear: both;
            content: '';
            display: block;
        }
    }
    .BigBoxContentLeft {
        width: 47%;
        height: 70vh;
        overflow: auto;
        float: left;
    }
    .BigBoxContentRight {
        width: 47%;
        height: 70vh;
        overflow: auto;
        float: right;
    }
    .BigBoxContentLeft,
    .BigBoxContentRight {
        h4 {
            text-align: center;
        }
        ul {
            li {
                display: flex;
                border: 1px dashed black;
                justify-content: space-between;
                align-items: center;
                margin: 0 auto;
                padding: 5px;
                margin-top: 10px;
                margin-bottom: 10px;
                font-size: 0.8em;
                .IconsClickMinus {
                    :hover {
                        cursor: pointer;
                        color: red;
                    }
                }
                .IconsClickPlus {
                    :hover {
                        cursor: pointer;
                        color: blue;
                    }
                }
            }
        }
    }
`;

type LicenseRegisterMainPagePropsType = {
    SelectAssetData: DeskTopInfoDataType | null;
    SelectCompany: string;
    setBasicLicenseData: (data: LicenseDataTypes[]) => void;
    setChangeBasicLicenseData: (data: LicenseDataTypes[]) => void;
};

const LicenseRegisterMainPage = ({
    SelectAssetData,
    SelectCompany,
    setBasicLicenseData,
    setChangeBasicLicenseData,
}: LicenseRegisterMainPagePropsType) => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);

    const [LicenseData, setLicenseData] = useState<LicenseDataTypes[]>([]);
    const [ChangeLicenseData, setChangeLicenseData] = useState<LicenseDataTypes[]>([]);

    useEffect(() => {
        LicenseInfoDataGetting();
    }, []);

    const LicenseInfoDataGetting = async () => {
        try {
            const LicenseInfoDataGetting = await axios.get(`${process.env.REACT_APP_API_URL}/Asset_app_server/LicenseInfoData`, {
                params: {
                    company: SelectCompany,
                    Asset_management_number: SelectAssetData?.asset_management_number,
                },
            });

            if (LicenseInfoDataGetting.data.dataSuccess) {
                // setAllLicenseData(LicenseInfoDataGetting.data.AllLicenseRows);
                // setNowLicenseData(LicenseInfoDataGetting.data.RegisteredRows);
                setLicenseData(LicenseInfoDataGetting.data.result);
                setChangeLicenseData(LicenseInfoDataGetting.data.RegisteredRows);
                setBasicLicenseData(LicenseInfoDataGetting.data.RegisteredRows);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleClicksLicense = (data: LicenseDataTypes) => {
        try {
            const AddChangeData = LicenseData.filter(item =>
                item.license_info_license_product_code !== data.license_info_license_product_code ? item : ''
            );
            setLicenseData(AddChangeData);
            setChangeLicenseData(ChangeLicenseData.concat(data));
            setChangeBasicLicenseData(ChangeLicenseData.concat(data));
        } catch (error) {
            console.log(error);
        }
    };
    const handleClicksLicenseDelete = (data: LicenseDataTypes) => {
        try {
            const DeleteChangeData = ChangeLicenseData.filter(item =>
                item.license_info_license_product_code !== data.license_info_license_product_code ? item : ''
            );
            setChangeLicenseData(DeleteChangeData);
            setChangeBasicLicenseData(DeleteChangeData);
            setLicenseData(LicenseData.concat(data));
        } catch (error) {
            console.log(error);
        }
    };

    // 라이선스 설정 관련

    // const getLicenseSettingLists = async () => {
    //     try {
    //         const email = LoginInfoData.email ? LoginInfoData.email : '';
    //         const LicenseSettingListsAPI = await PersonalInfoGetData('/UserInfo_app_server/License_setting_lists', email);
    //         if (LicenseSettingListsAPI.data.dataSuccess) {
    //             setSettingLicenseLists(LicenseSettingListsAPI.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getLicenseSettingLists();
    //     getLicneseData();
    // }, []);

    // useEffect(() => {
    //     if (!SelectLists) {
    //         setSelectedLicenseData([]);
    //         getLicneseData();
    //         return;
    //     } else {
    //         getLicenseSettingDatas();
    //     }
    // }, [SelectLists]);

    // const getLicenseSettingDatas = async () => {
    //     try {
    //         const email = LoginInfoData.email ? LoginInfoData.email : '';
    //         const LicenseDatas = await LicenseSettingDuplicate('/UserInfo_app_server/License_setting_Datas', email, SelectLists);

    //         if (LicenseDatas.data.dataSuccess) {
    //             let datas = BasicSeletResult;

    //             for (var i = 0; i < LicenseDatas.data.data.length; i++) {
    //                 datas = datas.filter((item: { license_product_code: string }) =>
    //                     item.license_product_code === LicenseDatas.data.data[i].license_product_code ? '' : item
    //                 );
    //             }

    //             setLicenseSelectResult(datas);
    //             setSelectedLicenseData(LicenseDatas.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const getLicneseData = async () => {
    //     try {
    //         const email = LoginInfoData.email;
    //         const getLicenseDatas = await CompanyInfoGet('/UserInfo_app_server/LicenseSettingInfo', {
    //             email,
    //         });
    //         if (getLicenseDatas.data.dataSuccess) {
    //             setLicenseSelectResult(getLicenseDatas.data.data);
    //             setBasicSelectResult(getLicenseDatas.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.show({
    //             title: `서버와의 연결이 끊김 IT팀에 문의바랍니다.`,
    //             successCheck: false,
    //             duration: ToastTime,
    //         });
    //     }
    // };
    return (
        <LicenseRegisterMainDivBox>
            {' '}
            {/* <h4>라이선스 등록</h4> */}
            {/* <button onClick={settingChange}>설정변경</button> */}
            {/* <div>
                <select onChange={e => setSeletLists(e.target.value)} className="License_Select_Box">
                    <option value="">조회 할 라이선스 목록 선택</option>
                    {SettingLicenstLists.map(list => {
                        return (
                            <option value={list.setting_title} key={list.setting_title}>
                                {list.setting_title}
                            </option>
                        );
                    })}
                </select>
            </div> */}
            <div>
                <div className="BigBoxContent">
                    <div className="BigBoxContentLeft">
                        <h4>선택 전</h4>
                        <div>
                            <ul>
                                {LicenseData.map(list => {
                                    return (
                                        <li key={list.license_product_code}>
                                            <div>{list.license_product_name}</div>
                                            <div className="IconsClickPlus" onClick={() => handleClicksLicense(list)}>
                                                <IoMdAddCircle></IoMdAddCircle>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="BigBoxContentRight">
                        <h4>선택 후</h4>
                        <div>
                            <ul>
                                {ChangeLicenseData.map(list => {
                                    return (
                                        <li key={list.license_product_code}>
                                            <div>{list.license_product_name}</div>
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
        </LicenseRegisterMainDivBox>
    );
};

export default LicenseRegisterMainPage;
