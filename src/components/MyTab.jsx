import React, {useState} from "react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import {Tabs, Tab} from "react-bootstrap";

const MyTab = () => {
    const [clean, setClean] = useState(false);

    return (
        <Tabs
            defaultActiveKey="send"
            id="fill-tab-example"
            className="mb-6"
        >
            <Tab eventKey="send" title="Send Message">
                <div className="justify-content-center">
                    <FirstTab clean={clean} />
                </div>
            </Tab>
            <Tab eventKey="retrieve" title="Retrieve Message">
                <div className="justify-content-center">
                    <SecondTab clean={clean} />
                </div>
            </Tab>
        </Tabs>
    )
}

export default MyTab;