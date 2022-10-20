import React, {useState} from "react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";

const Tab = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [clean, setClean] = useState(false);

    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab('tab1');
        // setTab(1);
        setClean(true);
    };

    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab('tab2');
        // setTab(2);
        setClean(true);
    };

    return (
        <div className="Tabs">
            {console.log(activeTab)}
            <ul className="nav nav-tabs">
                <li className={activeTab === 'tab1' ? 'nav-item active' : 'nav-item'} onClick={handleTab1}>
                    <a className={activeTab === 'tab1' ? 'nav-link active' : 'nav-link'}>Send Message</a>
                </li>
                <li className={activeTab === 'tab2' ? 'nav-item active' : 'nav-item'} onClick={handleTab2}>
                    <a className={activeTab === 'tab2' ? 'nav-link active' : 'nav-link'}>Retrieve Message</a>
                </li>
            </ul>
            <div>
                {activeTab === 'tab1' ? (
                    <div className="justify-content-center">
                        <FirstTab
                            clean={clean}
                        />
                    </div>
                ) : (
                    <div className="justify-content-center">
                        <SecondTab clean={clean} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tab;