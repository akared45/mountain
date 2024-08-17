import React, { useEffect, useState } from "react";
import { postcategory } from "../../../services/api";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
const PiePost = () => {
    const [postCategories, setPostCategories] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await postcategory();
                setPostCategories(res.data.total_posts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetch();
    }, []);
    const data = {
        labels: postCategories.map(item => item.category),
        datasets: [{
            data: postCategories.map(item => item.count),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        }]
    };
    return (
        <div className="mt-5">
            <h3 className="text-center">Number of posts by category</h3>
            <div className="d-flex justify-content-center">
                <div style={{ width: '70%' }}>
                    <Pie
                        data={data}
                        options={{
                            plugins: {
                                legend: {
                                    position: 'left',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default PiePost;