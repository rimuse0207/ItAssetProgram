import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { MdCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import { UserInfoGet } from '../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { DeskTopInfoDataType } from '../../PCAssetDataType';
import { PersonOption } from '../../../LicenseMainPage/VolumeLicenseMainPage/DownloadMainPage/ModalMainPage/docs/data';
import { AssetDelete } from '../../../../Apis/core/api/AuthUnNeedApi/DeleteAssetUser/AssetDelete';
import { toast } from '../../../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../../../Configs/ToastTimerConfig';
import { DeskTopAsset_getDeskTopAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetDeskTopDataThunks';
import { NoteBookAsset_getNoteBookAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetNotBookDataThunks';
import { MonitorAsset_getMonitorAssetDataThunk } from '../../../../Models/AssetDataReduxThunk/AssetMonitorDataThunks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Models';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
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
        minHeight: '90vh',
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
    .input {
        &-header {
            position: relative;
            padding-top: 80px;
            color: #fff;
            h1 {
                padding-bottom: 25px;
                font-size: 3.25em;
                font-weight: 100;
            }
        }
        &-content {
            position: relative;
            padding: 20px;
            background: #fff;
            z-index: 10;

            h2 {
                padding-bottom: 45px;
                font-size: 1.625em;
                font-weight: bold;
                vertical-align: middle;
                select {
                    display: inline-block;
                    margin-left: 10px;
                    padding: 5px 6px 3px;
                    border: 1px solid #ffca00;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    vertical-align: middle;
                    color: #ffca00;
                }
            }
            .inputbox {
                position: relative;
                padding: 15px 0 28px 150px;
                &-title {
                    position: absolute;
                    top: 15px;
                    left: 0;
                    width: 200px;
                    height: 30px;
                    color: #666;
                    font-weight: bold;
                    line-height: 30px;
                }
                &-content {
                    position: relative;
                    width: 100%;

                    select {
                        width: 100%;
                        height: 45px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        line-height: 30px;
                        font-size: 14px;
                        border: 0;
                        background: none;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        outline: none;
                        -webkit-appearance: none;
                        option {
                            padding: 5px 0;
                        }
                    }
                    input {
                        width: 100%;
                        height: 30px;
                        box-sizing: border-box;
                        line-height: 30px;
                        font-size: 14px;
                        border: 0;
                        background: none;
                        border-bottom: 1px solid #ccc;
                        outline: none;
                        border-radius: 0;
                        -webkit-appearance: none;
                        &:focus,
                        &:valid {
                            & ~ label {
                                color: #2962ff;
                                transform: translateY(-20px);
                                font-size: 0.825em;
                                cursor: default;
                            }
                        }
                        &:focus {
                            & ~ .underline {
                                width: 100%;
                            }
                        }
                    }
                    textarea {
                        width: 100%;
                        height: 100px;
                        box-sizing: border-box;
                        font-size: 14px;
                        border: 0;
                        background: none;
                        border: 1px solid #ccc;
                        outline: none;
                        border-radius: 0;
                        -webkit-appearance: none;
                        padding: 10px;
                    }
                    label {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 30px;
                        line-height: 30px;
                        color: #ccc;
                        cursor: text;
                        transition: all 200ms ease-out;
                        z-index: 10;
                    }
                    .underline {
                        content: '';
                        display: block;
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: #2962ff;
                        transition: all 200ms ease-out;
                    }
                }
            }
            .inputbox-content {
                position: relative;
            }
            .RandomButtonIcons {
                font-size: 1.8em;
                position: absolute;
                right: 0;
                top: -5px;
                :hover {
                    cursor: pointer;
                    color: #368;
                }
            }
        }
    }
`;

const NavigationUpdateModalMainDivBox = styled.div`
    width: 100%;
    border-bottom: 2px solid lightgray;
    margin-bottom: 20px;

    ul {
        display: flex;
        li {
            :hover {
                cursor: pointer;
            }
            .LineText {
                font-size: 1em;
                color: #999;
                background-color: transparent;
                height: 40px;
                line-height: 38px;
                padding: 0 40px;
            }
            position: relative;
            .LineActions {
                position: absolute;
                animation-name: slidings;
                animation-duration: 0.8s;
                @keyframes slidings {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
                border-bottom: 2px solid #515151;
                width: 100%;
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

const UpdatePcAssetUserDataModal = ({ UserAddModalOpen, setUserAddModalOpen, SelectAssetData }: NewPcAssetUserDataModalProps) => {
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
    const [SelectUsered, setSelectUsered] = useState<null | string>(null);
    const [CompanySelectAccessKey, setCompanySelectAccessKey] = useState([
        { name: '반납', AccessKey: true },
        { name: '이관', AccessKey: false },
        { name: '폐기', AccessKey: false },
    ]);

    const [SelectedData, setSelectedData] = useState({
        selected_date: new Date(),
        selected_reason: '',
        selected_user: '',
    });

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
            SelectCompany: SelectAssetData?.company_name,
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
        for (var i = 0; i < CompanySelectAccessKey.length; i++) {
            if (CompanySelectAccessKey[i].AccessKey && CompanySelectAccessKey[i].name === '이관' && SelectedData.selected_user === '') {
                return alert('사용자를 입력 해 주세요.');
            }
        }
        try {
            if (SelectedData.selected_reason === '') {
                return alert('사유를 작성 해주세요.');
            }
            let selectedpickers = '';
            for (var i = 0; i < CompanySelectAccessKey.length; i++) {
                if (CompanySelectAccessKey[i].AccessKey) {
                    selectedpickers = CompanySelectAccessKey[i].name;
                }
            }

            const ParamasData = {
                SelectAssetData,
                SelectedData,
                CompanySelectAccessKey: selectedpickers,
            };
            const UserAssetAdd = await AssetDelete('/Asset_app_server/AssetDeleteData', ParamasData);
            if (UserAssetAdd.data.dataSuccess) {
                const ParamasDatas = {
                    types: SelectAssetData?.asset_division,
                    SelectCompany: SelectAssetData?.company_name,
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
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (data: PersonOption) => {
        setSelectUsered(data.value);
    };
    const handleCompanyClicks = (data: { name: string }) => {
        const ChangeCompany = CompanySelectAccessKey.map((list, i) => {
            if (list.name === data.name) {
                list.AccessKey = true;
            } else {
                list.AccessKey = false;
            }
            return list;
        });
        setCompanySelectAccessKey(ChangeCompany);
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
                            <NavigationUpdateModalMainDivBox>
                                <div>
                                    <ul>
                                        {CompanySelectAccessKey.map((list, i) => {
                                            return (
                                                <li key={list.name} onClick={() => handleCompanyClicks(list)}>
                                                    {list.AccessKey ? (
                                                        <>
                                                            <div className="LineText" style={{ color: '#050404', fontWeight: 'bold' }}>
                                                                {list.name}
                                                            </div>
                                                            <div className="LineActions"></div>
                                                        </>
                                                    ) : (
                                                        <div className="LineText">{list.name}</div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </NavigationUpdateModalMainDivBox>
                            <div>
                                <div>
                                    <div>
                                        <div id="wrap" className="input">
                                            <section className="input-content">
                                                <dl className="inputbox">
                                                    <dt className="inputbox-title">
                                                        {CompanySelectAccessKey.map((list, i) => {
                                                            return list.AccessKey ? list.name : '';
                                                        })}
                                                        날짜
                                                    </dt>
                                                    <dd className="inputbox-content">
                                                        <DatePicker
                                                            selected={SelectedData.selected_date}
                                                            onChange={(date: any) =>
                                                                setSelectedData({ ...SelectedData, selected_date: date })
                                                            }
                                                            withPortal
                                                            locale={ko}
                                                            dateFormat="yyy-MM-dd"
                                                            maxDate={new Date()}
                                                        />
                                                        <span className="underline"></span>
                                                    </dd>
                                                </dl>
                                                <dl className="inputbox">
                                                    <dt className="inputbox-title">
                                                        {CompanySelectAccessKey.map((list, i) => {
                                                            return list.AccessKey ? list.name : '';
                                                        })}
                                                        사유
                                                    </dt>
                                                    <dd className="inputbox-content">
                                                        <textarea
                                                            value={SelectedData.selected_reason}
                                                            onChange={e =>
                                                                setSelectedData({ ...SelectedData, selected_reason: e.target.value })
                                                            }
                                                        ></textarea>
                                                        <span className="underline"></span>
                                                    </dd>
                                                </dl>
                                                {CompanySelectAccessKey.map((list, i) => {
                                                    return list.AccessKey && list.name === '이관' ? (
                                                        <dl className="inputbox">
                                                            <dt className="inputbox-title">이관 사용자</dt>
                                                            <dd className="inputbox-content">
                                                                <Select
                                                                    options={InfoUserData}
                                                                    onChange={(value: any) =>
                                                                        setSelectedData({ ...SelectedData, selected_user: value })
                                                                    }
                                                                ></Select>
                                                                <span className="underline"></span>
                                                            </dd>
                                                        </dl>
                                                    ) : (
                                                        ''
                                                    );
                                                })}
                                            </section>
                                        </div>
                                    </div>
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
                            {/* <label>사용자 검색 *</label>
                            <Select options={InfoUserData} onChange={(value: any) => handleChange(value)}></Select>
                            <div className="btns">
                                <button className="btn btn-confirm" onClick={() => saveData()}>
                                    저장
                                </button>
                                <button className="btn btn-cancel" onClick={() => closeModal()}>
                                    취소
                                </button>
                            </div> */}
                        </div>
                    </div>
                </NewPcAssetUserDataMainModalContent>
            </Modal>
        </div>
    );
};

export default UpdatePcAssetUserDataModal;
