import {Form, Button} from 'react-bootstrap'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

import { ContactContext } from '../../context/contact-context';


const AddContactForm = () => {
    const uuid = uuidv4

    const {addContact} = useContext(ContactContext)

    const [newContact, setNewContact] = useState({
        id:uuid(), name: '', email: '', phone: '',
    })
    const{name,email,phone} = newContact

    const handleInput = (e) => {
        const {name,value} = e.target
        setNewContact({...newContact, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addContact(newContact)
        toast.success('contact added successfully')
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                name="name"
                value={name}
                onChange={handleInput}
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
                onChange={handleInput}
                className="form-control"
                type="email"
                placeholder="Enter email*"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                name="phone"
                value={phone}
                onChange={handleInput}
                className="form-control"
                type="text"
                placeholder="Enter number"
                required
                />
            </Form.Group>
            <Button variant="sucess" type="submit" block="true">
                Add New Contact
            </Button>
            </Form>
        </>
    );
}

export default AddContactForm 