import { useState } from 'react';

import { Form, Label, Button, Input } from './ContactForm.styled';

const ContactForm = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');




  // відправка форми
  const handleSubmit = event => {
    event.preventDefault();

    props.onSubmit({ name, number });

    // Скидання форми
    reset();
  };

  const handleChange = event => {
    const { name, value } = event.target;
 if (name === 'name') {
    setName(value);
  } else if (name === 'number') {
    setNumber(value);
  }  };

  
  const reset = () => {
    setNumber('');
    setName('');
  };

  
  
  
  return (
      <Form onSubmit={handleSubmit}>
        <Label >
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact </Button>
      </Form>
    );
}
export default ContactForm;
