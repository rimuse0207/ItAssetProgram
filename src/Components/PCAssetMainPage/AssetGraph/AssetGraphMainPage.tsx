import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement,
    DoughnutController,
    DoughnutControllerChartOptions,
    BarController,
    BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    DoughnutController,

    PieController,
    ArcElement,
    BarController,
    BarElement,
    Title,
    Tooltip,
    Legend
);
type AssetGraphMainPageProps = {
    assetType: string;
    usedData: any;
};

const AssetGraphMainPage = ({ assetType, usedData }: AssetGraphMainPageProps) => {
    // const options = {
    //     plugins: {
    //         tooltip: {
    //             boxWidth: 5,
    //         },
    //         legend: {
    //             display: true,
    //             position: 'left',
    //             labels: {},
    //         },
    //     },

    //     animation: { duration: 500 },
    //     responsive: false,
    //     maintainAspectRatio: false,
    //     // aspectRatio: 1,
    // };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: '그래프',
            },
        },
    };

    const data = {
        labels: ['사용중', '미사용', '전체'],
        datasets: [
            {
                label: assetType,
                backgroundColor: ['rgba(178, 31, 0, 0.7)', 'rgba(47, 222, 0, 0.7)', 'rgba(32, 122, 199, 0.7)'],
                hoverBackgroundColor: ['rgba(80, 24, 0, 1)', '#175000', '#200bf9'],
                data: usedData,
            },
        ],
    };
    return (
        <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AssetGraphMainPage;
