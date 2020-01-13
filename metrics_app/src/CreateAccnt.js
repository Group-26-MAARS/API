import React, {Component} from 'react';
import { TextInput} from 'react-native';
import { Text} from 'react-native';

export default class CreateAccnt extends Component{
    constructor(props){
        super(props);

        this.state ={
            canShowDashboard: false,
            isCreateAccntHighlighted: false,
            isFNameHighlighted: false,
            isLNameHighlighted: false,
            isEmailHighlighted: false,
            isPasswordHighlighted: false,
            fNameStr: "",
            lNameStr: "",
            emailStr: "",
            passStr: ""
        };
        this.canHighlightCreateBtn = this.canHighlightCreateBtn.bind(this);
        this.canHighlightFNameField = this.canHighlightFNameField.bind(this);
        this.canHighlightLNameField = this.canHighlightLNameField.bind(this);
        this.canHighlightPasswordField = this.canHighlightPasswordField.bind(this);
        this.canHighlightEmailField = this.canHighlightEmailField.bind(this);
        this.insertNewAdminUser = this.insertNewAdminUser.bind(this);

    }

    insertNewAdminUser(valFromCreateAccnt){  

        if((this.state.passStr != "") && (this.state.emailStr != "") && 
        (this.state.fNameStr != "") && (this.state.lNameStr != "")){
            alert("Account Created");
            this.closeCreateAccnt(valFromCreateAccnt);
        }
        else{
            if (this.state.fNameStr == "")
            alert("Invalid First Name Field");
            else if (this.state.lNameStr == "")
            alert("Invalid Last Name Field");
            else if (this.state.emailStr == "")
            alert("Invalid Email Field");
            else if (this.state.passStr == "")
            alert("Invalid Password Field");
        }
    }
    closeCreateAccnt(valFromCreateAccnt){
        console.log("passing the value: " + valFromCreateAccnt);
    this.props.callBack_appCreateAccnt(valFromCreateAccnt);
    }
    canHighlightCreateBtn(){
        this.setState({isCreateAccntHighlighted : !this.state.isCreateAccntHighlighted})
    }
    canHighlightFNameField(){
        this.setState({isFNameHighlighted : !this.state.isFNameHighlighted})
    }
    canHighlightLNameField(){
        this.setState({isLNameHighlighted : !this.state.isLNameHighlighted})
    }
    canHighlightEmailField(){
        this.setState({isEmailHighlighted : !this.state.isEmailHighlighted})
    }
    canHighlightPasswordField(){
        this.setState({isPasswordHighlighted : !this.state.isPasswordHighlighted})
    }
    checkIfCanHighlightCreateAccntBtn(){
        if (this.state.isCreateAccntHighlighted == true){
            return "blue"
        }
        else{
            return "black"
        }
    }
    checkIfCanHighlightFName(){
        if (this.state.isFNameHighlighted == true){
            return "blue"
        }
        else{
            return "#f2f2f2f2"
        }
    }
    checkIfCanHighlightLName(){
        if (this.state.isLNameHighlighted == true){
            return "blue"
        }
        else{
            return "#f2f2f2f2"
        }
    }
    checkIfCanHighlightEmail(){
        if (this.state.isEmailHighlighted == true){
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

    componentDidMount(){
        console.log("Create Account just mounted");
    }
    displayCreateAccount(){

        var loginStyle = {
            width:"35%",
            height:"100%",
            backgroundColor:"#f2f2f2f2",
            marginLeft: "35%",
            marginTop: "7%",
            borderRadius: "1%",
            opacity: ".8",
        //    position: "absolute"
        };
        var myBorderStyle = {
            //borderWidth: "3px", 
            borderColor: "black", 
            borderStyle: "solid",
            position: "absolute"
        };
            return(
            
                <div style={loginStyle}>
                    <table style={{height: "100%", width: "100%", align: "center"}}>
                    <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center">
                                <Text style={{float: "top", color:"black", fontFamily: "openSans", fontWeight: "400", fontSize: "1.4em", textAlign: "center"}}>
                                    Create Account
                                </Text>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center">
                                <TextInput placeholder="First Name" autoFocus={true}
                                tabindex="0" 
                                style={{fontSize: ".8em", backgroundColor: this.checkIfCanHighlightFName()}}
                                onFocus={this.canHighlightFNameField}
                                onBlur={this.canHighlightFNameField}
                                onChangeText={fNameStr => this.setState({ fNameStr })}
                                >
                                    
                                </TextInput>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center">
                                <TextInput placeholder="Last Name"
                                tabindex="0" 
                                style={{fontSize: ".8em", backgroundColor: this.checkIfCanHighlightLName()}}
                                onFocus={this.canHighlightLNameField}
                                onBlur={this.canHighlightLNameField}
                                onChangeText={lNameStr => this.setState({ lNameStr })}
                                >
                                    
                                </TextInput>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center">
                                <TextInput placeholder="Email Address"                        
                                tabindex="0" 
                                style={{fontSize: ".8em", backgroundColor: this.checkIfCanHighlightEmail()}}
                                onFocus={this.canHighlightEmailField}
                                onBlur={this.canHighlightEmailField}
                                onChangeText={emailStr => this.setState({ emailStr })}
                                >
                                    
                                </TextInput>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center">
                                <TextInput placeholder="Password" 
                                tabindex="0" 
                                style={{fontSize: ".8em", backgroundColor: this.checkIfCanHighlightPassword()}}
                                onFocus={this.canHighlightPasswordField}
                                onBlur={this.canHighlightPasswordField}
                                onChangeText={passStr => this.setState({ passStr })}
                                >
                                    
                                </TextInput>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "3%"}}>
                            <td align="center" style={{cursor: "pointer", width: "100%"}}>
                                <div  style={{width: "30%", height: "50%", borderRadius: "3%", marginTop: "18px", backgroundColor: this.checkIfCanHighlightCreateAccntBtn()}}
                                        onFocus={this.canHighlightCreateBtn}
                                        onBlur={this.canHighlightCreateBtn}
                                >
                                    <div style={{fontSize: ".6em", verticalAlign: "middle", color: "white"}}>
                                       
                                        <Text tabindex="0" style={{fontSize: ".6em", verticalAlign: "middle", color: "white", height: "100%", width: "100%"}}
                                                  onPress={() => this.insertNewAdminUser("createAccount")}
                                                  onClick={()=> this.insertNewAdminUser("createAccount")}
                                                  onFocus={() => this.canHighlightCreateBtn()}
                                                  onBlur={() => this.canHighlightCreateBtn()}
                                        >Create</Text>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr style={myBorderStyle, {height: "15%"}}>

                        </tr>
                        <tr style={myBorderStyle, {height: "15%"}}>
                            <td>
                                <Text tabindex="0" style={{fontSize: ".6em", cursor: "pointer"}}
                                tabindex="0" 
                                >
                                    Forgot Password?
                                </Text>
                            </td>
                            <td>
                            <Text tabindex="0" style={{fontSize: ".6em", cursor: "pointer", float:"right"}}
                                tabindex="0" 
                                onClick={() => this.closeCreateAccnt("createAccnt")} 
                                onPress={() => this.closeCreateAccnt("createAccnt")}
                                >
                                    Home
                                </Text>
                            </td>
                        </tr>
                    </table>
                </div>
                
            );
            
        }
    render(){
        return(
            <div>
            {this.displayCreateAccount()}
            </div>
        );
    }

}