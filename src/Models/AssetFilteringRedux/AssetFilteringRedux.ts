const AssetFilteringRedux_GET = 'AssetFilteringRedux/AssetFilteringRedux_GET' as const;
const AssetFilterResetRedux = 'AssetFilteringRedux/AssetFilterResetRedux' as const;
export const AssetFilteringAdd = (diff: FilteringState) => ({
    type: AssetFilteringRedux_GET,
    payload: diff,
});
export const AssetFilteringReset = () => ({
    type: AssetFilterResetRedux,
});

type FilteringAction = ReturnType<typeof AssetFilteringAdd> | ReturnType<typeof AssetFilteringReset>;

export type FilteringState = {
    FilteringData: {
        code: '' | string;
        start_asset_purchasedate: '' | string;
        finish_asset_purchasedate: '' | string;
        asset_explain: '' | string;
        companylocation: '' | string;
        team: '' | string;
        name: '' | string;
    };
};

const initialState: FilteringState = {
    FilteringData: {
        code: '',
        start_asset_purchasedate: '',
        finish_asset_purchasedate: '',
        asset_explain: '',
        companylocation: '',
        team: '',
        name: '',
    },
};

function Filtering(state: FilteringState = initialState, action: FilteringAction): FilteringState {
    switch (action.type) {
        case AssetFilteringRedux_GET:
            return { FilteringData: action.payload.FilteringData };
        case AssetFilterResetRedux:
            return { FilteringData: initialState.FilteringData };
        default:
            return state;
    }
}

export default Filtering;
