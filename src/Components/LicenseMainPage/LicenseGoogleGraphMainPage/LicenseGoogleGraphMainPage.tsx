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
            text: 'License 그래프',
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
    const LicenseData = useSelector((state: RootState) => state.LicenseData.LicenseData);
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
    }, [SelectCompany, type, LicenseData.data]);

    const getada = async () => {
        const labels = [];
        const usedNumber = [];
        const notUsedNumber = [];
        if (!LicenseData.data) return;
        for (var i = 0; i < LicenseData.data.length; i++) {
            labels.push(LicenseData.data[i].license_product_name);
            usedNumber.push(LicenseData.data[i].all_user_used_count);
            notUsedNumber.push(LicenseData.data[i].sumpermit - LicenseData.data[i].all_user_used_count);
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
