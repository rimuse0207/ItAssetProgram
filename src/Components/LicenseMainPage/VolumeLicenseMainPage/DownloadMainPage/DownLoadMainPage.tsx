import React, { useState } from 'react';
import { BsFileEarmarkBarGraphFill, BsCalendar2PlusFill } from 'react-icons/bs';
import styled from 'styled-components';
import ExcelDowloadModalMainPage from './ModalMainPage/ExcelDowloadModalMainPage';
import NewDataInsertMainPage from './ModalMainPage/NewDataInsertMainPage';
import { LicenseDataType } from '../VolumeLicenseDataTypes';
import { FaFilter } from 'react-icons/fa';
import {
    FilterSearchMainPageDivBox,
    FilterSearchMainPageDivBoxDownSlide,
} from '../../../PCAssetMainPage/PcAssetMenuIcons/PcAssetMenuIconsMainPage';
import { BsFillPencilFill } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import {
    LicenseFilteringAdd,
    LicenseFilteringState,
    LicenseFilteringReset,
} from '../../../../Models/LicenseFilteringRedux/LicenseFilteringRedux';
import { useDispatch } from 'react-redux';
import { License_getLicenseDataThunk } from '../../../../Models/LicenseDataReduxThunk/LicenseDataThunks';

const DonwLoadMianPageMainDivBox = styled.div`
    width: 100%;
    margin-top: 30px;

    .IconsClickMenu {
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
    }
    .DownLoadIcons {
        width: 100px;
        font-size: 2em;
        color: green;
        text-align: center;
        :hover {
            cursor: pointer;
        }
    }
    .NewDataIcons {
        width: 100px;
        font-size: 2em;
        color: #368;
        text-align: center;
        :hover {
            cursor: pointer;
        }
    }
    .FiterIcons {
        width: 100px;
        font-size: 2em;
        color: #b23c46;
        text-align: center;
        :hover {
            cursor: pointer;
        }
    }
    .IconText {
        text-align: center;
        font-weight: bold;
    }
`;
type DownLoadMainPageProps = {
    UserAddModals: boolean;
    setUserAddModals: (data: boolean) => void;
    setUserClickLicenseData: (data: null) => void;
    SelectCompany: string;
    UserClickLicenseData: LicenseDataType | null;
    type: string;
    SortTable: any;
    ModalType: string;
    windowScrollss: any;
};

const DownLoadMainPage = ({
    UserAddModals,
    setUserAddModals,
    setUserClickLicenseData,
    UserClickLicenseData,
    SelectCompany,
    type,
    SortTable,
    ModalType,
    windowScrollss,
}: DownLoadMainPageProps) => {
    const dispatch = useDispatch();

    const [SelectClicksModals, setSelectClicksModals] = useState({
        FilterModal: false,
        NewDataModal: false,
        ExcelDownloadModal: false,
    });

    const [FilteringDatas, setFilteringDatas] = useState<LicenseFilteringState>({
        license_product_name: '',
        license_manage_code: '',
        license_purchase_date: '',
        license_purchase_finish_date: '',
        license_purchase_min_pride: 0,
        license_purchase_max_pride: 9999999999,
        license_newcode: '',
    });

    const ResetHandleClicks = async () => {
        await dispatch(LicenseFilteringReset());
        const ParamasData = {
            company: SelectCompany,
            license: type,
            SortTable: {
                license_product_code: '',
                license_product_name: '',
                license_manage_code: '',
                license_purchase_date: '',
                license_purchase_finish_date: '',
                license_purchase_min_pride: 0,
                license_purchase_max_pride: 0,
                license_newcode: '',
            },
        };
        await dispatch(License_getLicenseDataThunk(ParamasData));
    };

    const handleClickFilterData = async () => {
        await dispatch(LicenseFilteringAdd(FilteringDatas));
        const ParamasData = {
            company: SelectCompany,
            license: type,
            SortTable: FilteringDatas,
        };
        await dispatch(License_getLicenseDataThunk(ParamasData));
    };

    return (
        <DonwLoadMianPageMainDivBox>
            <div></div>
            <div className="IconsClickMenu">
                <div>
                    <div
                        className="FiterIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                ...SelectClicksModals,
                                FilterModal: !SelectClicksModals.FilterModal,
                            })
                        }
                    >
                        <FaFilter></FaFilter>
                    </div>
                    <div className="IconText">필터 검색</div>
                </div>
                <div>
                    <div
                        className="NewDataIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                ...SelectClicksModals,
                                NewDataModal: !SelectClicksModals.NewDataModal,
                            })
                        }
                    >
                        <BsCalendar2PlusFill></BsCalendar2PlusFill>
                    </div>
                    <div className="IconText">라이선스 추가</div>
                </div>

                <div>
                    <a
                        style={{ color: 'black' }}
                        href={`${process.env.REACT_APP_API_URL}/ExcelDownload_app_server/license_Excel?company=${SelectCompany}&license=${type}`}
                    >
                        <div className="DownLoadIcons">
                            <BsFileEarmarkBarGraphFill></BsFileEarmarkBarGraphFill>
                        </div>
                        <div className="IconText">EXCEL</div>
                    </a>
                </div>
            </div>

            <div>
                {SelectClicksModals.NewDataModal ? (
                    <NewDataInsertMainPage
                        SelectCompany={SelectCompany}
                        SelectClicksModals={SelectClicksModals.NewDataModal}
                        setSelectClicksModals={() =>
                            setSelectClicksModals({
                                FilterModal: SelectClicksModals.FilterModal,
                                NewDataModal: false,
                                ExcelDownloadModal: false,
                            })
                        }
                        type={type}
                        SortTable={SortTable}
                    ></NewDataInsertMainPage>
                ) : (
                    ''
                )}
            </div>
            <div>
                {SelectClicksModals.ExcelDownloadModal ? (
                    <ExcelDowloadModalMainPage
                        SelectClicksModals={SelectClicksModals.ExcelDownloadModal}
                        setSelectClicksModals={() =>
                            setSelectClicksModals({
                                FilterModal: SelectClicksModals.FilterModal,
                                NewDataModal: false,
                                ExcelDownloadModal: false,
                            })
                        }
                    ></ExcelDowloadModalMainPage>
                ) : (
                    ''
                )}
            </div>

            <div>
                {SelectClicksModals.FilterModal ? (
                    <FilterSearchMainPageDivBox Select_Menu={'LicenseFiltering'}>
                        <div>
                            <div>
                                <div>
                                    <h3>필터링 검색</h3>
                                </div>
                                <div className="FilteringContainer">
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>라이선스 명.</h4>
                                        </div>
                                        <div className="SearchInputContainerSubTitle">
                                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                                <div className="IconsDivBox">
                                                    <label>
                                                        <BsFillPencilFill></BsFillPencilFill>
                                                    </label>
                                                </div>
                                                <div className="InputDivBox">
                                                    <input
                                                        type="text"
                                                        value={FilteringDatas.license_product_name}
                                                        placeholder={`MSxxxx...`}
                                                        onChange={e =>
                                                            setFilteringDatas({
                                                                ...FilteringDatas,
                                                                license_product_name: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btns">
                            <button className="btn btn-cancel" onClick={ResetHandleClicks}>
                                <span style={{ marginRight: '10px' }}>
                                    <GrPowerReset></GrPowerReset>
                                </span>

                                <span>리셋</span>
                            </button>
                            <button className="btn btn-confirm" onClick={handleClickFilterData}>
                                <span style={{ marginRight: '10px' }}>
                                    <GoSearch></GoSearch>
                                </span>

                                <span>검색</span>
                            </button>
                        </div>
                    </FilterSearchMainPageDivBox>
                ) : (
                    <FilterSearchMainPageDivBoxDownSlide></FilterSearchMainPageDivBoxDownSlide>
                )}
            </div>
        </DonwLoadMianPageMainDivBox>
    );
};

export default DownLoadMainPage;
