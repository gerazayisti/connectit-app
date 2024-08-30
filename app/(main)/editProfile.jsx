import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import {wp,hp} from '../../helpers/common'
import { theme } from '../../constants/theme'
import { Header } from '../../components/Header'
import Icon from '../../assets/icons'
import Avatar from '../../components/avatar'
import Input from '../../components/input'
import { Image } from 'expo-image'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'expo-router'
import { getUserImageSrc, uploadFile } from '../../services/imageService'
import Buttons from '../../components/button'
import { updateUser } from '../../services/userService'
import * as ImagePicker from 'expo-image-picker'

const EditProfile = () => {
  const { user:CurrentUser,setUserData} = useAuth();
  const router = useRouter();

  const [Loading,setLoading]=useState(false)

  const [user, setUser]= useState (
    {
      name: '',
      phonenumber: '',
      image: null,
      bio: '',
      addres:''
    }
  );

useEffect(() => {
  if(CurrentUser){
    setUser({
      name: CurrentUser.name || '',
      phonenumber: CurrentUser.phonenumber || '',
      image: CurrentUser.image || null,
      bio: CurrentUser.bio || '',

    });
  }
}, [CurrentUser]);

const onsubmit = async()=>{
  let userData={...user};
  let {name, adress, phonenumber,image,bio}= userData;

  if (!name || !adress || !phonenumber || !bio ||!image){{
    Alert.alert('Profil','veuillez remplir tout les champs');
    return;
  }}

  if(typeof image =='object'){
    let imageRes= await uploadFile('Profiles', image?.uri,true);
    if(imageRes.success) userData.image= imageRes.data;
    else userData.image=null; 
  }
  setLoading(true);

  const res = await updateUser(CurrentUser?.id, userData);
  setLoading(false)
  
  if (res.success){
    setUserData({...CurrentUser, ...userData});
    router.back()
  }
}

  const onPickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,4],
      quality: 0.7,
    });

    if(!result.canceled){
      setUser({...user, image:result.assets[0]});
    }
  };

  let imageSource = user?.image && typeof user.image == 'object'? user.image.uri: getUserImageSrc(user.image);
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView>
          <Header title="Editer le Profile"/>
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.Avatar}   />
                <Pressable style={styles.editIcon} onPress={onPickImage}>
                  <Icon name="camera" size={20} strockeWidth={2}/>
                </Pressable>
            </View>
            <Text style={{fontSize: hp(1.9), color: theme.colors.text}}>Completer votre profile</Text>
            <Input
              icon={<Icon name="user"/>}
              placeholder="Nom"
              value={user.name}
              onChangeText={value=>setUser({...user, name: value})}
              />
              <Input
              icon={<Icon name="call"/>}
              placeholder="numero de telephone"
              value={user.phonenumber}
              onChangeText={value=>setUser({...user, phonenumber: value})}
              /> 
              <Input
              icon={<Icon name="location"/>}
              placeholder="pays - ville - quartier"
              value={user.adress}
              onChangeText={value=>setUser({...user, adress: value})}
              /> 
              <Input
              placeholder="bio"
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={value=>setUser({...user, bio: value})}
              />
              <Buttons title='metre a jours' loading={Loading} onPress={onsubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal: wp(4),
        gap:2 
    },
    heaContainer:{
        marginHorizontal:wp(4),
        marginEnd:20
    },
    Avatar:{
      width:'100%',
      height:'100%',
      borderRadius:theme.radius.xxl*1.8,
      borderCurve:'continuous',
      borderWidth:2,
      borderColor:theme.colors.blueLight
    },
    headerShape:{
        width: wp(100),
        height:hp(20)
    },
    avatarContainer:{   
        width: hp(12),
        height:hp(12),
        alignSelf:'center'
    },
    form: {
        gap:15,
    },
    editIcon:{
        position: 'absolute',
        bottom: 0,
        right:-12,
        padding: 7,
        borderRadius:50,
        backgroundColor:'white',
        shadowColor:theme.colors.textLight,
        shadowOffset: {width: 0, height:4},
        shadowOpacity:0.4,
        shadowRadius:5,
        elevation:7
    },
    
    userName:{
        fontSize:hp(5),
        color:theme.colors.blue
    },
    info:{
        flexDirection: "row",
        alignItems:'center',
        gap:10
    },
    infoText:{
        fontSize:hp(1.6),
        color:theme.colors.textLight
    },
    logoutButton:{
        position:'absolute',
        right:0.8,
        padding:5,
        borderRadius:theme.radius.sm,
        backgroundColor:'#fee2e2'
    },
    listStyle:{
        paddingHorizontal: hp(4),
        paddingBottom:30
    },
    noPost:{
        fontSize:hp(2),
        textAlign:'center',
        color:theme.colors.text
    },
    bio:{
      flexDirection:'row',
      height:hp(15),
      alignItems:'flex-start',
      paddingVertical:15
    }
})