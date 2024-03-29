import React, {Component} from 'react';
import { Text} from 'react-native';
import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/Users';

export default class Design extends Component{
    constructor(props){
        super(props);

        this.state ={
            inData : null
        };
        this.displayDesign = this.displayDesign.bind(this);
        this.closeDesign = this.closeDesign.bind(this);
        this.displayFinalData = this.displayFinalData.bind(this);
    }
    
    closeDesign(valFromDesign){
        console.log("passing the value: " + valFromDesign);
    this.props.callback_appDesign(valFromDesign);
    }
    componentDidUpdate(){
        console.log("updating in design. access is : "+  this.props.access);
        if ((this.props.access != null) && (this.state.inData === null))
        {
           const AuthStr = 'Bearer '.concat(this.props.access);
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/design",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in design is " + res.data.result);
               this.setState({inData : res.data.result});
           })
       }
    }
    
    componentDidMount(){
        console.log("design component mounted. state is now " + this.state.inData);
        console.log("and access is " + this.props.access);
        if ((this.props.access != null) && (this.state.inData === null))
        {
           const AuthStr = 'Bearer '.concat(this.props.access);
           console.log("AuthStr is " + AuthStr);
   
           axios.get(USER_API_BASE_URL + "/design",{ headers: { Authorization: AuthStr } })
           .then(res => {
               console.log("response in design is " + res.data.result);
               this.setState({inData : res.data.result});
           })
       }
    }
    
    displayFinalData(){
        console.log("number of rows is " + this.state.inData.length);
        var returnStr = [];
        for (var i = 0; i < this.state.inData.length; i++){
            returnStr.push(
            <tr style={{fontSize: ".325em"}}>
                <td style={{textAlign: "left"}}>                                
                {
                    this.state.inData[i][0]
                }
                &nbsp;
                {
                    this.state.inData[i][1]
                }
                </td>
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][2]
                }
                </td>
                <td style={{textAlign: "left"}}>                                         
                {
                    this.state.inData[i][3]
                } sec      
                </td> 
            </tr> 
            );
        }
        return (
            returnStr
        );  
    }
    displayDesign(){
        return (  
                <table height="100%" width="100%" style={{position: "relative", overFlowX: "hidden", opacity: ".55", overflow: "hidden", whiteSpace: "nowrap"}}>
                    <tr height="5%">
                        <td width="35%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{float:"left", fontSize:".8em", color:"#eaeaea", marginLeft: "4px", cursor: "pointer"}} numberOfLines={1}
                                        onClick={() => this.closeDesign("dBoard")} 
                                        onPress={() => this.closeDesign("dBoard")}        
                                         >
                                        MAARS
                                </Text>
                            </div> 
                        </td>
                        <td width="65%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{float:"right", fontSize:".8em", color:"#eaeaea", marginRight: "4px", cursor: "pointer"}}
                                    onClick={() => this.closeDesign("dBoard")} 
                                    onPress={() => this.closeDesign("dBoard")} 
                                    >
                                        Account Management
                                </Text>    
                            </div>
                        </td>
                    </tr>
                    <tr height="90%" colspan="2">
                        <div style={{position:"absolute", color:"white", backgroundColor: "white", height: "90%", width: "100%"}}>
                            <h1 style={{paddingLeft:"20px", marginTop: 0}}>
                                <Text style={{fontFamily:"Titillium Web", fontSize: ".8em", }}
                                >
                                Design
                                </Text>
                                <table height="100%" width="60%" style={{fontFamily:"Titillium Web", color: "black", 
                                marginLeft: "auto", marginRight:"auto", borderWidth: "3px",
                                    borderStyle:"solid", borderColor: "gray", borderRadius:"1px"}}>
                                    <tr>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            User
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Most Recent Date
                                        </th>
                                        <th style={{fontSize: ".5em", textAlign: "left"}}>
                                            Total Time
                                        </th>                                                                                                                                                       
                                    </tr>
                                    {this.displayFinalData()}
                                </table>
                            </h1>
                        </div>
                    </tr>
                    <tr height="5%">
                        <td width="35%">
                            <div style={Object.assign({backgroundColor:"black", width: "100%", height: "100%"})}>
                            </div> 
                        </td>
                        <td width="65%">
                            <div style={Object.assign({backgroundColor: "black", width: "100%", height: "100%"})}>
                                <Text tabindex="0" style={{color: "red", float: "right", color:"#eaeaea", verticalAlign: "bottom", marginRight: "4px", cursor: "pointer"}}
                                onClick={() => this.closeDesign("logout")} 
                                onPress={() => this.closeDesign("logout")} >
                                    Logout           
                                </Text>
                            </div> 
                        </td>
                    </tr>
                </table>
        );
            
    }
    render(){
        if (this.state.inData === null) {
            // Render loading state ...
            return (
                <>
                </>
            );
         } else {
            // Render real UI ...
            return (
            <>

                {this.displayDesign()}
            </>);
          }

    }
}
