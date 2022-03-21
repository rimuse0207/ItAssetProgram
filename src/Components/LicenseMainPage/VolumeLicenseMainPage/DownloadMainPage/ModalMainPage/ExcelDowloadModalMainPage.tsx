import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
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
        width: 50%;
        height: 50px;
    } /* 기본세팅 */
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
    },
};

Modal.setAppElement('#ModalMainDiv');

type ExcelDowloadModalMainPageProps = {
    setSelectClicksModals: (data: boolean) => void;
    SelectClicksModals: boolean;
};

const ExcelDowloadModalMainPage = ({ setSelectClicksModals, SelectClicksModals }: ExcelDowloadModalMainPageProps) => {
    function closeModal() {
        setSelectClicksModals(false);
    }

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
                        <div>
                            <p>
                                <input type="text" id="license_Code" autoComplete="off" required />
                                <label htmlFor="license_Code">
                                    <span>라이선스 코드</span>
                                </label>
                            </p>
                            <p>
                                <input type="text" id="license_Name" autoComplete="off" required />
                                <label htmlFor="license_Name">
                                    <span>라이선스 이름</span>
                                </label>
                            </p>
                            <p>
                                <input type="text" id="license_explain" autoComplete="off" required />
                                <label htmlFor="license_explain">
                                    <span>라이선스 설명</span>
                                </label>
                            </p>
                            <p>
                                <input type="text" id="license_PurchaseDate" autoComplete="off" required />
                                <label htmlFor="license_PurchaseDate">
                                    <span>라이선스 구매날짜</span>
                                </label>
                            </p>
                            <p>
                                <input type="text" id="license_FinishDate" autoComplete="off" required />
                                <label htmlFor="license_FinishDate">
                                    <span>라이선스 유효날짜</span>
                                </label>
                            </p>
                            <p>
                                <input type="text" id="license_KeyUpload" autoComplete="off" required />
                                <label htmlFor="license_KeyUpload">
                                    <span>라이선스 증명 자료</span>
                                </label>
                            </p>
                            <p>
                                <input type="number" id="license_Permit" autoComplete="off" required />
                                <label htmlFor="license_Permit">
                                    <span>라이선스 허용인원</span>
                                </label>
                            </p>
                        </div>
                    </div>
                </ModalMainDivBox>
            </Modal>
        </div>
    );
};

export default ExcelDowloadModalMainPage;
