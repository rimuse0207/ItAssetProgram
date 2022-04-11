import React from "react";
import styled from "styled-components";
import {CompanySelectTypes} from "./CompanySelectTypes"

type CompanySelectMenuBarPropsType = {
    CompanySelectAccessKey:CompanySelectTypes[];
    handleCompanyClicks:any;
}


const LicenseMainPageMainDivBox = styled.div`
    width: 100%;
    border-bottom: 2px solid lightgray;
    margin-top: 20px;
    margin-bottom: 20px;

    ul {
        display: flex;
        li {
            :hover {
                cursor: pointer;
            }
            .LineText {
                font-size: 1em;
                color: #999;
                background-color: transparent;
                height: 40px;
                line-height: 38px;
                padding: 0 40px;
            }
            position: relative;
            .LineActions {
                position: absolute;
                animation-name: slidings;
                animation-duration: 0.8s;
                @keyframes slidings {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
                border-bottom: 2px solid #515151;
                width: 100%;
            }
        }
    }
`;


const CompanySelectMenuBar = ({CompanySelectAccessKey,handleCompanyClicks}:CompanySelectMenuBarPropsType) =>{
    return(
        <LicenseMainPageMainDivBox>
        <div>
            <ul>
                {CompanySelectAccessKey.map((list, i) => {
                    return (
                        <li key={list.name} onClick={() => handleCompanyClicks(list)}>
                            {list.AccessKey ? (
                                <>
                                    <div className="LineText" style={{ color: '#050404', fontWeight: 'bold' }}>
                                        {list.name}
                                    </div>
                                    <div className="LineActions"></div>
                                </>
                            ) : (
                                <div className="LineText">{list.name}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    </LicenseMainPageMainDivBox>
    )
}

export default CompanySelectMenuBar;