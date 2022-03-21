import axios, { AxiosError } from 'axios';
import { RootState } from '../index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { DeskTopInfoDataType } from '../../Components/PCAssetMainPage/PCAssetDataType';
import { AssetDesktopInfoGet } from '../../Apis/core/api/AuthNeedApi/LicenseApi';

const NoteBookAsset_GET_NoteBookAssetData_GET = 'NoteBookAsset_NoteBookAssetData/NoteBookAsset_GET_NoteBookAssetData_GET';
const NoteBookAsset_GET_NoteBookAssetData_SUCCESS = 'NoteBookAsset_NoteBookAssetData/NoteBookAsset_GET_NoteBookAssetData_SUCCESS';
const NoteBookAsset_GET_NoteBookAssetData_ERROR = 'NoteBookAsset_NoteBookAssetData/NoteBookAsset_GET_NoteBookAssetData_ERROR';

const NoteBookAsset_getNoteBookAssetDataAsync = createAsyncAction(
    NoteBookAsset_GET_NoteBookAssetData_GET,
    NoteBookAsset_GET_NoteBookAssetData_SUCCESS,
    NoteBookAsset_GET_NoteBookAssetData_ERROR
)<undefined, DeskTopInfoDataType, AxiosError>();

const TeamLeader_getDataNoteBookAssetApply = async (ParamsData: {}) => {
    try {
        const getInfoLicenseData = await AssetDesktopInfoGet('/Asset_app_server/AssetSelect', ParamsData);
        return getInfoLicenseData.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    NoteBookAsset_GET_NoteBookAssetData_GET,
    NoteBookAsset_GET_NoteBookAssetData_SUCCESS,
    NoteBookAsset_GET_NoteBookAssetData_ERROR,
};

type NoteBookAssetDataAction = ActionType<typeof actions> | ActionType<any>;

type NoteBookAssetDataTypes = {
    NoteBookAssetData: {
        loading: boolean;
        error: Error | null;
        data: DeskTopInfoDataType | any;
        dataChecked: boolean;
    };
};

export function NoteBookAsset_getNoteBookAssetDataThunk(ParamasData: {}): ThunkAction<void, RootState, null, NoteBookAssetDataAction> {
    return async dispatch => {
        const { request, success, failure } = NoteBookAsset_getNoteBookAssetDataAsync;
        dispatch(request());
        try {
            const getInfoNoteBookAssetData = await TeamLeader_getDataNoteBookAssetApply(ParamasData);

            if (getInfoNoteBookAssetData) {
                dispatch(success(getInfoNoteBookAssetData));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

const initialState: NoteBookAssetDataTypes = {
    NoteBookAssetData: {
        loading: false,
        error: null,
        data: null,
        dataChecked: false,
    },
};

const NoteBookAssetDataGetting = createReducer<NoteBookAssetDataTypes, NoteBookAssetDataAction>(initialState, {
    [NoteBookAsset_GET_NoteBookAssetData_GET]: state => ({
        ...state,
        NoteBookAssetData: {
            loading: false,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [NoteBookAsset_GET_NoteBookAssetData_SUCCESS]: (state, action) => ({
        ...state,
        NoteBookAssetData: {
            loading: true,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [NoteBookAsset_GET_NoteBookAssetData_ERROR]: (state, action) => ({
        ...state,
        NoteBookAssetData: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
});

export default NoteBookAssetDataGetting;
