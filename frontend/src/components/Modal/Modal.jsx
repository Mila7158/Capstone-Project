import { useEffect } from "react";
import { useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { ModalContext } from '../../context/ModalContext'; // Import the context

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  useEffect(() => {
    console.log("\nModal Debugging:");
    console.log("Modal Ref:", modalRef.current);
    console.log("Modal Content:", modalContent);
  }, [modalRef, modalContent]);

  console.log("\nModal Rendering Check:\n", { modalRef, modalContent });

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div 
        id="modal-background" 
        onClick={() => {
          console.log("\nBackground clicked");
          closeModal();
        }}
      />
      <div
        id="modal-content"
        onClick={(e) => {
          e.stopPropagation(); // Prevent background clicks from propagating
          console.log("\nContent clicked");
        }}
      >
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export default Modal;