const LicenseFilteringRedux_GET = 'LicenseFilteringRedux/LicenseFilteringRedux_GET' as const;
const LicenseFilterResetRedux = 'LicenseFilteringRedux/LicenseFilterResetRedux' as const;
export const LicenseFilteringAdd = (diff: LicenseFilteringState) => ({
    type: LicenseFilteringRedux_GET,
    payload: diff,
});
export const LicenseFilteringReset = () => ({
    type: LicenseFilterResetRedux,
});

type LicenseFilteringAction = ReturnType<typeof LicenseFilteringAdd> | ReturnType<typeof LicenseFilteringReset>;

export type LicenseFilteringState = {
    license_product_code: string;
    license_product_name: string;
    license_manage_code: string;
    license_purchase_date: string;
    license_purchase_finish_date: string;
    license_purchase_min_pride: number;
    license_purchase_max_pride: number;
    license_newcode: string;
};

const initialState: LicenseFilteringState = {
    license_product_code: '',
    license_product_name: '',
    license_manage_code: '',
    license_purchase_date: '',
    license_purchase_finish_date: '',
    license_purchase_min_pride: 0,
    license_purchase_max_pride: 9999999999,
    license_newcode: '',
};

function LicenseFiltering(state: LicenseFilteringState = initialState, action: LicenseFilteringAction): LicenseFilteringState {
    switch (action.type) {
        case LicenseFilteringRedux_GET:
            return action.payload;
        case LicenseFilterResetRedux:
            return initialState;
        default:
            return state;
    }
}

export default LicenseFiltering;
