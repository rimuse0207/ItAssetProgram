import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import { PCReturnMainPagePropsType } from '../PcModalTypes';
registerLocale('ko', ko);

const DiscardRestoreMainPage = ({ SelectedData, setSelectedData }: PCReturnMainPagePropsType) => {
    return (
        <div>
            <dl className="inputbox">
                <dt className="inputbox-title">폐기 복원 날짜</dt>
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
                <dt className="inputbox-title">폐기 복원 사유</dt>
                <dl>
                    <dd className="inputbox-content">
                        <textarea
                            value={SelectedData.selected_reason}
                            onChange={e =>
                                setSelectedData({
                                    ...SelectedData,
                                    selected_reason: e.target.value,
                                })
                            }
                        ></textarea>
                        <span className="underline"></span>
                    </dd>
                </dl>
            </dl>
        </div>
    );
};

export default DiscardRestoreMainPage;
