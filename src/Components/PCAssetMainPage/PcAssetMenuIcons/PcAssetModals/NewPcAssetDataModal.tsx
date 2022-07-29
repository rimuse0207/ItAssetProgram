import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { MdCancel } from 'react-icons/md';
// import Select from 'react-select/async';
import Select from 'react-select';
import { PersonOption, CompanyOption } from '../../../LicenseMainPage/VolumeLicenseMainPage/DownloadMainPage/ModalMainPage/docs/data';
import { CompanyInfoGet, UserInfoGet, RandomCodeDataGet } from '../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { AssetAdd } from '../../../../Apis/core/api/AuthUnNeedApi/AssetUserAdd/AssetAdd';
import { toast } from '../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../Configs/ToastTimerConfig';
import { useDispatch } from 'react-redux';
import { DeskTopAsset_getDeskTopAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetDeskTopDataThunks';
import { NoteBookAsset_getNoteBookAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetNotBookDataThunks';
import { MonitorAsset_getMonitorAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetMonitorDataThunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Models';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { IoMdAddCircle } from 'react-icons/io';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { PersonalInfoGetData, LicenseSettingDuplicate } from '../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { LicenseSettingProps } from '../../../LicenseSetting/LicenseSettingTypes';
import { useParams } from 'react-router-dom';
registerLocale('ko', ko);
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

export const MainModalContent = styled.div`
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
    #wrap {
        width: 100%;
        /* max-width: 900px; */
        /* margin: 0 auto 60px; */
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    }
    .License_Select_Box {
        width: 100%;
        height: 45px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 30px;
        font-size: 14px;
        border: 0;
        background: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        -webkit-appearance: none;
        margin-bottom: 20px;
        option {
            padding: 5px 0;
        }
    }
    //layout
    .input {
        &-header {
            position: relative;
            padding-top: 80px;
            color: #fff;
            h1 {
                padding-bottom: 25px;
                font-size: 3.25em;
                font-weight: 100;
            }
        }
        &-content {
            position: relative;
            padding: 44px 55px;
            background: #fff;
            z-index: 10;

            h2 {
                padding-bottom: 45px;
                font-size: 1.625em;
                font-weight: bold;
                vertical-align: middle;
                select {
                    display: inline-block;
                    margin-left: 10px;
                    padding: 5px 6px 3px;
                    border: 1px solid #ffca00;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    vertical-align: middle;
                    color: #ffca00;
                }
            }
            .inputbox {
                position: relative;
                padding: 15px 0 28px 150px;
                &-title {
                    position: absolute;
                    top: 15px;
                    left: 0;
                    width: 200px;
                    height: 30px;
                    color: #666;
                    font-weight: bold;
                    line-height: 30px;
                }
                &-content {
                    position: relative;
                    width: 100%;

                    select {
                        width: 100%;
                        height: 45px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        line-height: 30px;
                        font-size: 14px;
                        border: 0;
                        background: none;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        outline: none;
                        -webkit-appearance: none;
                        option {
                            padding: 5px 0;
                        }
                    }
                    input {
                        width: 100%;
                        height: 30px;
                        box-sizing: border-box;
                        line-height: 30px;
                        font-size: 14px;
                        border: 0;
                        background: none;
                        border-bottom: 1px solid #ccc;
                        outline: none;
                        border-radius: 0;
                        -webkit-appearance: none;
                        &:focus,
                        &:valid {
                            & ~ label {
                                color: #2962ff;
                                transform: translateY(-20px);
                                font-size: 0.825em;
                                cursor: default;
                            }
                        }
                        &:focus {
                            & ~ .underline {
                                width: 100%;
                            }
                        }
                    }
                    textarea {
                        width: 100%;
                        height: 100px;
                        box-sizing: border-box;
                        font-size: 14px;
                        border: 0;
                        background: none;
                        border: 1px solid #ccc;
                        outline: none;
                        border-radius: 0;
                        -webkit-appearance: none;
                        padding: 10px;
                    }
                    label {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 30px;
                        line-height: 30px;
                        color: #ccc;
                        cursor: text;
                        transition: all 200ms ease-out;
                        z-index: 10;
                    }
                    .underline {
                        content: '';
                        display: block;
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: #2962ff;
                        transition: all 200ms ease-out;
                    }
                }
            }
            .inputbox-content {
                position: relative;
            }
            .RandomButtonIcons {
                font-size: 1.8em;
                position: absolute;
                right: 0;
                top: -5px;
                :hover {
                    cursor: pointer;
                    color: #368;
                }
            }

            .btns {
                padding: 30px 0 0 200px;
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
    }
    .PCAssetFloatContainer {
        ::after {
            clear: both;
            content: '';
            display: block;
        }
        .PCAssetFloatLeft {
            width: 40%;
            float: left;
            padding-right: 50px;
            border-right: 1px solid black;
        }
        .PCAssetFloatRight {
            width: 60%;
            padding-left: 50px;
            float: right;
        }
    }

    .BigBoxContent {
        width: 100%;
        /* min-height: 30vh; */
        height: 30vh;
        ::after {
            clear: both;
            display: block;
            content: '';
        }

        .BigBoxContentLeft {
            width: 48%;
            height: 100%;

            float: left;
        }
        .BigBoxContentRight {
            width: 48%;
            height: 100%;

            float: right;
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
`;

Modal.setAppElement('#ModalMainDiv');

type NewAssetDataModalProps = {
    SelectClicksModals: { NewDataModal: boolean; ExcelDownloadModal: boolean; FilterSearch: boolean };
    setSelectClicksModals: (data: boolean) => void;
    SelectCompany: string;
};
type paramasType = {
    type: string;
};
const NewAssetDataModal = ({ SelectClicksModals, setSelectClicksModals, SelectCompany }: NewAssetDataModalProps) => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [ChooseAssetData, setChooseAssetData] = useState('데스크탑');
    const [InfoUserData, setInfoUserData] = useState<any>([]);
    const [CompanyInfoData, setCompanyInfoData] = useState<CompanyOption[]>([]);
    const [UserWriteData, setUserWriteData] = useState({
        asset_management_number: '',
        asset_division: '데스크탑',
        asset_maker: '삼성',
        asset_model: '',
        asset_purchase_date: new Date(),
        asset_pride: 0,
        asset_cpu: '',
        asset_ram: '16GB',
        asset_disk: 'SSD_512GB',
        asset_newcode: '',
        usercheck: true,
        userinfo_email: '',
        asset_distribute_date: new Date(),
        company_code: '',
        asset_notepad: '',
    });

    useEffect(() => {
        hadldeRandomCodeData();
    }, []);

    const [LicenseSelectResult, setLicenseSelectResult] = useState<LicenseSettingProps[]>([]);
    const [BasicSeletResult, setBasicSelectResult] = useState<LicenseSettingProps[]>([]);
    const [SelectedLicenseData, setSelectedLicenseData] = useState<LicenseSettingProps[]>([]);
    const [SettingLicenstLists, setSettingLicenseLists] = useState<LicenseSettingProps[]>([]);
    const [SelectLists, setSeletLists] = useState('');

    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    const { type } = useParams<paramasType>();

    const dispatch = useDispatch();

    function closeModal() {
        setSelectClicksModals(false);
    }
    // const filterSearchedSomething = (inputValue: string) => {
    //     return InfoUserData.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    // };
    // const loadOptions = (inputValue: string, callback: (options: PersonOption[]) => void) => {
    //     setTimeout(() => {
    //         callback(filterSearchedSomething(inputValue));
    //     }, 100);
    // };
    const handleSelectedName = (value: any) => {
        setUserWriteData({ ...UserWriteData, userinfo_email: value });
    };
    useEffect(() => {
        // getCompanyInfo();
        getUserInfo();
        getSettingData();
    }, [SelectCompany]);

    //회사 정보 받기 API 호출
    const getCompanyInfo = async () => {
        try {
            const ParamsData = {
                SelectCompany,
            };
            const getCompanyInfoData = await CompanyInfoGet('/Asset_app_server/CompanyDataGet', ParamsData);
            if (getCompanyInfoData.data.dataSuccess) {
                setCompanyInfoData(getCompanyInfoData.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleClearable = () => setUserWriteData({ ...UserWriteData, userinfo_email: '' });

    //사용자 정보 받기 API 호출
    const getUserInfo = async () => {
        const ParamasData = {
            SelectCompany,
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

    //관리번호 다시 받기 클릭 시
    const hadldeRandomCodeData = async () => {
        try {
            const ParamasData = {
                Chooseed: 'asset',
                SelectCompany,
                ChooseAssetData,
                SelectDate: UserWriteData.asset_purchase_date,
            };
            const getRandomCodeData = await RandomCodeDataGet('/Asset_app_server/RandCodeData', ParamasData);
            if (getRandomCodeData.data.dataSuccess) {
                setUserWriteData({ ...UserWriteData, asset_management_number: getRandomCodeData.data.RandomCode });
            }
        } catch (error) {
            console.log(error);
        }
    };

    //저장시
    const saveData = async () => {
        // if ( UserWriteData.company_code === '') {
        //     alert('공란을 작성해주세요.');
        //     return;
        // } else
        // if (UserWriteData.usercheck && UserWriteData.userinfo_email === '') {
        //     alert('사용자를 등록 해주세요.');
        //     return;
        // }
        try {
            const ParamasData = {
                UserWriteData,
                SelectCompany,
                ChooseAssetData,
                SelectedLicenseData,
                email: sessionStorage.getItem('email'),
                name: sessionStorage.getItem('name'),
            };
            const SaveAssetData = await AssetAdd('/Asset_app_server/AssetAdd', ParamasData);
            if (SaveAssetData.data.dataSuccess) {
                // if (UserWriteData.asset_division === '데스크탑') {
                //     const ParamasDatas = {
                //         types: '데스크탑',
                //         SelectCompany,
                //         FilteringData,
                //         UserWriteData,
                //     };
                //     await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(ParamasDatas));
                // } else if (UserWriteData.asset_division === '노트북') {
                //     const ParamasDatas = {
                //         types: '노트북',
                //         SelectCompany,
                //         FilteringData,
                //     };
                //     await dispatch(NoteBookAsset_getNoteBookAssetDataThunk(ParamasDatas));
                // }
                // else {
                //     const ParamasDatas = {
                //         types: '모니터',
                //         SelectCompany,
                //         FilteringData,
                //     };
                //     await dispatch(MonitorAsset_getMonitorAssetDataThunk(ParamasDatas));
                // }

                const paramasData = {
                    company: SelectCompany,
                    type,
                    FilteringData,
                };
                await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(paramasData));

                setUserWriteData({
                    asset_management_number: '',
                    asset_division: UserWriteData.asset_division,
                    asset_maker: UserWriteData.asset_maker,
                    asset_model: UserWriteData.asset_model,
                    asset_purchase_date: UserWriteData.asset_purchase_date,
                    asset_pride: UserWriteData.asset_pride,
                    asset_cpu: UserWriteData.asset_cpu,
                    asset_ram: UserWriteData.asset_ram,
                    asset_disk: UserWriteData.asset_disk,
                    asset_newcode: UserWriteData.asset_newcode,
                    usercheck: true,
                    userinfo_email: '',
                    asset_distribute_date: new Date(),
                    company_code: '',
                    asset_notepad: '',
                });
                // hadldeRandomCodeData();
                closeModal();

                toast.show({ title: `자산 등록 완료.`, successCheck: true, duration: ToastTime });
            } else {
                toast.show({ title: `자산 등록 실패,다시 시도 해 주세요.`, successCheck: false, duration: ToastTime });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 라이선스 설정 관련

    const getSettingData = async () => {
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
        }
    };

    const handleClicksLicense = (licenseData: LicenseSettingProps) => {
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

    return (
        <div>
            <Modal isOpen={SelectClicksModals.NewDataModal} style={customStyles} contentLabel="데이터 입력 Modal">
                <MainModalContent>
                    <div style={{ textAlign: 'end' }}>
                        <button className="ModalCloseButton" onClick={closeModal}>
                            <MdCancel></MdCancel>
                        </button>
                    </div>

                    <div>
                        <div id="wrap" className="input">
                            <section className="input-content">
                                <h2>PC 자산 추가</h2>

                                <div className="PCAssetFloatContainer">
                                    <div className="PCAssetFloatLeft">
                                        <div className="input-content-wrap">
                                            {/* <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    관리번호<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input0"
                                                        type="text"
                                                        value={UserWriteData.asset_management_number}
                                                        onChange={e =>
                                                            setUserWriteData({ ...UserWriteData, asset_management_number: e.target.value })
                                                        }
                                                        placeholder={`${SelectCompany}-22001`}
                                                        required
                                                    />

                                                    <span className="underline"></span>
                                                    <div className="RandomButtonIcons" onClick={hadldeRandomCodeData}>
                                                        <GiPerspectiveDiceSixFacesRandom></GiPerspectiveDiceSixFacesRandom>
                                                    </div>
                                                </dd>
                                            </dl> */}

                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    구매날짜<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <DatePicker
                                                        selected={UserWriteData.asset_purchase_date}
                                                        onChange={(date: any) =>
                                                            setUserWriteData({ ...UserWriteData, asset_purchase_date: date })
                                                        }
                                                        withPortal
                                                        locale={ko}
                                                        dateFormat="yyy-MM-dd"
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            {/* <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    사용처<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <div className="selectBox">
                                                        <select
                                                            className="select"
                                                            onChange={e =>
                                                                setUserWriteData({ ...UserWriteData, company_code: e.target.value })
                                                            }
                                                            value={UserWriteData.company_code}
                                                        >
                                                            <option value="">사용처 선택</option>
                                                            {CompanyInfoData.map((list, i) => {
                                                                return (
                                                                    <option key={list.value} defaultValue={list.value} value={list.value}>
                                                                        {list.label}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                        <span className="icoArrow"></span>
                                                    </div>
                                                </dd>
                                            </dl> */}
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">구분</dt>
                                                <dd className="inputbox-content">
                                                    <div className="selectBox">
                                                        <select
                                                            className="select"
                                                            onChange={e =>
                                                                setUserWriteData({ ...UserWriteData, asset_division: e.target.value })
                                                            }
                                                            value={UserWriteData.asset_division}
                                                        >
                                                            <option selected defaultValue="데스크탑" value={'데스크탑'}>
                                                                데스크탑
                                                            </option>
                                                            <option defaultValue="노트북" value={'노트북'}>
                                                                노트북
                                                            </option>
                                                        </select>
                                                        <span className="icoArrow"></span>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">제조사</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input7"
                                                        value={UserWriteData.asset_maker}
                                                        onChange={e => setUserWriteData({ ...UserWriteData, asset_maker: e.target.value })}
                                                        placeholder="삼성 LG APPle등등.."
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">모델명</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input3"
                                                        value={UserWriteData.asset_model}
                                                        onChange={e => setUserWriteData({ ...UserWriteData, asset_model: e.target.value })}
                                                        placeholder="DM500S3B/B71"
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">가격</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        type="number"
                                                        id="input4"
                                                        value={UserWriteData.asset_pride}
                                                        onChange={e =>
                                                            setUserWriteData({ ...UserWriteData, asset_pride: Number(e.target.value) })
                                                        }
                                                        placeholder="1700000 ..."
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">CPU</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input4"
                                                        value={UserWriteData.asset_cpu}
                                                        onChange={e => setUserWriteData({ ...UserWriteData, asset_cpu: e.target.value })}
                                                        placeholder="i7-1165G7(2.8GHz) ..."
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">RAM</dt>
                                                <dd className="inputbox-content">
                                                    {/* <input
                                                        id="input5"
                                                        value={UserWriteData.asset_ram}
                                                        onChange={e => setUserWriteData({ ...UserWriteData, asset_ram: e.target.value })}
                                                        placeholder="8G,16G ..."
                                                    /> 
                                                    <span className="underline"></span>
                                                    */}
                                                    <select
                                                        className="select"
                                                        onChange={e => setUserWriteData({ ...UserWriteData, asset_ram: e.target.value })}
                                                        value={UserWriteData.asset_ram}
                                                    >
                                                        <option defaultValue="4GB" value={'4GB'}>
                                                            4GB
                                                        </option>
                                                        <option defaultValue="8GB" value={'8GB'}>
                                                            8GB
                                                        </option>
                                                        <option defaultValue="16GB" value={'16GB'}>
                                                            16GB
                                                        </option>
                                                        <option defaultValue="32GB" value={'32GB'}>
                                                            32GB
                                                        </option>
                                                        <option defaultValue="64GB" value={'64GB'}>
                                                            64GB
                                                        </option>
                                                    </select>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">디스크</dt>
                                                <dd className="inputbox-content">
                                                    <select
                                                        className="select"
                                                        onChange={e => setUserWriteData({ ...UserWriteData, asset_disk: e.target.value })}
                                                        value={UserWriteData.asset_disk}
                                                    >
                                                        <option defaultValue="SSD_256GB" value={'SSD_256GB'}>
                                                            SSD_256GB
                                                        </option>
                                                        <option defaultValue="SSD_512GB" value={'SSD_512GB'}>
                                                            SSD_512GB
                                                        </option>
                                                        <option defaultValue="SSD_1TB" value={'SSD_1TB'}>
                                                            SSD_1TB
                                                        </option>
                                                        <option defaultValue="HDD_512GB" value={'HDD_512GB'}>
                                                            HDD_512GB
                                                        </option>
                                                        <option defaultValue="HDD_1TB" value={'HDD_1TB'}>
                                                            HDD_1TB
                                                        </option>
                                                    </select>
                                                </dd>
                                            </dl>

                                            <dl className="inputbox">
                                                <dt className="inputbox-title">자산코드</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input10"
                                                        value={UserWriteData.asset_newcode}
                                                        onChange={e =>
                                                            setUserWriteData({ ...UserWriteData, asset_newcode: e.target.value })
                                                        }
                                                        placeholder="G10039 등등.."
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">비고</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input10"
                                                        value={UserWriteData.asset_notepad}
                                                        onChange={e =>
                                                            setUserWriteData({ ...UserWriteData, asset_notepad: e.target.value })
                                                        }
                                                        placeholder="공용PC-***** 등등.."
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="PCAssetFloatRight">
                                        {/* 사용자 있을시 */}
                                        {UserWriteData.usercheck ? (
                                            <div>
                                                <dl className="inputbox">
                                                    <dt className="inputbox-title">사용자</dt>
                                                    <dd className="inputbox-content">
                                                        {/* <Select
                                                            // value={UserWriteData.userinfo_email}
                                                            // defaultValue={UserWriteData.userinfo_email}
                                                            // cacheOptions
                                                            isClearable={true}
                                                            loadOptions={loadOptions}
                                                            defaultOptions
                                                            onChange={(e: any) => {
                                                                console.log(e);
                                                                handleSelectedName(e);
                                                            }}
                                                            closeMenuOnSelect={false}
                                                        /> */}

                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            value={UserWriteData.userinfo_email}
                                                            onChange={(value: any) => {
                                                                handleSelectedName(value);
                                                            }}
                                                            isClearable={true}
                                                            isSearchable={true}
                                                            options={InfoUserData}
                                                        ></Select>
                                                    </dd>
                                                </dl>
                                                <dl className="inputbox">
                                                    <dt className="inputbox-title">지급일</dt>
                                                    <dd className="inputbox-content">
                                                        <DatePicker
                                                            selected={UserWriteData.asset_distribute_date}
                                                            onChange={(date: any) =>
                                                                setUserWriteData({ ...UserWriteData, asset_distribute_date: date })
                                                            }
                                                            withPortal
                                                            locale={ko}
                                                            dateFormat="yyy-MM-dd"
                                                            minDate={UserWriteData.asset_purchase_date}
                                                        />
                                                        <span className="underline"></span>
                                                    </dd>
                                                </dl>
                                                <h4>라이선스 등록</h4>
                                                {/* <button onClick={settingChange}>설정변경</button> */}
                                                <div>
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
                                                </div>

                                                <div>
                                                    <div className="BigBoxContent">
                                                        <div className="BigBoxContentLeft">
                                                            <h4>선택 전</h4>
                                                            <div>
                                                                <ul>
                                                                    {LicenseSelectResult.map(list => {
                                                                        return (
                                                                            <li key={list.license_product_code}>
                                                                                <div>
                                                                                    {list.license_types}_{list.license_product_name}
                                                                                </div>
                                                                                <div
                                                                                    className="IconsClickPlus"
                                                                                    onClick={() => handleClicksLicense(list)}
                                                                                >
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
                                                                    {SelectedLicenseData.map(list => {
                                                                        return (
                                                                            <li key={list.license_product_code}>
                                                                                <div>
                                                                                    {list.license_types}_{list.license_product_name}
                                                                                </div>
                                                                                <div
                                                                                    className="IconsClickMinus"
                                                                                    onClick={() => handleClicksLicenseDelete(list)}
                                                                                >
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
                                        ) : (
                                            <div>
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            setUserWriteData({ ...UserWriteData, usercheck: !UserWriteData.usercheck })
                                                        }
                                                    >
                                                        유저추가
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="btns">
                                    <button className="btn btn-confirm" onClick={() => saveData()}>
                                        저장
                                    </button>
                                    <button className="btn btn-cancel" onClick={() => closeModal()}>
                                        취소
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </MainModalContent>
            </Modal>
        </div>
    );
};

export default NewAssetDataModal;
