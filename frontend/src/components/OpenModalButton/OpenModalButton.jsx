// frontend/src/components/OpenModalButton/OpenModalButton.jsx

import { useModal } from '../../context/ModalContext';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    console.log("\nLog In button clicked!\n");
    if (onModalClose) setOnModalClose(onModalClose);
    console.log("\n----------Modal Component Set:\n", modalComponent);
    setModalContent(modalComponent);
    console.log("\n!!!2222Log In button clicked!\n");
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick} className="open-modal-button">
    {buttonText}
    </button>;
}

export default OpenModalButton;