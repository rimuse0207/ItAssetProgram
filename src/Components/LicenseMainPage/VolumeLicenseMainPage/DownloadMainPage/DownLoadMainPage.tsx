import React, { useState } from 'react';
import { BsFileEarmarkBarGraphFill, BsCalendar2PlusFill } from 'react-icons/bs';
import styled from 'styled-components';
import AddUserModalMainPage from './ModalMainPage/AddUserModalMainPage';
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
}: DownLoadMainPageProps) => {
    const dispatch = useDispatch();

    const [SelectClicksModals, setSelectClicksModals] = useState({
        FilterModal: false,
        NewDataModal: false,
        ExcelDownloadModal: false,
    });

    const [FilteringDatas, setFilteringDatas] = useState<LicenseFilteringState>({
        license_product_code: '',
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
                    <div
                        className="DownLoadIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                ...SelectClicksModals,
                                ExcelDownloadModal: !SelectClicksModals.ExcelDownloadModal,
                            })
                        }
                    >
                        <BsFileEarmarkBarGraphFill></BsFileEarmarkBarGraphFill>
                    </div>
                    <div className="IconText">EXCEL</div>
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
                {UserAddModals && ModalType === 'Show_info' ? (
                    <AddUserModalMainPage
                        SelectCompany={SelectCompany}
                        SelectClicksModals={UserAddModals}
                        setSelectClicksModals={() => {
                            setUserClickLicenseData(null);
                            setUserAddModals(false);
                        }}
                        UserClickLicenseData={UserClickLicenseData}
                        type={type}
                        SortTable={SortTable}
                    ></AddUserModalMainPage>
                ) : (
                    <div></div>
                )}
            </div>
            <div>
                {SelectClicksModals.FilterModal ? (
                    <FilterSearchMainPageDivBox>
                        <div>
                            <div>
                                <div>
                                    <h3>필터링 검색</h3>
                                </div>
                                <div className="FilteringContainer">
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>코드.</h4>
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
                                                        value={FilteringDatas.license_product_code}
                                                        placeholder={`Ex) ${SelectCompany}-HW001 `}
                                                        onChange={e =>
                                                            setFilteringDatas({
                                                                ...FilteringDatas,
                                                                license_product_code: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>설명.</h4>
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
                                                        placeholder="Ex) 한글"
                                                        value={FilteringDatas.license_product_name}
                                                        onChange={e =>
                                                            setFilteringDatas({ ...FilteringDatas, license_product_name: e.target.value })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>구입날짜</h4>
                                        </div>
                                        <div className="SearchInputContainerSubTitle">
                                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                                <div className="InputDivBox">
                                                    <input
                                                        type="date"
                                                        value={FilteringDatas.license_purchase_date}
                                                        onChange={e =>
                                                            setFilteringDatas({
                                                                ...FilteringDatas,
                                                                license_purchase_date: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                                <div
                                                    style={{
                                                        lineHeight: '40px',
                                                        marginRight: '10px',
                                                        marginLeft: '10px',
                                                        fontSize: '1.5em',
                                                    }}
                                                >
                                                    ~
                                                </div>
                                                <div className="InputDivBox">
                                                    <input
                                                        type="date"
                                                        value={FilteringDatas.license_purchase_finish_date}
                                                        onChange={e =>
                                                            setFilteringDatas({
                                                                ...FilteringDatas,
                                                                license_purchase_finish_date: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>구입가격.</h4>
                                        </div>
                                        <div className="SearchInputContainerSubTitle">
                                            <div className="SearchInputContainerSubTitleFlexDivBox">
                                                {/* <div className="IconsDivBox">
                                                    <label>
                                                        <BsFillPencilFill></BsFillPencilFill>
                                                    </label>
                                                </div> */}
                                                <div className="InputDivBox">
                                                    <input
                                                        type="number"
                                                        value={FilteringDatas.license_purchase_min_pride}
                                                        placeholder="Ex) 최소 금액"
                                                        onChange={e =>
                                                            setFilteringDatas({
                                                                ...FilteringDatas,
                                                                license_purchase_min_pride: Number(e.target.value),
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                                <div
                                                    style={{
                                                        lineHeight: '40px',
                                                        marginRight: '10px',
                                                        marginLeft: '10px',
                                                        fontSize: '1.5em',
                                                    }}
                                                >
                                                    ~
                                                </div>
                                                <div className="InputDivBox">
                                                    <input
                                                        type="number"
                                                        value={FilteringDatas.license_purchase_max_pride}
                                                        placeholder="Ex) 최대 금액"
                                                        onChange={e =>
                                                            setFilteringDatas({
                                                                ...FilteringDatas,
                                                                license_purchase_max_pride: Number(e.target.value),
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>관리번호.</h4>
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
                                                        placeholder={`Ex) ${SelectCompany}-SW001`}
                                                        value={FilteringDatas.license_manage_code}
                                                        onChange={e =>
                                                            setFilteringDatas({ ...FilteringDatas, license_manage_code: e.target.value })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>자산코드.</h4>
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
                                                        placeholder="Ex) G14010005"
                                                        value={FilteringDatas.license_newcode}
                                                        onChange={e =>
                                                            setFilteringDatas({ ...FilteringDatas, license_newcode: e.target.value })
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>RAM.</h4>
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
                                                        placeholder="Ex) 32G.."
                                                        // value={FilteringData.asset_ram}
                                                        // onChange={e => setFilteringData({ ...FilteringData, asset_ram: e.target.value })}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="SearchInputContainer">
                                        <div className="SearchInputContainerTitle">
                                            <h4>DISK.</h4>
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
                                                        placeholder="Ex) S_256G.."
                                                        // value={FilteringData.asset_disk}
                                                        // onChange={e => setFilteringData({ ...FilteringData, asset_disk: e.target.value })}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
