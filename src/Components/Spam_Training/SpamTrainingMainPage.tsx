import React from "react";
import styled from "styled-components";
import CompanySelectMenuBar from "../Navigation/CompanySelectMenuBar/CompanySelectMenuBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Models";
import { MenuAccessType } from "../PCAssetMainPage/PcAssetMainPage";
import { ChangeAccessKeyMenuBarRedux } from "../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux";
import SpamTrainingContainer from "./Spam_Training_Container/SpamTrainingContainer";


const SpamTrainingMainPageMainDivBox = styled.div`
    width:100%;
    
`

const SpamTrainingMainPage = () => {
    const dispatch = useDispatch();
    const CompanySelectAccessKey = useSelector((state: RootState) => state.AccessKeyMenuBarData.CompanySelectAccessKey);
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
    return (
        <SpamTrainingMainPageMainDivBox>
            <CompanySelectMenuBar
                CompanySelectAccessKey={CompanySelectAccessKey}
                handleCompanyClicks={handleCompanyClicks}
            ></CompanySelectMenuBar>
             {CompanySelectAccessKey.map((list: MenuAccessType) =>
                list.AccessKey ? (
                    <div key={list.name} className="MainContent_Div_Box">
                        <SpamTrainingContainer SelectCompany={list.name}></SpamTrainingContainer>
                    </div>
                ) : (
                    ''
                )
            )}
        </SpamTrainingMainPageMainDivBox>
    )
}

export default SpamTrainingMainPage;