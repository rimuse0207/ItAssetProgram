import React from 'react';
import styled from 'styled-components';

const ExcelUploadMainPageMainDivBox = styled.div`
    border: 1px solid black;
`;

const ExcelUploadMainPage = () => {
    return (
        <ExcelUploadMainPageMainDivBox>
            <div>
                <ul>
                    <li>자산 추가 Excel 업로드</li>
                    <li>자산 수정 Excel 업로드</li>
                </ul>
            </div>
        </ExcelUploadMainPageMainDivBox>
    );
};

export default ExcelUploadMainPage;
