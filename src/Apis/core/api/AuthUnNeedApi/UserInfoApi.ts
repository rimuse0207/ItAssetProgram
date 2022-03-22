import { request } from '../../index';

export const UserInfoGet = (RequestURL: string, ParamasData: {}) => {
    return request.get(RequestURL, {
        params: ParamasData,
    });
};
export const CompanyInfoGet = (RequestURL: string, ParamasData: {}) => {
    return request.get(RequestURL, {
        params: ParamasData,
    });
};

export const RandomCodeDataGet = (RequestURL: string, ParamasData: {}) => {
    return request.get(RequestURL, {
        params: ParamasData,
    });
};

export const PersonalInfoGet = (RequestURL: string, ParamasData: {}) => {
    return request.get(RequestURL, {
        params: ParamasData,
    });
};
