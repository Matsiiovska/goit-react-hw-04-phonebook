import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, Zag, Blok } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, [])
  

  useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));    
 
  }, [contacts]);

  // Додавання нового контакту. перевіряє чи існує контакт  таким іменем
  const addContact = contact => {
    const isContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isContacts) {
      alert(`${contact.name} exist`);
      return;
    }
    setContacts(prevContacts => [{ id: nanoid(), ...contact }, ...prevContacts],
    );
  };


  // Фільтр
const changeFilter = e => {
  setFilter(e.target.value );
  };

  // Відфільтровані контакти
  const getVisibleContacts = () => {
    /*const { filter, contacts } = this.state;*/
    const normFilter = filter.toLowerCase();// нижній регістр

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  // Видалення контакту
const removeContact = (idContact) => {
    setContacts((prevContacts) => {
      return prevContacts.filter(({ id }) => id !== idContact);
    });
};
  

const visibleContacts = getVisibleContacts();
   /* const { filter } = this.state;*/

    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={addContact} />

        <Zag>Contacts</Zag>
        {contacts.length > 0 ? (
          // Фільтр
          <Filter value={filter} onChangeFilter={changeFilter} />
        ) : (
          <Blok>It's empty. Add a contact!</Blok>
        )}
        {contacts.length > 0 && (
          // Список контактів
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </Container>
    );

}
export default App;




  

