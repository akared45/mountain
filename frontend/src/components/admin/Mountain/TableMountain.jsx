import React, { useEffect, useState } from "react";
import { showMountain } from "../../../services/api";
import ModalAddNew from "./ModalAddNew";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";

const TableGroup = () => {
    const [listMountain, setListMountain] = useState([]);
    const [showModalAddNew, setshowModalAddNew] = useState(false);

    const [showModalDelete, setshowModalDelete] = useState(false);
    const [dataMountainDelete, setDataMountainDelete] = useState({});

    const [showModalEdit, setshowModalEdit] = useState(false);
    const [dataMountainEdit, setDataMountainEdit] = useState({});

    useEffect(() => {
        getListMountain();
    }, [])

    const getListMountain = async () => {
        try {
            const response = await showMountain();
            setListMountain(response.data.ListMountain);
        } catch (error) {
            console.error(error);
        }
    }

    const handleShow = () => {
        setshowModalAddNew(true);
    }

    const handleShowDelete = (mountain) => {
        setshowModalDelete(true);
        setDataMountainDelete(mountain);
    }

    const handleShowEdit = (mountain) => {
        setshowModalEdit(true);
        setDataMountainEdit(mountain);
    }

    const handleClose = () => {
        setshowModalAddNew(false);
        setshowModalDelete(false);
        setshowModalEdit(false);
    }
    return (
        <>

            <button className="btn btn-success mb-3" onClick={handleShow}>
                <i className="bi bi-plus-circle"></i> Add New
            </button>
            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Longtitude</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Altitude</th>
                        <th scope="col">Country</th>
                        <th scope="col">Region</th>
                        <th scope="col" width="10%">Img</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listMountain.map((item, index) => (
                        <tr key={index}>
                            <th scope="row" className="text-center align-middle">{index + 1}</th>
                            <td className="text-start align-middle">{item.name}</td>
                            <td className="text-start align-middle">{item.longitude}</td>
                            <td className="text-start align-middle">{item.latitude}</td>
                            <td className="text-start align-middle">{item.altitude}</td>
                            <td className="text-start align-middle">{item.country}</td>
                            <td className="text-start align-middle">{item.region}</td>
                            <td className="text-start align-middle">
                                {item.img ? (
                                    <img
                                        src={`http://localhost:8000/storage/images/${item.img}`}
                                        alt={item.name}
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td className="align-middle">
                                <div className="d-flex justify-content-evenly">
                                    <button className="btn btn-primary" onClick={()=>handleShowEdit(item)}>Update</button>
                                    <button className="btn btn-danger" onClick={()=>handleShowDelete(item)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalAddNew show={showModalAddNew} handleClose={handleClose} setListMountain={setListMountain} />
            <ModalDelete show={showModalDelete} handleClose={handleClose} dataMountainDelete={dataMountainDelete} setListMountain={setListMountain}/>
            <ModalUpdate show={showModalEdit} handleClose={handleClose} dataMountain={dataMountainEdit} setListMountain={setListMountain}/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>

    )
}

export default TableGroup;