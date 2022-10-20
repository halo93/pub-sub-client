// import {useEffect} from "react";

import Table from "./Table";

const SecondTab = ({ clean }) => {

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
            <h2 style={{ textAlign: 'center', margin: '0 auto', padding: '10px 10px 10px 10px' }}>Received Messages</h2>
            <Table data={mockedData} isSentTable={false}/>
        </div>
    );
};
export default SecondTab;