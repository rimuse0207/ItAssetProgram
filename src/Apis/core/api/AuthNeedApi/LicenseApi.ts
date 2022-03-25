import { request } from '../../index';

export const LicenseInfoGet = (RequestURL: string, ParamasData: {}) => {
    return request.post(RequestURL, {
        params: ParamasData,
    });
};
export const LicenseUserInfoGet = (RequestURL: string, ParamasData: {}) => {
    return request.get(RequestURL, {
        params: ParamasData,
    });
};

export const AssetDesktopInfoGet = (RequestURL: string, ParamasData: {}) => {
    return request.post(RequestURL, {
        params: ParamasData,
    });
};