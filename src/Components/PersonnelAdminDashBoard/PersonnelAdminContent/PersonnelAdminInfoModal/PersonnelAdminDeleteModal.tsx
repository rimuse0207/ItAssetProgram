import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { PesonnelInfoTypes } from '../PersonnelAdminInsertContent';
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
        backgroundColor: '#efefef',
    },
};

const PersonnelAdminDeleteModalMainDivBox = styled.div`
    border: 1px solid black;
    .ModalCloseButton {
        border: none;
        font-size: 1.1em;
        background: none;
        color: red;
        :hover {
            cursor: pointer;
        }
    }
`;

type PersonnelAdminDeleteModalProps = {
    DeleteModalOpen: boolean;
    setDeleteModalOpen: () => void;
    CilcksData: PesonnelInfoTypes | null;
};

const PersonnelAdminDeleteModal = ({ DeleteModalOpen, setDeleteModalOpen, CilcksData }: PersonnelAdminDeleteModalProps) => {
    console.log(CilcksData);
    return (
        <Modal isOpen={DeleteModalOpen} style={customStyles} contentLabel="데이터 입력 Modal">
            <PersonnelAdminDeleteModalMainDivBox>
                <div style={{ textAlign: 'end' }}>
                    <button className="ModalCloseButton" onClick={() => setDeleteModalOpen()}>
                        <MdCancel></MdCancel>
                    </button>
                    <div>
                        <h2>{}</h2>
                    </div>
                </div>
            </PersonnelAdminDeleteModalMainDivBox>
        </Modal>
    );
};

export default PersonnelAdminDeleteModal;
