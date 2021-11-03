import React, { useState } from 'react';

import FormInput from '../../components/forms/FormInput'
import Button from './../../components/forms/Button'
import { Link } from 'react-router-dom'
import './styles.scss';



const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleFormSubmit = async evt => { 
        evt.preventDefault();
        console.log(`${email}`)
    }

    return (
        <div className="contact-wrapper">
        <h1>Interested In Something Custom? Shoot me an Email!</h1>
        <form onSubmit={handleFormSubmit}>
            <div className="first-last">
            
            <FormInput
            required
            placeholder="First Name"
            value={firstName}
            handleChange={evt => setFirstName(evt.target.value)}
            type="text"

            />
            <FormInput
            required
            placeholder="Last Name"
            value={lastName}
            handleChange={evt => setLastName(evt.target.value)}
            type="text"
            />
            </div>
            <div className="subject-message">
            <FormInput
            required
            placeholder="Your Emai"
            value={email}
            handleChange={evt => setEmail(evt.target.value)}
            type="email"
            />
            <FormInput
            required
            placeholder="Subject"
            value={subject}
            handleChange={evt => setSubject(evt.target.value)}
            type="text"
            />
            </div>
            <div className="message">
                
            <textarea type="text"
            required
            value={message.value}
            onChange={evt => setMessage(evt.target.value)}
            name="message"
            placeholder="message"/>
            </div>
            <Button>
                Send Email
            </Button>
                

            </form>
        </div>
    )
}

export default Contact;