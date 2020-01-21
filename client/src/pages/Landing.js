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
  };

  componentDidMount() {
    
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

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
        <Col size="md-6" style={{display:"flex", flexFlow:"column", background:"#09d3ac", padding:"5px", height:"calc(100vh - 56px)", marginTop: "auto", marginBottom: "auto"}}>
        <Timer />
        </Col>
        <Col size="md-6 sm-12">
          playlist
        </Col>
        </Row>
      </Container >
    );
  }
}

export default Landing;
