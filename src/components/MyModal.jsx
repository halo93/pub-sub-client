import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import {encode} from '../helper/Helper'
import apiClient from "../http-common";
import {Spinner} from "react-bootstrap";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MyModal = (props) => {

    const [messageContent,setMessageContent] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [base64, setBase64] = useState(false);
    const [isSending, setIsSending] = useState(false);

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
        console.log(file.length);
        const b64 = await convertBase64(file)
        setBase64(b64);
        console.log(b64)
    }

    const handleSendClick = (e) => {
        e.preventDefault();
        setIsSending(true);
        if(!messageContent && !base64){
            setErrorMessage("Message content is required!");
            setIsSending(false);
            return;
        }
        let m_id,chunks;
        if(base64){
            console.log("together");
            [m_id,chunks] = encode(messageContent+base64);
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
                    props.set_table((prevData)=> {return [...prevData,{id:m_id.join(","),content:(base64?(messageContent+base64):messageContent),createdAt:publishedAt}]})
                    props.onHide();
                    setMessageContent("");
                    setErrorMessage("");
                    setBase64(false);
                    setIsSending(false);
                }
            })
            .catch(error => {
                setErrorMessage("Sending message failed.")
                setIsSending(false);
            });
    }

    const handleCloseClick = (e) => {
        e.preventDefault();
        props.onHide();
        setMessageContent("");
        setErrorMessage("");
        setBase64(false);
        setIsSending(false);
    }

    const sendChunks = (chunks,m_id) => {
         Promise.all(chunks.map((chunk) =>
             apiClient.post("pub", chunk)))
             .then(
                 (res) => {
                     console.log(res)
                     props.set_table((prevData)=> {return [...prevData,{id:m_id.join(","),content:(base64?messageContent+base64:messageContent),createdAt:publishedAt}]})
                     props.onHide();
                     setMessageContent("");
                     setErrorMessage("");
                     setBase64(false);
                     setIsSending(false);
                 }
             )
             .catch(error => {
                 setErrorMessage("Network Error: Sending message failed.");
                 setIsSending(false);
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
                    <FontAwesomeIcon icon={faPaperPlane} /> Publish a Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="Form.ControlInput1">
                    <Form.Label>Message Content</Form.Label>
                    <Form.Control  required as="textarea" aria-label="" rows="12" value={messageContent}
                                  onChange={e => setMessageContent(e.target.value)}/>
                    <Form.Text id="passwordHelpBlock" muted>
                        <Form.Control id="originalFileName"
                               type="file"
                               inputProps={{ accept: 'image/*' }}
                               required
                               label="Document"
                               name="originalFileName"
                               onChange={e => handleFileRead(e)}
                               style={{height: 'auto'}}
                               size="small"
                               variant="standard" />
                        <Form.Text color="muted">
                            The maximum file size is 2KB. Only image types are supported
                        </Form.Text>
                        <div style={{color: 'red'}}>
                            {errorMessage}
                        </div>

                    </Form.Text>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                {isSending ? (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button>
                ) : (
                    <Button onClick={handleSendClick}>Send</Button>
                )}
                <Button className="btn btn-danger" onClick={handleCloseClick}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;