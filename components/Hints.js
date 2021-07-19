import React from 'react'
import { View , Text,StyleSheet ,FlatList} from 'react-native'

export default function Hints({definition}) {

    const {text}=definition;
    console.log(text)
    return (
        <View style={styles.container}>
            <Text style={styles.hints}></Text>
            <Text style={styles.hints}>Hello React native</Text>
            <Text style={styles.hints}>Hello React native</Text>
            <Text style={styles.hints}>Hello React native</Text>
            <Text style={styles.hints}>Hello React native</Text>
            <Text style={styles.hints}>Hello React native</Text>
            <Text style={styles.hints}>Hello React native</Text>

            {/* <View style={{ flex: 1, padding: 24 }}>
                <FlatList
                data={definition}
                keyExtractor={(item, index) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                    <Text >{item.text}</Text>
                    </View>
                )} 
            />
            </View>  */}

        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        margin:5,
        backgroundColor:'red',
        borderWidth:2,
        justifyContent:'center'
    },
    hints:{
        margin:5,
    }
})