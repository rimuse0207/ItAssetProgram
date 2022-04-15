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

export const PersonalInfoGetData = (RequestURL: string, ParamasData: string) => {
    return request.get(RequestURL, {
        params: {
            SelectCompany: ParamasData,
        },
    });
};

export const InertPersonalData = (RequestURL: string, ParamasData: {}) => {
    return request.post(RequestURL, {
        params: ParamasData,
    });
};
