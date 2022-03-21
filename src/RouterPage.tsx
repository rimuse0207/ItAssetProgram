import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import LicenseMainPage from './Components/LicenseMainPage/LicenseMainPage';
import MainPageComponents from './Components/MainPageComponents';
import PcAssetMainPage from './Components/PCAssetMainPage/PcAssetMainPage';
import TestPage from './Containers/TestPage';
const RouterPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route exact path="/license/:type" component={LicenseMainPage}></Route>
                <Route path="/PCAsset" component={PcAssetMainPage}></Route>
                <Route path="/Test" component={TestPage}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default RouterPage;
