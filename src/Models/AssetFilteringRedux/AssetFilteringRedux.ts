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
        asset_management_number: string;
        asset_maker: string;
        start_asset_purchasedate: string;
        finish_asset_purchasedate: string;
        companyInfo: string;
        userInfo: string;
        asset_cpu: string;
        asset_ram: string;
        asset_disk: string;
        asset_model: string;
        asset_newcode: string;
        asset_not_used_user: boolean;
    };
};

const initialState: FilteringState = {
    FilteringData: {
        asset_management_number: '',
        asset_maker: '',
        start_asset_purchasedate: '',
        finish_asset_purchasedate: '',
        companyInfo: '',
        userInfo: '',
        asset_cpu: '',
        asset_ram: '',
        asset_disk: '',
        asset_model: '',
        asset_newcode: '',
        asset_not_used_user: false,
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
