import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Avatar from './avatar'
import moment from 'moment'
import Icon from '../assets/icons'

const CommentItem = ({
    item,
    canDelete=false
}) => {
    const createdAt= moment(item?.created_at).format('MMM d');
  return (
    <View style={styles.container}>
        <Avatar 
        uri={item?.user?.image}
        />
        <View style={styles.content}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.text}>
                        {
                            item?.user?.name
                        }
                    </Text>
                    <Text>-</Text>
                    <Text style={[styles.text,{color: "gray"}]}>
                        {
                            createdAt
                        }
                    </Text>
                </View>
                {
                    canDelete && (
                        <TouchableOpacity>
                            <Icon name="delete" size={20} color={'red'}/>
                        </TouchableOpacity>        
                    )
                }
                
            </View>
            <Text style={[styles.text,{fontWeight:'normal'}]}>
                {
                    item?.text
                }
            </Text>
        </View>
    
    </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
    container:{
    flex:1,
    flexDirection:'row',
    paddingVertical:7,
  },
  content:{
    backgroundColor:'rgba(0,0,0,0.03)',
    flex:1,
    gap:5,
    paddingHorizontal:10,
    paddingVertical:14,
    borderRadius:theme.radius.sm,
    borderCurve:'continuous',
    marginLeft:12
  },
  Highlight:{
    borderWidth:0.2,
    backgroundColor:'white',
    borderColor:theme.colors.dark,
    shadowColor:theme.colors.dark,
    shadowOffset:{width:0, height:0},
    shadowOpacity:0.3,
    shadowRadius:8,
    elevation:5,
  },
  nameContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:3,
  },
  text:{
    fontSize:hp(1.6),
    font:theme.fonts.medium,
    color:theme.colors.dark
  }
})