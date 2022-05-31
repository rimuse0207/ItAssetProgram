import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { RootState } from '../index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { LicenseDataType } from '../../Components/LicenseMainPage/VolumeLicenseMainPage/VolumeLicenseDataTypes';
import { LicenseInfoGet } from '../../Apis/core/api/AuthNeedApi/LicenseApi';

const License_GET_LicenseData_GET = 'License_LicenseData/License_GET_LicenseData_GET';
const License_GET_LicenseData_SUCCESS = 'License_LicenseData/License_GET_LicenseData_SUCCESS';
const License_GET_FoodData_ERROR = 'License_LicenseData/License_GET_LicenseData_ERROR';

const License_getLicenseDataAsync = createAsyncAction(
    License_GET_LicenseData_GET,
    License_GET_LicenseData_SUCCESS,
    License_GET_FoodData_ERROR
)<undefined, LicenseDataType, AxiosError>();

const TeamLeader_getDataFoodApply = async (ParamsData: {}) => {
    try {
        const getInfoLicenseData = await LicenseInfoGet('/license_app_server/LicenseSelect', ParamsData);

        if (getInfoLicenseData.data.dataSuccess) {
            return getInfoLicenseData.data.data;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    License_GET_LicenseData_GET,
    License_GET_LicenseData_SUCCESS,
    License_GET_FoodData_ERROR,
};

type LicenseDataAction = ActionType<typeof actions> | ActionType<any>;

type LicenseDataTypes = {
    LicenseData: {
        loading: boolean;
        error: Error | null;
        data: LicenseDataType | any;
        dataChecked: boolean;
    };
};

export function License_getLicenseDataThunk(ParamasData: {}): ThunkAction<void, RootState, null, LicenseDataAction> {
    return async dispatch => {
        const { request, success, failure } = License_getLicenseDataAsync;
        dispatch(request());
        try {
            const getInfoLicenseData = await TeamLeader_getDataFoodApply(ParamasData);
            if (getInfoLicenseData) {
                dispatch(success(getInfoLicenseData));
            } else {
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

const initialState: LicenseDataTypes = {
    LicenseData: {
        loading: false,
        error: null,
        data: null,
        dataChecked: false,
    },
};

const LicenseDataGetting = createReducer<LicenseDataTypes, LicenseDataAction>(initialState, {
    [License_GET_LicenseData_GET]: state => ({
        ...state,
        LicenseData: {
            loading: false,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [License_GET_LicenseData_SUCCESS]: (state, action) => ({
        ...state,
        LicenseData: {
            loading: true,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [License_GET_FoodData_ERROR]: (state, action) => ({
        ...state,
        LicenseData: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
});

export default LicenseDataGetting;
