import { Modal, Button, Alert, Form} from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { ContactContext } from "../../context/contact-context";
import Contact from "../contact/contact.component";
import AddContactForm from "../add-contact-form/add-contact-form.component";
import PaginationComponent from "../pagination/pagination.component";

const ContactList = () => {
  const { sortedContacts } = useContext(ContactContext);

  const [searchField, setSearchField] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(sortedContacts)
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(null)
  const [contactsPerPage] =  useState(2)

  

  const handleShowModal = () => setShowModal(true); 
  const handleCloseModal = () => setShowModal(false);
  const handleCloseAlert = () => setShowAlert(false);

  
  const handleShowAlert = () => {
    setShowAlert(true);
    
    setTimeout(() => {
      handleCloseAlert();
    }, 2000);
  };

  useEffect(() => {
    const newFilteredContacts = sortedContacts.filter(contact => {
      return contact.name.toLowerCase().includes(searchField)
    })
    setFilteredContacts(newFilteredContacts)
  }, [sortedContacts, searchField])
  
  
  //useEffect for closing modal automatically after adding new contact
  useEffect(() => {
    handleCloseModal();
    
    // return () => {
    //   handleShowAlert()
    // }
  }, [sortedContacts]);
  
  
  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase()
    setSearchField(searchFieldString)
  }

  const indexOfLastContact = currentPage * contactsPerPage
  const indexOfFirstContact =  indexOfLastContact - contactsPerPage
  const currentContacts = filteredContacts.slice(indexOfFirstContact,indexOfLastContact)

  const totalPageNum = Math.ceil(sortedContacts.length/contactsPerPage)

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-4">
            <h2>
              Manage <b>Contacts</b>
            </h2>
          </div>
          <div className="col-sm-4">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={onSearchChange}
            />
          </div>
          <div className="col-sm-4">
            <Button
              onClick={handleShowModal}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>{" "}
              <span>Add New Contact</span>
            </Button>
          </div>
        </div>
      </div>
{/* 
      <Alert
        show={showAlert}
        variant="success"
        onClose={handleCloseAlert}
        dismissible
      >
        Contact added successfully
      </Alert> */}

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentContacts.map((contact) => (
            <tr key={contact.id}>
              <Contact contact={contact} />
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationComponent
        pages={totalPageNum}
        setCurrentPage={setCurrentPage}
        entries={currentContacts}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddContactForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactList;
