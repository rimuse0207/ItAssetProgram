import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { BsPencilSquare, BsFillCalendar2DateFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { GrDocumentUpload } from 'react-icons/gr';
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
    .lincenseValidityCheck {
        :hover {
            cursor: pointer;
        }
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

Modal.setAppElement('#ModalMainDiv');

type NewDataInsertMainPageProps = {
    setSelectClicksModals: (data: boolean) => void;
    SelectClicksModals: boolean;
};

const NewDataInsertMainPage = ({ setSelectClicksModals, SelectClicksModals }: NewDataInsertMainPageProps) => {
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
            {/* <Modal isOpen={SelectClicksModals} style={customStyles} contentLabel="데이터 입력 Modal">
                <ModalMainDivBox>
                    <div style={{ textAlign: 'end' }}>
                        <button className="ModalCloseButton" onClick={closeModal}>
                            <MdCancel></MdCancel>
                        </button>
                    </div>
                    <h2>License 추가</h2>
                    <div>
                        <div style={{ padding: '20px' }}>
                            <div>
                                <p>
                                    <input type="text" id="license_Code" autoComplete="off" required />
                                    <label htmlFor="license_Code">
                                        <span>라이선스 코드(ex. DHKS_Volume_MS001)</span>
                                    </label>
                                    <div className="InputSpanIcons">
                                        <BsPencilSquare></BsPencilSquare>
                                    </div>
                                </p>
                            </div>
                            <p>
                                <input type="text" id="license_Name" autoComplete="off" required />
                                <label htmlFor="license_Name">
                                    <span>라이선스 이름(ex. Windows Office 2013)</span>
                                </label>
                                <div className="InputSpanIcons">
                                    <BsPencilSquare></BsPencilSquare>
                                </div>
                            </p>
                            <p>
                                <input type="text" id="license_explain" autoComplete="off" required />
                                <label htmlFor="license_explain">
                                    <span>라이선스 설명(ex. Window Office 제품키)</span>
                                </label>
                                <div className="InputSpanIcons">
                                    <BsPencilSquare></BsPencilSquare>
                                </div>
                            </p>
                            <p className="DateMainDivBox">
                                <input type="date" id="license_explain" autoComplete="off" value="2018-07-22" />
                                <label htmlFor="license_explain">
                                    <span>구매 날짜(ex. YYYY-MM-DD)</span>
                                </label>
                                <div className="InputSpanIcons">
                                    <BsFillCalendar2DateFill></BsFillCalendar2DateFill>
                                </div>
                            </p>
                            <div onClick={() => setlicenseValidity(!licenseValidity)} className="lincenseValidityCheck">
                                <span>유효날짜 없음 체크</span>
                                {licenseValidity ? <MdCheckBox></MdCheckBox> : <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank>}
                            </div>
                            <p className="DateMainDivBox">
                                <input type="date" id="license_FinishDate" autoComplete="off" value="2018-07-22" />
                                <label htmlFor="license_FinishDate">
                                    <span>유효 날짜(ex. YYYY-MM-DD)</span>
                                </label>
                                <div className="InputSpanIcons">
                                    <BsFillCalendar2DateFill></BsFillCalendar2DateFill>
                                </div>
                            </p>

                            <p>
                                <input type="number" id="license_Permit" autoComplete="off" required />
                                <label htmlFor="license_Permit">
                                    <span>라이선스 허용인원</span>
                                </label>
                                <div className="InputSpanIcons">
                                    <BsPencilSquare></BsPencilSquare>
                                </div>
                            </p>

                            <p>
                                <input type="text" id="license_KeyUpload" autoComplete="off" required />
                                <label htmlFor="license_KeyUpload">
                                    <span>라이선스 증명 자료</span>
                                </label>
                                <div className="InputSpanIcons">
                                    <GrDocumentUpload></GrDocumentUpload>
                                </div>
                            </p>

                            <div>
                                <button>저장</button>
                                <button>취소</button>
                            </div>
                        </div>
                    </div>
                </ModalMainDivBox>
            </Modal> */}
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

export default NewDataInsertMainPage;
