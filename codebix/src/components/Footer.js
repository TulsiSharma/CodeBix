import React from "react";
import {Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
class Footer extends React.Component{
    render(){
        return(
                    // <footer>
                        <Row>
                            <Col lg="5" md="5" sm="8" xs="12">
                                <div style={{marginTop:"10px",marginBottom:"7px"}}>
                                    <Link to="/"><h4>CodeBix</h4></Link>
                                    <span>Copyright © 2020</span>
                                </div>
                              
                            </Col>
                            <Col lg="7" md="7" sm="4" xs="12">
                                <div className="footer-icon">
                                    <a href="https://github.com/TulsiSharma" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/in/tulsisharma/" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                    <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=codebix4422@gmail.com" target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    // </footer>

            );

    }
}
export default Footer;