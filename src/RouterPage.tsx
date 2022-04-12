import React from 'react';
import { Switch, Route, BrowserRouter,Redirect } from 'react-router-dom';
import App from './App';
import LicenseMainPage from './Components/LicenseMainPage/LicenseMainPage';
import PcAssetMainPage from './Components/PCAssetMainPage/PcAssetMainPage';
import PersonalMainPage from './Components/PersonalMainPage/PersonalMainPage';
import NavigationMenuBarMainPage from './Components/Navigation/NavigationMenuBarMainPage';
import {useSelector} from "react-redux";
import { RootState } from './Models';
import TestPage from './Containers/TestPage';
import LoginMainPage from './Components/Login/LoginMainPage';

const RouterPage = () => {
    
    const LoginCheckData = useSelector((state:RootState)=>state.LoginCheck)

    console.log(LoginCheckData)

    return (
        <BrowserRouter>
            <Switch>
            <div>
                {LoginCheckData.LoginCheck ? <div style={{ display: 'flex' }}>
                    <div>
                        <NavigationMenuBarMainPage></NavigationMenuBarMainPage>
                    </div>
                        <Route exact path="/" component={App}></Route>
                        <Route exact path="/license/:type" component={LicenseMainPage}></Route>
                        <Route path="/PCAsset" component={PcAssetMainPage}></Route>
                        <Route path="/Test" component={TestPage}></Route>
                        <Route path="/Personal" component={PersonalMainPage}></Route>
                 </div>:
                 <div>
                     <Route path="/Login" component={LoginMainPage}></Route>
                     <Redirect path="*" to="/Login" />
                 </div>}
                
             </div>
            </Switch>
        </BrowserRouter>
    );
};

export default RouterPage;
