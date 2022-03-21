import { request } from '../../../index';

export const LicenseUserAdd = (RequestURL: string, ParamasData: {}) => {
    return request.post(RequestURL, {
        params: ParamasData,
    });
};
