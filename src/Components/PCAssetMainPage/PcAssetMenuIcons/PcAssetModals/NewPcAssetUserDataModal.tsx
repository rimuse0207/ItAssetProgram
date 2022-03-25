import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { MdCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import { UserInfoGet } from '../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { DeskTopInfoDataType } from '../../PCAssetDataType';
import { PersonOption } from '../../../LicenseMainPage/VolumeLicenseMainPage/DownloadMainPage/ModalMainPage/docs/data';
import { AssetUserAdd } from '../../../../Apis/core/api/AuthUnNeedApi/AssetUserAdd/AssetAdd';
import { toast } from '../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../Configs/ToastTimerConfig';
import { DeskTopAsset_getDeskTopAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetDeskTopDataThunks';
import { NoteBookAsset_getNoteBookAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetNotBookDataThunks';
import { MonitorAsset_getMonitorAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetMonitorDataThunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Models';
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
    },
};

const NewPcAssetUserDataMainModalContent = styled.div`
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
    table.type03 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        border-top: 1px solid #ccc;
        border-left: 3px solid #369;
        margin: 20px 10px;
    }
    table.type03 th {
        width: 147px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #153d73;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    table.type03 td {
        width: 349px;
        padding: 10px;
        vertical-align: top;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .ModalFloat {
        ::after {
            content: '';
            display: block;
            clear: both;
        }
        .ModalFloatLeft {
            float: left;
            width: 50%;
            border-right: 1px solid lightgray;
            padding-right: 50px;
        }
        .ModalFloatRight {
            float: right;
            width: 45%;
            margin-top: 40px;
        }
    }
    .btns {
        padding: 30px 0 0 200px;
        .btn {
            display: inline-block;
            margin-right: 2px;
            padding: 10px 20px;
            background: none;
            border: 1px solid #c0c0c0;
            border-radius: 2px;
            color: #666;
            font-size: 1em;
            outline: none;
            transition: all 100ms ease-out;
            &:hover,
            &:focus {
                transform: translateY(-3px);
                cursor: pointer;
            }
            &-confirm {
                border: 1px solid #2962ff;
                background: #2962ff;
                color: #fff;
            }
        }
    }
`;

Modal.setAppElement('#ModalMainDiv');

type NewPcAssetUserDataModalProps = {
    UserAddModalOpen: boolean;
    setUserAddModalOpen: (data: boolean) => void;
    SelectAssetData: DeskTopInfoDataType | null;
};

const NewPcAssetUserData = ({ UserAddModalOpen, setUserAddModalOpen, SelectAssetData }: NewPcAssetUserDataModalProps) => {
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
    const [SelectUsered, setSelectUsered] = useState<null | string>(null);
    const dispatch = useDispatch();
    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    function closeModal() {
        setUserAddModalOpen(false);
    }
    useEffect(() => {
        getUserInfo();
    }, [SelectAssetData]);
    const getUserInfo = async () => {
        const ParamasData = {
            SelectCompany: SelectAssetData?.asset_management_number.split('-')[0],
        };
        try {
            const personOptionsData = await UserInfoGet('/Asset_app_server/UserSelect', ParamasData);

            if (personOptionsData.data.dataSuccess) {
                console.log(personOptionsData);
                setInfoUserData(personOptionsData.data.data);
            } else {
                alert('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveData = async () => {
        try {
            if (!SelectUsered) {
                alert('사용자를 입력 해 주세요.');
            } else {
                const ParamasData = {
                    SelectAssetData,
                    SelectUsered,
                };
                const UserAssetAdd = await AssetUserAdd('/Asset_app_server/AssetUserAdd', ParamasData);
                if (UserAssetAdd.data.dataSuccess) {
                    const ParamasDatas = {
                        types: SelectAssetData?.asset_division,
                        SelectCompany: SelectAssetData?.asset_management_number.split('-')[0],
                        FilteringData,
                    };
                    if (SelectAssetData?.asset_division === '데스크탑') {
                        await dispatch(DeskTopAsset_getDeskTopAssetDataThunk(ParamasDatas));
                    } else if (SelectAssetData?.asset_division === '노트북') {
                        await dispatch(NoteBookAsset_getNoteBookAssetDataThunk(ParamasDatas));
                    } else {
                        await dispatch(MonitorAsset_getMonitorAssetDataThunk(ParamasDatas));
                    }
                    setSelectUsered(null);
                    closeModal();
                    toast.show({
                        title: `자산에 유저 등록 완료.`,
                        successCheck: true,
                        duration: ToastTime,
                    });
                } else {
                    alert('에러발생');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (data: PersonOption) => {
        setSelectUsered(data.value);
    };

    return (
        <div>
            <Modal isOpen={UserAddModalOpen} style={customStyles} contentLabel="데이터 입력 Modal">
                <NewPcAssetUserDataMainModalContent>
                    <div style={{ textAlign: 'end' }}>
                        <button className="ModalCloseButton" onClick={closeModal}>
                            <MdCancel></MdCancel>
                        </button>
                    </div>
                    <div className="ModalFloat">
                        <div className="ModalFloatLeft">
                            <div>
                                <h2>PC 자산 유저 추가</h2>
                            </div>
                            <div>
                                <table className="type03">
                                    <tr>
                                        <th scope="row">코드</th>
                                        <td>{SelectAssetData?.asset_management_number}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">종류</th>
                                        <td>{SelectAssetData?.asset_division}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CPU</th>
                                        <td>{SelectAssetData?.asset_cpu}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RAM</th>
                                        <td>{SelectAssetData?.asset_ram}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DISK</th>
                                        <td>{SelectAssetData?.asset_disk}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">구매날짜</th>
                                        <td>{moment(SelectAssetData?.asset_purchase_date).format('YYYY-MM-DD')}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">사용처</th>
                                        <td>
                                            {SelectAssetData?.company_name}_{SelectAssetData?.company_location}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">사용자</th>
                                        <td>
                                            {SelectAssetData?.team}_{SelectAssetData?.name}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className="ModalFloatRight">
                            <label>사용자 검색 *</label>
                            <Select options={InfoUserData} onChange={(value: any) => handleChange(value)}></Select>
                            <div className="btns">
                                <button className="btn btn-confirm" onClick={() => saveData()}>
                                    저장
                                </button>
                                <button className="btn btn-cancel" onClick={() => closeModal()}>
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </NewPcAssetUserDataMainModalContent>
            </Modal>
        </div>
    );
};

export default NewPcAssetUserData;
