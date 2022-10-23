import Table from "./Table";
import Form from 'react-bootstrap/Form';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {decode} from '../helper/Helper'
import { useState, useEffect } from "react";
import apiClient from "../http-common";
import {Spinner} from "react-bootstrap";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const SecondTab = ({ clean }) => {
    const [tableData2, setTableData2] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("td2");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    });

    const [messageId,setMessageId] = React.useState("");
    const [errorMessage,setErrorMessage] = React.useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        sessionStorage.setItem("td2", JSON.stringify(tableData2));
    }, [tableData2]);

    const handleClick = () => {
        setIsSending(true);
        if(!messageId){
            setErrorMessage("Message id is required!")
            setIsSending(false);
            return;
        }

        let message_id_array = messageId.replace("[","").replace("]","").split(',').map(Number);

        apiClient.get("sub",{params:{id:messageId}}).then(res => {
                //modify here

                console.log(res)
                let decoded_message = decode(res.data,message_id_array)
                setTableData2((prevData) => [...prevData,{
                    id: message_id_array.join(","),
                    content: decoded_message,
                    createdAt: Date.now()
                }])
                setMessageId("");
                setErrorMessage("");
                setIsSending(false);
                console.log(decoded_message)

            })
            .catch(error => {
                setErrorMessage("Receiving message failed.");
                setIsSending(false);
            });


    }

    return (
        <div>
            <h3 style={{marginTop:"20px"}}><FontAwesomeIcon icon={faEnvelope} style={{marginRight:"3px"}} />Receive New Message</h3>

            <Form.Group className="mb-3" controlId="Form.ControlInput1">
                <Form.Label>Message ID</Form.Label>
                <Form.Control required as="textarea" aria-label="" value={messageId} rows="10" placeholder="Paste message ID here"
                              onChange={e => setMessageId(e.target.value)}/>
                <Form.Text id="passwordHelpBlock" muted>
                    <div style={{color: 'red'}}>
                        {errorMessage}
                    </div>
                </Form.Text>

            </Form.Group>
            <div className='text-right' style={{marginBottom: '10px',marginRight: '10px', textAlign:'right'}}>
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
                    <Button variant="primary" onClick={handleClick}>
                        Receive
                    </Button>
                )}

            </div>

            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px' }}>Received Messages</h2>
            <Table data={tableData2} isSentTable={false}/>
        </div>
    );
};
export default SecondTab;