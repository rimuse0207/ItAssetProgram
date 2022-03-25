export type DeskTopInfoDataType = {
    asset_management_number: string;
    asset_division: string;
    asset_maker: string | null;
    asset_model: string | null;
    asset_purchase_date: string | null;
    asset_pride: string | null;
    asset_cpu: string | null;
    asset_ram: string | null;
    asset_disk: string | null;
    asset_newcode: string | null;
    asset_distribute_date: string | null;
    asset_destroy_check: number | null;
    userinfo_email: string | null;
    company_info_company_code: string | null;
    company_code: string | null;
    company_name: string | null;
    company_location: string | null;
    company_building: string | null;
    company_floor: string | null;
    email: string | null;
    name: string | null;
    team: string | null;
    position: string | null;
    entercompany: string | null;
    exitcompany: string | null;
    inservice: string | null;
    updatedate: string | null;
    companyInfo_companycode: string | null;
};

export type DeskTopMainPageProps = {
    SelectCompany: string;
    type: string;
};
