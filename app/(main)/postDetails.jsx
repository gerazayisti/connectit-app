import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createComment, fetchPostDetails } from '../../services/postService';
import { theme } from '../../constants/theme';
import { hp,wp } from '../../helpers/common';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/loading';
import Input from '../../components/input'
import Icon from '../../assets/icons';
import CommentItem from '../../components/commentItem';

const PostDetails = () => {
  const {postId}= useLocalSearchParams();
  const [post, setPost]=useState(null);
  const{user}=useAuth();
  const [startloading, setStartLoarding]=useState(true);
  const router = useRouter();
  const inputRef=useRef(null);
  const commentRef=useRef("");
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    getPostDetails();
  },[]);
  const onNewComment=async ()=>{
    if(!commentRef.current) return null;
    let data={
      userId:user?.id,
      postId:post?.id,
      text:commentRef.current
    }
    //sauvegarde bd
    setLoading(true);
    let res= await createComment(data);
    setLoading(false)
    if(res.success){
      //envoie notification ap
      inputRef?.current?.clear();
      commentRef.current="";

    }else{
      Alert.alert('commentaire',res.msg)
    }

  }
  const getPostDetails = async ()=>{
    //recharge des detail du post
    let res = await  fetchPostDetails(postId);
    if(res.success)setPost(res.data);
    setStartLoarding(false);

  }
  if (startloading){
    return(
      <View style={styles.center}>
        <Loading/>
      </View>
    )
  }

  if(!post){
    return(
      <View style={[styles.center, {justifyContent:'flex-start', marginTop:100}]}>
        <Text style={styles.notfound}> Aucun commentaire!</Text>
      </View>
  )
}
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <PostCard
        item={{...post, comments:[{count: post?.comments?.length}]}}
        currentUser={user}
        router={router}
        hasShadow={true}
        showMoreIcon={false}
        />
        {/** commentaire */}
        <View style={styles.inputContainer}>
          <Input
          inputRef={inputRef}
          placeholder='Commentons ceci...'
          onChangeText={values=>commentRef.current=values}
          placeholderTextColor={theme.colors.text}
          containerStyle={{flex:1, height:hp(6.2), borderRadius:theme.radius.xl}}
          />
          {
            loading? (
              <View style={styles.loading}>
                <Loading size="small" />
              </View>
            ):(
            <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
              <Icon name="send" color={theme.colors.primaryDark}/>
            </TouchableOpacity>  
            )
          }
          
        </View>
        {/** list des commentaires */}
        <View style={{marginVertical:15, gap:17}}>
          {
            post?.comments?.map( comment=>
              <CommentItem
              key={comment?.id?.toString()}
              item={comment}
              
              />
            )
          }
          {
            post?.comments?.length==0 &&(
              <Text style={ { color:theme.colors.text, marginLeft:5}}>
                Soit le premiers à commenter!
              </Text>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingVertical:wp(7),
  },
  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
  },
  list:{
    paddingHorizontal:wp(4),
  },
  sendIcon:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0.8,
    borderBlockColor:theme.colors.primary,
    borderRadius:theme.radius.lg,
    borderCurve:'continuous',
    height:hp(5.8),
    width:hp(5.8),
  },
  center:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  notfound:{
    fontSize:hp(2.8),
    color:theme.colors.text,
    fontWeight:theme.fonts.semibold,
  },
  loading:{
    height:hp(5.8),
    width:hp(5.8),
    justifyContent:'center',
    alignItems:'center',
    transform:[{scale:1.3}]
  }
})