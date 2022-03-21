import { request } from '../../../index';

export const LicenseUserDelete = (RequestURL: string, ParamasData: {}) => {
    return request.post(RequestURL, {
        params: ParamasData,
    });
};
