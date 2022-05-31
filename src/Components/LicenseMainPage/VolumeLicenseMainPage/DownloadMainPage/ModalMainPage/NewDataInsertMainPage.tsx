import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import { MainModalContent } from '../../../../PCAssetMainPage/PcAssetMenuIcons/PcAssetModals/NewPcAssetDataModal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { GetLicenseInfoNumber, AddDetailBigLicense } from '../../../../../Apis/core/api/AuthNeedApi/LicenseApi';
import { useDispatch } from 'react-redux';
import { License_getLicenseDataThunk } from '../../../../../Models/LicenseDataReduxThunk/LicenseDataThunks';

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
        padding: '20px',
        height: '90%',
    },
};

Modal.setAppElement('#ModalMainDiv');

type NewDataInsertMainPageProps = {
    setSelectClicksModals: (data: boolean) => void;
    SelectClicksModals: boolean;
    SelectCompany: string;
    type: string;
    SortTable: any;
};
registerLocale('ko', ko);
const NewDataInsertMainPage = ({
    setSelectClicksModals,
    SelectClicksModals,
    SelectCompany,
    type,
    SortTable,
}: NewDataInsertMainPageProps) => {
    function closeModal() {
        setSelectClicksModals(false);
    }

    const dispatch = useDispatch();

    const [LicenseInputData, setLicenseInputData] = useState({
        license_product_code: '',
        license_product_name: '',
    });

    const getRandomCode = async () => {
        try {
            const getRandomCodeFromServer = await GetLicenseInfoNumber('/license_app_server/getLicenseInfoNumber', { SelectCompany });
            if (getRandomCodeFromServer.data.dataSuccess) {
                setLicenseInputData({
                    ...LicenseInputData,
                    license_product_code: getRandomCodeFromServer.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (SelectClicksModals) getRandomCode();
    }, []);

    const saveData = async () => {
        try {
            const AddBigLicenseFromServer = await AddDetailBigLicense(
                '/license_app_server/BigLicenseAddData',
                LicenseInputData,
                SelectCompany,
                type
            );
            const ParamasData = {
                company: SelectCompany,
                license: type,
                SortTable,
            };

            if (AddBigLicenseFromServer.data.dataSuccess) {
                dispatch(License_getLicenseDataThunk(ParamasData));
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
                                <h2>라이선스 추가</h2>

                                <div className="PCAssetFloatContainer">
                                    <div className="PCAssetFloatLeft2">
                                        <div className="input-content-wrap">
                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    관리번호<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <input
                                                        id="input0"
                                                        type="text"
                                                        value={LicenseInputData.license_product_code}
                                                        onChange={e =>
                                                            setLicenseInputData({
                                                                ...LicenseInputData,
                                                                license_product_code: e.target.value,
                                                            })
                                                        }
                                                    />

                                                    <span className="underline"></span>
                                                </dd>
                                            </dl>

                                            <dl className="inputbox">
                                                <dt className="inputbox-title">
                                                    라이선스 명<span style={{ color: 'red' }}>*</span>
                                                </dt>
                                                <dd className="inputbox-content">
                                                    <div className="selectBox">
                                                        <input
                                                            id="input0"
                                                            type="text"
                                                            value={LicenseInputData.license_product_name}
                                                            onChange={e =>
                                                                setLicenseInputData({
                                                                    ...LicenseInputData,
                                                                    license_product_name: e.target.value,
                                                                })
                                                            }
                                                        />

                                                        <span className="underline"></span>
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="PCAssetFloatRight"></div>
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
