import {useEffect} from "react";
import Table from "./Table";

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

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px' }}>Sent Messages</h2>
            <Table data={mockedData} isSentTable={true}/>
        </div>
    );
};
export default FirstTab;