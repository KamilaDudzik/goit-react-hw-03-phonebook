import PropTypes from "prop-types";
import { Component } from "react";
import css from "./ContactForm.module.css";

export class ContactForm extends Component {
    state = {
        name: "",
        number: ""
    }

    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleAdd = event => {
        event.preventDefault();
        const { name, number } = this.state;

        this.props.onSubmit(name, number);

        this.setState({ name: "", number: "" })
    }

    render() {
        const { name, number } = this.state;

        return (
            <div className={css.section}>
                <form onSubmit={this.handleAdd} className={css.form}>

                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            value={name}
                            placeholder="Contact name"
                            className={css.formInput}
                            onChange={this.handlerChange}
                        />
                    </label>
                    <label>
                        Number
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            value={number}
                            placeholder="Contact number"
                            className={css.formInput}
                            onChange={this.handlerChange}
                        />
                    </label>

                    <button type="submit" className={css.add}>Add contact</button>

                </form>
            </div>
        )
    }
}

ContactForm.propTypes = {
    // name: PropTypes.string.isRequired,
    // value: PropTypes.string.isRequired,
    // number: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // onChange: PropTypes.func.isRequired
}