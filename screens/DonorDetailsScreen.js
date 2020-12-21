import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class DonorDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      DonorId      : this.props.navigation.getParam('details')["user_id"],
      requestId       : this.props.navigation.getParam('details')["request_id"],
      petAge       : this.props.navigation.getParam('details')["petAge"],
      description    : this.props.navigation.getParam('details')["description"],
      petbreed       :this.props.navigation.getParam('details')["petbreed"],
      donorName    : '',
      donorContact : '',
      donorAddress : '',
      donorRequestDocId : ''
    }
  }



getDonorDetails(){
  db.collection('users').where('email_id','==',this.state.DonorId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        donorName    : doc.data().first_name,
        donorContact : doc.data().contact,
        donorAddress : doc.data().address,
      })
    })
  });

  db.collection('pets_to_donate').where('request_id','==',this.state.requestId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({donorRequestDocId:doc.id})
   })
})}

updatePetStatus=()=>{
  db.collection('all_adoptions').add({
    petAge          : this.state.petAge,
    request_id          : this.state.requestId,
    donating_by        : this.state.donorName,
    adoptor_id            : this.state.userId,
    adoption_status      :  "Adoptor Interested"
  })
}



componentDidMount(){
  this.getDonorDetails()
}


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Adopt Pets", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Pet Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Age : {this.state.petAge}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>PetBreed : {this.state.petbreed}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Description : {this.state.description}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Donor Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.donorName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.donorContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.donorAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.DonorId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updatePetStatus()
                    this.props.navigation.navigate('MyAdoptions')
                  }}>
                <Text>I want to Adopt</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})