export type DeskTopInfoDataType = {
    code: string;
    asset_explain: string;
    asset_purchasedate: string;
    name: string | null;
    team: string | null;
    companyname: string;
    companylocation: string;
    type: string;
};

export type DeskTopMainPageProps = {
    SelectCompany: string;
    type: string;
};
