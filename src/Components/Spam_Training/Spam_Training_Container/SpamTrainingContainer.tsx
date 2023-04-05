import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpamTrainingTableMainPage from "./SpamTrainingTable/SpamTrainingTableMainPage";
import { request } from "../../../Apis/core";

const SpamTrainingContainerMainDivBox = styled.div`
    
`

type SpamTrainingContainerPropsType = {
    SelectCompany: string;
}

type SelectCountTypes = {
    spam_traning_date_list_indexs: number;
    spam_traning_date_list_date: string;
}

const SpamTrainingContainer = ({ SelectCompany }: SpamTrainingContainerPropsType) => {
    const [SelectCount, setSelectCount] = useState<SelectCountTypes[]>([]);
    const [SelectDate, setSelectDate] = useState('');

    const DateList_Getting = async () => {
        try {
            
            const DateList_Getting_Axios = await request.get(`/SpamTrain_app_server/Spam_Training_Date_list`)

            if (DateList_Getting_Axios.data.dataSuccess) {
                console.log(DateList_Getting_Axios);
                setSelectCount(DateList_Getting_Axios.data.Spam_Training_Date_list_Rows)
                setSelectDate(DateList_Getting_Axios.data.Spam_Training_Date_list_Rows[0].spam_traning_date_list_date)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        DateList_Getting();
    },[])
    return (
        <SpamTrainingContainerMainDivBox>
            {/* <SpamTrainingGraphMainPage SelectCompany={SelectCompany}></SpamTrainingGraphMainPage> */}
            <select>
                {SelectCount.map((list) => {
                    return <option key={list.spam_traning_date_list_indexs} value={list.spam_traning_date_list_date}>{ list.spam_traning_date_list_date}</option>
                })}
            </select>
            <SpamTrainingTableMainPage SelectCompany={SelectCompany} SelectDate={SelectDate}></SpamTrainingTableMainPage>
        </SpamTrainingContainerMainDivBox>
    )
}

export default SpamTrainingContainer