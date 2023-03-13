import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { VolumeLicenseMainPageProps, LicenseDataType } from '../VolumeLicenseMainPage/VolumeLicenseDataTypes';
import { RootState } from '../../../Models';
import { useSelector } from 'react-redux';
const GraphContainer = styled.div`
    width: 97%;
    height: 40vh;
    canvas {
        width: 100%;
        height: 100%;
    }
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
    plugins: {
        title: {
            display: true,
            text: '라이선스 그래프',
        },
    },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    maintainAspectRatio: false,
};

const LicenseGoogleGraphMainPage = ({ SelectCompany, type }: VolumeLicenseMainPageProps) => {
    const LicenseData = useSelector((state: RootState) => state.LicenseData.LicenseData.data);
    const [datas, setdata] = useState({
        labels: ['nothing'],
        datasets: [
            {
                label: '사용 인원',
                data: [0],
                backgroundColor: 'rgb(255, 99, 132)',
                stack: type,
            },
            {
                label: '전체 사용 가능 인원',
                data: [0],
                backgroundColor: 'rgb(53, 162, 235)',
                stack: type,
            },
        ],
    });
    useEffect(() => {
        getada();
    }, [SelectCompany, type, LicenseData]);

    const getada = async () => {
        const labels = [];
        const usedNumber = [];
        const notUsedNumber = [];
        if (!LicenseData) return;
        for (var i = 0; i < LicenseData.length; i++) {
            labels.push(LicenseData[i].basic_License.asset_license_list_info_name);
            usedNumber.push(LicenseData[i].basic_License.license_user_used_count_sum);
            notUsedNumber.push(
                LicenseData[i].basic_License.license_permit_count_sum - LicenseData[i].basic_License.license_user_used_count_sum
            );
        }
        const datasets = [
            {
                label: '사용 인원',
                data: usedNumber,
                backgroundColor: 'rgb(255, 99, 132)',
                stack: type,
            },
            {
                label: '미사용 인원',
                data: notUsedNumber,
                backgroundColor: 'rgb(53, 162, 235)',
                stack: type,
            },
        ];
        setdata({
            labels,
            datasets,
        });
    };

    return (
        <GraphContainer>
            <Bar options={options} data={datas} />
        </GraphContainer>
    );
};

export default LicenseGoogleGraphMainPage;
