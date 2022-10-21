import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React from 'react';
import {encode} from '../helper/Helper'
import axios from 'axios';
import { useState, useEffect } from "react";

const MyModal = (props) => {

    const [messageContent,setMessageContent] = useState("");
    const [errorMessage,setErrorMessage] = useState("");


    const handleSendClick = (e) => {
        e.preventDefault();
        const [m_id,chunks] = encode(messageContent);
        sendChunks(chunks,m_id);
    }

    const sendChunks = (chunks,m_id) => {
         Promise.all(chunks.map((chunk) =>
             axios.get('https://reqres.in/api/users?page=2')
         ))
             .then(
                 (res) => {
                     props.set_table((prevData)=> {return [...prevData,{id:m_id.slice(0,10).join(),content:messageContent,createdAt:Date.now()}]})
                     console.log("full message id:")
                     console.log(m_id)

                     props.onHide();
                 }
             )
             .catch(error => {
                 setErrorMessage("Network Error: Sending message failed.")
             });

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Publish Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group className="mb-3" controlId="Form.ControlInput1">
                    <Form.Label>Message Content</Form.Label>
                    <Form.Control as="textarea" aria-label="" value={messageContent}
                                  onChange={e => setMessageContent(e.target.value)}/>
                    <Form.Text id="passwordHelpBlock" muted>
                        <div style={{color: 'red'}}>
                            {errorMessage}
                        </div>
                    </Form.Text>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSendClick}>Send</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;