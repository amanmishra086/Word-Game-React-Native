import React , { useEffect, useState } from 'react'
import { View ,ActivityIndicator,TouchableOpacity, Text,StyleSheet ,FlatList, Button, Alert,Dimensions, ScrollView} from 'react-native'


const Items = ({definition ,example ,decrementCount , combined})=>{
   const [hintCount, setHintCount] = useState(1);
   //const [hintType, setHintType] = useState('Synonym');
   const [visible,setVisible]=useState(false);
   const [showElement,setShowElement]=useState(['hello']);
 
   
   

   const Hints=({itemVar })=>{
       if(visible &&  showElement.includes(itemVar.text)){
           return <Text>{itemVar.text}</Text>
       }else{
          return <Text></Text>
       }
  
   }

   

    return(
           
                <FlatList
                data={combined}
                keyExtractor={(item) => item.text}
                
                renderItem={({ item ,index}) => (
                    <View style={styles.hints}>
                       <View style={styles.hintHeader}>
                            <Text>Hint:{index+2} ({item.hintType})</Text>
                            <Text>{item.points} points</Text>
                        </View>
                       
                        <Hints style={styles.hintText} itemVar={item}/>
                        <Button title="Reveal Hint"
                            onPress={()=>{
                               decrementCount(item.points)
                              setShowElement( arr => [...arr, item.text]);
                               setVisible(true);
                            }}
                           
                        />
                    </View>
                )} 
            />
           

    )
}

export default function Hints({definition ,example, decrementCount , combined}) {

    
        // console.log('def:-'+definition.length)
        // console.log('combined:-'+combined.length)


        const FirstHints=({definition})=>{
            if( definition.length>0){
                return <Text>{definition[0].text}</Text>
            }else{
               return <Text>...</Text>
            }
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.hints}>
                            <View style={styles.hintHeader}>
                                    <Text>Hint:{1} (definition)</Text>
                                    <Text>Free</Text>
                                </View>
                            
                            <FirstHints definition={definition}/>
                            {/* <FlatList
                                data={definition}
                                keyExtractor={(item) => item.text}
                                 
                                renderItem={(item)=>{
                                    <View>
                                    <Text>ffffffff</Text>
                                     <Text>{item}</Text>
                                     </View>
                                }}
                            /> */}
     
                            </View>

                <Items definition={definition} example={example} decrementCount={decrementCount} combined={combined}  />
            </View>
           
        )
    
    
}

const styles = StyleSheet.create({
    container:{

        backgroundColor:'red',
        borderWidth:2,
       
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