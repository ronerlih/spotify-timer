import React, { Component } from "react";
import moment from "moment";
import DeleteBtn from "../components/DeleteBtn";
import Timer from "../components/Timer";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Landing extends Component {
    state = {
        spotify: null
    };

    componentDidMount() {

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
                    <Col
                        size="sm-6"
                        style={{
                            display: "flex",
                            flexFlow: "column",
                            background: "#09d3ac",
                            padding: "5px",
                            height: "calc(100vh - 56px)",
                            minHeight: "650px",
                            marginBottom: "auto"
                        }}
                    >
                        <Timer />
                    </Col>
                    <Col
                        size="sm-6"
                        style={{ padding: 0, backgroundColor: "black" }}
                    >
                        <div>
                            <iframe
                                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn"
                                width="100%"
                                height="722px"
                                frameBorder="0"
                                allowtransparency="true"
                                allow="encrypted-media"
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
