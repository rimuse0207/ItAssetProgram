import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { GraphDatasTypes } from '../PrinterLogContentMainPage';

const PrinterLogGraphMainPageMainDivBox = styled.div`
    border: 1px solid black;
    height: 40vh;
    width: 90%;
    margin: 0 auto;
`;

type PrinterLogGraphMainPagePropsType = {
    GraphDatas: GraphDatasTypes[];
};

const PrinterLogGraphMainPage = ({ GraphDatas }: PrinterLogGraphMainPagePropsType) => {
    console.log(GraphDatas);
    // const Time_Datas = Time_Labels;
    const data = [
        {
            id: 'Company',
            color: 'hsl(196, 70%, 50%)',
            data: GraphDatas,
        },
        // {
        //     id: 'EXICON',
        //     color: 'hsl(301, 70%, 50%)',
        //     data: [
        //         {
        //             x: Time_Datas[0],
        //             y: 9,
        //         },
        //         {
        //             x: Time_Datas[1],
        //             y: 189,
        //         },
        //         {
        //             x: Time_Datas[2],
        //             y: 285,
        //         },
        //         {
        //             x: Time_Datas[3],
        //             y: 130,
        //         },
        //         {
        //             x: Time_Datas[4],
        //             y: 70,
        //         },
        //         {
        //             x: Time_Datas[5],
        //             y: 138,
        //         },
        //         {
        //             x: Time_Datas[6],
        //             y: 101,
        //         },
        //         {
        //             x: Time_Datas[7],
        //             y: 245,
        //         },
        //         {
        //             x: Time_Datas[8],
        //             y: 135,
        //         },
        //         {
        //             x: Time_Datas[9],
        //             y: 211,
        //         },
        //         {
        //             x: Time_Datas[10],
        //             y: 167,
        //         },
        //     ],
        // },
        // {
        //     id: 'SEMCNS',
        //     color: 'hsl(111, 70%, 50%)',
        //     data: [
        //         {
        //             x: Time_Datas[0],
        //             y: 9,
        //         },
        //         {
        //             x: Time_Datas[1],
        //             y: 189,
        //         },
        //         {
        //             x: Time_Datas[2],
        //             y: 285,
        //         },
        //         {
        //             x: Time_Datas[3],
        //             y: 130,
        //         },
        //         {
        //             x: Time_Datas[4],
        //             y: 70,
        //         },
        //         {
        //             x: Time_Datas[5],
        //             y: 138,
        //         },
        //         {
        //             x: Time_Datas[6],
        //             y: 101,
        //         },
        //         {
        //             x: Time_Datas[7],
        //             y: 245,
        //         },
        //         {
        //             x: Time_Datas[8],
        //             y: 135,
        //         },
        //         {
        //             x: Time_Datas[9],
        //             y: 211,
        //         },
        //         {
        //             x: Time_Datas[10],
        //             y: 167,
        //         },
        //     ],
        // },
        // {
        //     id: 'DHKS',
        //     color: 'hsl(290, 70%, 50%)',
        //     data: [
        //         {
        //             x: Time_Datas[0],
        //             y: 9,
        //         },
        //         {
        //             x: Time_Datas[1],
        //             y: 189,
        //         },
        //         {
        //             x: Time_Datas[2],
        //             y: 285,
        //         },
        //         {
        //             x: Time_Datas[3],
        //             y: 130,
        //         },
        //         {
        //             x: Time_Datas[4],
        //             y: 70,
        //         },
        //         {
        //             x: Time_Datas[5],
        //             y: 138,
        //         },
        //         {
        //             x: Time_Datas[6],
        //             y: 101,
        //         },
        //         {
        //             x: Time_Datas[7],
        //             y: 245,
        //         },
        //         {
        //             x: Time_Datas[8],
        //             y: 135,
        //         },
        //         {
        //             x: Time_Datas[9],
        //             y: 211,
        //         },
        //         {
        //             x: Time_Datas[10],
        //             y: 167,
        //         },
        //     ],
        // },
    ];

    return (
        <PrinterLogGraphMainPageMainDivBox>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Printer',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            ></ResponsiveLine>
        </PrinterLogGraphMainPageMainDivBox>
    );
};

export default PrinterLogGraphMainPage;
