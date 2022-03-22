import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { BiServer } from 'react-icons/bi';
import { BsCircleSquare, BsFillPersonFill, BsFillCartFill, BsPieChartFill } from 'react-icons/bs';
import { IoIosChatboxes } from 'react-icons/io';
import { VscGraphLine } from 'react-icons/vsc';
import { AiFillFolderOpen, AiFillSetting } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';
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
    const [MenuHiddenCheck, setMenuHiddenCheck] = useState(false);
    const [MenuCheckedSubLists, setMenuCheckedSubLists] = useState({
        setting: false,
        license: true,
    });
    let { type } = useParams<URLParams>();
    console.log();
    return (
        <NavigationMenuBarMainPageMainDivBox menuStatus={MenuHiddenCheck} MenuCheckedSubLists={MenuCheckedSubLists}>
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
                                <BsCircleSquare></BsCircleSquare>
                            </li>
                            <li>
                                <BsFillPersonFill></BsFillPersonFill>
                            </li>

                            <li>
                                <IoIosChatboxes></IoIosChatboxes>
                            </li>
                            <li>
                                <VscGraphLine></VscGraphLine>
                            </li>
                            <li>
                                <BsPieChartFill></BsPieChartFill>
                            </li>
                            <li>
                                <AiFillFolderOpen></AiFillFolderOpen>
                            </li>
                            <li>
                                <BsFillCartFill></BsFillCartFill>
                            </li>
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
                                        <div className="listStyleSubLists">Personal</div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="listStyleDivBox">
                                    <div>
                                        <BsPieChartFill></BsPieChartFill>
                                    </div>
                                    <div className="listStyleSubLists">Company</div>
                                </div>
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
                                                setMenuCheckedSubLists({ ...MenuCheckedSubLists, license: !MenuCheckedSubLists.license })
                                            }
                                        >
                                            <div>License</div>
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
                                        <li className={type === 'volume_license' ? 'NowPageSelect' : ''}>
                                            <Link to="/license/volume_license">Volume License</Link>
                                        </li>
                                        <li className={type === 'package_license' ? 'NowPageSelect' : ''}>
                                            <Link to="/license/package_license">Package License</Link>
                                        </li>
                                        <li className={type === 'usbtype_license' ? 'NowPageSelect' : ''}>
                                            <Link to="/license/usbtype_license">USBType License</Link>
                                        </li>
                                        <li className={type === 'network_license' ? 'NowPageSelect' : ''}>
                                            <Link to="/license/network_license">Network License</Link>
                                        </li>
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
                                            <div>Setting</div>
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
                                        <li>Change Password</li>
                                        <li>Request Board</li>
                                        <li>Logout</li>
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
