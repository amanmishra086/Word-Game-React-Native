import React from 'react'
import { View ,Image,Text,TextInput,Button , StyleSheet} from 'react-native'

export default function Header({count}) {
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../assets/favicon.png')}></Image>
            </View>
            <Text style={styles.text}>Guess The Word</Text>
            <TextInput style={styles.inputText} placeholder="Enter The Word"></TextInput>
            <Text style={styles.text}>Score:{count}</Text>
            <Button
            title="Enter"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor: 'yellow',
        alignItems: 'center',
        paddingTop:20,
        paddingBottom:20,
        borderWidth:3,
    },
    image:{
        alignContent:'center',
      },
      text:{
        fontSize:20,
        fontStyle:"italic",
       fontWeight:"bold",
      },
      inputText:{
        marginTop:10,
        height:40,
        width:200,
        borderColor:"black",
        borderWidth:2,
        paddingLeft:10,
        borderRadius:20,
      },
})
