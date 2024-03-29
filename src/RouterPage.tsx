import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import App from './App';
import LicenseMainPage from './Components/LicenseMainPage/LicenseMainPage';
import PcAssetMainPage from './Components/PCAssetMainPage/PcAssetMainPage';
import PersonalMainPage from './Components/PersonalMainPage/PersonalMainPage';
import NavigationMenuBarMainPage from './Components/Navigation/NavigationMenuBarMainPage';
import { useSelector } from 'react-redux';
import { RootState } from './Models';
import TestPage from './Containers/TestPage';
import LoginMainPage from './Components/Login/LoginMainPage';
import SettingChangeMainPage from './Components/PCAssetMainPage/PcAssetMenuIcons/PcAssetModals/SettingChange/SettingChangeMainPage';
import PersonnelAdminDashBoardMainPage from './Components/PersonnelAdminDashBoard/PersonnelAdminDashBoardMainPage';
import TotalDashBoardMainPage from './Components/TotalDashBoard/TotalDashBoardMainPage';
import LicenseSettingMainPage from './Components/LicenseSetting/LicenseSettingMainPage';
import LicenseSettingSelect from './Components/LicenseSetting/LicenseSettingSelect';
import LogMainPage from './Components/LicenseSetting/LogMainPage/LogMainPage';
import axios from 'axios';
import PrinterLogMonitoringMainPage from './Components/PrinterLogMonitoring/PrinterLogMonitoringMainPage';
import ConsumableMainPage from './Components/Consumable/ConsumableMainPage';
import ConsumableDetailMainPage from './Components/Consumable/ConsumableLists/ConsumableDetail/ConsumableDetailMainPage';
import SoftWareInstallMainPage from './Components/SoftwareInstall/SoftWareInstallMainPage';
import SpamTrainingMainPage from './Components/Spam_Training/SpamTrainingMainPage';

const RouterPage = () => {
    const LoginCheckData = useSelector((state: RootState) => state.LoginCheck);

    useEffect(() => {
        BrityData();
    }, []);
    const BrityData = async () => {
        const BrityApi = await axios.post(`https://openapi.stage.britymail.com/employee`, {
            params: {},
            headers: {
                'System-ID': 'A34REST00001',
                Authorization: 'Bearer 42ec2517-50d8-3ee6-8cef-71dca23091f2',
            },
        });

        console.log(BrityApi);
    };

    return (
        <BrowserRouter>
            <Switch>
                <div>
                    {LoginCheckData.LoginCheck ? (
                        <div style={{ display: 'flex' }}>
                            <div>
                                <NavigationMenuBarMainPage></NavigationMenuBarMainPage>
                            </div>
                            {/* 사용자 용 및 관리자 메뉴 */}
                            <Route exact path="/" component={App}></Route>
                            <Route path="/Personal" component={PersonalMainPage}></Route>

                            {/*  관리자 메뉴 */}
                            <Route exact path="/license/:type" component={LicenseMainPage}></Route>
                            <Route path="/PCAsset/:type" component={PcAssetMainPage}></Route>
                            <Route path="/Test" component={TestPage}></Route>
                            {/* <Route path="/settingChange" component={SettingChangeMainPage}></Route> */}
                            <Route exact path="/PersonnelDashBoard/:type" component={PersonnelAdminDashBoardMainPage}></Route>
                            <Route path="/TotalDashBoard" component={TotalDashBoardMainPage}></Route>
                            <Route path="/LicenseSettingAdd" component={LicenseSettingMainPage}></Route>
                            <Route path="/LicenseSettingSelect" component={LicenseSettingSelect}></Route>
                            <Route path="/Change_log" component={LogMainPage}></Route>
                            <Route exact path="/ITConsumable" component={ConsumableMainPage}></Route>
                            <Route path="/ITConsumable/Detail/:It_Code/:Select_Company" component={ConsumableDetailMainPage}></Route>
                            <Route path="/Install_SoftWare" component={SoftWareInstallMainPage}></Route>
                            <Route path="/Spam_Training" component={SpamTrainingMainPage}></Route>
                            {/* <Route path="/PrinterLogMonitoring" component={PrinterLogMonitoringMainPage}></Route> */}
                        </div>
                    ) : (
                        <div>
                            <Route exact path="*" component={LoginMainPage}></Route>
                        </div>
                    )}
                </div>
            </Switch>
        </BrowserRouter>
    );
};

export default RouterPage;
