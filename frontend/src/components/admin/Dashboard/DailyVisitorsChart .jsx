import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { totalvisit } from '../../../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailyVisitorsLineChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitorData = async () => {
            try {
                const response = await totalvisit();
                const data = response.data;

                const dates = data.map(item => item.visit_date);
                const visitorCounts = data.map(item => item.total_visitors);

                const dataForChart = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Number of visitors to the site',
                            data: visitorCounts, 
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                    ],
                };

                setChartData(dataForChart);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching visitor data:', error);
                setLoading(false);
            }
        };

        fetchVisitorData();
    }, []);

    return (
        <div>
            <h2>Number of daily visitors</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Line 
                    data={chartData} 
                    options={{ 
                        responsive: true, 
                        plugins: { 
                            legend: { position: 'top' }, 
                            title: { display: true, text: 'Number of daily visitors' } 
                        } 
                    }} 
                />
            )}
        </div>
    );
};

export default DailyVisitorsLineChart;
