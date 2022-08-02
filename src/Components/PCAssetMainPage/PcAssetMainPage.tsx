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
import { CgArrowUpO } from 'react-icons/cg';
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
    .PageUpButton {
        position: fixed;
        bottom: 10px;
        right: 20px;
        font-size: 3em;
        text-align: center;
        :hover {
            cursor: pointer;
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

    // const Asset_Table_Ref = useRef<any>(null);
    // const [isTabnavOn, setIsTabnavOn] = useState(false);

    // const throttledScroll = useMemo(
    //     () =>
    //         throttle(() => {
    //             console.log('스크롤 이벤트');
    //             if (!Asset_Table_Ref.current) return;
    //             const nextTabnavOn = window.scrollY > Asset_Table_Ref.current.offsetTop + 100;

    //             console.log(nextTabnavOn);
    //             console.log('Now', window.scrollY);
    //             console.log('User', Asset_Table_Ref.current.offsetTop);
    //             if (nextTabnavOn !== isTabnavOn) setIsTabnavOn(nextTabnavOn);
    //         }, 300),
    //     [isTabnavOn]
    // );

    // useEffect(() => {
    //     console.log(window.scrollY);
    // });
    // useEffect(() => {
    //     console.log(window.scrollY);
    //     Asset_Table_Ref.current.addEventListener('scroll', throttledScroll);
    //     return () => {
    //         Asset_Table_Ref.current.removeEventListener('scroll', throttledScroll);
    //     };
    // }, [throttledScroll]);

    const handleCompanyClicks = async (data: MenuAccessType) => {
        const ChangeCompany = CompanySelectAccessKey.map((list: MenuAccessType, i: number) => {
            if (list.name === data.name) {
                list.AccessKey = true;
            } else {
                list.AccessKey = false;
            }
            return list;
        });
        await dispatch(ChangeAccessKeyMenuBarRedux(ChangeCompany));
    };

    return (
        <LicenseMainPageContentMainPageDiv>
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
