import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { BiServer } from 'react-icons/bi';
import { BsCircleSquare, BsFillPersonFill, BsFillCartFill, BsPieChartFill, BsFillPersonLinesFill } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRedux } from '../../Models/LoginCheckRedux/LoginCheckRedux';
import { RootState } from '../../Models';
import { ResetAccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import { useLocation } from 'react-router-dom';

type NavigationMenuBarMainPageMainDivBoxProps = {
    menuStatus: boolean;
    MenuCheckedSubLists: {};
};
type URLParams = {
    type: string;
};
const NavigationMenuBarMainPageMainDivBox = styled.nav<NavigationMenuBarMainPageMainDivBoxProps>`
    min-height: 100vh;
    position: sticky;

    background-color: #368;
    /* background-color: rgb(51, 63, 80); */

    /* background-color: rgb(32, 56, 100); */
    ${props =>
        props.menuStatus
            ? `animation-name: MenustatushiddenOn;
    animation-duration: .5s;
    animation-fill-mode: forwards;
    @keyframes MenustatushiddenOn{
        0%{
            width: 200px;
        }100%{
            width: 70px;
        }
    }`
            : `
        text-overflow: hidden;
        white-space : nowrap; 
            animation-name: MenustatushiddenOff;
    animation-duration: .5s;
    animation-fill-mode: forwards;
    @keyframes MenustatushiddenOff{
        0%{
            width: 70px;
        }100%{
            width: 200px;
        }
    }
    
    `}

    .HiddenMenuLists {
        .MainListsHambergerButton {
            color: white;
            padding: 20px;
            :hover {
                cursor: pointer;
            }
        }
        .MenuListsCotainerDiv {
            width: 70px;

            height: 100%;

            .MenuListsCotainerUl {
                li {
                    color: white;
                    padding: 20px;
                    :hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .ShowAbleMenuLists {
        .listStyleDivBox {
            display: flex;

            .listStyleSubLists {
                margin-left: 20px;
                width: 85%;
                .listsSubListsDivBox {
                    display: flex;
                    justify-content: space-between;
                    .HiddenOff {
                        transform: rotate(0.5turn);
                        transition-duration: 0.5s;
                    }
                    .HiddenOn {
                        transform: rotate(1turn);
                        transition-duration: 0.5s;
                    }
                }
            }
        }
        .TextOn {
            display: flex;
            flex-flow: wrap;
        }
        .MainListsHambergerButton {
            display: inline;
            padding: 30px;
        }
        .MainListsHambergerText {
            color: white;
            padding: 20px;
            font-size: 1em;
            font-weight: bolder;
            :hover {
                cursor: pointer;
            }
        }
        .MainListsHambergerText {
            text-overflow: hidden;
        }
        .MenuListsCotainerDiv {
            width: 70px;

            height: 100%;

            .MenuListsCotainerUl {
                li {
                    color: white;
                    padding: 12px;
                    width: 200px;
                    :hover {
                        background-color: darkgray;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .SubHiddenListsMenu {
        li {
            list-style: none;
            padding: 10px !important;
            color: white;
            padding-left: 60px !important;
            font-size: 0.8em;
            :hover {
                background-color: darkgray;
            }
        }
    }
    .MenuListsCotainerUl {
        li:hover {
            cursor: pointer;
        }
    }
    .NowPageSelect {
        background-color: darkgray !important;
        animation-name: BackGroundSlide;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        @keyframes BackGroundSlide {
            0% {
                width: 0px;
            }
            100% {
                width: 200px;
                background-color: darkgray !important;
            }
        }
    }
`;

const NavigationMenuBarMainPage = () => {
    const dispatch = useDispatch();

    const LoginCheckState = useSelector((state: RootState) => state.LoginCheck);

    const [MenuHiddenCheck, setMenuHiddenCheck] = useState(false);
    const [MenuCheckedSubLists, setMenuCheckedSubLists] = useState({
        setting: true,
        license: true,
        personnel: true,
    });
    let { type } = useParams<URLParams>();
    const PathLocation = useLocation();

    const handleLogout = async () => {
        await dispatch(LogoutRedux());
        await dispatch(ResetAccessKeyMenuBarRedux());
    };
    return (
        <NavigationMenuBarMainPageMainDivBox
            menuStatus={MenuHiddenCheck}
            MenuCheckedSubLists={MenuCheckedSubLists}
            style={PathLocation.pathname === '/settingChange' ? { display: 'none' } : {}}
        >
            {MenuHiddenCheck ? (
                <div className="HiddenMenuLists">
                    <div>
                        {/* <div>IT 자산 관리 프로그램</div> */}
                        <div className="MainListsHambergerButton" onClick={() => setMenuHiddenCheck(false)}>
                            <GiHamburgerMenu></GiHamburgerMenu>
                        </div>
                    </div>
                    <div className="MenuListsCotainerDiv">
                        <ul className="MenuListsCotainerUl">
                            <li>
                                <Link to="/Personal">
                                    <BsFillPersonFill></BsFillPersonFill>
                                </Link>
                            </li>
                            {LoginCheckState.AdminAccess ? (
                                <>
                                    <li>
                                        <BsFillPersonLinesFill></BsFillPersonLinesFill>
                                    </li>
                                    <li>
                                        <BsPieChartFill></BsPieChartFill>
                                    </li>

                                    <li>
                                        <BsFillCartFill></BsFillCartFill>
                                    </li>
                                    <li>
                                        <Link to="/PCAsset">
                                            <BsCircleSquare></BsCircleSquare>
                                        </Link>
                                    </li>
                                    <li>
                                        <BiServer></BiServer>
                                    </li>
                                </>
                            ) : (
                                ''
                            )}

                            <li>
                                <AiFillSetting></AiFillSetting>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="ShowAbleMenuLists">
                    <div className="TextOn">
                        <div className="MainListsHambergerText">
                            <Link to="/">IT 자산 관리</Link>
                            <div className="MainListsHambergerButton" onClick={() => setMenuHiddenCheck(true)}>
                                <GiHamburgerMenu></GiHamburgerMenu>
                            </div>
                        </div>
                    </div>

                    <div className="MenuListsCotainerDiv">
                        <ul className="MenuListsCotainerUl">
                            <li className={window.location.pathname === '/Personal' ? 'NowPageSelect' : ''}>
                                <Link to="/Personal">
                                    <div className="listStyleDivBox">
                                        <div>
                                            <BsFillPersonFill></BsFillPersonFill>
                                        </div>
                                        <div className="listStyleSubLists">내PC정보</div>
                                    </div>
                                </Link>
                            </li>
                            {LoginCheckState.AdminAccess ? (
                                <>
                                    <li>
                                        <div className="listStyleDivBox">
                                            <div>
                                                <BsFillPersonLinesFill></BsFillPersonLinesFill>
                                            </div>
                                            <div className="listStyleSubLists">
                                                <div
                                                    className="listsSubListsDivBox"
                                                    onClick={e =>
                                                        setMenuCheckedSubLists({
                                                            ...MenuCheckedSubLists,
                                                            personnel: !MenuCheckedSubLists.personnel,
                                                        })
                                                    }
                                                >
                                                    <div>인사관리</div>
                                                    {MenuCheckedSubLists.personnel ? (
                                                        <div className="HiddenOff">
                                                            <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                                        </div>
                                                    ) : (
                                                        <div className="HiddenOn">
                                                            <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <div className="SubHiddenListsMenu">
                                        {MenuCheckedSubLists.personnel ? (
                                            <ul className="settingClassNamesOn">
                                                <Link to="/PersonnelDashBoard/Select">
                                                    <li>임직원 조회</li>
                                                </Link>
                                                <Link to="/PersonnelDashBoard/AddData">
                                                    <li>임직원 추가</li>
                                                </Link>
                                            </ul>
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <li>
                                        <Link to="/TotalDashBoard">
                                            <div className="listStyleDivBox">
                                                <div>
                                                    <BsPieChartFill></BsPieChartFill>
                                                </div>
                                                <div className="listStyleSubLists">통합사용현황</div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="listStyleDivBox">
                                            <div>
                                                <BsFillCartFill></BsFillCartFill>
                                            </div>
                                            <div className="listStyleSubLists">
                                                <div
                                                    className="listsSubListsDivBox"
                                                    onClick={e =>
                                                        setMenuCheckedSubLists({
                                                            ...MenuCheckedSubLists,
                                                            license: !MenuCheckedSubLists.license,
                                                        })
                                                    }
                                                >
                                                    <div>라이선스</div>
                                                    {MenuCheckedSubLists.license ? (
                                                        <div className="HiddenOff">
                                                            <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                                        </div>
                                                    ) : (
                                                        <div className="HiddenOn">
                                                            <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <div className="SubHiddenListsMenu">
                                        {MenuCheckedSubLists.license ? (
                                            <ul className="settingClassNamesOn">
                                                <Link to="/license/volume_license">
                                                    <li className={type === 'volume_license' ? 'NowPageSelect' : ''}>Volume License</li>
                                                </Link>
                                                <Link to="/license/package_license">
                                                    <li className={type === 'package_license' ? 'NowPageSelect' : ''}>Package License</li>
                                                </Link>
                                                <Link to="/license/usbtype_license">
                                                    <li className={type === 'usbtype_license' ? 'NowPageSelect' : ''}>USBType License</li>
                                                </Link>
                                                <Link to="/license/network_license">
                                                    <li className={type === 'network_license' ? 'NowPageSelect' : ''}>Network License</li>
                                                </Link>
                                            </ul>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <li className={window.location.pathname === '/PCAsset' ? 'NowPageSelect' : ''}>
                                        <Link to="/PCAsset">
                                            <div className="listStyleDivBox">
                                                <div>
                                                    <BsCircleSquare></BsCircleSquare>
                                                </div>
                                                <div className="listStyleSubLists">PC</div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="listStyleDivBox">
                                            <div>
                                                <BiServer></BiServer>
                                            </div>
                                            <div className="listStyleSubLists">Server</div>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <div></div>
                            )}

                            <li>
                                <div className="listStyleDivBox">
                                    <div>
                                        <AiFillSetting></AiFillSetting>
                                    </div>
                                    <div className="listStyleSubLists">
                                        <div
                                            className="listsSubListsDivBox"
                                            onClick={e =>
                                                setMenuCheckedSubLists({ ...MenuCheckedSubLists, setting: !MenuCheckedSubLists.setting })
                                            }
                                        >
                                            <div>설정</div>
                                            {MenuCheckedSubLists.setting ? (
                                                <div className="HiddenOff">
                                                    <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                                </div>
                                            ) : (
                                                <div className="HiddenOn">
                                                    <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <div className="SubHiddenListsMenu">
                                {MenuCheckedSubLists.setting ? (
                                    <ul className="settingClassNamesOn">
                                        <Link to="/LicenseSettingSelect">
                                            <li>라이선스 설정</li>
                                        </Link>
                                        <li>비밀번호 변경</li>

                                        <li onClick={handleLogout}>로그아웃</li>
                                    </ul>
                                ) : (
                                    ''
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            )}
        </NavigationMenuBarMainPageMainDivBox>
    );
};

export default NavigationMenuBarMainPage;
