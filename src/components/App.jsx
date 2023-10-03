import { Component } from "react";
import { nanoid } from "nanoid";

import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {

    try {
      const storedState = localStorage.getItem("Contacts_Local_Storage")

      if (storedState) {
        this.setState(JSON.parse(storedState))
      }

    } catch (error) {
      alert("Error occured, please try again")
    }

  }

  // updateLocalStorage() {
  //   localStorage.setItem("Contacts_Local_Storage", JSON.stringify(this.state))
  // }
  
  componentDidUpdate(prevProps, prevState) {

    // if (prevState.contacts !== this.state.contacts || prevState.filter !== this.state.filter) {
    //  if (prevState.contacts !== this.state.contacts) {
    //   this.updateLocalStorage();
      // }
      
      localStorage.setItem("Contacts_Local_Storage", JSON.stringify(this.state.contacts))

      // if (!localStorage) {
      //   window.localStorage.removeItem("Contacts_Local_Storage")
      // }
  }

  newContact = (name, number) => {

    const { contacts } = this.state;

    const contactNames = contacts.map(contact => {

      return contact.name;

    });

    if (contactNames.includes(name))
      
      return alert(`${name} is alredy in contacts`);

    this.setState(prevState => ({

      contacts: [...prevState.contacts, { id: nanoid(), name, number }]

    }))
  }

  showContacts = () => {

    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  deleteContact = id => {

    this.setState(prevState => ({

      contacts: prevState.contacts.filter(contact => contact.id !== id)

    }))
  }

  filterContacts = newValue => {

    this.setState({
      filter: newValue

    })
  }

  render() {

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.newContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterContacts} />
        {this.state.contacts.length > 0 && (<ContactList contacts={this.showContacts()} onClick={this.deleteContact} />)}
      </div>
    )
  }
}