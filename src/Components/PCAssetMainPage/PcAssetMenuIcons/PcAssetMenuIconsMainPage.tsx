import React, { useState } from 'react';
import { BsFileEarmarkBarGraphFill } from 'react-icons/bs';
import { BsFillBagPlusFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import styled from 'styled-components';
import NewPcAssetDataModal from './PcAssetModals/NewPcAssetDataModal';
import { BsFillPencilFill } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { AssetFilteringAdd, AssetFilteringReset } from '../../../Models/AssetFilteringRedux/AssetFilteringRedux';
import { UserInfoGet } from '../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
const PcAssetMenuIconsMainPageDivBox = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
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
            opacity: 0.5;
        }
    }
    .FiterIcons {
        width: 100px;
        font-size: 2em;
        color: #b23c46;
        text-align: center;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .NewDataIcons {
        width: 100px;
        font-size: 2em;
        color: #368;
        text-align: center;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .IconText {
        text-align: center;
        font-weight: bold;
    }
`;

export const FilterSearchMainPageDivBox = styled.div`
    height: 400px;
    padding: 10px;
    margin-right: 30px;
    padding-right: 40px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    animation-name: SlideUpDown;
    animation-duration: 0.5s;
    @keyframes SlideUpDown {
        from {
            height: 0vh;
            opacity: 0;
        }

        to {
            height: 400px;
            opacity: 1;
        }
    }
    .FilteringContainer {
        margin-top: 10px;
        max-height: 30vh;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        .SearchInputContainer {
            display: flex;
            width: 45%;
            height: 40px;
            margin-left: 20px;
            margin-bottom: 10px;
            .SearchInputContainerTitle {
                margin-right: 10px;
                line-height: 40px;
                width: 100px;
            }
            .SearchInputContainerSubTitle {
                width: 100%;
                height: 100%;
                .SearchInputContainerSubTitleFlexDivBox {
                    display: flex;
                    height: 100%;
                    .IconsDivBox {
                        width: 50px;
                        height: 100%;
                        text-align: center;
                        line-height: 30px;
                        border: 1px solid lightgray;
                        line-height: 40px;
                    }
                    .InputDivBox {
                        width: 100%;
                        height: 100%;
                        input {
                            width: 100%;
                            height: 100%;
                            border: 1px solid lightgray;
                            padding-left: 10px;
                            :focus {
                                outline: none;
                                border: none;
                                border: 0.5px solid #368;
                            }
                        }
                    }
                }
            }
        }
    }
    .btns {
        text-align: end;
        margin-top: 25px;
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

export const FilterSearchMainPageDivBoxDownSlide = styled.div`
    animation-name: SlideUp;
    animation-duration: 0.5s;
    @keyframes SlideUp {
        from {
            height: 400px;
        }

        to {
            height: 0vh;
        }
    }
`;

type PcAssetMenuIconsMainPageProps = {
    SelectCompany: string;
    type: string;
};

type FilteringDataTypes = {
    asset_management_number: string;
    asset_maker: string;
    start_asset_purchasedate: string;
    finish_asset_purchasedate: string;
    companyInfo: string;
    userInfo: string;
    asset_cpu: string;
    asset_ram: string;
    asset_disk: string;
    asset_newcode: string;
    asset_model: string;
};

const PcAssetMenuIconsMainPage = ({ SelectCompany, type }: PcAssetMenuIconsMainPageProps) => {
    const [SelectClicksModals, setSelectClicksModals] = useState({
        FilterSearch: false,
        NewDataModal: false,
        ExcelDownloadModal: false,
    });
    const [FilteringData, setFilteringData] = useState<FilteringDataTypes>({
        asset_management_number: '',
        asset_maker: '',
        start_asset_purchasedate: '',
        finish_asset_purchasedate: '',
        companyInfo: '',
        userInfo: '',
        asset_cpu: '',
        asset_ram: '',
        asset_disk: '',
        asset_newcode: '',
        asset_model: '',
    });

    const dispatch = useDispatch();

    const ResetHandleClicks = async () => {
        try {
            await dispatch(AssetFilteringReset());
            setFilteringData({
                asset_management_number: '',
                asset_maker: '',
                start_asset_purchasedate: '',
                finish_asset_purchasedate: '',
                companyInfo: '',
                userInfo: '',
                asset_cpu: '',
                asset_ram: '',
                asset_disk: '',
                asset_newcode: '',
                asset_model: '',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickFilterData = async () => {
        try {
            dispatch(AssetFilteringAdd({ FilteringData }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PcAssetMenuIconsMainPageDivBox>
            <div></div>
            <div className="IconsClickMenu">
                <div>
                    <div
                        className="FiterIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                ...SelectClicksModals,
                                FilterSearch: !SelectClicksModals.FilterSearch,
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
                        <BsFillBagPlusFill></BsFillBagPlusFill>
                    </div>
                    <div className="IconText">PC 자산 추가</div>
                </div>

                <div>
                    <a
                        style={{ color: 'black' }}
                        href={`${process.env.REACT_APP_API_URL}/ExcelDownload_app_server/AssetExcel?SelectCompany=${SelectCompany}`}
                    >
                        <div
                            className="DownLoadIcons"
                            onClick={() => {
                                setSelectClicksModals({
                                    ...SelectClicksModals,
                                    ExcelDownloadModal: !SelectClicksModals.ExcelDownloadModal,
                                });
                            }}
                        >
                            <BsFileEarmarkBarGraphFill></BsFileEarmarkBarGraphFill>
                        </div>
                        <div className="IconText">EXCEL</div>
                    </a>
                </div>
            </div>
            {SelectClicksModals.NewDataModal ? (
                <NewPcAssetDataModal
                    key={SelectCompany}
                    SelectClicksModals={SelectClicksModals}
                    setSelectClicksModals={() =>
                        setSelectClicksModals({
                            ...SelectClicksModals,
                            NewDataModal: false,
                        })
                    }
                    SelectCompany={SelectCompany}
                ></NewPcAssetDataModal>
            ) : (
                ''
            )}

            {SelectClicksModals.FilterSearch ? (
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
                                                    placeholder="Ex) 32GB.."
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
                                                    placeholder="Ex) SSD_256GB.."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_disk: e.target.value })}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>모델명.</h4>
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
                                                    value={FilteringData.asset_model}
                                                    type="text"
                                                    placeholder="Ex) ..."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_model: e.target.value })}
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
                                                    value={FilteringData.asset_newcode}
                                                    type="text"
                                                    placeholder="Ex) G00000...."
                                                    onChange={e => setFilteringData({ ...FilteringData, asset_newcode: e.target.value })}
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
        </PcAssetMenuIconsMainPageDivBox>
    );
};

export default PcAssetMenuIconsMainPage;
