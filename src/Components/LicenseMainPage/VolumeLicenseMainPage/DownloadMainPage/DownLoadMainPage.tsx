import React, { useState } from 'react';
import { BsFileEarmarkBarGraphFill, BsCalendar2PlusFill } from 'react-icons/bs';
import styled from 'styled-components';
import AddUserModalMainPage from './ModalMainPage/AddUserModalMainPage';
import ExcelDowloadModalMainPage from './ModalMainPage/ExcelDowloadModalMainPage';
import NewDataInsertMainPage from './ModalMainPage/NewDataInsertMainPage';
import { LicenseDataType } from '../VolumeLicenseDataTypes';
import {FaFilter} from "react-icons/fa";
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
    .FiterIcons{
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
    const [SelectClicksModals, setSelectClicksModals] = useState({
        NewDataModal: false,
        ExcelDownloadModal: false,
    });

    return (
        <DonwLoadMianPageMainDivBox>
            <div></div>
            <div className="IconsClickMenu">
            <div>
                    <div
                        className="FiterIcons"
                        // onClick={() =>
                        //     setSelectClicksModals({
                        //         NewDataModal: false,
                        //         ExcelDownloadModal: false,
                        //         FilterSearch: !SelectClicksModals.FilterSearch,
                        //     })
                        // }
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
                                NewDataModal: true,
                                ExcelDownloadModal: false,
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
                                NewDataModal: false,
                                ExcelDownloadModal: true,
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
            {/* {SelectClicksModals.FilterSearch ? (
                <FilterSearchMainPageDivBox>
                    <div>
                        <div>
                            <div>
                                <h3>필터링 검색</h3>
                            </div>
                            <div className="FilteringContainer">
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
                                                    value={FilteringData.asset_management_number}
                                                    placeholder="Ex) DHKS-22001"
                                                    onChange={e =>
                                                        setFilteringData({ ...FilteringData, asset_management_number: e.target.value })
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>제조사.</h4>
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
                                                    value={FilteringData.asset_maker}
                                                    type="text"
                                                    placeholder="Ex) 삼성.."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_maker: e.target.value })}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>구입일</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="InputDivBox">
                                                <input
                                                    type="date"
                                                    value={FilteringData.start_asset_purchasedate}
                                                    onChange={e =>
                                                        setFilteringData({ ...FilteringData, start_asset_purchasedate: e.target.value })
                                                    }
                                                ></input>
                                            </div>
                                            <div style={{ lineHeight: '40px', marginRight: '10px', marginLeft: '10px', fontSize: '1.5em' }}>
                                                ~
                                            </div>
                                            <div className="InputDivBox">
                                                <input
                                                    type="date"
                                                    value={FilteringData.finish_asset_purchasedate}
                                                    onChange={e =>
                                                        setFilteringData({ ...FilteringData, finish_asset_purchasedate: e.target.value })
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>사용장소.</h4>
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
                                                    value={FilteringData.companyInfo}
                                                    placeholder="Ex) 판교, 아산.."
                                                    onChange={e => setFilteringData({ ...FilteringData, companyInfo: e.target.value })}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>사용자.</h4>
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
                                                    value={FilteringData.userInfo}
                                                    type="text"
                                                    placeholder="Ex) 유성재.."
                                                    onChange={e => setFilteringData({ ...FilteringData, userInfo: e.target.value })}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>CPU.</h4>
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
                                                    value={FilteringData.asset_cpu}
                                                    type="text"
                                                    placeholder="Ex) i7.."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_cpu: e.target.value })}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
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
                                                    value={FilteringData.asset_ram}
                                                    type="text"
                                                    placeholder="Ex) 32G.."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_ram: e.target.value })}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
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
                                                    value={FilteringData.asset_disk}
                                                    type="text"
                                                    placeholder="Ex) S_256G.."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_disk: e.target.value })}
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
            )} */}
            </div>
        </DonwLoadMianPageMainDivBox>
    );
};

export default DownLoadMainPage;
