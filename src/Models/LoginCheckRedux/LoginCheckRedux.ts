const LoginCheckRedux_GET = 'LicenseFilteringRedux/LoginCheckRedux_GET' as const;
const LogoutRedux_GET = 'LogoutRedux/LogoutRedux_GET' as const;

export const LoginCheckRedux = (diff: LoginCheckState) => ({
    type: LoginCheckRedux_GET,
    payload: diff,
});
export const LogoutRedux = () => ({
    type: LogoutRedux_GET,
});

type LoginCheckAction = ReturnType<typeof LoginCheckRedux> | ReturnType<typeof LogoutRedux>;

export type LoginCheckState = {
    LoginCheck: boolean;
    email: string | null;
    LoginToken: string | null;
    refreshToken: string | null;
    AdminAccess: boolean;
};

const initialState: LoginCheckState = {
    LoginCheck: false,
    email: '',
    LoginToken: '',
    refreshToken: '',
    AdminAccess: false,
};

function LoginCheck(state: LoginCheckState = initialState, action: LoginCheckAction): LoginCheckState {
    switch (action.type) {
        case LoginCheckRedux_GET:
            return action.payload;
        case LogoutRedux_GET:
            return initialState;
        default:
            return state;
    }
}

export default LoginCheck;
