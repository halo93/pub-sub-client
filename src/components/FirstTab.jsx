// import {useEffect} from "react";
import {encode} from '../helper/Helper'

const FirstTab = ({ clean }) => {

    // useEffect(() => {
    //     if (clean) {
    //
    //     }
    // }, []);

    return (
        <div>
            <h1>Send Message tab</h1>
            <h2>{encode("Hello Word")}</h2>
        </div>
    );
};
export default FirstTab;