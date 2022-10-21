import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import Tab from "./components/Tab";

import apiClient from "./http-common";

function App() {
  const get_id = useRef(null);
  const get_title = useRef(null);

  const post_title = useRef(null);
  const post_description = useRef(null);

  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  },[]);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function getAllData() {
    try {
      const res = await apiClient.get("/tutorials");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await apiClient.get(`/tutorials/${id}`);

        const result = {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function getDataByTitle() {
    const title = get_title.current.value;

    if (title) {
      try {
        // const res = await instance.get(`/tutorials?title=${title}`);
        const res = await apiClient.get("/tutorials", {
          params: {
            title: title,
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function postData() {
    const postData = {
      title: post_title.current.value,
      description: post_description.current.value,
    };

    try {
      const res = await apiClient.post("/tutorials", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  const clearPostOutput = () => {
    setPostResult(null);
  };

  return (
      <div id="app" className="container">
      {loading ? (
            <div id="preloader">
              <section id="status"><span>Hi there!<br/>Please wait for the connection</span></section>
            </div>
      ) : (
            <div className="my-12">
              <h3 style={{ marginTop : '50px', marginBottom: '30px', textAlign: 'center' }}>Simple Pub-sub Service</h3>
              <div className="card mt-12">
                <div className="card-header">Please choose the operation below to use our service</div>
                <Tab />
              </div>

            </div>
            )}
      </div>
  )
}

export default App;

{/*<div className="card mt-3">*/}
{/*  <div className="card-header">React Axios GET </div>*/}
{/*  <div className="card-body">*/}
{/*    <div className="input-group input-group-sm">*/}
{/*      <button className="btn btn-sm btn-primary" onClick={getAllData}>Get All</button>*/}

{/*      <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />*/}
{/*      <div className="input-group-append">*/}
{/*        <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>*/}
{/*      </div>*/}

{/*      <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />*/}
{/*      <div className="input-group-append">*/}
{/*        <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>*/}
{/*      </div>*/}

{/*      <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>*/}
{/*    </div>   */}
{/*    */}
{/*    { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }*/}
{/*  </div>*/}
{/*</div>*/}

{/*<div className="card mt-3">*/}
{/*  <div className="card-header">React Axios POST - BezKoder.com</div>*/}
{/*  <div className="card-body">*/}
{/*    <div className="form-group">*/}
{/*      <input type="text" className="form-control" ref={post_title} placeholder="Title" />*/}
{/*    </div>*/}
{/*    <div className="form-group">*/}
{/*      <input type="text" className="form-control" ref={post_description} placeholder="Description" />*/}
{/*    </div>*/}
{/*    <button className="btn btn-sm btn-primary" onClick={postData}>Post Data</button>*/}
{/*    <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>*/}

{/*    { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }*/}
{/*  </div>*/}
{/*</div>*/}

