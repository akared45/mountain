import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deletecomment, showcomment } from '../../../services/api';

const ModalDeleteComment = ({ show, handleClose, selectedCommentId ,setComments}) => {

    const confirmDelete = async () => {
        try {
            await deletecomment(selectedCommentId);
            handleClose();
            const response= await showcomment();
            toast.success("Delete comment success")
            setComments(response.data.comment);
        } catch (error) {
            console.error('Xóa bình luận thất bại:', error);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Are you sure to delete, this action can't be undone !
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteComment;