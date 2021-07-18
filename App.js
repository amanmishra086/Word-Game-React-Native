import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image ,TextInput, ActivityIndicator, FlatList, Button} from 'react-native';
// const fetch = require("node-fetch");

const api_url="https://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

// fetch(api_url+"words/randomWord?api_key="+api_keys)



export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState([ {
    "text": "A clear, colorless, odorless, and tasteless liquid, H2O, essential for most plant and animal life and the most widely used of all solvents. Freezing point 0°C (32°F); boiling point 100°C (212°F); specific gravity (4°C) 1.0000; weight per gallon (15°C) 8.338 pounds (3.782 kilograms)."
},
{
    "text": "Any of various forms of water:  waste water. "
},{
  "text": "Naturally occurring mineral water, as at a spa. Often used in the plural."
},
{
  "text": "A body of water such as a sea, lake, river, or stream."
},
{
  "text": "A particular stretch of sea or ocean, especially that of a state or country:  escorted out of British waters. "
},
{
  "text": "A supply of water:  had to turn off the water while repairing the broken drain. "
},]);


  const [example, setExample] = useState([]);
  const [relatedWord, setRelatedWord] = useState([]);

  function btnClick(word){

    getDefinition(word);
  
  }
useEffect(() => {
    guessWord();
  },);
  const guessWord = async () => {
    try {
      const response = await fetch(api_url+"words/randomWord?api_key="+api_keys);
      const json = await response.json();
      setWord(json.word);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  

  const getDefinition=async(wordName)=>{
    setLoading(true);
    try {
      const response = await fetch(api_url+"word/"+wordName+"/definitions?api_key="+api_keys);
      const json = await response.json();
      setDefinition(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  

  
  let count=0
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.header}>
   
        <Image source={require('./assets/favicon.png')}></Image>
      </View>
      <Text style={styles.text}>Guess The Word</Text>
      <TextInput style={styles.inputText} placeholder="Enter The Word"></TextInput>
      <Text style={styles.text}>Score: {count}</Text>
      <Button title="Enter"></Button>



      <View style={{ flex: 1, padding: 24 }}>
        <FlatList
          data={definition}
          keyExtractor={(item, index) => item.key}
          renderItem={({ item }) => (
            
            <View style={styles.item}>
               <Text >{item.text}</Text>
            </View>
          )}
        />
      {/* {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : (

      )} */}
    </View>


      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    paddingTop:50,
  },
  header:{
    alignContent:'center'
  },
  text:{
    fontSize:20,
    fontStyle:"italic",
   fontWeight:"bold",
  },
  inputText:{
    marginTop:10,
    height:35,
    width:200,
    borderColor:"black",
    borderWidth:2,
    paddingLeft:10,

  },
  item:{
    fontStyle:"italic",
   fontWeight:"bold",
    marginTop:10,
    borderWidth:2,
    padding:5,


  }
  
});
