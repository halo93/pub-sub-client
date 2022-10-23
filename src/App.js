import React, {useEffect, useState} from "react";
import "./App.css";
import MyTab from "./components/MyTab";
import {Card, Col, Row} from "react-bootstrap";
import {faBoltLightning, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function App() {

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  },[]);

  return (
      <div id="app" className="container">
      {loading ? (
            <div id="preloader">
              <section id="status"><span>Hi there!<br/>Please wait for the connection</span></section>
            </div>
      ) : (
            <div className="my-12">
              <Row><Col sm className="my-card-header">
                <h3><FontAwesomeIcon color="yellow" icon={faBoltLightning} /> Simple Pub-sub Service <FontAwesomeIcon color="yellow" icon={faBoltLightning} /></h3>
              </Col></Row>
              <div className="card mt-12">
                <div className="card-header text-center">Send and receive your messages quicker than the Flash <FontAwesomeIcon shake color="green" icon={faThumbsUp} /></div>
                <Card.Body><MyTab /></Card.Body>
              </div>
              <footer>
                <p>© Copyright by ALPJ | October 2022</p>
              </footer>
            </div>
            )}
      </div>
  )
}

export default App;
