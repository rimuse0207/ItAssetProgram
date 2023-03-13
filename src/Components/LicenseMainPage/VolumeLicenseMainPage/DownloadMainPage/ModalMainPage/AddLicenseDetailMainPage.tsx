import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { MainModalContent } from '../../../../PCAssetMainPage/PcAssetMenuIcons/PcAssetModals/NewPcAssetDataModal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import moment from 'moment';
import { PersonOption } from './docs/data';
import { ObjectNameSortData } from '../../../../../PublicFunc/ObjectNameSort';
import { UserInfoGet } from '../../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { toast } from '../../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../../Configs/ToastTimerConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../Models';
import { License_getLicenseDataThunk } from '../../../../../Models/LicenseDataReduxThunk/LicenseDataThunks';
import { LicenseDataType } from '../../VolumeLicenseDataTypes';

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

const TableMainDivBox = styled.div`
    .upload-file-wrapper {
        border: 1px dashed rgba(0, 0, 0, 0.2);
        width: '600px';
        color: 'black';
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .upload-file-wrapper p {
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 0;
    }
    .browse-btn {
        width: 150px;
        line-height: 50px;
        text-align: center;
        color: rgb(6, 140, 218);
        background-color: rgb(6, 140, 218, 0.3);
        border: 0;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        margin-left: auto;
        display: inline-block;
        font-family: Arial, Helvetica, sans-serif;
    }
    .remove-btn {
        border: 0px;
        background: none;
    }
    .browse-btn input[type='file'] {
        display: none;
    }
    .file-drop {
        width: 100%;
    }
    .file-drop-target {
        display: flex;
    }
    .drop-file-detail {
        display: flex;
        justify-content: space-between;
    }
    .drop-file-detail p {
        font-size: 14px;
        color: #cdcdcd;
    }

    .import-file-wrapper {
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: '600px';
        color: 'black';
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.05);
    }
    .import-file-wrapper p {
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 0;
    }
    .import-btn {
        font-family: Arial, Helvetica, sans-serif;
        width: 150px;
        line-height: 50px;
        text-align: center;
        background-color: rgb(6, 140, 218);
        color: #fff;
        border: 0;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        margin-left: auto;
        display: inline-block;
    }
    .import-btn input[type='file'] {
        display: none;
    }
    .import-drop {
        width: 100%;
    }
    .filimporte-drop-target {
        display: flex;
    }
    .import-file-detail {
        display: flex;
        justify-content: space-between;
    }
    .import-file-detail p {
        font-size: 14px;
        color: #cdcdcd;
    }
`;

const UploadedFileDataUlBox = styled.ul`
    border: 1px solid black;
    li {
        padding: 10px;
        border: 1px dashed gray;
        display: inline-block;
        .UploadedContainerDiv {
            display: flex;
            justify-content: center;
            div {
                margin-left: 10px;
                margin-right: 10px;
                svg {
                    font-size: 1.2em;
                    :hover {
                        cursor: pointer;
                        color: red;
                    }
                }
            }
        }
    }
`;

const DetailLicneseSelectUserInfoMainDivBox = styled.div`
    .FloatMainDivBox {
        height: 500px;
        min-width: 500px;
        .FloatLeftDivBox {
            font-size: 0.8em;
            border: 0.5px solid gray;
            width: 48%;
            height: 100%;
            min-width: 200px;
            float: left;
            overflow: auto;
            padding: 5px;
        }
        .FloatRightDivBox {
            font-size: 0.8em;
            border: 0.5px solid gray;
            width: 48%;
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

Modal.setAppElement('#ModalMainDiv');

type NewDataInsertMainPageProps = {
    setSelectClicksModals: (data: boolean) => void;
    SelectClicksModals: boolean;
    DetailLicenseClicksData: LicenseDataType | null;
    SelectCompany: string;
    type: string;
    SortTable: any;
    GetInfoLicensData: () => void;
};
type selectUserInfoDataType = {
    name: string;
    email: string;
    team: string;
    asset_division: string;
    asset_management_number: string;
};

const AddLicenseDetailMainPage = ({
    setSelectClicksModals,
    SelectClicksModals,
    DetailLicenseClicksData,
    SelectCompany,
    type,
    SortTable,
    GetInfoLicensData,
}: NewDataInsertMainPageProps) => {
    function closeModal() {
        setSelectClicksModals(false);
    }
    const dispatch = useDispatch();
    const LicenseFilteringData = useSelector((state: RootState) => state.LicenseFilteringData);
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [DetailLicenseInputData, setDetailLicenseInputData] = useState({
        license_product_code: DetailLicenseClicksData?.basic_License.asset_license_list_info_code,
        license_product_name: DetailLicenseClicksData?.basic_License.asset_license_list_info_name,
        license_purchase_date: new Date(),
        license_purchase_finish_date: new Date(),
        license_purchase_company: '',
        license_permit_count: 0,
        license_purchase_pride: 0,
        license_newcode: '',
        ID: LoginInfoData.email,
        license_notepad: '',
    });

    const saveData = async () => {
        if (DetailLicenseInputData.license_permit_count === 0) {
            alert('허용 가능한 인원을 작성 부탁드립니다.');
        }
        try {
            const AddLicenseData = await axios.post(`${process.env.REACT_APP_API_URL}/license_app_server/license_detail_data`, {
                DetailLicenseInputData,
            });
            if (AddLicenseData.data.dataSuccess) {
                const ParamasData = {
                    company: SelectCompany,
                    license: type,
                    SortTable: LicenseFilteringData,
                };
                dispatch(License_getLicenseDataThunk(ParamasData));
                setDetailLicenseInputData({
                    license_product_code: DetailLicenseClicksData?.basic_License.asset_license_list_info_code,
                    license_product_name: DetailLicenseClicksData?.basic_License.asset_license_list_info_name,
                    license_purchase_date: new Date(),
                    license_purchase_finish_date: new Date(),
                    license_purchase_company: '',
                    license_permit_count: 0,
                    license_purchase_pride: 0,
                    license_newcode: '',
                    ID: LoginInfoData.email,
                    license_notepad: '',
                });
                GetInfoLicensData();
                toast.show({
                    title: `라이선스 수량 등록 완료.`,
                    successCheck: true,
                    duration: ToastTime,
                });

                closeModal();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal isOpen={SelectClicksModals} style={customStyles} contentLabel="데이터 입력 Modal">
                <MainModalContent>
                    <div style={{ textAlign: 'end' }}>
                        <button className="ModalCloseButton" onClick={closeModal}>
                            <MdCancel></MdCancel>
                        </button>
                    </div>

                    <div>
                        <div id="wrap" className="input">
                            <section className="input-content">
                                <h2>구매 이력 추가</h2>

                                <div className="PCAssetFloatContainer">
                                    <div className="PCAssetFloatLeft" style={{ width: '70%' }}>
                                        <div className="input-content-wrap">
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">라이선스 이름</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input0"
                                                        type="text"
                                                        value={DetailLicenseInputData.license_product_name}
                                                        readOnly
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    구매날짜<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <DatePicker
                                                        selected={DetailLicenseInputData.license_purchase_date}
                                                        onChange={(date: any) =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_purchase_date: date,
                                                            })
                                                        }
                                                        maxDate={new Date()}
                                                        locale={ko}
                                                        dateFormat="yyyy-MM-dd"
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    만료 날짜<span style={{ color: 'red' }}>*</span>
                                                </dt>

                                                <dd className="inputbox-content">
                                                    <DatePicker
                                                        selected={DetailLicenseInputData.license_purchase_finish_date}
                                                        onChange={(date: any) =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_purchase_finish_date: date,
                                                            })
                                                        }
                                                        locale={ko}
                                                        dateFormat="yyyy-MM-dd"
                                                        minDate={DetailLicenseInputData.license_purchase_date}
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>

                                            <dl className="inputbox">
                                                <dt className="inputbox-title">구매 업체</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input7"
                                                        value={DetailLicenseInputData.license_purchase_company}
                                                        onChange={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_purchase_company: e.target.value,
                                                            })
                                                        }
                                                        placeholder="라이선스 구매 업체"
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    등록 허용수<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input3"
                                                        type="number"
                                                        value={DetailLicenseInputData.license_permit_count}
                                                        onChange={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_permit_count:
                                                                    DetailLicenseInputData.license_permit_count + Number(e.target.value) <=
                                                                    0
                                                                        ? 0
                                                                        : Number(e.target.value),
                                                            })
                                                        }
                                                        placeholder="DM500S3B/B71"
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">구매 가격</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input3"
                                                        type="number"
                                                        value={DetailLicenseInputData.license_purchase_pride}
                                                        onChange={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_purchase_pride: Number(e.target.value),
                                                            })
                                                        }
                                                        placeholder="DM500S3B/B71"
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">자산코드</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input10"
                                                        value={DetailLicenseInputData.license_newcode}
                                                        onChange={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_newcode: e.target.value,
                                                            })
                                                        }
                                                        placeholder="ERP상의 자산코드 등등.."
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">메모</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input10"
                                                        value={DetailLicenseInputData.license_notepad}
                                                        onChange={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_notepad: e.target.value,
                                                            })
                                                        }
                                                        placeholder="메모 등등.."
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                        </div>
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

export default AddLicenseDetailMainPage;
