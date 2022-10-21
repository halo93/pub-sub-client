import {useEffect} from "react";
import {convertToTimestampToLocaleString} from "../helper/Helper";

const Table = ({ data, isSentTable }) => {

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
                                <td>{message.content}</td>
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