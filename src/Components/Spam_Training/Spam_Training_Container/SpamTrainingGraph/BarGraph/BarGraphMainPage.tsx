import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ResponsiveBar } from '@nivo/bar'
import { request } from "../../../../../Apis/core";



const BarGraphMainPageMainDivBox = styled.div`
    width:100%;
    height:300px;
`

// const data =[
//   {
//     "country": "AD",
//     "hot dog": 98,
//     "hot dogColor": "hsl(109, 70%, 50%)",
//     "burger": 45,
//     "burgerColor": "hsl(207, 70%, 50%)",
   
//   },
//   {
//     "country": "AE",
//     "hot dog": 150,
//     "hot dogColor": "hsl(211, 70%, 50%)",
//     "burger": 101,
//     "burgerColor": "hsl(147, 70%, 50%)",
   
//   },
//   {
//     "country": "AF",
//     "hot dog": 72,
//     "hot dogColor": "hsl(144, 70%, 50%)",
//     "burger": 138,
//     "burgerColor": "hsl(189, 70%, 50%)",
   
//   },
//   {
//     "country": "AG",
//     "hot dog": 65,
//     "hot dogColor": "hsl(175, 70%, 50%)",
//     "burger": 168,
//     "burgerColor": "hsl(348, 70%, 50%)",

//   },
//   {
//     "country": "AI",
//     "hot dog": 15,
//     "hot dogColor": "hsl(16, 70%, 50%)",
//     "burger": 159,
//     "burgerColor": "hsl(109, 70%, 50%)",
 
//   },
//   {
//     "country": "AL",
//     "hot dog": 33,
//     "hot dogColor": "hsl(327, 70%, 50%)",
//     "burger": 45,
//     "burgerColor": "hsl(63, 70%, 50%)",

//   },
//   {
//     "country": "AM",
//     "hot dog": 63,
//     "hot dogColor": "hsl(188, 70%, 50%)",
//     "burger": 105,
//     "burgerColor": "hsl(303, 70%, 50%)",

//   }
// ]

const BarGraphMainPage = () => {

    const [data, setData] = useState([]);
    const [bar_data_keys, setBar_data_keys] = useState<any>([]);

    const BarDataGetting = async () => {
    try {
        
        const BarDataGetting_Axios = await request.get('/SpamTrain_app_server/Brity_works_organ_Select')
        console.log(BarDataGetting_Axios);
        const a = BarDataGetting_Axios.data.data;
        const ww:any = [];
        a.map((list:{id:string}) => {
            ww.push(
                list.id
            )
        })
        setBar_data_keys(ww);
        setData(BarDataGetting_Axios.data.data)
    } catch (error) {
        console.log(error);
    }
}
    useEffect(() => {
        BarDataGetting();
},[])
    return (
        <BarGraphMainPageMainDivBox>
             <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'inherit',
        //         color: '#38bcb2',
        //         size: 4,
        //         padding: 1,
        //         stagger: true
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternLines',
        //         background: 'inherit',
 
        //         color: '#eed312',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     }
        // ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'fries'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'sandwich'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '부서',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '인원',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
        </BarGraphMainPageMainDivBox>
    )
}

export default BarGraphMainPage;