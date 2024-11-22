import { createContext, useContext, useRef, useState } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [_modalContent, _setModalContent] = useState(null); // Renaming original setModalContent
  const [onModalClose, setOnModalClose] = useState(null);

  const setModalContent = (content) => {
    console.log("\n!!! setModalContent Called with:\n", content); // Debug log
    _setModalContent(content);
  };

  const closeModal = () => {
    console.log("\n!!! closeModal called"); // Debug log
    setModalContent(null); // Clear modal contents
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef,
    modalContent: _modalContent, // Provide the current modal content
    setModalContent, // Use the wrapped function with logs
    setOnModalClose,
    closeModal,
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export const useModal = () => useContext(ModalContext);