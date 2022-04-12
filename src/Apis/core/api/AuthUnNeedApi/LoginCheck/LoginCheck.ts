import { request } from '../../../index';

export const LoginCheckAPI = (RequestURL: string, ParamasData: {}) => {
    return request.post(RequestURL, {
        params: ParamasData,
    });
};
