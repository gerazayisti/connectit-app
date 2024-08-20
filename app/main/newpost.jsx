import {  ScrollView,StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import {Header} from '../../components/Header'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'
import {useAuth} from '../../contexts/AuthContext'
import Avatar  from '../../components/avatar'
import { useRouter } from 'expo-router'
import RichTextEditor from '../../components/RichTextEditor'

const Newpost = () => {
  const {user}= useAuth();
  const bodyRef = useRef("");
  const editorRef = useRef(null);
  const router = useRouter();
  const [Loading, setLoading]=useState(false);
  const [file, setFile]=useState();

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="nouveau post"/>
        <ScrollView contentContainerStyle={{gap:20}}>
          <View style={styles.header}>
            <Avatar 
            uri={user?.image}
            size={hp(6.5)}
            rounded={theme.radius.xl}
            />
            <View style={{gap:2}}>
              <Text style={styles.userName}>
                {
                  user && user.name
                }
              </Text>
              <Text style={styles.publicText}>
                public
              </Text>
            </View>
          </View>
          <View style={styles.textEditor}>
            <RichTextEditor editorRef={editorRef} onChange={body=>bodyRef.current =body }/>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default Newpost

const styles = StyleSheet.create({
  container:{
    flex:1,
    //backgroundColor:'red',
    marginBottom:30,
    paddingHorizontal:wp(4),
    gap:15
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    gap:12
  },
  title:{
    marginBottom:10,
    fontSize:hp(2.4),
    fontWeight:theme.fonts.semibold,
    color: theme.colors.text,
    textAlign:'center'
  },
  userName:{
    fontSize:hp(2.2),
    fontWeight:theme.fonts.medium,
    color:theme.colors.text
  },
  Avatar:{
    height:hp(6.5),
    width:hp(6.5),
    borderRadius:theme.radius.xl,
    borderCurve:'continuous',
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
  publicText:{
    fontSize:hp(1.7),
    fontWeight:theme.fonts.medium,
    color:theme.colors.textLight
  }, 
  textEditor:{
    //marginTop: 10,
  },

  media:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:1.5,
    padding:12,
    paddingHorizontal:18,
    borderRadius:theme.radius.xl,
    borderCurve:'continuous'
  },
  imageIcon:{
    backgroundColor:theme.colors.gray,
    borderRadius: theme.radius.md,
    padding:6,
   },
  file:{
    height:hp(30),
    width:'100%',
    borderRadius:theme.radius.xl,
    overflow:'hidden',
    borderCurve:'continuous',
    borderColor:theme.colors.gray
  },
  mediaIcons:{
    flexDirection:'row',
    gap:15,
    alignItems:'center'
  },

  addImageText:{
    fontSize:hp(1.9),
    fontWeight:theme.fonts.semibold,
    color: theme.colors.text
  },
  video:{

  },
  closeIcon:{
    position: 'absolute',
    top:10,
    right:10,
    shadowColor: theme.colors.textLight,
    shadowOffset: {width: 0, height:3},
    shadowOpacity:0.6,
    shadowRadius:8
  }
})