import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { ContactContext } from "../../context/contact-context";

const EditContactForm = ({ contact }) => {

  const { updateContact } = useContext(ContactContext);

  const [editContact, setEditContact] = useState({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

  const {id,name, email, phone } = editContact;

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditContact({ ...editContact, [name]: value });
  };

  const submitEdit = (e) => {
    e.preventDefault()
    updateContact(id, editContact)
    toast.success('contact edited successfully')
  }

  return (
    <>
      <Form onSubmit={submitEdit}>
        <Form.Group>
          <Form.Control
            name="name"
            value={name}
            onChange={handleEditInput}
            className="form-control"
            type="text"
            placeholder="Enter name*"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="email"
            value={email}
            onChange={handleEditInput}
            className="form-control"
            type="email"
            placeholder="Enter email*"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="phone"
            value={phone}
            onChange={handleEditInput}
            className="form-control"
            type="text"
            placeholder="Enter number"
            required
          />
        </Form.Group>
        <Button variant="sucess" type="submit" block="true" className="btn">
          Edit Contact
        </Button>
      </Form>
    </>
  );
};

export default EditContactForm;
