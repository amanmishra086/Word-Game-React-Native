import React,{useState,useEffect} from 'react'
import { View ,Image,Text,TextInput,Button , StyleSheet,TouchableOpacity, Alert, FlatList} from 'react-native'

import Hints from './Hints';


export default function Header({definition, example, word , loadWord , relatedWord , relatedWord2, combined}) {
  const [count,setCount]=useState(0);
    const [value, onChangeText] = React.useState("");

    

    function decrementCount(points){
      setCount(count-points);
    }

    return (
      
       // ListHeaderComponent={
         <View>

        <View style={styles.container}>
            <View style={styles.image}>
                <Image style={styles.logo} source={require('../assets/favicon.png')}></Image>
                <TouchableOpacity
                  style={styles.restart}
                  onPress={()=>{
                    Alert.alert('restart the game again')
                    setCount(0)
                    loadWord();
                    }
                  }
                  >
               <Image style={{
                  width:30,height:30}}
                   source={require('../assets/restart3.png')}></Image>
                </TouchableOpacity>
                
            </View>
            <Text style={styles.text}>Guess The Word</Text>

            <TextInput style={styles.inputText} 
            placeholder="Enter The Word"
            onChangeText={(text )=> onChangeText(text)}
            value={value}>
            </TextInput>

           
            <Text>{word}</Text>

            <Text style={styles.text}>Score:{count}</Text>
           
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              if(value.toLowerCase() == word.toLowerCase()){
                Alert.alert('You guessed it! You earned 10 points')
                setCount(count+10)
                loadWord()
              }else if(relatedWord.includes(value.toLowerCase()) || relatedWord2.includes(value.toLowerCase())){
                Alert.alert('You guess a synonym of the word')
              }
              else{
                setCount(count-2)
                Alert.alert('Wrong guess! You lost 2 points')
                
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

        </View>
        {/* } */}
        <FlatList
        
        ListHeaderComponent={
           <Hints definition={definition} example={example} decrementCount={decrementCount} combined={combined}/> 
        }
        ListFooterComponent={
          <Text></Text>
        }
       />
       </View>
    )
}

const styles = StyleSheet.create({
    container:{
       
        width:'100%',
        backgroundColor: '#90ee90',
        alignItems: 'center',
        paddingTop:20,
        
        borderWidth:3,
    },
    image:{
        flexDirection:'row',
        alignItems:'center'
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
      },
      restart:{
         left:140,
      },
      logo:{
        justifyContent:'center'
      }
     
})
