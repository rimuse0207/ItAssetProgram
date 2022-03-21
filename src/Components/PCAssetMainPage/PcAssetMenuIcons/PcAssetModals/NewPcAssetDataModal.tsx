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

const MainModalContent = styled.div`
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
        max-width: 900px;
        margin: 0 auto 60px;
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
                padding: 15px 0 28px 200px;
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
`;

Modal.setAppElement('#ModalMainDiv');

type NewAssetDataModalProps = {
    SelectClicksModals: { NewDataModal: boolean; ExcelDownloadModal: boolean; FilterSearch: boolean };
    setSelectClicksModals: (data: boolean) => void;
    SelectCompany: string;
};

const NewAssetDataModal = ({ SelectClicksModals, setSelectClicksModals, SelectCompany }: NewAssetDataModalProps) => {
    const [SearchSomething, setSearchSomething] = useState<string | null>('');
    const [ChooseAssetData, setChooseAssetData] = useState('desktop');
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
    const [CompanyInfoData, setCompanyInfoData] = useState<CompanyOption[]>([]);
    const [UserWriteData, setUserWriteData] = useState({
        code: '',
        explain: '',
        purchase_date: moment().format('YYYY-MM-DD'),
        place: '',
        user_used: null,
    });
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
        setUserWriteData({ ...UserWriteData, user_used: e.value });
    };
    useEffect(() => {
        getCompanyInfo();
        getUserInfo();
    }, [SelectCompany]);

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

    const hadldeRandomCodeData = async () => {
        try {
            const ParamasData = {
                Chooseed: 'asset',
                SelectCompany,
                ChooseAssetData,
                SelectDate: UserWriteData.purchase_date,
            };
            const getRandomCodeData = await RandomCodeDataGet('/Asset_app_server/RandCodeData', ParamasData);
            console.log(getRandomCodeData);
            if (getRandomCodeData.data.dataSuccess) {
                setUserWriteData({ ...UserWriteData, code: getRandomCodeData.data.RandomCode });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveData = async () => {
        if (UserWriteData.code === '' || UserWriteData.purchase_date === '' || UserWriteData.place === '') {
            alert('공란을 작성해주세요.');
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
                if (ChooseAssetData === 'desktop') {
                    const ParamasDatas = {
                        types: 'desktop',
                        SelectCompany,
                        FilteringData,
                    };
                    await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(ParamasDatas));
                } else if (ChooseAssetData === 'notebook') {
                    const ParamasDatas = {
                        types: 'notebook',
                        SelectCompany,
                        FilteringData,
                    };
                    await dispatch(NoteBookAsset_getNoteBookAssetDataThunk(ParamasDatas));
                } else {
                    const ParamasDatas = {
                        types: 'monitor',
                        SelectCompany,
                        FilteringData,
                    };
                    await dispatch(MonitorAsset_getMonitorAssetDataThunk(ParamasDatas));
                }
                setUserWriteData({
                    code: '',
                    explain: UserWriteData.explain,
                    purchase_date: UserWriteData.purchase_date,
                    place: UserWriteData.place,
                    user_used: null,
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
                                <h2>
                                    PC 자산 추가
                                    <span>
                                        <select value={ChooseAssetData} onChange={e => setChooseAssetData(e.target.value)}>
                                            <option value="desktop">데스크탑</option>
                                            <option value="notebook">노트북</option>
                                            <option value="monitor">모니터</option>
                                        </select>
                                    </span>
                                </h2>
                                <div className="input-content-wrap">
                                    <dl className="inputbox">
                                        <dt className="inputbox-title">{ChooseAssetData} 구매날짜</dt>
                                        <dd className="inputbox-content">
                                            <input
                                                id="input2"
                                                type="date"
                                                value={UserWriteData.purchase_date}
                                                onChange={e => setUserWriteData({ ...UserWriteData, purchase_date: e.target.value })}
                                                required
                                            />
                                            <span className="underline"></span>
                                        </dd>
                                    </dl>
                                    <dl className="inputbox">
                                        <dt className="inputbox-title">{ChooseAssetData} Code</dt>
                                        <dd className="inputbox-content">
                                            <input
                                                id="input0"
                                                type="text"
                                                value={UserWriteData.code}
                                                onChange={e => setUserWriteData({ ...UserWriteData, code: e.target.value })}
                                                required
                                            />
                                            <label htmlFor="input0">
                                                {SelectCompany}_{moment(UserWriteData.purchase_date).format('YYYYMMDD')}_
                                                {ChooseAssetData.slice(0, 1).toUpperCase()}01
                                            </label>
                                            <span className="underline"></span>
                                            <div className="RandomButtonIcons" onClick={hadldeRandomCodeData}>
                                                <GiPerspectiveDiceSixFacesRandom></GiPerspectiveDiceSixFacesRandom>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl className="inputbox">
                                        <dt className="inputbox-title">{ChooseAssetData} 설명</dt>
                                        <dd className="inputbox-content">
                                            <textarea
                                                id="input1"
                                                value={UserWriteData.explain}
                                                onChange={e => setUserWriteData({ ...UserWriteData, explain: e.target.value })}
                                                placeholder="삼성 CPU OO RAM OO 등등.."
                                            />
                                        </dd>
                                    </dl>

                                    <dl className="inputbox">
                                        <dt className="inputbox-title">{ChooseAssetData} 사용처</dt>
                                        <dd className="inputbox-content">
                                            <div className="selectBox">
                                                <select
                                                    className="select"
                                                    onChange={e => setUserWriteData({ ...UserWriteData, place: e.target.value })}
                                                >
                                                    <option disabled selected>
                                                        사용처 선택
                                                    </option>
                                                    {CompanyInfoData.map((list, i) => {
                                                        return <option value={list.value}>{list.label}</option>;
                                                    })}
                                                </select>
                                                <span className="icoArrow"></span>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl className="inputbox">
                                        <dt className="inputbox-title">{ChooseAssetData} 사용자</dt>
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
                                    <div className="btns">
                                        <button className="btn btn-confirm" onClick={() => saveData()}>
                                            저장
                                        </button>
                                        <button className="btn btn-cancel" onClick={() => closeModal()}>
                                            취소
                                        </button>
                                    </div>
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
