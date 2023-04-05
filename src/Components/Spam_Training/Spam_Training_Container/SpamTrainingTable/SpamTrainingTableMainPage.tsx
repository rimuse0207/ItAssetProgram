import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../../../../Apis/core";
import moment from "moment";

const SpamTrainingTableMainPageMainDivBox = styled.div`
    
      table {
        font-size: 0.8em;
        position: relative;
        width: 90%;
        margin-left:10px;
        margin-top:10px;
        max-height:80vh;
        overflow:auto;
    }
    @media only screen and (max-width: 1700px) {
        table.type09 {
            font-size: 0.6em !important;
        }
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border-bottom: 3px solid #036;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
    }
    .table_color_on {
        background-color: #e8e8e8;

        :first-child {
            border-top: 5px solid black;
        }
    }
`

type SpamTrainingTableMainPagePropsType = {
    SelectCompany: string;
    SelectDate: string;
}

type UserDataTypes = {
    email: string;
    name: string
    team: string;
    position: string;
    userinfo_mac: string;
    userinfo_ip: string;
    inservice: string;
    updatedate: string;
    companyinfo_companycode: string;
    spam_click_user_click_date: string;
    spam_click_user_ip: string;
    spam_training_contact_date_contact_date: null | string;
}

const SpamTrainingTableMainPage = ({ SelectCompany, SelectDate }: SpamTrainingTableMainPagePropsType) => {

    const [UserData, setUserData] = useState<UserDataTypes[]>([]);


    const handleClick = async (data:UserDataTypes) => {
        try {
            
            const Contact_Checking_SQL_Axios = await request.post('/SpamTrain_app_server/Contact_Checking', {
                data
            })

            if (Contact_Checking_SQL_Axios.data.dataSuccess) {
                console.log(Contact_Checking_SQL_Axios);
                Getting_user_Info_Data();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const Getting_user_Info_Data = async () => {
        try {
            const Getting_user_Info_Data_Axios =await request.post(`/SpamTrain_app_server/Spam_Training_User_Data`, {
               
                    SelectCompany,
                    SelectDate
                
            })  
            if (Getting_user_Info_Data_Axios.data.dataSuccess) {
                setUserData(Getting_user_Info_Data_Axios.data.Spam_Training_User_Data_Getting_Rows);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Getting_user_Info_Data();
    },[SelectCompany,SelectDate])

    return (
        <SpamTrainingTableMainPageMainDivBox>
            <table className="type09">
                    <thead>
                        <tr className="Thead_tr_table">
                        <th>NO. ( 총 { UserData.length} 명 )</th>
                            <th>이름</th>
                            <th>직급</th>
                            <th>부서</th>
                            <th>E-Mail</th>
                            <th>클릭 일자</th>
                            <th>IP주소</th>
                            <th>연락 확인</th>

                        </tr>
                    </thead>
                    <tbody>
                    {UserData.map((list,i) => {
                        return <tr>
                            <td>{i + 1}</td>
                            <td>{list.name}</td>
                            <td>{list.position}</td>
                            <td>{list.team}</td>
                            <td>{list.email}</td>
                            <td>{moment(list.spam_click_user_click_date).format("YYYY-MM-DD HH:mm")}</td>
                            <td>{list.spam_click_user_ip}</td>
                            {list.spam_training_contact_date_contact_date ? <td>{ moment(list.spam_training_contact_date_contact_date).format("YYYY-MM-DD HH:mm")}</td>:<td><button onClick={()=>handleClick(list)}>연락 확인</button></td>}
                            </tr>
                        })}
                    </tbody>
                </table>
        </SpamTrainingTableMainPageMainDivBox>
    )
}

export default SpamTrainingTableMainPage;