import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

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
};

const labels = ['한글과 컴퓨터', 'Windows Office 2013', '알집', 'PDF', 'Adobe 포토샵', 'Windows 10 Pro'];

export const data = {
    labels,
    datasets: [
        {
            label: '사용 인원',
            data: [10],
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Volume_license',
        },
        {
            label: '전체 사용 가능 인원',
            data: [40],
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Volume_license',
        },
        // {
        //     label: '사용 인원',
        //     data: [80],
        //     backgroundColor: 'rgb(255, 99, 132)',
        //     stack: 'Windows Office 2013',
        // },
        // {
        //     label: '전체 사용 가능 인원',
        //     data: [109],
        //     backgroundColor: 'rgb(53, 162, 235)',
        //     stack: 'Windows Office 2013',
        // },
    ],
};
const LicenseGoogleGraphMainPage = () => {
    const [datas, setdata] = useState({
        labels,
        datasets: [
            {
                label: '사용 인원',
                data: [10],
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Volume_license',
            },
            {
                label: '전체 사용 가능 인원',
                data: [40],
                backgroundColor: 'rgb(53, 162, 235)',
                stack: 'Volume_license',
            },
            // {
            //     label: '사용 인원',
            //     data: [80],
            //     backgroundColor: 'rgb(255, 99, 132)',
            //     stack: 'Windows Office 2013',
            // },
            // {
            //     label: '전체 사용 가능 인원',
            //     data: [109],
            //     backgroundColor: 'rgb(53, 162, 235)',
            //     stack: 'Windows Office 2013',
            // },
        ],
    });
    useEffect(() => {
        getada();
    }, []);

    const getada = async () => {
        const dad = await axios.get('http://192.168.2.155:3001/license_app_server/LicenseGraphData');
        console.log(dad);
        setdata({
            labels: dad.data.labels,
            datasets: dad.data.datasets,
        });
    };

    return (
        <div style={{ width: '100%' }}>
            <Bar options={options} data={datas} />
        </div>
    );
};

export default LicenseGoogleGraphMainPage;
