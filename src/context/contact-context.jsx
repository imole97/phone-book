
import { useState,createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


export const ContactContext = createContext({
    contacts: [],
    setContacts: () => {}
})
const uuid =  uuidv4
const ContactProvider = ({children}) => {

    const [contacts, setContacts] = useState([
        // {id:uuid(), name:'Imoleayo Adebanjo', email: 'imole@mail.com', phone: '0802339283'},
        // {id:uuid(), name: 'Thomas Hardy10', email: 'thomashardy@mail.com', phone: '(171) 555-2222'},
        // {id:uuid(), name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', phone: '(313) 555-5735'},
        // {id:uuid(), name: 'Maria Anders', email: 'mariaanders@mail.com',  phone: '(503) 555-9931'},
        // {id:uuid(), name: 'Fran Wilson', email: 'franwilson@mail.com', phone: '(204) 619-5731'},
        // {id:uuid(), name: 'Martin Blank', email: 'martinblank@mail.com', phone: '(480) 631-2097'}
    ])


    useEffect(() => {
        const json = localStorage.getItem("contacts");
        const loadedContacts = JSON.parse(json);
        loadedContacts ? setContacts(loadedContacts) : setContacts([]);
    }, []);

    useEffect(() => {
        if(contacts?.length){ //only store state if contacts exist and is greater than one
            const json = JSON.stringify(contacts);
            localStorage.setItem("contacts", json);
        }
    }, [contacts]);



    const addContact = (newContact) => {
        setContacts([...contacts, newContact])
    }

    const deleteContact = (id) => {
        const updatedContacts = contacts.filter(contact => contact.id !== id)
        setContacts(updatedContacts)
    }

    const updateContact = (id, updatedContact) => {
        const updatedContacts = contacts.map(contact => contact.id === id? updatedContact:contact)
        setContacts(updatedContacts)
    }

    const sortedContacts = contacts.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    )

    const value = { sortedContacts, addContact, deleteContact, updateContact, setContacts };

    return(
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    )
}

export default ContactProvider
