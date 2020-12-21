import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyAdoptionScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allAdoptions : []
     }
     this.requestRef= null
   }


   getallAdoptions =()=>{
     this.requestRef = db.collection("all_adoptions").where("adoptor_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allAdoptions = snapshot.docs.map(document => document.data());
       this.setState({
         allAdoptions : allAdoptions,
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.petAge}
       subtitle={"Donoated By : " + item.donating_by +"\nStatus : " + item.adoption_status}
       leftElement={<Icon name="pet" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity style={styles.button}>
             <Text style={{color:'#ffff'}}>Adopted</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getallAdoptions()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Adoptions"/>
         <View style={{flex:1}}>
           {
             this.state.allAdoptions.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Adopted Pets</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allAdoptions}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})