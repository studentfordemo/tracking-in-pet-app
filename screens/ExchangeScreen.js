import React from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends React.Component {
    constructor () {
        super();
        this.state = {
            userName : firebase.auth().currentUser.email,
            description : "",
            itemName : ""
                }
    }
    addItem = (itemName,description) => {
        var userName = this.state.userName
        db.collection("exchanged_requests").add({
       "userName" : userName,
       "itemName" : itemName,
       "description" : description
        })
        return alert("Item ready to exchange"," ",[{text : 'OK' , onPress:()=>{ this.props.navigation.navigate("HomeScreen")}} ])
    }
    render () {
        return (
            <View>
                <TextInput
style={styles.textInput}
placeholder ={"Item Name"}
onChangeText={(text)=>{ 
    this.setState({ itemName: text
     }) 
     }}
/>
<TextInput
placeholder ={"Item Description"}
onChangeText={(text)=>{
     this.setState({ description: text
      })
       }}
/> 

 <TouchableOpacity  style={styles.addItemButton}
 onPress={()=>{this.addItem(this.state.itemName,this.state.description)}}
 >
     <Text style={styles.text}> Add Item </Text>
 </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    textInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      formTextInput:{
        width:"75%",
        height:100,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      addItemButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      text : {
          color : "#ffff",
          fontSize : 18,
          fontWeight: "bold" 
      }
})