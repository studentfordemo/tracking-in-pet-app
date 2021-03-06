import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity ,TextInput} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { Avatar } from "react-native-elements";



export default class PetDetailsScreen extends React.Component {
    constructor(){
      super()
      this.state = {
        allTransactions: [],
        lastVisibleTransaction: null,
        search:''
      }
    }

    fetchMoreTransactions = async ()=>{
      var text = this.state.search.toLowerCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toLowerCase() ==='a'||"b"||"c"||"d"||"e"||"f"||"g"||"h"||"i"||"j"||"k"||"l"){
      const query = await db.collection("pets_to_donate").where('petbreed','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
      else if(enteredText[0].toLowerCase() === 'm'||"n"||"o"||"p"||"q"||"r"||"s"||"t"||"u"||"v"||"w"||"x"||"y"||"z"){
        const query = await db.collection("pets_to_donate").where('petbreed','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
      
  }

    searchTransactions= async(text) =>{
      var enteredText = text.split("")
      var text = text.toLowerCase()
  
      
      if (enteredText[0].toLowerCase() ==='a'||"b"||"c"||"d"||"e"||"f"||"g"||"h"||"i"||"j"||"k"||"l"){
        const transaction =  await db.collection("pets_to_donate").where('petbreed','==',text).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
      else if(enteredText[0].toLowerCase() === 'm'||"n"||"o"||"p"||"q"||"r"||"s"||"t"||"u"||"v"||"w"||"x"||"y"||"z"){
        const transaction = await db.collection('pets_to_donate').where('petbreed','==',text).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
      else{
        alert("sorry the breed that u r lookin for is not available")
      }
    }
    renderItem = ( {item, i} ) =>{

      return (
        <View>
     
            <ListItem
          key={i}
          
          leftAvatar={<Avatar
            rounded
            source={{
              uri: item.image,
            }}
            size="medium"
          />}
          title={item.petAge}
          subtitle={item.petbreed}
          titleStyle={{ color: 'red',backgroundColor:"orange", fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button}
              
              onPress ={()=>{
                this.props.navigation.navigate("DonorDetailsScreen",{"details": item})
              }}>
                <Text style={{color:'green'}}>View</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
          
        
        </View>
      )
      
    }
  
  
    componentDidMount = async ()=>{
      const query = await db.collection("pets_to_donate").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [],
          lastVisibleTransaction: doc
        })
      })
    }
    render() {
      return (
        <View style={styles.container}>
          <MyHeader title="Adopt a Pet" navigation ={this.props.navigation}/>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter petbreed"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchTransactions(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={this.renderItem}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })