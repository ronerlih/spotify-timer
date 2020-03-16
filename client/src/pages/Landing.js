import React, { Component } from "react";
import Timer from "../components/Timer";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

class Landing extends Component {
    state = {
        spotify: null,
        src: "https://google.com"
    };
    spotifyRef =  React.createRef();


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                        <Timer iframeSrc={this.state.iframeSrc} refHook={this.spotifyRef} />
                    </Col>
                    <Col
                        size="sm-6"
                        style={{ padding: 0, backgroundColor: "black" }}
                    >
                        <div>
                            <iframe
<<<<<<< HEAD
                                src={this.state.src}
                                width="100%"
                                height="722px"
                                frameBorder="0"
                                allowtransparency="true"
                                allow="encrypted-media"
                                title="spotify-player"
                                ref={this.spotifyRef}
=======
                                src="https://google.com"
>>>>>>> master
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
