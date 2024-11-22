import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ onClose, onConfirm, modalValue }) => {
    return (
        <div className="modal-overlay delete-modal">
            <div className="modal-content">
                <h3>Confirm Delete</h3>
                {modalValue == "post" ? (
                    <p>Are you sure you want to remove this {modalValue} from the listings?</p>
                ) : (
                    <p>Are you sure you want to remove this {modalValue}</p>
                )}

                <div className="modal-buttons">
                    <button className="delete-button" onClick={onConfirm}>
                        Yes (Delete {modalValue})
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        No (Keep {modalValue})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
