
import { useState,createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


export const ContactContext = createContext({
    contacts: [],
    setContacts: () => {}
})
const uuid =  uuidv4
const ContactProvider = ({children}) => {

    const [contacts, setContacts] = useState([
      {
        id: uuid(),
        name: "Imoleayo Adebanjo",
        email: "imole@mail.com",
        phone: "0802339283",
      },
      {
        id: uuid(),
        name: "Jane Doe",
        email: "janedoe@mail.com",
        phone: "08023380233",
      },
      {
        id: uuid(),
        name: "John Doe",
        email: "johndoe@mail.com",
        phone: "08023380200",
      },
      {
        id: uuid(),
        name: "Tony Stark",
        email: "ironman@mail.com",
        phone: "(503) 555-9931",
      },
      {
        id: uuid(),
        name: "Bruce Wayne",
        email: "batman@mail.com",
        phone: "(204) 619-5731",
      },
      {
        id: uuid(),
        name: "Bubu Hari",
        email: "presi@mail.com",
        phone: "08023380419",
      },
    ]);


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
