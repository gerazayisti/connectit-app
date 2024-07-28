import {View,Button, Text} from 'react-native'
import React from 'react'
import {useRouter} from 'expo-router'
import ScreenWrapper from "../components/ScreenWrapper";

const index = () => {
    const router = useRouter();
  return (
      <ScreenWrapper>
         <Text>ConnectIT</Text>
          <Button title="welcome" onPress={()=>router.push('welcome')}/>
      </ScreenWrapper>
  )
}

export default index