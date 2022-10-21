import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React from 'react';
import {encode} from '../helper/Helper'
import axios from 'axios';
import { useState, useEffect } from "react";
import apiClient from "../http-common";




const ShowMoreModal = (props) => {




    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Publish Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.message }</p>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowMoreModal;