import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { RootState } from '../index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { DeskTopInfoDataType } from '../../Components/PCAssetMainPage/PCAssetDataType';
import { AssetDesktopInfoGet } from '../../Apis/core/api/AuthNeedApi/LicenseApi';
import { getDatasProps } from '../../Components/PCAssetMainPage/PCAssetAllData';

const DeskTopAsset_GET_DeskTopAssetData_GET = 'DeskTopAsset_DeskTopAssetData/DeskTopAsset_GET_DeskTopAssetData_GET';
const DeskTopAsset_GET_DeskTopAssetData_SUCCESS = 'DeskTopAsset_DeskTopAssetData/DeskTopAsset_GET_DeskTopAssetData_SUCCESS';
const DeskTopAsset_GET_DeskTopAssetData_ERROR = 'DeskTopAsset_DeskTopAssetData/DeskTopAsset_GET_DeskTopAssetData_ERROR';

const DeskTopAsset_getDeskTopAssetDataAsync = createAsyncAction(
    DeskTopAsset_GET_DeskTopAssetData_GET,
    DeskTopAsset_GET_DeskTopAssetData_SUCCESS,
    DeskTopAsset_GET_DeskTopAssetData_ERROR
)<undefined, DeskTopInfoDataType, AxiosError>();

const TeamLeader_getDataDeskTopAssetApply = async (ParamsData: {}) => {
    try {
        console.log(ParamsData);
        const getInfoLicenseData = await AssetDesktopInfoGet('/Asset_app_server/Asset_Data_Getting', ParamsData);
        return getInfoLicenseData.data.datas;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    DeskTopAsset_GET_DeskTopAssetData_GET,
    DeskTopAsset_GET_DeskTopAssetData_SUCCESS,
    DeskTopAsset_GET_DeskTopAssetData_ERROR,
};

type DeskTopAssetDataAction = ActionType<typeof actions> | ActionType<any>;

type DeskTopAssetDataTypes = {
    DeskTopAssetData: {
        loading: boolean;
        error: Error | null;
        data: getDatasProps[];
        dataChecked: boolean;
    };
};

export function DeskTopAsset_getDeskTopAssetDataThunk(ParamasData: {}): ThunkAction<void, RootState, null, DeskTopAssetDataAction> {
    return async dispatch => {
        const { request, success, failure } = DeskTopAsset_getDeskTopAssetDataAsync;
        dispatch(request());
        try {
            const getInfoDeskTopAssetData = await TeamLeader_getDataDeskTopAssetApply(ParamasData);

            if (getInfoDeskTopAssetData) {
                dispatch(success(getInfoDeskTopAssetData));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

const initialState: DeskTopAssetDataTypes = {
    DeskTopAssetData: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const DeskTopAssetDataGetting = createReducer<DeskTopAssetDataTypes, DeskTopAssetDataAction>(initialState, {
    [DeskTopAsset_GET_DeskTopAssetData_GET]: state => ({
        ...state,
        DeskTopAssetData: {
            loading: false,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [DeskTopAsset_GET_DeskTopAssetData_SUCCESS]: (state, action) => ({
        ...state,
        DeskTopAssetData: {
            loading: true,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [DeskTopAsset_GET_DeskTopAssetData_ERROR]: (state, action) => ({
        ...state,
        DeskTopAssetData: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
});

export default DeskTopAssetDataGetting;
