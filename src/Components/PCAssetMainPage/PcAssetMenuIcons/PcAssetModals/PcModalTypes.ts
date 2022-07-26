export type PCReturnMainPagePropsType = {
    SelectedData: {
        selected_date: Date;
        selected_reason: string;
        selected_user: string;
    };
    setSelectedData: (data: any) => void;
};

export type TransferMainPagePropsType = {
    SelectedData: {
        selected_date: Date;
        selected_reason: string;
        selected_user: string;
    };
    setSelectedData: (data: any) => void;
    SelectCompany: string;
};
