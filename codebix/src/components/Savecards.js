import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

class Savecards extends React.Component{
    handleedit=()=>{
        // this.props.editfile(this.props.ind);
    }
    handleshare=(ind)=>{
        this.props.setid(this.props.ind);
        this.props.setshare();
    }
    handledelete=()=>{
        this.props.handledelete(this.props.ind);
    }
    render(){
        if(!this.props.result[this.props.ind]){
            return null;
        }
        return(
            <Col lg="4" md="6" sm="9" xs="12">
                <div className="card-wrap">
                    <div className="cover">
                        <ul>
                            <li onClick={()=>this.handleedit()}><Link style={{color:"white"}} target="_blank" to={`/files/${btoa(this.props.uid)}/${this.props.ind}`}><i className="fas fa-edit"></i></Link></li>
                            <li onClick={()=>this.handleshare(this.props.ind)}><i className="fas fa-share"></i></li>
                            <li onClick={()=>this.handledelete()}><i className="fas fa-trash"></i></li>
                        </ul>
                    </div>
                    <Row className="inner-layer">
                        <Col lg="3" md="3" sm="3" xs="3" style={{minHeight:"inherit"}}>
                            <div className="fileimage">
                                <i className="fa fa-file" aria-hidden="true"></i>
                            </div>
                        </Col>
                        <Col lg="9" md="9" sm="9" xs="9">
                            <p style={{overflowWrap:"break-word"}}>{this.props.result[this.props.ind].name}</p>
                            <div className="foot">
                                <span id="status"><i className="fas fa-circle"style={{fontSize:"10px",paddingRight:"4px"}}></i></span>
                                <span style={{lineHeight:"-6"}}>{this.props.result[this.props.ind].mode}</span>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Col>

        );

    }

}
export default Savecards;