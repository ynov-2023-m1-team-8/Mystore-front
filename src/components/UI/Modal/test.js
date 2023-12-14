import { Button, Modal } from 'flowbite-react';

const Index = ({ children, title, closeModal }) => {
  return (
    <>
        <Button onClick={() => setOpenModal(true)}>Je suis intéressé(e) !</Button>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    </>
  );
}

export default Index;