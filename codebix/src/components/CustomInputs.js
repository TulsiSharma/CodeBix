import React from "react";
import {Row, Col, Button } from 'reactstrap';
class CustomInputs extends React.Component{
    handleclick=()=>{
        this.props.toggle();
    }

    render(){
        return(
         
                <Row style={{marginBottom:"20px"}}>
                    <Col lg="6" md="6" sm="12" xs="12">
                        <div className="button">
                            <Button color="info" size="md" block onClick={this.handleclick}>Inputs <i className="fas fa-angle-down"></i></Button>
                        </div>
                    </Col>
                    <Col lg="6" md="6" sm="12" xs="12">
                        <div className="button">
                            <Button color="success" size="md" block onClick={()=>this.props.Exicutecode()}><i className="fas fa-play"></i> Run</Button>
                        </div>
                    </Col>
                </Row>
        );
    }
}
export default CustomInputs;