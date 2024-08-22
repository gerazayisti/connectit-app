import { Alert, FlatList, Pressable, StyleSheet, Text, View, ViewBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import {Button} from 'react-native-elements'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'
import Icon from "../../assets/icons";
import { useRouter } from 'expo-router'
import Avatar  from '../../components/avatar'
import { fetchPost } from '../../services/postService'
import PostCard from '../../components/PostCard'

var limit=0;
const home = () => {
const {user,setAuth}= useAuth();
const router= useRouter();
const [post,setPost]=useState([]);

  useEffect(() => {
    getPost();
  },[])

  const getPost = async () => {
    limit=limit+10;
    //appel de l'api pour recuperer les post
    //console.log('fetching Poost: ',limit);
     let res= await fetchPost();
    if(res.success){
      setPost(res.data);
    }
  }

/*const onlogout = async () => {
    setAuth(null);
    const {error} = await supabase.auth.signOut();

    if (error){
        Alert.alert('Logging out:', 'error to loging out');
    }
    }*/
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*header*/}
        <View style={styles.header}>
          <Text style={styles.title}>G-connect IT</Text>
          <View style={styles.icons}>
            <Pressable onPress={()=> router.push('./notifications')}>
              <Icon name="heart" size={hp(3,5)} type="font-awesome" color={theme.colors.blue} strokeWith={2} />
            </Pressable >
            <Pressable onPress={()=> router.push('./newpost')}>
              <Icon name="plus" size={hp(3,5)} type="font-awesome" color={theme.colors.blue} strokeWith={2} />
            </Pressable>
            <Pressable  onPress={()=> router.push('./profile')}>
              <Avatar  
              uri={user?.image}
              size={hp(4.30)}
              rounded={theme.radius.sm}
              style={{borderWidth: 2}}
              
              />
            </Pressable>
            </View>
          </View>
        <FlatList
          data={post}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.liststyle}
          keyExtractor={item=>item.id.toString()}
          renderItem={({item})=><PostCard
          item={item}
          currentUser={user}
          router={router}
          />  
        } 

          />
      </View>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({

    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        borderColor: "rgba(0,0,0,0.4)"
    },
    container: {
        flex: 1,
        gap: 5,
        marginHorizontal: wp(3.5),
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: wp(3),
    },
    title:{
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold,
        color: theme.colors.blue,
    },
    containerSafe: {
        flex: 1,
        paddingBottom: 12
    },
    scrollView: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
    },
    WelcomeText: {
        height: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.blue,
        textAlign: "center",
        fontSize: theme.radius.xl,
    },
    icons:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        gap: 18,  
    },
    WelcomeTextHead: {
        height: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.blue,
        textAlign: "right",
        top: -25,
        fontSize: theme.radius.xl,
        marginLeft: 55
    },
    form: {
        gap: 20,
    },
    forgotPassword: {
        color: theme.colors.primary,
        fontWeight: theme.fonts.semibold,
        textAlign: 'right'
    },
    footerText: {
        color: theme.fonts.text,
        textAlign: 'center',
        fontSize: hp(1.6)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 5
    },
    WelcomeImage: {
        width: wp(90),
        height: hp(30),
        alignSelf: 'center',
    },
    liststyle:{
      paddingTop:20,
      paddingHorizontal:wp(4)
    },
    noPost:{
      fontSize:hp(2),
      textAlign:'center',
      color:theme.colors.text
    },
    pill:{
      position:'absolute',
      right:-20,
      top:-4,
      height:hp(2.2),
      width:hp(2.2),
      justifyContent:'center',
      alignContent:'center',
      borderRadius:20,
      backgroundColor:theme.colors.blueLight
    }
})