import React from 'react';
import { DeskTopInfoDataType } from '../../../PCAssetDataType';
import moment from 'moment';
import { BsPencilSquare } from 'react-icons/bs';
import styled from 'styled-components';
type PcInfoDataUpdateProps = {
    SelectAssetData: DeskTopInfoDataType | null;
    setAssetDataChangeCheck: () => void;
};

const PcInfoDataUpdateMainDivBox = styled.div`
    .type03 {
        position: relative;
        .UpdateButton {
            position: absolute;
            top: -30px;
            right: 0px;
        }
    }
`;

const PcInfoDataUpdate = ({ SelectAssetData, setAssetDataChangeCheck }: PcInfoDataUpdateProps) => {
    return (
        <PcInfoDataUpdateMainDivBox>
            <div>
                <h2>PC 자산 유저 추가</h2>
            </div>
            <div>
                <table className="type03">
                    <div className="UpdateButton">
                        <button onClick={() => setAssetDataChangeCheck()}>
                            <BsPencilSquare></BsPencilSquare>자산 정보 수정 하기
                        </button>
                    </div>
                    <tr>
                        <th scope="row">관리 번호</th>
                        <td>{SelectAssetData?.asset_management_number}</td>
                    </tr>
                    <tr>
                        <th scope="row">종류</th>
                        <td>{SelectAssetData?.asset_division}</td>
                    </tr>
                    <tr>
                        <th scope="row">제조사</th>
                        <td>{SelectAssetData?.asset_maker}</td>
                    </tr>
                    <tr>
                        <th scope="row">모델명</th>
                        <td>{SelectAssetData?.asset_model}</td>
                    </tr>
                    <tr>
                        <th scope="row">구매날짜</th>
                        <td>{moment(SelectAssetData?.asset_purchase_date).format('YYYY-MM-DD')}</td>
                    </tr>
                    <tr>
                        <th scope="row">구입 금액</th>
                        <td>{SelectAssetData?.asset_pride ? Number(SelectAssetData.asset_pride).toLocaleString('ko-KR') : '-'}</td>
                    </tr>
                    <tr>
                        <th scope="row">CPU</th>
                        <td>{SelectAssetData?.asset_cpu}</td>
                    </tr>
                    <tr>
                        <th scope="row">RAM</th>
                        <td>{SelectAssetData?.asset_ram}</td>
                    </tr>
                    <tr>
                        <th scope="row">DISK</th>
                        <td>{SelectAssetData?.asset_disk}</td>
                    </tr>
                    <tr>
                        <th scope="row">자산코드</th>
                        <td>{SelectAssetData?.asset_newcode ? SelectAssetData?.asset_newcode : '-'}</td>
                    </tr>
                    <tr>
                        <th scope="row">사용처</th>
                        <td>
                            {SelectAssetData?.company_name}_{SelectAssetData?.company_location}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사용자</th>
                        <td>
                            {SelectAssetData?.team}_{SelectAssetData?.name}
                        </td>
                    </tr>
                </table>
            </div>
        </PcInfoDataUpdateMainDivBox>
    );
};

export default PcInfoDataUpdate;
