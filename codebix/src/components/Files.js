import React from "react";
import { Row, Col,Container, Button} from "reactstrap";
import Filecontainer from "./Filecontainer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Share from "./Share";
import base from "./base";
import firebase from "firebase";
class Files extends React.Component{
    preRef=React.createRef();
    nextRef=React.createRef();
    firstRef=React.createRef();
    lastRef=React.createRef();
    state={
        savefiles:{},
        result:null,
        flag:false,
        isShare:false,
        id:null,
        uid:null,
        owner:null,
        pagelist:null,
        currentPage : 1,
        numberPerPage :9,
        numberOfPages : 1,
        res:null
    };
    componentDidMount(){
        // console.log("mounted!!!");
        var storage= JSON.parse(localStorage.getItem("sessionid"));
        if(storage && storage.uid!==null){
            this.ref= base.syncState(`${storage.uid}/savefiles`,{
                context:this,
                state:'savefiles'
            });
            this.setState({uid:storage.uid});
            this.setState({owner:storage.uid});
        }
        else{
            this.handleauth();
        }
        const res= localStorage.getItem("CodeBix");
        this.setState({res:res});
        localStorage.setItem("CodeBix",res);

    }
    componentWillUnmount(){
        // console.log("unmounted!!!");
        if(this.ref){
            base.removeBinding(this.ref);
        }
        if(this.state.res!==null){
            localStorage.setItem("CodeBix",this.state.res);
        }
        var id={
            uid:null
        }
        localStorage.setItem("sessionid",JSON.stringify(id));
    }
    componentDidUpdate(){
        var id={
            uid:this.state.uid
        }
        localStorage.setItem("sessionid",JSON.stringify(id));
    }
    handleauth=()=>{
        // console.log("yyyyyy");
        firebase.auth().onAuthStateChanged(user=>{
            if(user){  
                this.authHandler({user});
            }
        });
    }
    authHandler= async (authdata)=>{
        // look up a store ito the firebase.
        const store = await base.fetch(authdata.user.uid,{context:this});
        //claim if there is no owner.
        if(!store.user){
            await base.post(`${authdata.user.uid}/user`,{
                data:authdata.user.uid
            });
        }
        //set the state of the inventory compnent.
        this.setState({
            uid:authdata.user.uid,
            owner:store.user || authdata.user.uid
        });
            this.ref= base.syncState(`${authdata.user.uid}/savefiles`,{
                context:this,
                state:'savefiles'
            });
            console.log("authanticate!!");
        
    }

    setshare=()=>{
        this.setState({isShare:!this.state.isShare});
    }

    handlechange=(event)=>{
        if(!this.state.flag){
            this.setState({flag:true});
        }
        this.setState({pagelist:null});
        const result={};
        const val = event.currentTarget.value;
        if(val==="Choose language"){
            this.setState({flag:false});
        }
        setTimeout(() => {
            // console.log(this.state.savefiles);
            Object.keys(this.state.savefiles).map((key)=>{
                if(this.state.savefiles[key].mode===val){
                    result[key]=this.state.savefiles[key];
                }
            });    
            this.setState({result:result});
            this.getNumberOfPages(result);
        },3000);
        setTimeout(() => {
            this.loadList();
        }, 4000);
        
    }
    handledelete=(ind)=>{
        let savefiles = {...this.state.savefiles};
        let result = {...this.state.result};
        // console.table(savefiles);
        savefiles[ind]=null;
        // console.table(savefiles);
        this.setState({savefiles:savefiles});
        result[ind]=null;
        this.setState({result});

        // console.table(this.state.savefiles);  
    }
    editfile=(val)=>{
        const win=window.open(`/files/${btoa(this.state.uid)}/${val}`,'_blank');
        if(win){
            win.focus();
        }
        base.removeBinding(this.ref);

    }
    setid=(val)=>{
        this.setState({id:val});
    }

    getNumberOfPages=(result)=>{
        this.setState({numberOfPages:Math.ceil(Object.keys(result).length / this.state.numberPerPage)})
    }
    nextPage=()=>{
        this.setState({currentPage:this.state.currentPage+1});
        setTimeout(() => {
            this.loadList();
        }, 1000);
    }
    previousPage=()=> {
        this.setState({currentPage:this.state.currentPage-1});
        setTimeout(() => {
            this.loadList();
        }, 1000);
    }
    firstPage() {
        this.setState({currentPage:1});
        setTimeout(() => {
            this.loadList();
        }, 1000);
    }
    lastPage=()=> {
        this.setState({currentPage:this.state.numberOfPages});
        setTimeout(() => {
            this.loadList();
        }, 1000);
        
    }
    loadList=()=> {
        this.setState({pagelist:null});
        var begin = ((this.state.currentPage - 1) * this.state.numberPerPage);
        var end = begin + this.state.numberPerPage;
        const res={};
        var arr=Object.keys(this.state.result);
        for(var i=begin;i<end;i++){
            if(i>-1 && i<arr.length){
                var ind=arr[i];
                res[ind]=this.state.result[ind];
            }
        }
        this.setState({pagelist:res});
    }
    render(){
        return(
            <div className="container-fluid" style={{padding:"0px"}}>
                <div className="wrapper-box">
                    <nav style={{textAlign:"center",padding:"14px",background:"whitesmoke"}}>
                        <div className="container">
                            <h5>
                                <Link style={{textDecoration:"none"}} to="/">
                                    <i className="fas fa-code"  style={{color:"black"}} ></i>
                                    <span style={{color:"gray",paddingLeft:"3px",fontWeight:"200"}}>CodeBix</span>
                                </Link>
                            </h5>
                        </div>
                        
                    </nav>
                    <Share isShare={this.state.isShare} setshare={this.setshare} path={window.location.href} id={this.state.id} uid={this.state.uid} />
                    <div className="container">
                        <br></br>
                        <div className="back-div">
                            <Row>
                                <Col lg="5" md="6" sm="9" xs="9" >
                                    <select onChange={this.handlechange}  style={{display:"block",border:"block",width:"100%",height:"35px",borderColor:"black",borderWidth:"2px"}}>
                                        <option selected value="Choose language">Choose language</option>
                                        
                                        <option value="C++">C++</option>
                                        <option value="C">C</option>
                                    </select>
                                    
                                </Col>
                            </Row>
                        </div>
                        <br></br>
                        <Container style={{border:"1px solid lightgray",paddingBottom:"20px",marginTop:"10px",minHeight:"450px",maxHeight:"450px",overflow:"scroll"}}>
                            <Filecontainer uid={this.state.uid} result={this.state.pagelist} flag={this.state.flag} handledelete={this.handledelete} editfile={this.editfile} setid={this.setid} setshare={this.setshare}/>
                        </Container>
                        <Row>
                            <Col lg="4" md="3" sm="2" xs="1"></Col>
                            <Col lg="4" md="6" sm="8" xs="10">
                                <div className="pagination">
                                    <Button id="previous" ref={this.preRef} onClick={()=>this.previousPage()} disabled={this.state.currentPage === 1 ? true : false}>Prev</Button>
                                    <Button id="first" ref={this.firstRef} onClick={()=>this.firstPage()} disabled={this.state.currentPage === 1 ? true : false}>First</Button>
                                    <Button id="next" ref={this.nextRef} onClick={()=>this.nextPage()} disabled={this.state.currentPage === this.state.numberOfPages ? true : false}>Next</Button>
                                    <Button id="last" ref={this.lastRef} onClick={()=>this.lastPage()} disabled={ this.state.currentPage === this.state.numberOfPages ? true : false}>Last</Button>
                                </div>
                            </Col>
                            <Col lg="4" md="3" sm="2" xs="1"></Col>
                            
                        </Row>
                    </div>
                </div>
            </div>
        );

    }
}
export default Files;