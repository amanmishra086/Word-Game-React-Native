import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image ,TextInput, ActivityIndicator, FlatList, Button,Alert} from 'react-native';
import Header from './components/Header';
import Hints from './components/Hints';


const api_url="https://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

// fetch(api_url+"words/randomWord?api_key="+api_keys)


export default function App() {

  const [count,setCount]=useState(1);
  const [isLoading, setLoading] = useState(true);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState([{
    "text": "A fluid present in a body part in abnormal quantities as a result of injury or disease:  water on the knee. "
},
{
    "text": "The fluid surrounding a fetus in the uterus; amniotic fluid."
}]);

  const [example, setExample] = useState([]);
  const [relatedWord, setRelatedWord] = useState([]);

  

    async function load(){
      
      try {
        const responseWord = await fetch(api_url+"words/randomWord?api_key="+api_keys);
        const jsonWord = await responseWord.json();
        setWord(jsonWord.word);

        const responseDefinition = await fetch(api_url+"word/"+word+"/definitions?api_key="+api_keys);
        const jsonDefinition = await responseDefinition.json();
        setDefinition(jsonDefinition);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

  // const guessWord = async () => {
  //   try {
  //     const response = await fetch(api_url+"words/randomWord?api_key="+api_keys);
  //     const json = await response.json();
  //     setWord(json.word);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }


  // function btnClick(){

  //   // alert('Button clicked')
  //   // useEffect(() => {
  //   //   getDefinition(word);
  //   //     },[]);
   
  
  // }
  // const btnClick=()=>{
  //    setCount(count+1)
  // }

  // const getDefinition=async(word)=>{
  //   setLoading(true);
  //   try {
  //     const response = await fetch(api_url+"word/"+word+"/definitions?api_key="+api_keys);
  //     const json = await response.json();
  //     setDefinition(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }

  //    //console.log(definition);

  // }
  

  
  
  return (
    <SafeAreaView style={styles.container}> 
       <View>
     
        <Header count={count}/>
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
