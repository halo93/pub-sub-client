import {useEffect,useState} from "react";
import {convertToTimestampToLocaleString} from "../helper/Helper";
import { Link } from 'react-router-dom';
import ShowMoreModal from "./ShowMoreModal";



const Table = ({ data, isSentTable }) => {

    const [modalShow, setModalShow] = useState(false);
    const [messageContent,setMessageContent] = useState("");

    const moreClicked = (e,m_c) =>{
        e.preventDefault();
        console.log(m_c);
        console.log("clicked")
        setMessageContent(m_c)
        setModalShow(true);
    }

    useEffect(() => {

    }, [data,modalShow,messageContent]);

    return (
        <div>
            {data && data.length > 0 ? (
                    <div>
                        <ShowMoreModal message={messageContent} show={modalShow}
                                       onHide={() => setModalShow(false)}> </ShowMoreModal>
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

                                        {message.content.length>500 ? <td>{message.content.slice(0,500)} <a href="#" onClick={(e) => moreClicked(e,message.content)}>...More</a></td> : <td>{message.content}</td>}
                                        <td>{convertToTimestampToLocaleString(message.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            ) : (
                <div style={{ marginBottom: '0' }} className="alert alert-warning">No message sent</div>
            )}
        </div>


    );
};

export default Table;