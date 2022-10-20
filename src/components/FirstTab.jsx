import Table from "./Table";
// import {useEffect} from "react";
import {encode} from '../helper/Helper'
import Button from 'react-bootstrap/Button';
import React from 'react';
import MyModal from "./MyModal";



const FirstTab = ({ clean }) => {

    let mockedData = [
        {
            id: '1111',
            content: 'Lorem ipsum abcdefghijklmn',
            createdAt: Date.now()
        },
        {
            id: '2222',
            content: 'Lorem ipsum abcdefghijklmn22222',
            createdAt: Date.now()
        },
    ]

    // useEffect(() => {
    //     // if (clean) {
    //     //
    //     // }
    // }, [mockedData]);

    const [modalShow, setModalShow] = React.useState(false);
    const [messageContent,setMessageContent] = React.useState("");

    return (
        <div style={{marginBottom: '10px',marginRight: '10px', textAlign:'right'}}>
            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px',
            }}>Sent Messages</h2>
            <Table data={mockedData} isSentTable={true}/>
            <div className='text-right'>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Publish Message
                </Button>

            </div>

            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>

    );
};
export default FirstTab;