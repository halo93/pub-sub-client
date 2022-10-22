import {useEffect,useState} from "react";
import {convertToTimestampToLocaleString} from "../helper/Helper";
import { Link } from 'react-router-dom';
import ShowMoreModal from "./ShowMoreModal";
import Button from "react-bootstrap/Button";
import Base64Downloader from 'react-base64-downloader';



const Table = ({ data, isSentTable }) => {

    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    //base64regex.test("SomeStringObviouslyNotBase64Encoded...");             // FALSE
    //base64regex.test("U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=");
    const [modalShow, setModalShow] = useState(false);
    const [dialogContent,setDialogContent] = useState("");
    const [isMessageIdModal,setIsMessageIdModal] = useState(false);
    const [isImage,setIsImage] = useState(false);



    const moreClicked = (e,m_c,isMsgIdModal,isImg) =>{
        e.preventDefault();
        console.log(m_c);
        console.log("clicked")
        setDialogContent(m_c)
        setIsMessageIdModal(isMsgIdModal);
        setIsImage(isImg)
        setModalShow(true);

    }

    useEffect(() => {

    }, [data,modalShow,dialogContent]);

    return (
        <div>
            {data && data.length > 0 ? (
                    <div>
                        <ShowMoreModal message={dialogContent} show={modalShow} isMsgIdModal={isMessageIdModal}
                                       onHide={() => setModalShow(false)} isImg={isImage}> </ShowMoreModal>
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
                                        {message.id.length>25 ? <th>{message.id.slice(0,25)} <a href="#" onClick={(e) => moreClicked(e,message.id,true,false)}>...More</a> </th> : <th>{message.id}</th>}

                                        {message.content.startsWith("data:")?

                                            (<div style={{margin:"5px"}}> <img style={{height: "50px",borderStyle: "solid", borderWidth: "2px"}} src={message.content} alt="Red dot" onClick={(e) => moreClicked(e,message.content,false,true)} /> </div>)
                                            :
                                            (message.content.length>500 ? <td>{message.content.slice(0,500)} <a href="#" onClick={(e) => moreClicked(e,message.content,false,false)}>...More</a></td> : <td>{message.content}</td>) }

                                        <td>{convertToTimestampToLocaleString(message.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            ) : (
                <div style={{ marginBottom: '0' }} className="alert alert-warning">{ isSentTable? "No message sent" :"No message received"}</div>
            )}
        </div>


    );
};

export default Table;