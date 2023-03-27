import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { request } from '../../../../Apis/core';
import axios from 'axios';

const SoftwareInstallModalMainDivBox = styled.div`
    overflow: auto;
    .Content_Title {
        input {
            width: 100%;
            height: 50px;
            padding-left: 20px;
            border: 1px solid lightgray;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            font-size: 1.3em;
            font-weight: bolder;
        }
    }
    .Content_Files {
        margin-top: 30px;
        margin-bottom: 20px;
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
        width: '70%',
        padding: '20px',
        maxHeight: '90%',
        overflow: 'auto',
    },
};

Modal.setAppElement('#ModalMainDiv');

type SoftwareInstallModalPropsTypes = {
    ModalIsOpen: boolean;
    setModalIsOpen: (data: boolean) => void;
};

const SoftwareInstallModal = ({ ModalIsOpen, setModalIsOpen }: SoftwareInstallModalPropsTypes) => {
    const editorRef = useRef<any>(null);
    const [Title, setTitle] = useState('');
    const [FileData, setFileData] = useState<null | File>(null);

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };
    const onUploadImage = async (blob: File | Blob, callback: any) => {
        console.log(blob);
        const url = await uploadImage(blob);
        callback(`${process.env.REACT_APP_API_URL}/license/${url}`, `${'image'}`);
        return false;
    };
    const uploadImage = async (data: File | Blob) => {
        console.log('ADADA', data);
        const Images_Data = new FormData();
        Images_Data.append('image', data);

        // const Image_Data_Sending_Axios = await request.post(`/license_app_server/Software_Image_Upload`, { Images_Data });

        const a = await axios({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            url: '/license_app_server/Software_Image_Upload',
            method: 'POST',
            data: Images_Data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log(response);
                return response.data.filename;
            })
            .catch(error => {
                console.error(error);
            });
        return a;
    };

    const handleChange = (e: any) => {
        console.log(e.target.files[0]);
    };

    const handleUpload = (e: any) => {
        console.log(e.target.files[0]);
        setFileData(e.target.files[0]);
    };

    return (
        <div>
            <Modal isOpen={ModalIsOpen} style={customStyles} contentLabel="데이터 입력 Modal">
                <SoftwareInstallModalMainDivBox>
                    <button onClick={() => setModalIsOpen(false)}>close</button>
                    <div className="Content_Title">
                        <input
                            type="text"
                            placeholder="제목을 입력하세요..."
                            value={Title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className="Content_Files">
                        <div>
                            <input type="file" onChange={e => handleUpload(e)}></input>
                        </div>
                        <div>1. {FileData?.name}</div>
                    </div>
                    <Editor
                        ref={editorRef}
                        initialValue=""
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={false}
                        plugins={[colorSyntax]}
                        language="ko-KR"
                        onChange={onChange}
                        hooks={{
                            addImageBlobHook: onUploadImage,
                        }}
                    />
                </SoftwareInstallModalMainDivBox>
            </Modal>
        </div>
    );
};

export default SoftwareInstallModal;
