import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image ,TextInput, ActivityIndicator, FlatList, Button,Alert} from 'react-native';
import Header from './components/Header';
import Hints from './components/Hints';


const api_url="https://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

// fetch(api_url+"words/randomWord?api_key="+api_keys)


export default function App() {
  
  let [word, setWord] = useState('');
  const [definition, setDefinition] = useState([]);

  const [example, setExample] = useState([]);
  const [relatedWord, setRelatedWord] = useState([]); 
  

  const [relationShipType,setRelationShipType]=useState('');

  const [shuffle,setShuffle]=useState('');
  const [firstLetter, setFirstLetter] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const [length, setLength] = useState(0)

  

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
      if(word!=''){
        try {
          const responseDefinition = await fetch(api_url+"word/"+word+"/definitions?api_key="+api_keys);
          const jsonDefinition = await responseDefinition.json();
          setDefinition(jsonDefinition);
        } catch (error) {
          Alert.alert(error);
        } 
      }
    }
    async function loadExample(){
      if(word!=''){
        try {
          const responseExample = await fetch(api_url+"word/"+word+"/examples?api_key="+api_keys);
          const jsonExample = await responseExample.json();
          setExample(jsonExample.examples);
  
        } catch (error) {
          Alert.alert(error);
        } 
      }
    }
    async function loadRelatedWord(){
      if(word!=''){
        try {
          const responseRelatedWord = await fetch(api_url+"word/"+word+"/relatedWords?api_key="+api_keys);
          const jsonRelatedWord = await responseRelatedWord.json();
          setRelationShipType(jsonRelatedWord[0].relationshipType);
          setRelatedWord(jsonRelatedWord[0].words);

          
  
        } catch (error) {
          Alert.alert(error);
        } 
      }
      // console.log('word:- '+word);
      // console.log(relationShipType);
      // console.log(relatedWord);
    }

    String.prototype.shuffle = function () {
      var a = this.split(""),
          n = a.length;
  
      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
      setShuffle(a.join(""));
      return a.join("");
  }

    useEffect(()=>{
       loadWord();
    },[]);
    useEffect(()=>{
     
      loadDefinition();
      loadExample();
      loadRelatedWord();
     word.shuffle();
     setFirstLetter(word.charAt(0));
     setLastLetter(word.charAt(word.length-1))
     setLength(word.length);

   },[word]);

   
  
  return (
    <SafeAreaView style={styles.container}> 
       <View>
       <Text>{word}</Text>
       <Text>{relationShipType}</Text>
     
        <Header definition={definition} word={word} loadWord={loadWord}/>
        {/* <Hints  definition={definition}/>  */}
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
    //paddingTop:StatusBar.currentHeight || 0,
    paddingTop:40,
  },
  header:{
    
  },hints:{

  }
 
});
