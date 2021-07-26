import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image ,TextInput, ActivityIndicator, FlatList, Button,Alert, ScrollView} from 'react-native';
import Header from './components/Header';
import Hints from './components/Hints';


const api_url="https://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

// fetch(api_url+"words/randomWord?api_key="+api_keys)


export default function App() {
  
  let [word, setWord] = useState('white');
  const [definition, setDefinition] = useState([]);

  const [example, setExample] = useState([]);

  const [relatedWord, setRelatedWord] = useState([]); 
  const [relationShipType,setRelationShipType]=useState('');

  const [relatedWord2, setRelatedWord2] = useState([]); 
  const [relationShipType2,setRelationShipType2]=useState('');

  const [shuffle,setShuffle]=useState('');
  const [firstLetter, setFirstLetter] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const [length, setLength] = useState(0)

  const [combined, setCombined] = useState([])
 // const [combinedArray,setCombinedArray]=useState([])


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
          if(jsonRelatedWord.length>1){
            setRelationShipType2(jsonRelatedWord[1].relationshipType);
            setRelatedWord2(jsonRelatedWord[1].words);
          }
  
        } catch (error) {
          Alert.alert(error);
        } 
      }
      
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
      // setShuffle(a.join(""));
      return a.join("");
  }

 

  const comb=()=>{
    

    const definition2 = definition.map(definitionFunction);
    const example2=example.map(exampleFunction);
    
    const lengthOfWord=[{
      hintType:'length of word',
      text:length,
      points:2
    }]
    const firstLetterOfWord=[{
      hintType:'First Letter',
      text:firstLetter,
      points:2
    }]
    const lastLetterOfWord=[{
      hintType:'Last Letter',
      text:lastLetter,
      points:1
    }]
    const shuffleWord=[{
      hintType:'Jumbled',
      text:shuffle,
      points:4
    }]

    

    // let relatedWordSynonym,relatedWordAntonym;

    if(relatedWord.length > 0 && relatedWord2.length>0){

      let relatedWordSynonym=relatedWord.map(relatedWordSynonymFunction);
      let relatedWordAntonym=relatedWord2.map(relatedWordAntonymFunction);

      let combinedArray=[].concat(definition2,example2,relatedWordSynonym,relatedWordAntonym,lengthOfWord,firstLetterOfWord,lastLetterOfWord,shuffleWord);
      combinedArray=combinedArray.sort(() => Math.random() - 0.5)
      setCombined(combinedArray);

    }else if(relatedWord.length > 0 && relatedWord2.length==0){

      let relatedWordSynonym=relatedWord.map(relatedWordSynonymFunction);
      let combinedArray=[].concat(definition2,example2,relatedWordSynonym,lengthOfWord,firstLetterOfWord,lastLetterOfWord,shuffleWord);
      combinedArray=combinedArray.sort(() => Math.random() - 0.5)
      setCombined(combinedArray);


    }else if(relatedWord.length == 0 && relatedWord2.length>0){
      let relatedWordAntonym=relatedWord2.map(relatedWordAntonymFunction);

      let combinedArray=[].concat(definition2,example2,relatedWordAntonym,lengthOfWord,firstLetterOfWord,lastLetterOfWord,shuffleWord);
      combinedArray=combinedArray.sort(() => Math.random() - 0.5)
      setCombined(combinedArray);

    }


    
    
    
   
  }
  function definitionFunction(value, index, array) {
    let obj={
    hintType:'definition',
    text:value.text,
    points:3
  }
  return obj;
}
function exampleFunction(value, index, array) {
  let obj={
  hintType:'example',
  text:value.text,
  points:4
}
return obj;
}


function relatedWordSynonymFunction(value, index, array) {
  let obj={
  hintType:relationShipType,
  text:value,
  points:2
}
return obj;
}
function relatedWordAntonymFunction(value, index, array) {
  let obj={
  hintType:relationShipType2,
  text:value,
  points:1
}
return obj;
}

    useEffect(()=>{
       loadWord();
     
    },[]);
    useEffect(()=>{
       setCombined(comb());
      loadDefinition();
      loadExample();
      loadRelatedWord();
      setShuffle(word.shuffle());
     setFirstLetter(word.charAt(0));
     setLastLetter(word.charAt(word.length-1))
     setLength(word.length);
        
       
     
   },[word]);

   useEffect(()=>{
    comb()
   },[word,definition,example,relatedWord,relatedWord2])
   
  


  return (
    <SafeAreaView style={styles.container}> 
       <View>
      {/* <Text>{shuffle}</Text>
      <Text>{firstLetter}</Text>
      <Text>{length}</Text> */}
        <Header definition={definition} example={example} word={word} loadWord={loadWord} relatedWord={relatedWord} relatedWord2={relatedWord2} combined={combined}/>
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
    
    paddingTop:40,
    paddingBottom:1,
  },
  header:{
    
  },hints:{

  }
 
});
