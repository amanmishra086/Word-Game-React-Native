import React , { useEffect, useState } from 'react'
import { View ,TouchableOpacity, Text,StyleSheet ,FlatList, Button, Alert,Dimensions, ScrollView} from 'react-native'


const Items = ({definition ,decrementCount})=>{
   const [hintCount, setHintCount] = useState(1);
   const [hintType, setHintType] = useState('Synonym');
   const [visible,setVisible]=useState(false);
   const [showElement,setShowElement]=useState(['hello']);
 
   

   const Hints=({itemVar})=>{
       if(visible &&  showElement.includes(itemVar.text)){
           return <Text  >{itemVar.text}</Text>
       }else{
          return <Text></Text>
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
                               decrementCount(2)
                              setShowElement( arr => [...arr, item.text]);
                               setVisible(true);
                            }}
                           
                        />
                    </View>
                )} 
            />
           
            </View> 

    )



}

export default function Hints({definition , decrementCount}) {

    
    
    return (
        <View style={styles.container}>
            <Items definition={definition} decrementCount={decrementCount}/>

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