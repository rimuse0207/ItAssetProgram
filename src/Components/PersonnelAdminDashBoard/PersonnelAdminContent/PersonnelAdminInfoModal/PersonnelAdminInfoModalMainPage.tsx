import React from 'react';
import Modal from 'react-modal';
import PersonalMainPage from '../../../PersonalMainPage/PersonalMainPage';
import { PesonnelInfoTypes } from '../PersonnelAdminInsertContent';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';

const PersonnelModalMainDivBox = styled.div`
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

type PersonnelAdminInfoModalMainPageProps = {
    InfoModalOpen: boolean;
    setInfoModalOpen: () => void;
    CilcksData: PesonnelInfoTypes | null;
};

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

const PersonnelAdminInfoModalMainPage = ({ InfoModalOpen, setInfoModalOpen, CilcksData }: PersonnelAdminInfoModalMainPageProps) => {
    return (
        <Modal isOpen={InfoModalOpen} style={customStyles} contentLabel="데이터 입력 Modal">
            <PersonnelModalMainDivBox>
                <div style={{ textAlign: 'end' }}>
                    <button className="ModalCloseButton" onClick={() => setInfoModalOpen()}>
                        <MdCancel></MdCancel>
                    </button>
                </div>
                <PersonalMainPage names={CilcksData?.email ? CilcksData.email : null}></PersonalMainPage>
            </PersonnelModalMainDivBox>
        </Modal>
    );
};

export default PersonnelAdminInfoModalMainPage;
