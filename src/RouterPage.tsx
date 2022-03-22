import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import LicenseMainPage from './Components/LicenseMainPage/LicenseMainPage';
import PcAssetMainPage from './Components/PCAssetMainPage/PcAssetMainPage';
import PersonalMainPage from './Components/PersonalMainPage/PersonalMainPage';

import TestPage from './Containers/TestPage';
const RouterPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route exact path="/license/:type" component={LicenseMainPage}></Route>
                <Route path="/PCAsset" component={PcAssetMainPage}></Route>
                <Route path="/Test" component={TestPage}></Route>
                <Route path="/Personal" component={PersonalMainPage}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default RouterPage;
