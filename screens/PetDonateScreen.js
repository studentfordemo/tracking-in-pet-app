import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class PetDonateScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      petAge:"",
      petbreed:"",
      image: "#"
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(petAge,petbreed)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('pets_to_donate').add({
        "user_id": userId,
        "petAge":petAge,
        "petbreed":petbreed,
        "request_id"  : randomRequestId,
        "image":this.state.image
    })

    this.setState({
        petAge:"",
      petbreed:""
    })

    return Alert.alert("Donate initiated successfully")
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, image) => {
    var response = await fetch(uri);
    var blob = await response.blob();
var imageName=image+this.createUniqueId();
    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  componentDidMount() {
    this.fetchImage(this.state.userId);

  }

  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Pets To Donate"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
          
            <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size="medium"
            onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
          />
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter Pets Age"}
                onChangeText={(text)=>{
                    this.setState({
                        petAge:text
                    })
                }}
                value={this.state.petAge}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Pet Breed"}
                onChangeText ={(text)=>{
                    this.setState({
                        petbreed:text
                    })
                }}
                value ={this.state.petbreed}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.petAge,this.state.petbreed)}}
                >
                <Text>Donate</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
