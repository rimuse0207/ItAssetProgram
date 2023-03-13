import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DeskTopMainPage from './DeskTop/DeskTopMainPage';
import NoteBookMainPage from './NoteBook/NoteBookMainPage';
import MonitorMainPage from './Monitor/MonitorMainPage';
import GraphContainer from './AssetGraph/GraphContainer';
import PcAssetMenuIconsMainPage from './PcAssetMenuIcons/PcAssetMenuIconsMainPage';
import CompanySelectMenuBar from '../Navigation/CompanySelectMenuBar/CompanySelectMenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Models';
import { ChangeAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import { AssetFilteringReset } from '../../Models/AssetFilteringRedux/AssetFilteringRedux';
import PCAssetAllData from './PCAssetAllData';
import { IoIosArrowUp } from 'react-icons/io';
import { throttle } from 'lodash';

type URLParamsType = {
    type: string;
};

export type MenuAccessType = {
    name: string;
    AccessKey: boolean;
};

export const LicenseMainPageContentMainPageDiv = styled.div`
    padding-left: 20px;
    height: 100vh;
    width: 100%;
    background-color: #efefef;
    overflow: auto;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 7px solid transparent;
        background-clip: content-box;
        background-color: gray;
    }

    .PostionFixedFromScroll {
        position: sticky;
        top: -20px;
        background-color: #fff;
    }
    .Arrow_Window_Up {
        position: fixed;
        bottom: 10px;
        right: 20px;
        font-size: 3em;
        text-align: center;
        z-index: 1;
        background-color: #fff;
        border-radius: 50%;
        width: 50px;
        height: 50px;

        animation: motion 0.8s /* 속도 */ linear 0s /* 처음부터 끝까지 일정 속도로 진행 */ infinite alternate; /* 무한 반복 */
        @keyframes motion {
            0% {
                bottom: 20px;
            } /* 처음 위치 */
            100% {
                bottom: 10px;
            } /* 마지막 위치 */
        }

        :hover {
            cursor: pointer;
        }
        .Arrow_icons {
            position: absolute;
            top: -5px;
            right: 1px;
        }
    }
`;

const PcAssetMainPage = () => {
    let { type } = useParams<URLParamsType>();
    const dispatch = useDispatch();
    const CompanySelectAccessKey = useSelector((state: RootState) => state.AccessKeyMenuBarData.CompanySelectAccessKey);

    useEffect(() => {
        dispatch(AssetFilteringReset());
    }, []);

    

    const handleCompanyClicks = async (data: MenuAccessType) => {
        const ChangeCompany = CompanySelectAccessKey.map((list: MenuAccessType, i: number) => {
            if (list.name === data.name) {
                list.AccessKey = true;
            } else {
                list.AccessKey = false;
            }
            return list;
        });
         dispatch(ChangeAccessKeyMenuBarRedux(ChangeCompany));
    };
    /// 올라가기 아이콘

    const HandleRefTable = useRef<any>(null);
    const [isTabnavOn, setIsTabnavOn] = useState(false);

    const throttledScroll = useMemo(
        () =>
            throttle((event: any) => {
                if (!event.currentTarget) return;
                if (event.currentTarget.scrollTop > event.currentTarget.offsetHeight - 200) {
                    setIsTabnavOn(true);
                } else {
                    setIsTabnavOn(false);
                }
            }, 100),
        []
    );

    const handleClicksUp = () => {
        HandleRefTable.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setIsTabnavOn(false);
    };

    return (
        <LicenseMainPageContentMainPageDiv onScroll={throttledScroll} ref={HandleRefTable}>
            {isTabnavOn ? (
                <div className="Arrow_Window_Up" onClick={handleClicksUp}>
                    <div className="Arrow_icons">
                        <IoIosArrowUp></IoIosArrowUp>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>

            {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <div key={list.name}>
                        <GraphContainer SelectCompany={list.name}></GraphContainer>
                        <PcAssetMenuIconsMainPage SelectCompany={list.name} type={type}></PcAssetMenuIconsMainPage>
                        {/* <DeskTopMainPage SelectCompany={list.name} type={type}></DeskTopMainPage>
                        <NoteBookMainPage SelectCompany={list.name} type={type}></NoteBookMainPage> */}

                        <PCAssetAllData SelectCompany={list.name}></PCAssetAllData>
                        {/* <MonitorMainPage SelectCompany={list.name} type={type}></MonitorMainPage> */}
                    </div>
                ) : (
                    ''
                )
            )}
        </LicenseMainPageContentMainPageDiv>
    );
};

export default PcAssetMainPage;
