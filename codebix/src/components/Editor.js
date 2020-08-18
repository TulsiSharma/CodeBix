import CodeMirror from "codemirror";
import "codemirror/addon/display/autorefresh.js";
import "codemirror/addon/display/placeholder.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/python/python.js";
import "codemirror/mode/ruby/ruby.js";
import "codemirror/mode/javascript/javascript.js";
import React from "react";
import ReactTooltip from "react-tooltip";
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import { c, cpp ,python2,python3,Java,NodeJS,Ruby,cpp14,csharp} from "../data";
import { off} from "codemirror/src/util/event.js";

class Editor extends React.Component {
    InputRef=React.createRef();
    secondRef=React.createRef();
    exitRef=React.createRef();
    state={
        dropdownOpen:false
    }
    createcodemirror=()=>{
        CodeMirror.commands.autocomplete=(cm)=>{
            cm.showHint({hint:CodeMirror.hint.anyword});
        }
        const editor = CodeMirror.fromTextArea(this.InputRef.current,{
            lineNumbers: true,
            autoFocus:true,
            autoCloseBrackets: true,
            matchBrackets:true,
            styleActiveLine:true,
            lineWrapping:true,
            undoDepth:10,
            extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
                "Ctrl-Space":"autocomplete",
                "F11":(cm)=>{
                    this.fullscreen();
                },
                "Esc":(cm)=>{
                    this.fullscreen();
                }
            },  
            foldGutter:true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter","error"],
            autoRefresh:true,
            theme:"blackboard",
            electricChars:true,
            indentUnit:4,
            
        });
        editor.setSize("","570");
        editor.getWrapperElement().style["font-size"]="15px";
        editor.refresh();
        editor.setValue("please select your language first..");
        this.props.seteditor(editor);
    }
    componentDidMount(){
       this.createcodemirror();
    }
    toggle=()=>{
        this.setState({dropdownOpen:!this.state.dropdownOpen});
    }
    updatevalue=(event)=>{
        if(this.props.oldvalue !== event.currentTarget.textContent){
            off(this.props.editor,"keypress",this.props.changedata);
            off(this.props.editor,"keyup",this.props.change_after_no_type);

            // console.log(hasHandler(this.props.editor,"change"));
            let code=this.props.editor.getValue();
            if(this.props.issaved){
                this.props.setsaved();
            }
            if((this.props.issaved)|| (this.props.length > 0 && this.props.length < this.props.editor.getValue().length)){
                // console.log("==>>  "+this.props.editor.getValue());
                this.props.updaterecent(code);
            }
            this.props.setid(null);
            this.props.setdropdown(event.currentTarget.textContent);
            this.props.setoldvalue(event.currentTarget.textContent);
           
            switch (event.currentTarget.textContent) {      
                case "C++":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("C++");
                    this.props.editor.setOption("mode","text/x-c++src");
                    this.props.editor.setValue(cpp);
                    // this.props.editor.setValue(cpp);
                    this.props.setlength(this.props.editor.getValue().length);
    
                    // this.props.setlength(this.props.editor.getValue().length);
                    break;
                case "C":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("C");
                    this.props.editor.setOption("mode","text/x-csrc");
                    this.props.editor.setValue(c);
                    this.props.setlength(this.props.editor.getValue().length);
                    break;
                case "C++ 14":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("C++ 14");
                    this.props.editor.setOption("mode","text/x-c++src");
                    this.props.editor.setValue(cpp14);
                    this.props.setlength(this.props.editor.getValue().length);
                    break;
                case "Python 2":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                        // this.props.updaterecent();
                    // }
                    this.props.setmode("Python 2");
                    this.props.editor.setOption("mode","text/x-python");
                    this.props.editor.setOption("version",2);
                    this.props.editor.setValue(python2);
                    this.props.setlength(this.props.editor.getValue().length);

                    break;
                case "Python 3":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("Python 3");
                    this.props.editor.setOption("mode","text/x-python");
                    this.props.editor.setOption("version",3);
                    this.props.editor.setValue(python3);
                    this.props.setlength(this.props.editor.getValue().length);
                    
                    break;
                case "Java":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("Java");
                    this.props.editor.setOption("mode","text/x-java");
                    this.props.editor.setValue(Java);
                    this.props.setlength(this.props.editor.getValue().length);

                    break;
                case "C#":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("C#");
                    this.props.editor.setOption("mode","text/x-csharp");
                    this.props.editor.setValue(csharp);
                    this.props.setlength(this.props.editor.getValue().length);
        
                    break;
                case "NodeJS":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("NodeJS");
                    this.props.editor.setOption("mode","text/javascript");
                    this.props.editor.setValue(NodeJS);
                    this.props.setlength(this.props.editor.getValue().length);
            
                    break;
                case "Ruby":
                    // if(this.props.length > 0 && this.props.length < this.props.editor.getValue().length){
                    //     this.props.updaterecent();
                    // }
                    this.props.setmode("Ruby");
                    this.props.editor.setOption("mode","text/x-ruby");
                    this.props.editor.setValue(Ruby);
                    this.props.setlength(this.props.editor.getValue().length);
                    
                    break;

                default:
                    break;
            }
           
        }
    }
    handlesave=()=>{
        if(!this.props.uid && this.props.issaved){
            const name=this.props.status;
            this.props.setstatus("login first !");
            setTimeout(() => {
                this.props.setsignup();
                this.props.setstatus(name);
            }, 1500);

        }
        else if(!this.props.uid){
            this.props.setsignup();
        }
        else if(!this.props.issaved){
            this.props.toggle();
        }
        else{
            const name=this.props.status;
            this.props.setstatus("Saving...");
            this.props.savefile(name);
            setTimeout(() => {
                this.props.setstatus(name);
            }, 1000);
        }
    }
    fullscreen=()=>{
        const ele= this.props.editor.getWrapperElement();
        ele.requestFullscreen({ navigationUI: "show" });
        
    }
    
    handleshare=()=>{
        if(!this.props.uid){
            this.props.setsignup();
        }
        else if(!this.props.issaved){
            this.props.toggle();

        }
        else{
            this.props.setshare();
        }
    }
    render(){
        return(
            <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                    <div className="editor" ref={this.secondRef}>
                        <div className="editor-nav">
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft:"5px",height:"100%"}}>
                            <DropdownToggle caret size="sm"style={{backgroundColor:"whitesmoke",color:"black",border:"block"}}>
                                {!this.props.dropdownvalue?"Language":this.props.dropdownvalue}
                            </DropdownToggle>
                            <DropdownMenu style={{width:"200px"}}>
                                <DropdownItem active style={{marginRight:"0px"}} onClick={this.updatevalue} dropdownvalue="click">C++</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>C</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>C++ 14</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>Python 2</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>Python 3</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>Java</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>C#</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>NodeJS</DropdownItem>
                                <DropdownItem style={{marginRight:"0px"}} onClick={this.updatevalue}>Ruby</DropdownItem>
                            </DropdownMenu> 
                        </ButtonDropdown>
                        <Button  size="sm" data-tip data-for="FullscreenMode" onClick={this.fullscreen}><i className="fas fa-expand" style={{fontSize:"19px"}}></i></Button>
                        <ReactTooltip id="FullscreenMode" place="top" effect="solid">
                            FullScreen
                        </ReactTooltip>
                        <Button  data-tip data-for="Share" size="sm" onClick={this.handleshare}><i className="fas fa-share-alt" style={{fontSize:"19px"}}></i></Button>
                        <ReactTooltip id="Share" place="top" effect="solid">
                            {this.props.dropdownvalue===""?"Choose language first!":!this.props.issaved? "File saved before Share" : "Share"}
                        </ReactTooltip>
                        <Button data-tip data-for="save" size="sm" onClick={this.handlesave} ><i className="fas fa-save" style={{fontSize:"19px"}}></i></Button>
                        <ReactTooltip id="save" place="top" effect="solid">
                        {this.props.dropdownvalue===""?"Choose language first!":"Save"}
                        </ReactTooltip>    
                        <span style={{color:"blue", float:"right",paddingTop:"10px",fontSize:"16px",fontWeight:"300",paddingRight:"17px"}}>{!this.props.issaved ? "Unsaved": this.props.status}</span>
                        </div>
                        <div className="codemirror">
                            <textarea ref={this.InputRef} autoCapitalize="false" tabIndex="4" style={{position:"relative"}}>
                            </textarea>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default Editor;