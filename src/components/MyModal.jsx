import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React from 'react';
import {encode} from '../helper/Helper'
import axios from 'axios';
import { useState, useEffect } from "react";
import apiClient from "../http-common";




const MyModal = (props) => {

    const [messageContent,setMessageContent] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    let publishedAt;


    const handleSendClick = (e) => {
        e.preventDefault();
        if(!messageContent){
            setErrorMessage("Message content is required!");
            return;
        }
        const [m_id,chunks] = encode(messageContent);
        console.log(chunks)
        apiClient.post("pub", chunks[0])
            .then( (res) => {
                console.log(res)
                publishedAt = new Date(res.data);
                sendChunks(chunks.slice(1),m_id);
            })
            .catch(error => {
                setErrorMessage("Sending message failed.")
            });
        //sendChunks(chunks,m_id);
    }


    const sendChunks = (chunks,m_id) => {


         Promise.all(chunks.map((chunk) =>
             apiClient.post("pub", chunk)))
             .then(
                 (res) => {
                     console.log(res)
                     props.set_table((prevData)=> {return [...prevData,{id:m_id.slice(0,10).join(),content:messageContent,createdAt:publishedAt}]})
                     console.log("full message id:")
                     console.log(m_id)
                     props.onHide();
                     setMessageContent("");
                     setErrorMessage("");
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
                    <Form.Control  required as="textarea" aria-label="" rows="12" value={messageContent}
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