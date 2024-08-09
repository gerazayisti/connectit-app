import {View,Button, Text} from 'react-native'
import React from 'react'
import {useRouter} from 'expo-router'
import Loading from '../components/loading';


const index = () => {
    const router = useRouter();
  return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Loading/>
        <Text>Chargement</Text>
      </View>
  )
}

export default index