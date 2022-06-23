import { useContext, useState, useEffect } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ContactContext } from "../../context/contact-context";
import EditContactForm from "../edit-contact-form/edit-contact-form.component";

const Contact = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  //useEffect to close modal after editing
  useEffect(() => {
    handleCloseModal();
  }, [contact]);

  return (
    <>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td>
        <OverlayTrigger
          overlay = {
            <Tooltip id={`tooltip-top`}>
              Edit
            </Tooltip>
          }
        >
          <button
            onClick={handleShowModal}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons" >
              &#xE254;
            </i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay = {
            <Tooltip id={`tooltip-top`}>
              Delete
            </Tooltip>
          }
        >
          <button
            onClick={() => deleteContact(contact.id)}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons" >
              &#xE872;
            </i>
          </button>
        </OverlayTrigger>
      </td>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditContactForm contact={contact} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className='bg-danger'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contact;
