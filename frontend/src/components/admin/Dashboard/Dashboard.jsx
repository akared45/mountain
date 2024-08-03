import React, { useEffect, useState } from "react";
import { count } from "../../../services/api";

const Dashboard = () => {

    const [countMountain, setCountMountain] = useState(0);
    const [countUser, setCountUser] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await count();
                setCountMountain(response.data.total_mountains);
                setCountUser(response.data.total_users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCounts();
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="row g-3 my-2">
                    <div className="col-md-3 p-1">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{countMountain}</h3>
                                <p className="fs-5">Mountains</p>
                            </div>
                            <i className="bi bi-geo-alt fs-4 me-3"></i>
                        </div>
                    </div>
                    <div className="col-md-3 p-1">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{countUser}</h3>
                                <p className="fs-5">Users</p>
                            </div>
                            <i className="bi bi-person fs-4 me-3"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Dashboard;