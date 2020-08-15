import React from "react";
import NavBar from "./NavBar";
import {Row} from 'reactstrap';
import Leftcomponent from "./Leftcomponent";
import Footer from "./Footer";
import Rightcomponent from "./Rightcomponent";
import base from "./base";
import firebase from "firebase";
import Authanticate from "./Authanticate";
import { c, cpp,python2,python3,Java,NodeJS,Ruby,cpp14,csharp } from "../data";
import Axios from "axios";
import About from "./About";
import { on,off,hasHandler } from "codemirror/src/util/event.js";
class App extends React.Component{
    state={
        editor:{},
        isopen:false,
        savefiles:{},
        mode:"none",
        dropdownvalue:"",
        issaved:false,
        filename:"",
        status:"",
        id:null,
        recent:{},
        val:{},
        length:-9999999999,
        uid:null,
        owner:null,
        signup:false,
        fontsize:14,
        tabsize:4,
        theme:"blackboard",
        oldvalue:null,
        inputdata:"",
        isoutput:false,
        output:null,
        about: false
        
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){  
                this.authHandler({user});
            }
        })
      
    }
    componentDidMount(){
        window.addEventListener("beforeunload",this.onrefresh);
        const res=localStorage.getItem("CodeBix");
        if(res){
            const val=JSON.parse(res);
            this.setState({val:val});
            this.setState({recent:val.recent});
            this.setState({fontsize:parseInt(val.fontsize)});
            this.setmode(val.mode);
            this.setdropdown(val.mode);
            this.setState({tabsize:parseInt(val.tabsize)});
            this.setState({theme:val.theme});
        }   
        const id = this.props.match.params.id;
        const user= this.props.match.params.user;
        if(id && user){
            base.fetch(`${atob(user)}/savefiles/${id}`, {
                context: this,
                equalTo: id,
                then(data){
                  this.updateeditor(id,data);
                }
              });
            
            setTimeout(() => {
                this.state.editor.setValue("Loading....");
            }, 600);
            
        }
        else{
            setTimeout(() => {
                this.previoussetting();
                }, 500); 
        }
    }

     componentWillUnmount(){
         window.removeEventListener("beforeunload",this.onrefresh);
         if(this.state.length>0 && this.state.length < this.state.editor.getValue().length){
             this.savedlastfile();
         }
        if(this.ref) {
            base.removeBinding(this.ref);
        }
    }
   
    componentDidUpdate(){
        const final={
            mode:this.state.dropdownvalue || "",
            fontsize:this.state.fontsize || "",
            tabsize: this.state.tabsize || "",
            theme: this.state.theme || "",
            recent:this.state.recent
        }
        localStorage.setItem("CodeBix",JSON.stringify(final));

    }

    onrefresh=()=>{
        if(this.state.length > 0 && this.state.length < this.state.editor.getValue().length)
            this.updaterecent(this.state.editor.getValue());
    }
    setoldvalue=(val)=>{
        this.setState({oldvalue:val});
    }
    previoussetting=()=>{
        const res=localStorage.getItem("CodeBix");
        var val = JSON.parse(res);
        if(val && val.mode && val.fontsize){
            this.state.editor.getWrapperElement().style["font-size"]=parseInt(val.fontsize)+"px";
            this.state.editor.refresh();
            this.setmode(val.mode);
            switch (val.mode) {
                case "C++":
                    this.state.editor.setOption("mode","text/x-c++src");
                    this.state.editor.setValue(cpp);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "C":
                    this.state.editor.setOption("mode","text/x-csrc");
                    this.state.editor.setValue(c);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "C++ 14":
                    this.state.editor.setOption("mode","text/x-c++src");
                    this.state.editor.setValue(cpp14);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "Python 2":
                    this.state.editor.setOption("mode","text/x-python");
                    this.state.editor.setOption("version",2);
                    this.state.editor.setValue(python2);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "Python 3":
                    this.state.editor.setOption("mode","text/x-python");
                    this.state.editor.setOption("version",3);
                    this.state.editor.setValue(python3);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "Java":
                    this.state.editor.setOption("mode","text/x-java");
                    this.state.editor.setValue(Java);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "C#":
                    this.state.editor.setOption("mode","text/x-csharp");
                    this.state.editor.setValue(csharp);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "NodeJS":
                    this.state.editor.setOption("mode","text/javascript");
                    this.state.editor.setValue(NodeJS);
                    this.setlength(this.state.editor.getValue().length);
                    break;
                case "Ruby":
                    this.state.editor.setOption("mode","text/x-ruby");
                    this.state.editor.setValue(Ruby);
                    this.setlength(this.state.editor.getValue().length);
                    break;
    
                default:
                    break;
            }
            this.setoldvalue(val.mode);
            this.state.editor.setOption("indentUnit",parseInt(val.tabsize));
            this.state.editor.setOption("theme",val.theme);
            
        }        
    }

    setsignup=()=>{
        this.setState({signup:!this.state.signup});
    }

    savedlastfile=()=>{
        const len =Object.keys(this.state.recent).length;
        if(len<5){
            let id =null;
            let data={};
            if(!this.state.issaved){                
               const file={
                   name:"Unknown",
                   content:this.state.editor.getValue(),
                   mode:this.state.dropdownvalue,
                   status:"Unsaved"
               }
               id=Date.now();
               data=file;
            }
            else{
                id=this.state.id;
               data=this.state.savefiles[this.state.id];
            }
            let recent={...this.state.recent};
            recent[id]=data;
            const final={
                mode:"",
                fontsize:"",
                recent:recent
            }
            localStorage.setItem("CodeBix",JSON.stringify(final));
            this.setState({recent});
            
        }
        else{
           const index= Object.keys(this.state.recent)[0];
           let recent={...this.state.recent};
           delete recent[index];
           let id =null;
            let data={};
            if(!this.state.issaved){
               const file={
                   name:"Unknown",
                   content:this.state.editor.getValue(),
                   mode:this.state.dropdownvalue,
                   status:"Unsaved"
               }
               id=Date.now();
               data=file;
            }
            else{
                id=this.state.id;
               data=this.state.savefiles[this.state.id];
            }
            recent[id]=data;
            const final={
                mode:"",
                fontsize:"",
                recent:recent
            }
            localStorage.setItem("CodeBix",JSON.stringify(final));
            this.setState({recent:recent});
            
        }
    }

    updaterecent=(text,indx)=>{
        const len =Object.keys(this.state.recent).length;
        const Data= text;
        const drop =this.state.dropdownvalue;
        if(len<5){
            let id =null;
            let data={};
            if(!this.state.issaved){                
               const file={
                   name:"Unknown",
                   content: Data,
                   mode: drop,
                   status:"Unsaved"
               }
               if(this.state.id)
                id=this.state.id;
               else
                id=Date.now();

                data=file;
            }
            else{
                id=this.state.id;
                data=this.state.savefiles[id];
            }
            let recent={...this.state.recent};
            if(indx){
                delete recent[indx];
            }
            recent[id]=data;
            this.setState({recent});
        }
        else{
           const index= Object.keys(this.state.recent)[0];
           let recent={...this.state.recent};
           delete recent[index];
           if(indx){
            delete recent[indx];
            }
           let id =null;
            let data={};
            if(!this.state.issaved){
               const file={
                   name:"Unknown",
                   content:Data,
                   mode:drop,
                   status:"Unsaved"
               }
               if(this.state.id)
                id=this.state.id;
               else
                id=Date.now();
               data=file;
            }
            else{
                id=this.state.id;
               data=this.state.savefiles[this.state.id];
            }
            recent[id]=data;
            this.setState({recent:recent});
        }
     
    }

    setid=(val)=>{
        this.setState({id:val});
    }
    setdropdown=(val)=>{
        this.setState({dropdownvalue:val});
    }
    setsaved=()=>{
        this.setState({issaved:!this.state.issaved});
    }
    setunsaved=()=>{
        this.setState({issaved:false});
    }

    updateeditor=(id,data)=>{
        if(id && data){
            this.state.editor.setValue("Loading.....");
            // this.setid(id);
            // this.setsaved();
            this.setdropdown(data.mode);
            this.state.editor.setValue(data.content);
            this.setmode(data.mode);
            switch (data.mode) {
                case "C++":
                    this.state.editor.setOption("mode","text/x-c++src");
                    break;
                case "C":
                    this.state.editor.setOption("mode","text/x-csrc");
                    break;
                case "C++ 14":
                    this.state.editor.setOption("mode","text/x-c++src");
                    break;
                case "Python 2":
                    this.state.editor.setOption("mode","text/x-python");
                    this.props.editor.setOption("version",2);
                    break;
                case "Python 3":
                    this.state.editor.setOption("mode","text/x-python");
                    this.props.editor.setOption("version",3);
                    break;
                case "Java":
                    this.state.editor.setOption("mode","text/x-java");
                    break;
                case "C#":
                    this.state.editor.setOption("mode","text/x-csharp");
                    break;
                case "NodeJS":
                    this.state.editor.setOption("mode","text/javascript");
                    break;
                case "Ruby":
                    this.state.editor.setOption("mode","text/x-ruby");
                    break;
                default:
                    break;
                    
            }
            this.setState({length:this.state.editor.getValue().length});
            this.updaterecent(this.state.editor.getValue());   
        
        }
    }

    updatevalue=(key,val)=>{
        const savefiles={...this.state.savefiles};
        savefiles[key]=val;
        this.setState({savefiles:savefiles});        
    }

    setmode=(val)=>{
        this.setState({mode:val});
    }
    savefile=(val)=>{
        if(this.state.dropdownvalue){
        this.setState({issaved:true});  
        this.setstatus("Saving...");
        const data={
            name:val,
            content:this.state.editor.getValue(),
            status:"saved",
            mode:this.state.mode
        }
        const savefiles ={...this.state.savefiles};
        let id="";
        if(this.state.id!==null){
            id=this.state.id;
        }
        else{
            id =Date.now();
            this.setid(id);
        }
        savefiles[id]=data;
        this.setState({savefiles:savefiles});
        setTimeout(() => {
            this.setstatus(data.name);
            
        }, 1000);
        
       
        on(this.state.editor,"change",this.changedata);
        }
    }
    changedata=()=>{
        let data="";
        if(this.state.uid && this.state.issaved){
            data=this.state.savefiles[this.state.id];
            data.content=this.state.editor.getValue();
                this.setstatus("Saving...");
                setTimeout(() => {
                    this.setstatus(data.name);
                }, 300);
                // setInterval(() => {
                //     this.updatevalue(this.state.id,data);
                //     console.log("hellow");   
                // }, 4000);
        }
        else{
            this.setstatus("Login First!!");
            setTimeout(()=>{
                this.setstatus(data.name);
            },500);
        }
    }
    seteditor=(val)=>{
        this.setState({editor:val});
    }
    settheme=(val)=>{
        this.setState({theme:val});
        this.state.editor.setOption("theme",val);
    }
    settab=(val)=>{
        this.setState({tabsize:val});
        this.state.editor.setOption("indentUnit",val);
    }
    setsize=(val)=>{
        this.setState({fontsize:val});
        this.state.editor.getWrapperElement().style["font-size"]= val+"px";
        this.state.editor.refresh();
    }
    toggle=()=>{
        this.setState({isopen:!this.state.isopen});   
    }
    setstatus=(val)=>{
        // console.log(val);
        this.setState({status:val});
    }

    setlength=(len)=>{
        this.setState({length:len});
    }

    authenticate=(provider)=>{
        const authprovider =new firebase.auth[`${provider}AuthProvider`]();
        firebase.auth().signInWithPopup(authprovider).then(this.authHandler); 
        this.setsignup();
       
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

    }
    logout = async () =>{
        await firebase.auth().signOut();
        this.setState({
            uid:null
        });
    }

    editrecent=(val,ind)=>{
        off(this.state.editor,"change",this.changedata);
        console.log(hasHandler(this.state.editor,"change"));
        if(this.state.length > 0 && this.state.length < this.state.editor.getValue().length){
            this.updaterecent(this.state.editor.getValue(),ind);
        }
        this.setState({issaved:false});
        if(val.status==="saved"){
            this.setState({issaved:true});
            this.setstatus(val.name);
        }
        this.setoldvalue(val.mode);
        this.setid(ind);
        this.setdropdown(val.mode);
        this.setmode(val.mode);
        switch (val.mode) {
            case "C++":
                this.state.editor.setOption("mode","text/x-c++src");
                break;
            case "C":
                this.state.editor.setOption("mode","text/x-csrc");
                break;
            case "C++ 14":
                this.state.editor.setOption("mode","text/x-c++src");
                break;
            case "Python 2":
                this.state.editor.setOption("mode","text/x-python");
                this.props.editor.setOption("version",2);
                break;
            case "Python 3":
                this.state.editor.setOption("mode","text/x-python");
                this.props.editor.setOption("version",3);
                break;
            case "Java":
                this.state.editor.setOption("mode","text/x-java");
                break;
            case "C#":
                this.state.editor.setOption("mode","text/x-csharp");
                break;
            case "NodeJS":
                this.state.editor.setOption("mode","text/javascript");
                break;
            case "Ruby":
                this.state.editor.setOption("mode","text/x-ruby");
                break;
            default:
                break;
        }
        this.setState({filename:val.name});
        this.state.editor.setValue(val.content);
        this.setlength(1);
        on(this.state.editor,"change",this.changedata);
    }
    
    Exicutecode=async()=>{
        var lang="";
        switch (this.state.mode) {
            case "C++":
                lang="cpp";
                break;
            case "C":
                lang="c";
                break;
            case "C++ 14":
                lang="cpp14";
                break;
            case "Python 2":
                lang="python2";
                break;
            case "Python 3":
                lang="python3";
                break;
            case "Java":
                lang="java";                
                break;
            case "C#":
                lang="csharp";
                break;
            case "NodeJS":
                lang="nodejs";
                break;
            case "Ruby":
                lang="ruby";
                break;
            default:
                lang=this.state.mode;
                break;
        }
        this.showoutput();
        this.setState({output:null});
        const val=this.state.editor.getValue();
        const response = await Axios.post("/testAPI",{
                clientId:"15c716c984d70a61518fdca295d635c5",
                clientSecret:"fe6d26f5a7e2423d719a3d7c675ee208016019f26a2737c10e8647112b06debc",
                script:val,
                stdin:this.state.inputdata,
                language:lang,
                versionIndex:0
            });
            if(response.data.statusCode===200){
                this.setState({output:response.data}); 
            }
            else{
                this.setState({output:"Some Network Error"});
            }
    }

    updateinput=(val)=>{
        this.setState({inputdata:val});
    }
    showoutput=()=>{
        this.setState({isoutput:true});
    }
    setabout=()=>{
        this.setState({about:!this.state.about});
    }
    render(){
        return(
            <div style={{paddingLeft:"0px",paddingRight:"0px"}}>
                <div className="main-wrapper">
                    <NavBar setabout={this.setabout} logout={this.logout} setsignup={this.setsignup} uid={this.state.uid} owner={this.state.owner} settheme={this.settheme} settab={this.settab} setsize={this.setsize} isopen={this.state.isopen} savefile={this.savefile} toggle={this.toggle} editor={this.state.editor} setdropdown={this.setdropdown} setmode={this.setmode} setunsaved={this.setunsaved} />
                    <Authanticate signup={this.state.signup} setsignup={this.setsignup} authenticate={this.authenticate}/>
                    <About about={this.state.about} setabout={this.setabout}/>
                    <div className="gap"></div>
                    <div className="" style={{marginLeft:"20px",marginRight:"20px"}}>
                        <Row>
                            <Leftcomponent changedata={this.changedata} savefile={this.savefile} setsignup={this.setsignup} uid={this.state.uid} setid={this.setid}  output={this.state.output} isoutput={this.state.isoutput} updateinput={this.updateinput} inputdata={this.state.inputdata} Exicutecode={this.Exicutecode} setoldvalue={this.setoldvalue} oldvalue={this.state.oldvalue} setlength={this.setlength} length={this.state.length} setsaved={this.setsaved} editor={this.state.editor} seteditor={this.seteditor} toggle={this.toggle} setmode={this.setmode} setdropdown={this.setdropdown} dropdownvalue={this.state.dropdownvalue} issaved={this.state.issaved} status={this.state.status} setstatus={this.setstatus} path={this.props.match.url} id={this.state.id} updaterecent={this.updaterecent}/>
                            <Rightcomponent recent={this.state.recent} editrecent={this.editrecent}/>
                        </Row>
                    </div>
                    <br></br>
                    <div className="container-fluid footer">
                        <Footer/>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default App;