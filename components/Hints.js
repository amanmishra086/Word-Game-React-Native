import React , { useEffect, useState } from 'react'
import { View ,TouchableOpacity, Text,StyleSheet ,FlatList, Button, Alert} from 'react-native'

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

const Items = ({definition})=>{
   const [hintCount, setHintCount] = useState(1);
   const [hintType, sethintType] = useState('Synonym');
   

   
    return(
            <View >
                <FlatList 
                data={definition}
                keyExtractor={(item, index) => item.text}
                
                renderItem={({ item }) => (
                    <View style={styles.hints}>
                        <View style={styles.hintHeader}>
                            <Text>Hint:{hintCount} ({hintType})</Text>
                            <Text>Free</Text>
                        </View>
                        <Text style={styles.hintText} >{item.text}</Text>
                        <Button title="Reveal Hint"
                            onPress={()=>{
                                Alert.alert(item.text)
                            }}
                        />
                    </View>
                )} 
            />
            </View> 


    )



}

export default function Hints({definition}) {

    const {text}=definition;
    
    return (
        <View style={styles.container}>

            <Items definition={definition}/>

        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        margin:5,
        backgroundColor:'red',
        borderWidth:2,
        alignItems:'center',
        height:'70%'
    },
    hints:{
        padding: 5,
        margin:4,
        borderWidth:2,
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