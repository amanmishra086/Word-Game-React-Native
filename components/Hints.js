import React , { useEffect, useState } from 'react'
import { View ,TouchableOpacity, Text,StyleSheet ,FlatList, Button, Alert,Dimensions} from 'react-native'


const Items = ({definition })=>{
   const [hintCount, setHintCount] = useState(1);
   const [hintType, setHintType] = useState('Synonym');
   const [visible,setVisible]=useState(false);
   const [showElement,setShowElement]=useState('');
 
   const Hints=({itemVar})=>{
       if(visible && itemVar.text==showElement){
           return <Text  >{itemVar.text}</Text>
       }else{
          return <Text>hello</Text>
       }

   }


    return(
            <View >
                <FlatList 
                data={definition}
                keyExtractor={(item) => item.text}
                
                renderItem={({ item }) => (
                    <View style={styles.hints}>
                        <View style={styles.hintHeader}>
                            <Text>Hint:{hintCount} ({hintType})</Text>
                            <Text>Free</Text>
                        </View>
                        <Hints style={styles.hintText} itemVar={item}/>
                        <Button title="Reveal Hint"
                            onPress={()=>{

                               setShowElement(item.text) 
                               setVisible(true);
                            }}
                           
                        />
                    </View>
                )} 
            />
            </View> 

    )



}

export default function Hints({definition}) {

    
    return (
        <View style={styles.container}>
            <Items definition={definition}/>

        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{

        backgroundColor:'red',
        borderWidth:2,
        alignItems:'center',
       
    },
    hints:{
        padding: 5,
        margin:4,
        borderWidth:2,
        width:Dimensions.get('window').width-15
    },
    hintHeader:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    hintText:{
        margin:12,
        fontStyle:'italic',
    }
})