import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { VolumeLicenseMainPageProps, LicenseDataType } from '../VolumeLicenseMainPage/VolumeLicenseDataTypes';
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
    }, [SelectCompany, type]);

    const getada = async () => {
        const dad = await axios.get('http://192.168.2.155:3001/license_app_server/LicenseGraphData', {
            params: {
                type,
                SelectCompany,
            },
        });
        setdata({
            labels: dad.data.labels,
            datasets: dad.data.datasets,
        });
    };

    return (
        <GraphContainer>
            <Bar options={options} data={datas} />
        </GraphContainer>
    );
};

export default LicenseGoogleGraphMainPage;
