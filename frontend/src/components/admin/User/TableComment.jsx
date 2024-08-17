import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { showcomment } from "../../../services/api";
import ModalDeleteComment from "./ModalDeleteComment";

const TableComment = () => {

    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await showcomment();
                setComments(res.data.comment);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, []);
    
    const handleshow=(commentId)=>{
        setShowModal(true);
        setSelectedCommentId(commentId);
    }
    const handleClose=()=>{
        setShowModal(false);
    }
    return (
        <div className="container mt-4">
            <h2>Quản Lý Bình Luận</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người Dùng</th>
                        <th>Bình Luận</th>
                        <th>Ngày</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={comment.comment_id}>
                            <td>{index + 1}</td> 
                            <td>{comment.username}</td>
                            <td>{comment.content}</td>
                            <td>{new Date(comment.created_at).toLocaleString()}</td>
                            <td>
                                <Button variant="danger" onClick={()=>handleshow(comment.comment_id)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalDeleteComment show={showModal} handleClose={handleClose} selectedCommentId={selectedCommentId} setComments={setComments}/>
        </div>
    );
};

export default TableComment;