import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image ,TextInput, ActivityIndicator, FlatList, Button,Alert} from 'react-native';
import Header from './components/Header';
import Hints from './components/Hints';


const api_url="https://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

// fetch(api_url+"words/randomWord?api_key="+api_keys)


export default function App() {

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState([]);

  const [example, setExample] = useState(null);
  const [relatedWord, setRelatedWord] = useState(null); 
  

  const [relationShipType,setRelationShipType]=useState('');

  

  async function loadWord(){
   
    try{
      const responseWord = await fetch(api_url+"words/randomWord?api_key="+api_keys);
        const jsonWord = await responseWord.json();
        setWord(jsonWord.word);
    }catch(error){
      Alert.alert(error);
    }
  }

    async function loadDefinition(){
     
      try {
        const responseDefinition = await fetch(api_url+"word/"+word+"/definitions?api_key="+api_keys);
        const jsonDefinition = await responseDefinition.json();
        setDefinition(jsonDefinition);
      } catch (error) {
        Alert.alert(error);
      } 
    }
    async function loadExample(){
      try {
        const responseExample = await fetch(api_url+"word/"+word+"/examples?api_key="+api_keys);
        const jsonExample = await responseExample.json();
        setExample(jsonExample.examples);

      } catch (error) {
        Alert.alert(error);
      } 
    }
    async function loadRelatedWord(){
      try {
        const responseRelatedWord = await fetch(api_url+"word/"+word+"/relatedWords?api_key="+api_keys);
        const jsonRelatedWord = await responseRelatedWord.json();
        setRelatedWord(jsonRelatedWord);

      } catch (error) {
        Alert.alert(error);
      } 
    }

    useEffect(()=>{
       loadWord();
    },[]);
    useEffect(()=>{
     
      loadDefinition();
      // loadExample();
      // loadRelatedWord();
   },[word]);

  
  return (
    <SafeAreaView style={styles.container}> 
       <View>
       <Text>{word}</Text>
        <Header word={word}/>
        <Hints definition={definition}/>
        </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignContent:'center',
    paddingTop:50,
  },
 
});
