import { combineReducers } from 'redux';
import LicenseData from './LicenseDataReduxThunk/LicenseDataThunks';
import DeskTopAssetData from './AssetDataReduxThunk/AssetDeskTopDataThunks';
import NoteBookAssetData from './AssetDataReduxThunk/AssetNotBookDataThunks';
import MonitorAssetData from './AssetDataReduxThunk/AssetMonitorDataThunks';
import FilteringData from './AssetFilteringRedux/AssetFilteringRedux';
import LicenseFilteringData from './LicenseFilteringRedux/LicenseFilteringRedux';
import LoginCheck from './LoginCheckRedux/LoginCheckRedux';
import AccessKeyMenuBarData from './AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';

const rootReducer = combineReducers({
    LicenseData,
    DeskTopAssetData,
    NoteBookAssetData,
    MonitorAssetData,
    FilteringData,
    LicenseFilteringData,
    LoginCheck,
    AccessKeyMenuBarData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
