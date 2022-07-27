import React, { useEffect, useState } from 'react';
import { TransferMainPagePropsType } from '../PcModalTypes';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import Select from 'react-select';
import { UserInfoGet } from '../../../../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import { PersonOption } from '../../../../LicenseMainPage/VolumeLicenseMainPage/DownloadMainPage/ModalMainPage/docs/data';

const RegisterUserMainPage = ({ SelectedData, setSelectedData, SelectCompany }: TransferMainPagePropsType) => {
    const [InfoUserData, setInfoUserData] = useState<PersonOption[]>([]);
    useEffect(() => {
        getUserInfo();
    }, []);
    const getUserInfo = async () => {
        const ParamasData = {
            SelectCompany,
        };
        try {
            const personOptionsData = await UserInfoGet('/Asset_app_server/UserSelect', ParamasData);

            if (personOptionsData.data.dataSuccess) {
                setInfoUserData(personOptionsData.data.data);
            } else {
                alert('error');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {' '}
            <dl className="inputbox">
                <dt className="inputbox-title">등록 날짜</dt>
                <dl>
                    <dd className="inputbox-content">
                        <DatePicker
                            selected={SelectedData.selected_date}
                            onChange={(date: any) => setSelectedData({ ...SelectedData, selected_date: date })}
                            withPortal
                            locale={ko}
                            dateFormat="yyy-MM-dd"
                            maxDate={new Date()}
                        />
                        <span className="underline"></span>
                    </dd>
                </dl>
            </dl>
            {/* <dl className="inputbox">
                <dt className="inputbox-title">이관 사유</dt>
                <dl>
                    <dd className="inputbox-content">
                        <textarea></textarea>
                        <span className="underline"></span>
                    </dd>
                </dl>
            </dl> */}
            <dl className="inputbox">
                <dt className="inputbox-title">등록 사용자</dt>
                <dd className="inputbox-content">
                    <Select
                        options={InfoUserData}
                        onChange={(value: any) => setSelectedData({ ...SelectedData, selected_user: value })}
                    ></Select>
                    <span className="underline"></span>
                </dd>
            </dl>
        </div>
    );
};

export default RegisterUserMainPage;
