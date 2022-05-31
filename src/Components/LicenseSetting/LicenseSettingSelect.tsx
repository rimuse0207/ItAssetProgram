import React, { useEffect, useState } from 'react';
import LicenseSettingMenuBar from './LicenseSettingMenuBar';
import { LicenseSettingMainPageMainDivBox, ModalButtonMainDivBox } from './LicenseSettingMainPage';
import { RootState } from '../../Models';
import { IoMdAddCircle } from 'react-icons/io';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { toast } from '../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../Configs/ToastTimerConfig';
import {
    PersonalInfoGetData,
    LicenseSettingDuplicate,
    CompanyInfoGet,
    InertPersonalData,
} from '../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { useSelector } from 'react-redux';
import { LicenseSettingProps } from './LicenseSettingTypes';

// type LicenseSettingProps = {
//     license_company_name: string;
//     license_info_indexs: number;
//     license_product_code: string;
//     license_product_name: string;
//     license_types: string;
//     setting_title: string;
// };

const LicenseSettingSelect = () => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [LicenseSelectResult, setLicenseSelectResult] = useState<LicenseSettingProps[]>([]);
    const [BasicSeletResult, setBasicSelectResult] = useState<LicenseSettingProps[]>([]);
    const [SelectedLicenseData, setSelectedLicenseData] = useState<LicenseSettingProps[]>([]);
    const [SettingLicenstLists, setSettingLicenseLists] = useState<LicenseSettingProps[]>([]);
    const [SelectLists, setSeletLists] = useState('');

    const handleClicksLicense = (licenseData: LicenseSettingProps) => {
        if (!SelectLists) {
            toast.show({
                title: `라이선스 목록 선택 후 사용 가능합니다.`,
                successCheck: false,
                duration: ToastTime,
            });
            return;
        }
        //데이터 삭제
        const DeleteLicenseData = LicenseSelectResult.filter((item, j) =>
            item.license_product_code === licenseData.license_product_code ? '' : item
        );
        setLicenseSelectResult(DeleteLicenseData);

        //데이터 추가
        const dataAdd = SelectedLicenseData.concat(licenseData);
        setSelectedLicenseData(dataAdd);
    };

    const handleClicksLicenseDelete = (licenseData: LicenseSettingProps) => {
        //데이터 삭제
        const DeleteLicenseData = SelectedLicenseData.filter((item, j) =>
            item.license_product_code === licenseData.license_product_code ? '' : item
        );
        setSelectedLicenseData(DeleteLicenseData);

        //데이터 추가
        const dataAdd = LicenseSelectResult.concat(licenseData);
        setLicenseSelectResult(dataAdd);
    };

    const getLicenseSettingLists = async () => {
        try {
            const email = LoginInfoData.email ? LoginInfoData.email : '';
            const LicenseSettingListsAPI = await PersonalInfoGetData('/UserInfo_app_server/License_setting_lists', email);
            if (LicenseSettingListsAPI.data.dataSuccess) {
                setSettingLicenseLists(LicenseSettingListsAPI.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLicenseSettingLists();
        getLicneseData();
    }, []);

    useEffect(() => {
        if (!SelectLists) {
            setSelectedLicenseData([]);
            getLicneseData();
            return;
        } else {
            getLicenseSettingDatas();
        }
    }, [SelectLists]);

    const getLicenseSettingDatas = async () => {
        try {
            const email = LoginInfoData.email ? LoginInfoData.email : '';
            const LicenseDatas = await LicenseSettingDuplicate('/UserInfo_app_server/License_setting_Datas', email, SelectLists);
            console.log(LicenseDatas);

            if (LicenseDatas.data.dataSuccess) {
                let datas = BasicSeletResult;

                for (var i = 0; i < LicenseDatas.data.data.length; i++) {
                    datas = datas.filter((item: { license_product_code: string }) =>
                        item.license_product_code === LicenseDatas.data.data[i].license_product_code ? '' : item
                    );
                }

                setLicenseSelectResult(datas);
                setSelectedLicenseData(LicenseDatas.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLicneseData = async () => {
        try {
            const email = LoginInfoData.email;
            const getLicenseDatas = await CompanyInfoGet('/UserInfo_app_server/LicenseSettingInfo', {
                email,
            });
            if (getLicenseDatas.data.dataSuccess) {
                setLicenseSelectResult(getLicenseDatas.data.data);
                setBasicSelectResult(getLicenseDatas.data.data);
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

    //
    const handleSaveUser = async () => {
        try {
            if (!SelectLists) {
                toast.show({
                    title: `라이선스 목록 선택 후 저장 가능합니다.`,
                    successCheck: false,
                    duration: ToastTime,
                });
                return;
            } else {
                const email = LoginInfoData.email;
                const params = {
                    email,
                    SelectLists,
                    SelectedLicenseData,
                };
                const License_setting_Update = await InertPersonalData('/UserInfo_app_server/licenseSettingUpdate', params);

                if (License_setting_Update.data.dataSuccess) {
                    getLicenseSettingDatas();
                    toast.show({
                        title: `변경 완료 되었습니다.`,
                        successCheck: true,
                        duration: ToastTime,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    //등록된 라이선스 리셋 클릭 시
    const handleReset = () => {
        const ConfirmCheck = window.confirm('변경 하신 라이선스를 초기로 리셋하시겠습니까?');
        if (!ConfirmCheck) return;
        if (!SelectLists) {
            setSelectedLicenseData([]);
            getLicneseData();
            toast.show({
                title: `변경하였던 라이선스가 리셋 되었습니다.`,
                successCheck: true,
                duration: ToastTime,
            });
            return;
        } else {
            getLicenseSettingDatas();
            toast.show({
                title: `변경하였던 라이선스가 리셋 되었습니다.`,
                successCheck: true,
                duration: ToastTime,
            });
        }
    };

    return (
        <LicenseSettingMainPageMainDivBox>
            <LicenseSettingMenuBar></LicenseSettingMenuBar>
            <div style={{ marginTop: '30px' }}>
                <h2>라이선스 설정 조회</h2>
            </div>
            <div>
                <select onChange={e => setSeletLists(e.target.value)}>
                    <option value="">조회 할 라이선스 목록 선택</option>
                    {SettingLicenstLists.map(list => {
                        return (
                            <option value={list.setting_title} key={list.setting_title}>
                                {list.setting_title}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <div className="License_setting_Select_Container">
                    <div className="License_setting_Select_Left" style={{ marginTop: '45px' }}>
                        <div>
                            <h3>선택 가능 라이선스</h3>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    {LicenseSelectResult.map(list => {
                                        return (
                                            <li key={list.license_product_code}>
                                                <div>
                                                    {list.license_types}_{list.license_product_name}
                                                </div>
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
                            <h3>등록된 라이선스</h3>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    {SelectedLicenseData.map(list => {
                                        return (
                                            <li key={list.license_product_code}>
                                                <div>
                                                    {list.license_types}_{list.license_product_name}
                                                </div>
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
                    <button onClick={() => handleReset()}>리셋</button>
                </div>
                <div>
                    <button onClick={() => handleSaveUser()}>수정</button>
                </div>
            </ModalButtonMainDivBox>
        </LicenseSettingMainPageMainDivBox>
    );
};

export default LicenseSettingSelect;
