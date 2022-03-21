import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { BsPencilSquare, BsFillCalendar2DateFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { GrDocumentUpload } from 'react-icons/gr';
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
        width: '800px',
        padding: '20px',
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
    return (
        <div>
            <Modal isOpen={SelectClicksModals} style={customStyles} contentLabel="데이터 입력 Modal">
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
            </Modal>
        </div>
    );
};

export default NewDataInsertMainPage;
