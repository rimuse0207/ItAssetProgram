import { combineReducers } from 'redux';
import LicenseData from './LicenseDataReduxThunk/LicenseDataThunks';
import DeskTopAssetData from './AssetDataReduxThunk/AssetDeskTopDataThunks';
import NoteBookAssetData from './AssetDataReduxThunk/AssetNotBookDataThunks';
import MonitorAssetData from './AssetDataReduxThunk/AssetMonitorDataThunks';
import FilteringData from './AssetFilteringRedux/AssetFilteringRedux';
const rootReducer = combineReducers({
    LicenseData,
    DeskTopAssetData,
    NoteBookAssetData,
    MonitorAssetData,
    FilteringData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
