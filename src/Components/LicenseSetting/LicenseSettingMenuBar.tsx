import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const LicenseSettingMenuBarMainDivBox = styled.div`
    min-width: 100%;
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

const LicenseSettingMenuBar = () => {
    let Code = useLocation<any>();
    return (
        <LicenseSettingMenuBarMainDivBox>
            <ul>
                <Link to="/LicenseSettingSelect">
                    <li>
                        <div
                            className="LineText"
                            style={Code.pathname === '/LicenseSettingSelect' ? { color: '#050404', fontWeight: 'bold' } : {}}
                        >
                            등록된 라이선스 설정 조회
                        </div>
                    </li>
                </Link>
                <Link to="/LicenseSettingAdd">
                    <li>
                        <div
                            className="LineText"
                            style={Code.pathname === '/LicenseSettingAdd' ? { color: '#050404', fontWeight: 'bold' } : {}}
                        >
                            등록된 라이선스 설정 추가
                        </div>
                    </li>
                </Link>
            </ul>
        </LicenseSettingMenuBarMainDivBox>
    );
};

export default LicenseSettingMenuBar;
