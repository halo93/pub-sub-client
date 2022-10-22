import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React, {useRef} from 'react';
import {encode} from '../helper/Helper'
import axios from 'axios';
import { useState, useEffect } from "react";
import apiClient from "../http-common";
import Tooltip from 'react-bootstrap/Tooltip';
import {Overlay} from "react-bootstrap";
import Base64Downloader from "react-base64-downloader";




const ShowMoreModal = (props) => {


    const [isOpen,setIsOpen] = useState(false);
    const target = useRef(null);

    const handleCopyClick = () =>{
        console.log("Copy button clicked")
        navigator.clipboard.writeText(props.message)
        setIsOpen(true)
    }

    useEffect(() => {
        console.log("isOpen", isOpen);
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    }, [isOpen]);


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.isImg?("Image"):
                    props.isMsgIdModal ? "Message ID":"Message Content"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.isImg ?
                    <img style={{height: "300px"}} src={props.message} alt="Red dot" /> :
                    <p style={{wordWrap: "break-word"}}>{props.message}</p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Tooltip placement="left" isOpen={isOpen} target="btn_copy"/>
                {props.isMsgIdModal ? (
                    <>
                        <Button ref={target} onClick={handleCopyClick}>Copy ID</Button>
                        <Overlay target={target.current} show={isOpen} placement="left">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props} style={{
                                    position: 'absolute',
                                    backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                    padding: '2px 10px',
                                    color: 'white',
                                    borderRadius: 3,
                                    ...props.style,
                                }}>
                                    Copied to clipboard
                                </Tooltip>
                            )}
                        </Overlay>
                    </>
                ) : null}
                {props.isImg ?
                    <Base64Downloader base64={props.message} downloadName="downloaded_file">
                        Download
                    </Base64Downloader>
                    :null

                }


            </Modal.Footer>
        </Modal>
    );
}

export default ShowMoreModal;