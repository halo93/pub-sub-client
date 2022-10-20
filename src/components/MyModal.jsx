import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React from 'react';
import {send_dummy} from '../helper/Helper'
function MyModal(props) {

    const [messageContent,setMessageContent] = React.useState("");
    const [errorMessage,setErrorMessage] = React.useState("");
    const handleSendClick = () => {
        console.log("handle click catched");
        let result = send_dummy(messageContent);
        if(result.status == 200){
            props.onHide();
        }
        else{
            setErrorMessage(result.message);
        }

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