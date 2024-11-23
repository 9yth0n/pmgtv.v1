import React,{useState} from 'react'
import { View,Text,   StyleSheet } from 'react-native'

const TestComponent = () => {
    const [count,setCount]=useState(0)
  
  return (
    <View style={styles.container}>
        <Text style={{color:'red',   fontSize:16}}>
            Test Component
        </Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    backgroundColor:'#fff',
        alignItems:'center',
    justifyContent:'center'
    }
})

export default TestComponent
