import React from "react";
import { Col, Row} from "reactstrap";

class Cards extends React.Component{
    handleclick=()=>{
        // event.currentTarget.style["box-shadow"]="0 4px 8px 0 rgba(1, 1, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        this.props.editrecent(this.props.recent[this.props.ind],this.props.ind);
    }
    render()
    {
        return(
            <Col lg="12" md="9" sm="8" xs="12">
                <div className="card-box card-wrap" style={{cursor:"pointer"}} onClick={()=>this.handleclick()}>
                    <Row className="inner-layer">
                        <Col lg="3" md="3" sm="3" xs="3" style={{minHeight:"inherit"}}>
                            <div className="fileimage" style={{paddingLeft:"10px"}}>
                                <i className="fa fa-file" aria-hidden="true"></i>
                            </div>
                        </Col>
                        <Col lg="9" md="9" sm="9" xs="9">
                            <p style={{overflowWrap:"break-word",paddingRight:"8px"}}>{this.props.recent[this.props.ind].name}</p>
                            <div className="foot">
                                <span id="status"><i className="fas fa-circle"style={{fontSize:"9px",paddingRight:"7px",color:"black"}}></i></span>
                                <span style={{lineHeight:"-6",fontSize:"14px",color:"black"}}>{this.props.recent[this.props.ind].mode}</span>
                                <span style={{lineHeight:"-6",color:"blue",fontWeight:"300",padding:"5px",fontSize:"16px",paddingLeft:"8%"}}>{this.props.recent[this.props.ind].status}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        );
    }
}

export default Cards;