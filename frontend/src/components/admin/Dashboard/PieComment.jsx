import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { commentGroup } from "../../../services/api";

const CommentAnalysis = () => {
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const response = await commentGroup();
                setCommentData(response.data);
            } catch (error) {
                console.error('Error fetching comment data:', error);
            }
        };
        fetchCommentData();
    }, []);

    const data = {
        labels: commentData.map(item => `Group ${item.name}`),
        datasets: [{
            label: 'Comments by Group',
            data: commentData.map(item => item.count),
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
            <h3 className="text-center">Number of comments by group</h3>
            <div className="d-flex justify-content-center">
                <div style={{ width: '70%', maxWidth: '600px' }}>
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
    );
};

export default CommentAnalysis;
