export type VolumeLicenseMainPageProps = {
    SelectCompany: string;
    type: string;
};

export type LicenseDataType = {
    code: string;
    contractdate: string | null;
    explaindesc: string | null;
    max_access: number | null;
    name: string;
    prove_file_location: string | null;
    terminateddate: string | null;
    counts: number | null;
};
