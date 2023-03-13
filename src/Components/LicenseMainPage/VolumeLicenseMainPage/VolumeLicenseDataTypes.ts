export type VolumeLicenseMainPageProps = {
    SelectCompany: string;
    type: string;
};

export type basic_License_Type = {
    asset_license_list_info_indexs: number;
    asset_license_list_info_code: string;
    asset_license_list_info_name: string;
    asset_license_list_info_company: string;
    asset_license_list_info_write_id: string;
    license_permit_count_sum: number;
    license_user_used_count_sum: number;
};

export type purchase_License_Type = {
    asset_license_purchase_info_indexs: number;
    asset_license_purchase_info_code: string;
    asset_license_purchase_info_write_id: string;
    asset_license_purchase_info_permit_count: number;
    asset_license_purchase_info_pride: number;
    asset_license_purchase_info_newcode: string;
    asset_license_purchase_info_notepad: string;
    asset_license_purchase_info_purchase_date: string;
    asset_license_purchase_info_finish_date: string;
    asset_license_purchase_info_purchase_company_info: string;
    asset_license_purchase_info_write_date: string;
};

export type LicenseDataType = {
    // license_manage_code: string;
    // license_purchase_date: string;
    // license_purchase_finish_date: string;
    // license_purchase_company: string | null;
    // license_permit_count: number;
    // license_purchase_pride: number;
    // license_prove_code: string | null;
    // license_newcode: string | null;
    // license_info_license_product_code: string;
    // license_info_indexs: number;
    // license_product_code: string;
    // license_product_name: string;
    // license_company_name: string;
    // license_user_used_indexs: number;
    // license_license_manage_code: string | null;
    // asset_info_asset_management_number: string | null;
    // license_register_date: string | null;
    // license_dependence_check: number;
    // asset_management_number: string | null;
    // asset_division: string;
    // asset_maker: string | null;
    // asset_model: string | null;
    // asset_purchase_date: string | null;
    // asset_pride: string | null;
    // asset_cpu: string | null;
    // asset_ram: string | null;
    // asset_disk: string | null;
    // asset_newcode: string | null;
    // asset_distribute_date: string | null;
    // asset_destroy_check: string | null;
    // userinfo_email: string | null;
    // company_info_company_code: string | null;
    // email: string | null;
    // name: string | null;
    // team: string | null;
    // position: string | null;
    // entercompany: string | null;
    // exitcompany: string | null;
    // inservice: string | null;
    // updatedate: string | null;
    // companyInfo_companycode: string | null;
    // sumpermit: number | null;
    // datas: any;
    // userData: any;
    // all_user_used_count: number;
    // proveData: [] | null;

    basic_License: basic_License_Type;
    purchase_License: purchase_License_Type[];
};
