import { Toast, ToastContainer } from "react-bootstrap"

const ToastNotification = ({ message, type, show, onClose}) => {
    return (
        <ToastContainer position="bottom-center" className="p-3">
            <Toast
                onClose={onClose}
                show={show}
                delay={3000}
                autohide
                bg={type === 'success' ? 'success' : 'danger'}	
            >
                <Toast.Body className="text-white">
                <i className={`bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}`} /> {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastNotification