import axios, { AxiosError } from 'axios';
import { RootState } from '../index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { DeskTopInfoDataType } from '../../Components/PCAssetMainPage/PCAssetDataType';
import { AssetDesktopInfoGet } from '../../Apis/core/api/AuthNeedApi/LicenseApi';

const MonitorAsset_GET_MonitorAssetData_GET = 'MonitorAsset_MonitorAssetData/MonitorAsset_GET_MonitorAssetData_GET';
const MonitorAsset_GET_MonitorAssetData_SUCCESS = 'MonitorAsset_MonitorAssetData/MonitorAsset_GET_MonitorAssetData_SUCCESS';
const MonitorAsset_GET_MonitorAssetData_ERROR = 'MonitorAsset_MonitorAssetData/MonitorAsset_GET_MonitorAssetData_ERROR';

const MonitorAsset_getMonitorAssetDataAsync = createAsyncAction(
    MonitorAsset_GET_MonitorAssetData_GET,
    MonitorAsset_GET_MonitorAssetData_SUCCESS,
    MonitorAsset_GET_MonitorAssetData_ERROR
)<undefined, DeskTopInfoDataType, AxiosError>();

const TeamLeader_getDataMonitorAssetApply = async (ParamsData: {}) => {
    try {
        const getInfoLicenseData = await AssetDesktopInfoGet('/Asset_app_server/AssetSelect', ParamsData);
        return getInfoLicenseData.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    MonitorAsset_GET_MonitorAssetData_GET,
    MonitorAsset_GET_MonitorAssetData_SUCCESS,
    MonitorAsset_GET_MonitorAssetData_ERROR,
};

type MonitorAssetDataAction = ActionType<typeof actions> | ActionType<any>;

type MonitorAssetDataTypes = {
    MonitorAssetData: {
        loading: boolean;
        error: Error | null;
        data: DeskTopInfoDataType | any;
        dataChecked: boolean;
    };
};

export function MonitorAsset_getMonitorAssetDataThunk(ParamasData: {}): ThunkAction<void, RootState, null, MonitorAssetDataAction> {
    return async dispatch => {
        const { request, success, failure } = MonitorAsset_getMonitorAssetDataAsync;
        dispatch(request());
        try {
            const getInfoMonitorAssetData = await TeamLeader_getDataMonitorAssetApply(ParamasData);

            if (getInfoMonitorAssetData) {
                dispatch(success(getInfoMonitorAssetData));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

const initialState: MonitorAssetDataTypes = {
    MonitorAssetData: {
        loading: false,
        error: null,
        data: null,
        dataChecked: false,
    },
};

const MonitorAssetDataGetting = createReducer<MonitorAssetDataTypes, MonitorAssetDataAction>(initialState, {
    [MonitorAsset_GET_MonitorAssetData_GET]: state => ({
        ...state,
        MonitorAssetData: {
            loading: false,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [MonitorAsset_GET_MonitorAssetData_SUCCESS]: (state, action) => ({
        ...state,
        MonitorAssetData: {
            loading: true,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [MonitorAsset_GET_MonitorAssetData_ERROR]: (state, action) => ({
        ...state,
        MonitorAssetData: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
});

export default MonitorAssetDataGetting;
