import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { LicenseDataType } from '../../VolumeLicenseDataTypes';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { MainModalContent } from '../../../../PCAssetMainPage/PcAssetMenuIcons/PcAssetModals/NewPcAssetDataModal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
registerLocale('ko', ko);
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
    DetailLicenseClicksData: any;
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

const AddLicenseDetailMainPage = ({
    setSelectClicksModals,
    SelectClicksModals,
    DetailLicenseClicksData,
    SelectCompany,
    type,
    SortTable,
}: NewDataInsertMainPageProps) => {
    console.log(DetailLicenseClicksData);
    function closeModal() {
        setSelectClicksModals(false);
    }
    const [startDate, setStartDate] = useState(new Date());
    const [licenseValidity, setlicenseValidity] = useState(false);
    const [LicenseInputData, setLicenseInputData] = useState({
        license_purchase_date: new Date(),
        license_purchase_finish_date: new Date(),
        license_purchase_company: '',
        license_permit_count: 0,
        license_purchase_pride: 0,
        license_prove_code: '',
        license_newcode: '',
    });
    const saveData = () => {};

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
                                <h2>PC 자산 추가</h2>

                                <div className="PCAssetFloatContainer">
                                    <div className="PCAssetFloatLeft">
                                        <div className="input-content-wrap">
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    관리번호<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <input id="input0" type="text" required />

                                                    <span className="underline"></span>
                                                    {/* <div className="RandomButtonIcons">
                                                        <GiPerspectiveDiceSixFacesRandom></GiPerspectiveDiceSixFacesRandom>
                                                    </div> */}
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    구매날짜<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <DatePicker
                                                        selected={LicenseInputData.license_purchase_date}
                                                        onChange={(date: any) =>
                                                            setLicenseInputData({ ...LicenseInputData, license_purchase_date: date })
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
                                                    만료 날짜<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <DatePicker
                                                        selected={LicenseInputData.license_purchase_finish_date}
                                                        onChange={(date: any) =>
                                                            setLicenseInputData({ ...LicenseInputData, license_purchase_finish_date: date })
                                                        }
                                                        withPortal
                                                        locale={ko}
                                                        dateFormat="yyy-MM-dd"
                                                        minDate={LicenseInputData.license_purchase_date}
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
                                                        {/* <select
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
                                                        </select> */}
                                                        <span className="icoArrow"></span>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">구분</dt>
                                                <dd className="inputbox-content">
                                                    <div className="selectBox">
                                                        {/* <select
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
                                                        </select> */}
                                                        <span className="icoArrow"></span>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">구매 업체</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input7"
                                                        value={LicenseInputData.license_purchase_company}
                                                        onChange={e =>
                                                            setLicenseInputData({
                                                                ...LicenseInputData,
                                                                license_purchase_company: e.target.value,
                                                            })
                                                        }
                                                        placeholder=""
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">라이선스 허용수</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input3"
                                                        type="number"
                                                        value={LicenseInputData.license_permit_count}
                                                        onChange={e =>
                                                            setLicenseInputData({
                                                                ...LicenseInputData,
                                                                license_permit_count: Number(e.target.value),
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
                                                        value={LicenseInputData.license_purchase_pride}
                                                        onChange={e =>
                                                            setLicenseInputData({
                                                                ...LicenseInputData,
                                                                license_purchase_pride: Number(e.target.value),
                                                            })
                                                        }
                                                        placeholder="DM500S3B/B71"
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">증빙 등록</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input4"
                                                        value={LicenseInputData.license_prove_code}
                                                        onChange={e =>
                                                            setLicenseInputData({ ...LicenseInputData, license_prove_code: e.target.value })
                                                        }
                                                        placeholder="i7-1165G7(2.8GHz) ..."
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>

                                            <dl className="inputbox">
                                                <dt className="inputbox-title">자산코드</dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input10"
                                                        value={LicenseInputData.license_newcode}
                                                        onChange={e =>
                                                            setLicenseInputData({ ...LicenseInputData, license_newcode: e.target.value })
                                                        }
                                                        placeholder="G10039 등등.."
                                                    />
                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="PCAssetFloatRight">
                                        사용자 있을시
                                        {/* {UserWriteData.usercheck ? (
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
                                        )} */}
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
