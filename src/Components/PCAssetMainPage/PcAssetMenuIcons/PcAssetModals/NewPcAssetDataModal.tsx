import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { MdCancel } from 'react-icons/md';
import Select from 'react-select/async';
import { PersonOption, CompanyOption } from '../../../LicenseMainPage/VolumeLicenseMainPage/DownloadMainPage/ModalMainPage/docs/data';
import { CompanyInfoGet, UserInfoGet, RandomCodeDataGet } from '../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import moment from 'moment';
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
import axios from 'axios';
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
            width: 50%;
            float: left;
            padding-right: 50px;
            border-right: 1px solid black;
        }
        .PCAssetFloatRight {
            width: 50%;
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
            width: 45%;
            height: 100%;
            border: 1px solid darkgray;
            float: left;
        }
        .BigBoxContentRight {
            width: 45%;
            height: 100%;
            border: 1px solid darkgray;
            float: right;
        }
    }
`;

Modal.setAppElement('#ModalMainDiv');

type NewAssetDataModalProps = {
    SelectClicksModals: { NewDataModal: boolean; ExcelDownloadModal: boolean; FilterSearch: boolean };
    setSelectClicksModals: (data: boolean) => void;
    SelectCompany: string;
};

const NewAssetDataModal = ({ SelectClicksModals, setSelectClicksModals, SelectCompany }: NewAssetDataModalProps) => {
    const [SearchSomething, setSearchSomething] = useState<string | null>('');
    const [ChooseAssetData, setChooseAssetData] = useState('데스크탑');
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
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
        usercheck: false,
        userinfo_email: '',
        asset_distribute_date: new Date(),
        company_code: '',
    });

    useEffect(() => {
        hadldeRandomCodeData();
    }, []);

    const [licenseSettingData, setLicenseSettingData] = useState([]);
    const [SelectedLicenseData, setSelectedLicenseData] = useState<any>([]);
    const [textText, setTextTest] = useState('');
    const [Q1, setQ1] = useState('');

    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);

    const dispatch = useDispatch();

    function closeModal() {
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
    const handleSelectedName = (e: any) => {
        setUserWriteData({ ...UserWriteData, userinfo_email: e.value });
    };
    useEffect(() => {
        getCompanyInfo();
        getUserInfo();
        getSettingData();
    }, [SelectCompany]);

    const settingChange = () => {
        var url = '/settingChange';
        var title = 'setting';

        var status = 'toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=900, height=500, top=50%,left=50%';
        window.open(url, title, status);
    };

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

    const getSettingData = async () => {
        try {
            const getSettingDatas = await axios.get(`${process.env.REACT_APP_API_URL}/Asset_app_server/license_settingData`, {
                params: {
                    id: 'sjyoo@dhk.co.kr',
                },
            });
            setLicenseSettingData(getSettingDatas.data.data);
            console.log(getSettingDatas);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const selectedLicensedatas: any = [];
        licenseSettingData.map((list: any, i) => {
            if (list.setting_title === Q1) {
                selectedLicensedatas.push({ key: list.license_code, label: list.name });
            }
        });
        setSelectedLicenseData(selectedLicensedatas);
    }, [Q1]);

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
            console.log(getRandomCodeData);
            if (getRandomCodeData.data.dataSuccess) {
                setUserWriteData({ ...UserWriteData, asset_management_number: getRandomCodeData.data.RandomCode });
            }
        } catch (error) {
            console.log(error);
        }
    };
    //저장시
    const saveData = async () => {
        if (UserWriteData.asset_management_number === '' || UserWriteData.company_code === '') {
            alert('공란을 작성해주세요.');
            return;
        } else if (UserWriteData.usercheck && UserWriteData.userinfo_email === '') {
            alert('사용자를 등록 해주세요.');
            return;
        }
        try {
            const ParamasData = {
                UserWriteData,
                SelectCompany,
                ChooseAssetData,
            };
            const SaveAssetData = await AssetAdd('/Asset_app_server/AssetAdd', ParamasData);
            if (SaveAssetData.data.dataSuccess) {
                if (UserWriteData.asset_division === '데스크탑') {
                    const ParamasDatas = {
                        types: '데스크탑',
                        SelectCompany,
                        FilteringData,
                        UserWriteData,
                    };
                    await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(ParamasDatas));
                } else if (UserWriteData.asset_division === '노트북') {
                    const ParamasDatas = {
                        types: '노트북',
                        SelectCompany,
                        FilteringData,
                    };
                    await dispatch(NoteBookAsset_getNoteBookAssetDataThunk(ParamasDatas));
                } else {
                    const ParamasDatas = {
                        types: '모니터',
                        SelectCompany,
                        FilteringData,
                    };
                    await dispatch(MonitorAsset_getMonitorAssetDataThunk(ParamasDatas));
                }

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
                    usercheck: false,
                    userinfo_email: '',
                    asset_distribute_date: new Date(),
                    company_code: '',
                });

                toast.show({ title: `자산 등록 완료.`, successCheck: true, duration: ToastTime });
            }
            console.log(UserWriteData);
        } catch (error) {
            console.log(error);
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
                                            <dl className="inputbox">
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
                                            </dl>

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
                                            <dl className="inputbox">
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
                                                            <option disabled>사용처 선택</option>
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
                                            </dl>
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
                                        </div>
                                    </div>
                                    <div className="PCAssetFloatRight">
                                        {/* 사용자 있을시 */}
                                        {UserWriteData.usercheck ? (
                                            <>
                                                <dl className="inputbox">
                                                    <dt className="inputbox-title">사용자</dt>
                                                    <dd className="inputbox-content">
                                                        <Select
                                                            // value={UserWriteData.user_used}
                                                            // cacheOptions
                                                            isClearable
                                                            loadOptions={loadOptions}
                                                            defaultOptions
                                                            onChange={(e: any) => handleSelectedName(e)}
                                                        />
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
                                                <button onClick={settingChange}>설정변경</button>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="경영지원"
                                                        name="setting"
                                                        value="경영지원"
                                                        checked={Q1 === '경영지원' ? true : false}
                                                        onChange={e => setQ1(e.target.value)}
                                                    ></input>
                                                    <label htmlFor="경영지원">경영지원</label>
                                                    <input
                                                        type="radio"
                                                        id="영업"
                                                        name="setting"
                                                        value="영업"
                                                        checked={Q1 === '영업' ? true : false}
                                                        onChange={e => setQ1(e.target.value)}
                                                    ></input>
                                                    <label htmlFor="영업">영업</label>
                                                </div>

                                                <div>
                                                    <div className="BigBoxContent">
                                                        <div className="BigBoxContentLeft">
                                                            <h4>선택 전</h4>
                                                        </div>
                                                        <div className="BigBoxContentRight">
                                                            <h4>선택 후</h4>
                                                            <div>
                                                                {SelectedLicenseData.map((list: any) => {
                                                                    return <div>{list.label}</div>;
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            setUserWriteData({ ...UserWriteData, usercheck: !UserWriteData.usercheck })
                                                        }
                                                    >
                                                        유저추가
                                                    </button>
                                                </div>
                                            </>
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
