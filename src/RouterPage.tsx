import React from 'react';
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

const RouterPage = () => {
    const LoginCheckData = useSelector((state: RootState) => state.LoginCheck);

    return (
        <BrowserRouter>
            <Switch>
                <div>
                    {LoginCheckData.LoginCheck ? (
                        <div style={{ display: 'flex' }}>
                            <div>
                                <NavigationMenuBarMainPage></NavigationMenuBarMainPage>
                            </div>
                            <Route exact path="/" component={App}></Route>
                            <Route exact path="/license/:type" component={LicenseMainPage}></Route>
                            <Route path="/PCAsset" component={PcAssetMainPage}></Route>
                            <Route path="/Test" component={TestPage}></Route>
                            <Route path="/Personal" component={PersonalMainPage}></Route>
                            <Route path="/settingChange" component={SettingChangeMainPage}></Route>
                            <Route exact path="/PersonnelDashBoard/:type" component={PersonnelAdminDashBoardMainPage}></Route>
                            <Route path="/TotalDashBoard" component={TotalDashBoardMainPage}></Route>
                            <Route path="/LicenseSettingAdd" component={LicenseSettingMainPage}></Route>
                            <Route path="/LicenseSettingSelect" component={LicenseSettingSelect}></Route>
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
