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
    const [base64, setBase64] = useState(false);

    let publishedAt;



    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const b64 = await convertBase64(file)
        setBase64(b64);
        console.log(b64)
    }



    const handleSendClick = (e) => {
        e.preventDefault();
        if(!messageContent && !base64){
            setErrorMessage("Message content is required!");
            return;
        }
        let m_id,chunks;
        if(base64){
            console.log("is a file");
            [m_id,chunks] = encode(base64);
        }
        else{
            [m_id,chunks] = encode(messageContent);
        }
        console.log(chunks)
        apiClient.post("pub", chunks[0])
            .then( (res) => {
                console.log(res)
                publishedAt = new Date(res.data);
                if(chunks.length>1) {
                    sendChunks(chunks.slice(1), m_id);
                }
                else{
                    props.set_table((prevData)=> {return [...prevData,{id:m_id.join(","),content:(base64?base64:messageContent),createdAt:publishedAt}]})
                    props.onHide();
                    setMessageContent("");
                    setErrorMessage("");
                    setBase64(false);
                }
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
                     props.set_table((prevData)=> {return [...prevData,{id:m_id.join(","),content:(base64?base64:messageContent),createdAt:publishedAt}]})
                     props.onHide();
                     setMessageContent("");
                     setErrorMessage("");
                     setBase64(false);
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

                        <input id="originalFileName"
                               type="file"
                               inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt , .txt' }}
                               required
                               label="Document"
                               name="originalFileName"
                               onChange={e => handleFileRead(e)}
                               size="small"
                               variant="standard" />

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