import React, { useEffect, useState } from "react";
import { count, pageview } from "../../../services/api";
import PiePost from "./PiePost";
import CommentAnalysis from "./PieComment";
import DailyVisitorsChart from "./DailyVisitorsChart ";

const Dashboard = () => {
    const [countMountain, setCountMountain] = useState(0);
    const [countUser, setCountUser] = useState(0);
    const [countPost, setCountPost] = useState(0);
  

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await count();
                setCountMountain(response.data.total_mountains);
                setCountUser(response.data.total_users);
                setCountPost(response.data.total_posts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCounts();
    }, []);
    return (
        <div className="container-fluid py-4">
            <div className="row g-4 text-center">
                {/* Card for Mountains */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                            <div>
                                <h3 className="fs-2 m-0">{countMountain} Mountains</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card for Users */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-person fs-1 text-success me-3"></i>
                            <div>
                                <h3 className="fs-2 m-0">{countUser} Users</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card for Posts */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-pencil-square fs-1 text-warning me-3"></i>
                            <div>
                                <h3 className="fs-2 m-0">{countPost} Posts</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="p-3 bg-white shadow-sm rounded">
                        <PiePost />
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="p-3 bg-white shadow-sm rounded">
                        <CommentAnalysis />
                    </div>
                </div>
            </div>
            <DailyVisitorsChart></DailyVisitorsChart>

            {/* Pie Chart */}

        </div>
    );
}

export default Dashboard;
