import PropTypes from "prop-types";
import { Component } from "react";
import css from "./ContactList.module.css";

export class ContactList extends Component {

    deleteContact = id => {
        const { value } = id.target;
        this.props.onClick(value);
    }

    render() {
        const { contacts } = this.props;

        return (
            <ul className={css.contactsList}>
                {contacts.map(contact => {
                    return (
                        <li key={contact.id} className={css.contactsItem}>
                            <p className={css.contactsName}>{contact.name}</p>
                            <p className={css.contactsNumber}>{contact.number}</p>
                            <button
                                type="submit"
                                onClick={this.deleteContact}
                                className={css.contactsButton}
                                value={contact.id}
                            >
                                Delete
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

ContactList.propTypes = {
    contacts: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}