import React from "react";
import styled from "styled-components";
import BarGraphMainPage from "./BarGraph/BarGraphMainPage";
import DonutsGraphMainPage from "./DonutsGraph/DonutsGraphMainPage";
import SpamTrainingTableMainPage from "../SpamTrainingTable/SpamTrainingTableMainPage";

const SpamTrainingGraphMainPageMainDivBox = styled.div`
    
    .Graph_container{
        display:flex;
         .Line_Graph_Container{
        width:60%;
        height:300px;
      
    }
    .Donuts_Graph_Container{
        width:40%;
        height:300px;
    }
        
    }
   
    
`

type SpamTrainingGraphMainPagePropsType = {
    SelectCompany: string;
}


const SpamTrainingGraphMainPage = ({SelectCompany}:SpamTrainingGraphMainPagePropsType) => {
    return (
        <SpamTrainingGraphMainPageMainDivBox>
            <div className="Graph_container">
            <div className="Line_Graph_Container">
                <BarGraphMainPage></BarGraphMainPage>
            </div>
             <div className="Donuts_Graph_Container">
                <DonutsGraphMainPage></DonutsGraphMainPage>
             </div>
            </div>
            
        </SpamTrainingGraphMainPageMainDivBox>
    )
}

export default SpamTrainingGraphMainPage;