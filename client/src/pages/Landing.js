import React, { Component } from "react";
import moment from 'moment'
import DeleteBtn from "../components/DeleteBtn";
import Timer from "../components/Timer";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Landing extends Component {
  state = {
    // books: [],
    // title: "",
    // author: "",
    // synopsis: ""
    spotify:null
  };

  componentDidMount() {
    fetch('https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',{
      responseType : 'blob',
      headers:{
        "Access-Control-Allow-Origin": 'https://open.spotify.com',
        "Content-Security-Policy": 'frame-ancestors self',
        'cors':'no-cors',
        "Content-Type": "application/json",
        'Allow-Control-Allow-Methods':"*",
       
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Headers": "Content-Type Access-Control-Allow-Headers Authorization X-Requested-With"
      }
    })
    .then((data ) => data.text())
    .then(data => {
      this.setState({spotify:data})})
    .catch(e => console.log(e))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-6" style={{ display: "flex", flexFlow: "column", background: "#09d3ac", padding: "5px", height: "calc(100vh - 56px)", minHeight: "650px", marginBottom: "auto" }}>
            <Timer />
          </Col>
          <Col size="sm-6" style={{padding:0, backgroundColor:'black' }}>
            <div>
            <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn" width="100%" height="722px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
           
          </Col>
        </Row>
      </Container >
    );
  }
}

export default Landing;
