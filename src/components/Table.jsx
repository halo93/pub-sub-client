import {useEffect} from "react";
import {convertToTimestampToLocaleString} from "../helper/Helper";
import { Link } from 'react-router-dom';


const Table = ({ data, isSentTable }) => {

    const moreClicked = (e) =>{
        e.preventDefault();
        console.log("clicked")
    }

    useEffect(() => {

    }, [data]);

    return (
        <div>
            {data && data.length > 0 ? (
                <table className="table table-striped" style={{tableLayout: "fixed",
                    wordWrap: "break-word"}}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Content</th>
                        {isSentTable ? <th scope="col">Created At</th> : <th scope="col">Retrieved At</th>}
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((message, i) => (
                            <tr key={`msg-${i}`}>
                                <th scope="row">{message.id}</th>

                                {message.content.length>500 ? <td>{message.content.slice(0,500)} <a href="#" onClick={moreClicked}>...More</a></td> : <td>{message.content}</td>}
                                <td>{convertToTimestampToLocaleString(message.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ marginBottom: '0' }} className="alert alert-warning">No message sent</div>
            )}
        </div>


    );
};

export default Table;