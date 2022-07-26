import React from 'react';
import styled from 'styled-components';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import { PCReturnMainPagePropsType } from '../PcModalTypes';
registerLocale('ko', ko);
const PCReturnMainPageMainDivBox = styled.div``;

const PCReturnMainPage = ({ SelectedData, setSelectedData }: PCReturnMainPagePropsType) => {
    return (
        <PCReturnMainPageMainDivBox>
            <dl className="inputbox">
                <dt className="inputbox-title">반납 날짜</dt>
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
            <dl className="inputbox">
                <dt className="inputbox-title">반납 사유</dt>
                <dl>
                    <dd className="inputbox-content">
                        <textarea></textarea>
                        <span className="underline"></span>
                    </dd>
                </dl>
            </dl>
        </PCReturnMainPageMainDivBox>
    );
};

export default PCReturnMainPage;
