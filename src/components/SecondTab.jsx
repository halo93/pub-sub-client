// import {useEffect} from "react";

import Table from "./Table";
import Form from 'react-bootstrap/Form';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const SecondTab = ({ clean }) => {

    const handleClick = () => {
        console.log("button clicked");
    }
    const [idTextField,setIdTextField] = React.useState("");
    let mockedData = [
        {
            id: '1111',
            content: 'Lorem ipsum abcdefghijklmn Second tab',
            createdAt: Date.now()
        },
        {
            id: '2222',
            content: 'Lorem ipsum abcdefghijklmn22222 Second tab',
            createdAt: Date.now()
        },
    ]

    // useEffect(() => {
    //     if (clean) {
    //
    //     }
    // }, []);

    return (
        <div>



            <Form.Label>Message ID</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control placeholder="" aria-label="" value={idTextField} onChange={e => setIdTextField(e.target.value)}
                />
                <Button onClick={handleClick}>Receive</Button>
            </InputGroup>



            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px' }}>Received Messages</h2>
            <Table data={mockedData} isSentTable={false}/>
        </div>
    );
};
export default SecondTab;