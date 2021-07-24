import React,{useState,useEffect} from 'react'
import { View ,Image,Text,TextInput,Button , StyleSheet,TouchableOpacity, Alert} from 'react-native'

import Hints from './Hints';


export default function Header({definition,word , loadWord}) {
  const [count,setCount]=useState(0);
    const [value, onChangeText] = React.useState("");

    function decrementCount(points){
      setCount(count-points);
    }


    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../assets/favicon.png')}></Image>
            </View>
            <Text style={styles.text}>Guess The Word</Text>

            <TextInput style={styles.inputText} 
            placeholder="Enter The Word"
            onChangeText={(text )=> onChangeText(text)}
            value={value}>
            </TextInput>

            <Text>{value}</Text>
            <Text>{word}</Text>

            <Text style={styles.text}>Score:{count}</Text>
           
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              if(value.toLowerCase() == word.toLowerCase()){
                Alert.alert('You guessed it! You earned 10 points')
                setCount(count+10)
                loadWord()
              }else{
                setCount(count-5)
                Alert.alert('wrong guess! Try Again')
                
              }

            }}>
           <Text>Enter</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              decrementCount(4);
              //setCount(count-4)
              loadWord();
              }
            }
             >
           <Text>Get New Word (4pts)</Text>
           </TouchableOpacity>

        <Hints  definition={definition} decrementCount={decrementCount} /> 

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor: 'yellow',
        alignItems: 'center',
        paddingTop:20,
        paddingBottom:20,
        borderWidth:3,
    },
    image:{
        alignContent:'center',
      },
      text:{
        fontSize:20,
        fontStyle:"italic",
       fontWeight:"bold",
      },
      inputText:{
        marginTop:10,
        height:40,
        width:300,
        borderColor:"black",
        borderWidth:2,
        paddingLeft:10,
        borderRadius:20,
      },
      button:{
        backgroundColor: "#DDDDDD",
        alignItems:'center',
        width:200,
        padding:10,
        margin:7,
      }
     
})
