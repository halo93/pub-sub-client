
import Table from "./Table";
import Form from 'react-bootstrap/Form';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {decode} from '../helper/Helper'
import { useState, useEffect } from "react";
import apiClient from "../http-common";
const SecondTab = ({ clean }) => {
    const [tableData2, setTableData2] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("td2");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    });


    useEffect(() => {
        sessionStorage.setItem("td2", JSON.stringify(tableData2));
    }, [tableData2]);

    const handleClick = () => {
        let message_id_array = messageId.replace("[","").replace("]","").split(',').map(Number);

        apiClient.get("sub",{params:{id:messageId}}).then(res => {
                //modify here
                console.log(res)
                let decoded_message = decode(res.data,message_id_array)
                setTableData2((prevData) => [...prevData,{
                    id: message_id_array.slice(0,10).toString(),
                    content: decoded_message,
                    createdAt: Date.now()
                }])
                setMessageId("");
                console.log(decoded_message)
            })
            .catch(error => {setErrorMessage("Network Error: Receiving message failed.")});
    }
    const [messageId,setMessageId] = React.useState("");
    const [errorMessage,setErrorMessage] = React.useState("");

    // useEffect(() => {
    //     if (clean) {
    //
    //     }
    // }, []);

    return (
        <div>

            <h4>Receive New Message</h4>

            <Form.Label>Message ID</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control placeholder="Paste message ID here" aria-label="" value={messageId} onChange={e => setMessageId(e.target.value)}
                />
                <div style={{color: 'red'}}>
                    {errorMessage}
                </div>
                <Button onClick={handleClick}>Receive</Button>
            </InputGroup>

            <Form.Group className="mb-3" controlId="Form.ControlInput1">
                <Form.Label>Message ID</Form.Label>
                <Form.Control as="textarea" aria-label="" value={messageId} placeholder="Paste message ID here"
                              onChange={e => setMessageId(e.target.value)}/>
                <Form.Text id="passwordHelpBlock" muted>
                    <div style={{color: 'red'}}>
                        {errorMessage}
                    </div>
                </Form.Text>

            </Form.Group>
            <div className='text-right' style={{marginBottom: '10px',marginRight: '10px', textAlign:'right'}}>
                <Button variant="primary" onClick={handleClick}>
                    Receive
                </Button>
            </div>

            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px' }}>Received Messages</h2>
            <Table data={tableData2} isSentTable={false}/>
        </div>
    );
};
export default SecondTab;