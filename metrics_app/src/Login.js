import React, {Component} from 'react';
import { TextInput} from 'react-native';
import { Text} from 'react-native';
import CreateAccnt from './CreateAccnt';
import MyBackground from "./images/Atlas-V_2.jpg"


export default class Login extends Component{
    constructor(props){
        super(props);

        this.state ={
            canShowDashboard: false,
            isUsernameHighlighted: false,
            isPasswordHighlighted: false,
            isLoginBtnHighlighted: false,
            currentUName: "",
            currentPWord: "",
            canRenderLogin: true,
            canRenderCreateAccnt: true
        };
        this.displayLogin = this.displayLogin.bind(this);
        this.canHighlightUsernameField = this.canHighlightUsernameField.bind(this);
        this.canHighlightPasswordField = this.canHighlightPasswordField.bind(this);
        this.canHighlightLoginBtn = this.canHighlightLoginBtn.bind(this);
        this.sendCredentialsToApp = this.sendCredentialsToApp.bind(this);
        this.createAccnt = this.createAccnt.bind(this);
        this.callBack_appCreateAccntHandler = this.callBack_appCreateAccntHandler.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }
    handleEnterKey(event){
        if(event.key === 'Enter'){
            this.sendCredentialsToApp(this.state.currentUName, this.state.currentPWord);
        }
        }
    createAccnt(inval){
        this.setState({
            canRenderLogin: false,

        })
    }
    callBack_appCreateAccntHandler(valFromCreateAccnt){
        console.log("insdie createAccnt handler");
        if (valFromCreateAccnt){
          this.setState({canRenderLogin : !this.state.canRenderLogin})
        }
      }
    sendCredentialsToApp(usernameAttempt, passwordAttempt){
        console.log("attempting to pass " + usernameAttempt + "and " + passwordAttempt)
        this.props.usernamepasswordprops(usernameAttempt,passwordAttempt);
    }
    canHighlightUsernameField(){
        this.setState({isUsernameHighlighted : !this.state.isUsernameHighlighted})
    }
    canHighlightPasswordField(){
        this.setState({isPasswordHighlighted : !this.state.isPasswordHighlighted})
    }
    canHighlightLoginBtn(){
        this.setState({canHighlightLoginBtn : !this.state.canHighlightLoginBtn})
    }
    checkIfCanHighlightUserName(){
        if (this.state.isUsernameHighlighted == true){
            return "blue"
        }
        else{
            return "#f2f2f2f2"
        }
    }
    checkIfCanHighlightPassword(){
        if (this.state.isPasswordHighlighted == true){
            return "blue"
        }
        else{
            return "#f2f2f2f2"
        }
    }
    checkIfCanHighlightLoginButton(){
        if (this.state.isLoginBtnHighlighted == true){
            return "blue"
        }
        else{
            return "black"
        }
    }
    displayLogin(){

        var loginStyle = {
            width:"30%",
            height:"100%",
            backgroundColor:"#f2f2f2f2",
            marginLeft: "35%",
            marginTop: "7%",
            borderRadius: "1%",
            opacity: ".8",
        //    position: "absolute"
        };
        var myBorderStyle = {
            borderWidth: "3px", 
            borderColor: "black", 
            borderStyle: "solid",
            position: "absolute"
        };
            return(
            
                <div style={loginStyle}>
                    <table style={myBorderStyle} style={{height: "100%", width: "100%",
}}>
                        <tr style={myBorderStyle} style={{height: "20%"}}>
                            <td style={myBorderStyle} style={{textAlign: "center"}}> 
                                    <Text style={{float: "top", color:"black", fontFamily: "openSans", fontWeight: "600", fontSize: "1.4em", textAlign: "center"}}>
                                        MAARS
                                    </Text>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center">
                                <TextInput placeholder="Username" autoFocus={true}
                                style={{fontSize: ".8em", width:"69", backgroundColor: this.checkIfCanHighlightUserName()}}
                                onFocus={this.canHighlightUsernameField}
                                onBlur={this.canHighlightUsernameField}
                                onChangeText={(text) => { this.setState({ currentUName: text})}}
                                onKeyPress={this.handleEnterKey}
                                >               
                                </TextInput>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>  
                        <td align="center">
                                <TextInput placeholder="Password"
                                style={{fontSize: ".8em", width:"69", backgroundColor: this.checkIfCanHighlightPassword()}}
                                secureTextEntry={true}
                                onFocus={this.canHighlightPasswordField}
                                onBlur={this.canHighlightPasswordField}
                                onChangeText={(text) => { this.setState({ currentPWord: text})}}
                                onKeyPress={this.handleEnterKey}
                                >
                                </TextInput>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "9%"}}>
                            <td align="center" style={{cursor: "pointer"}}>
                                <div  style={{width: "30%", height: "50%", borderRadius: "3%", marginTop: "18px", backgroundColor: this.checkIfCanHighlightLoginButton()}}
                                        onFocus={this.canHighlightLoginBtn}
                                        onBlur={this.canHighlightLoginBtn}
                                >
                                    <div style={{fontSize: ".6em", verticalAlign: "middle", color: "white"}}>
                                       
                                        <Text tabindex="0" style={{fontSize: ".6em", verticalAlign: "middle", color: "white", height: "100%", width: "100%"}}
                                                  onClick={() => this.sendCredentialsToApp(this.state.currentUName, this.state.currentPWord)}
                                                  onPress={() => this.sendCredentialsToApp(this.state.currentUName, this.state.currentPWord)}
                                                  onFocus={() => this.canHighlightLoginBtn()}
                                                  onBlur={() => this.canHighlightLoginBtn()}
                                        >Login</Text>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "15%"}}>
                            <td>
                                <Text tabindex="0" style={{fontSize: ".6em", cursor: "pointer"}}
                                    >
                                    Forgot Password?
                                </Text>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "15%"}}>
                            <td>
                            <Text tabindex="0" style={{fontSize: ".6em", cursor: "pointer", float:"right"}}
                                    onPress={() => this.createAccnt(true)}
                                    onClick={() => this.createAccnt(true)}
                                >
                                    Create Account
                                </Text>
                            </td>
                        </tr>
                    </table>
                </div>
                
            );
            
        }
    render(){
        if (this.state.canRenderLogin){
            return(
                <div>
                {this.displayLogin()}
                </div>
            );
        }
        else{
            return(
                <div style={{
                backgroundSize: "cover", 
                height: "100%", 
                width: "100%",
                position: ((this.state.canShowDashboard) ? "relative" : "absolute"),
                backgroundImage: `url(${MyBackground})`,
                backgroundPosition: "center -60px",
                opacity: 1
                        }}>
                        <CreateAccnt callBack_appCreateAccnt={this.callBack_appCreateAccntHandler}/> 
                </div>
            );
        }
    }

}