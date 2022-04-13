const AccessKeyMenuBarRedux_GET = 'AccessKeyMenuBarRedux/AccessKeyMenuBarRedux_GET' as const;
const ChangeAccessKeyMenuBarRedux_GET = 'ChangeAccessKeyMenuBarRedux/ChangeAccessKeyMenuBarRedux_GET' as const;
const ResetAccessKeyMenuBarRedux_GET = 'ResetAccessKeyMenuBarRedux/ResetAccessKeyMenuBarRedux_GET' as const;
export const AccessKeyMenuBarRedux = (diff: AccessKeyMenuBarState) => ({
    type: AccessKeyMenuBarRedux_GET,
    payload: diff,
});

export const ChangeAccessKeyMenuBarRedux = (diff: AccessKeyMenuBarState) => ({
    type: ChangeAccessKeyMenuBarRedux_GET,
    payload: diff,
});

export const ResetAccessKeyMenuBarRedux = () => ({
    type: ResetAccessKeyMenuBarRedux_GET,
});

type AccessKeyMenuBarAction =
    | ReturnType<typeof AccessKeyMenuBarRedux>
    | ReturnType<typeof ChangeAccessKeyMenuBarRedux>
    | ReturnType<typeof ResetAccessKeyMenuBarRedux>;

export type AccessKeyMenuBarState = {
    CompanySelectAccessKey: [] | any;
};

const initialState: AccessKeyMenuBarState = {
    CompanySelectAccessKey: [],
};

function AccessKeyMenuBar(state: AccessKeyMenuBarState = initialState, action: AccessKeyMenuBarAction): AccessKeyMenuBarState {
    switch (action.type) {
        case AccessKeyMenuBarRedux_GET:
            return {
                ...state,
                CompanySelectAccessKey: action.payload,
            };
        case ChangeAccessKeyMenuBarRedux_GET:
            return {
                ...state,
                CompanySelectAccessKey: action.payload,
            };
        case ResetAccessKeyMenuBarRedux_GET:
            return initialState;
        default:
            return state;
    }
}

export default AccessKeyMenuBar;
