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
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { AddDetailLicenseData } from '../../../../../Apis/core/api/AuthNeedApi/LicenseApi';
import { FileDrop } from 'react-file-drop';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';
import moment from 'moment';
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
    function closeModal() {
        setSelectClicksModals(false);
    }

    const [DetailLicenseInputData, setDetailLicenseInputData] = useState({
        license_product_code: DetailLicenseClicksData.license_product_code,
        license_product_name: DetailLicenseClicksData.license_product_name,
        license_purchase_date: new Date(),
        license_purchase_finish_date: new Date(),
        license_purchase_company: '',
        license_permit_count: 0,
        license_purchase_pride: 0,
        license_prove_code: {
            nothing: true,
            URL: false,
            URL_Address: '',
            Files: false,
        },
        license_newcode: '',
    });
    const [file, setFile] = useState<any>([]);
    const saveData = async () => {
        try {
            const formData = new FormData();
            file.map((list: any, i: number) => {
                formData.append(`file`, list);
            });
            formData.append('license_product_code', String(DetailLicenseInputData.license_product_code));
            formData.append('license_product_name', String(DetailLicenseInputData.license_product_name));
            formData.append('license_purchase_date', String(moment(DetailLicenseInputData.license_purchase_date).format('YYYY-MM-DD')));
            formData.append(
                'license_purchase_finish_date',
                String(moment(DetailLicenseInputData.license_purchase_finish_date).format('YYYY-MM-DD'))
            );
            formData.append('license_purchase_company', String(DetailLicenseInputData.license_purchase_company));
            formData.append('license_permit_count', String(DetailLicenseInputData.license_permit_count));
            formData.append('license_purchase_pride', String(DetailLicenseInputData.license_purchase_pride));
            formData.append('license_newcode', String(DetailLicenseInputData.license_newcode));
            formData.append('license_prove_code_URL', String(DetailLicenseInputData.license_prove_code.URL));
            formData.append('license_prove_code_URL_Address', String(DetailLicenseInputData.license_prove_code.URL_Address));
            formData.append('license_prove_code_Files', String(DetailLicenseInputData.license_prove_code.Files));
            formData.append('license_prove_code_nothing', String(DetailLicenseInputData.license_prove_code.nothing));
            formData.append('license_types', String(type));
            formData.append('SelectCompany', String(SelectCompany));

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const AddLicenseData = await axios.post(
                `${process.env.REACT_APP_API_URL}/license_app_server/license_detail_data`,

                formData,

                config
            );
            if (AddLicenseData.data.dataSuccess) {
                alert('성공');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handle = (files: any) => {
        let arr = Object.values(files);
        const dd = file.concat(arr);
        setFile(dd);
    };

    useEffect(() => {
        console.log(file);
    }, [file]);

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
                                                        selected={DetailLicenseInputData.license_purchase_finish_date}
                                                        onChange={(date: any) =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_purchase_finish_date: date,
                                                            })
                                                        }
                                                        withPortal
                                                        locale={ko}
                                                        dateFormat="yyy-MM-dd"
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
                                                        placeholder="라이선스 구매 업체를 작성 부탁드립니다."
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    라이선스 허용수<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input3"
                                                        type="number"
                                                        value={DetailLicenseInputData.license_permit_count}
                                                        onChange={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
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
                                                <dt className="inputbox-title">증빙 등록</dt>
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <div
                                                        style={{ marginRight: '30px' }}
                                                        onClick={e => {
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_prove_code: {
                                                                    ...DetailLicenseInputData.license_prove_code,
                                                                    URL: false,
                                                                    Files: false,
                                                                    nothing: true,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        <span>
                                                            {DetailLicenseInputData.license_prove_code.nothing ? (
                                                                <GrCheckboxSelected></GrCheckboxSelected>
                                                            ) : (
                                                                <GrCheckbox></GrCheckbox>
                                                            )}
                                                        </span>
                                                        <span>없음</span>
                                                    </div>
                                                    <div
                                                        style={{ marginRight: '30px' }}
                                                        onClick={e => {
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_prove_code: {
                                                                    ...DetailLicenseInputData.license_prove_code,
                                                                    URL: true,
                                                                    Files: false,
                                                                    nothing: false,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        <span>
                                                            {DetailLicenseInputData.license_prove_code.URL ? (
                                                                <GrCheckboxSelected></GrCheckboxSelected>
                                                            ) : (
                                                                <GrCheckbox></GrCheckbox>
                                                            )}
                                                        </span>
                                                        <span>URL</span>
                                                    </div>
                                                    <div
                                                        onClick={e =>
                                                            setDetailLicenseInputData({
                                                                ...DetailLicenseInputData,
                                                                license_prove_code: {
                                                                    ...DetailLicenseInputData.license_prove_code,
                                                                    URL: false,
                                                                    Files: true,
                                                                    nothing: false,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <span>
                                                            {DetailLicenseInputData.license_prove_code.Files ? (
                                                                <GrCheckboxSelected></GrCheckboxSelected>
                                                            ) : (
                                                                <GrCheckbox></GrCheckbox>
                                                            )}
                                                        </span>
                                                        <span>File</span>
                                                    </div>
                                                </div>
                                                {DetailLicenseInputData.license_prove_code.URL ? (
                                                    <dd className="inputbox-content">
                                                        <input
                                                            id="input4"
                                                            value={DetailLicenseInputData.license_prove_code.URL_Address}
                                                            onChange={e =>
                                                                setDetailLicenseInputData({
                                                                    ...DetailLicenseInputData,
                                                                    license_prove_code: {
                                                                        ...DetailLicenseInputData.license_prove_code,
                                                                        URL_Address: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                            placeholder="URL 주소 입력 ..."
                                                        />

                                                        <span className="underline"></span>
                                                    </dd>
                                                ) : (
                                                    ''
                                                )}
                                                {DetailLicenseInputData.license_prove_code.Files ? (
                                                    <TableMainDivBox>
                                                        {/* <input
                                                            id="input4"
                                                            type="file"
                                                            // value={DetailLicenseInputData.license_prove_code.Files_lists}
                                                            // onChange={e =>
                                                            //     setDetailLicenseInputData({
                                                            //         ...DetailLicenseInputData,
                                                            //         license_prove_code: {
                                                            //             ...DetailLicenseInputData.license_prove_code,
                                                            //             Files_lists: Files_lists.concat(e.target.value),
                                                            //         },
                                                            //     })
                                                            // }
                                                            placeholder="file 등록 ..."
                                                        /> */}

                                                        <h3>업로드 파일</h3>
                                                        <div className="upload-file-wrapper">
                                                            <FileDrop onDrop={(files, event) => handle(files)}>
                                                                <p>업로드 하실 파일을 드래그 또는 클릭 하여 추가 </p>
                                                                <label htmlFor="same" className="browse-btn">
                                                                    클릭
                                                                    <input
                                                                        id="same"
                                                                        type="file"
                                                                        multiple
                                                                        onChange={e => handle(e.target.files)}
                                                                    ></input>
                                                                </label>
                                                            </FileDrop>
                                                        </div>
                                                    </TableMainDivBox>
                                                ) : (
                                                    ''
                                                )}
                                            </dl>
                                        </div>
                                        {DetailLicenseInputData.license_prove_code.Files &&
                                        !DetailLicenseInputData.license_prove_code.nothing ? (
                                            <div style={{ marginTop: '20px' }}>
                                                <h4>등록된 파일</h4>
                                                <UploadedFileDataUlBox>
                                                    {file.map((x: any) => {
                                                        return (
                                                            <li>
                                                                <div className="UploadedContainerDiv">
                                                                    <div>{x.name}</div>
                                                                    <div>
                                                                        <TiDelete></TiDelete>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </UploadedFileDataUlBox>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="PCAssetFloatRight">사용자 있을시</div>
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
