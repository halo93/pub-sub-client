import Table from "./Table";
import Button from 'react-bootstrap/Button';
import React from 'react';
import MyModal from "./MyModal";
import { useState, useEffect } from "react";




const FirstTab = ({ clean }) => {
    const [tableData, setTableData] = useState(() => {
        const saved = sessionStorage.getItem("td");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    });

    useEffect(() => {
        sessionStorage.setItem("td", JSON.stringify(tableData));
    }, [tableData]);

    // useEffect(() => {
    //     // if (clean) {
    //     //
    //     // }
    // }, [mockedData]);


    const [modalShow, setModalShow] = React.useState(false);
    const [messageContent,setMessageContent] = React.useState("");

    return (
        <div >

            <div className='text-right' style={{marginTop: '10px',marginRight: '10px', textAlign:'right'}}>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Publish Message
                </Button>
            </div>


            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px',
            }}>Sent Messages</h2>
            <Table data={tableData} isSentTable={true}/>


            <MyModal
                set_table={setTableData}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>

    );
};
export default FirstTab;