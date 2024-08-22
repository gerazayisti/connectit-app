import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { theme } from '../constants/theme'
import { color } from 'react-native-elements/dist/helpers'

const RichTextEditor = ({
    editorRef,
    onChange
}) => {
  return (
    <View style={{minHeight:285}}>
      <RichToolbar
      actions={[
            actions.undo,
            actions.removeFormat,
            actions.setBold,
            actions.setItalic,
            actions.setStrikethrough,
            actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
    ]}
    /*iconmap={{
        [actions.heading1]: ({tintColor}) => (
            <Text style={{color:tintColor}}>H1</Text>
        ),
        [actions.heading2]: ({tintColor}) => (
            <Text style={{color:tintColor}}>H2</Text>
        ),
        [actions.foreColor]: () => <Text style={[styles.tib, {color: 'blue'}]}>FC</Text>,
    }}*/
    
    style={styles.Richbar}
    flatContainerStyle={styles.listStyle}
    selectedIconTint={theme.colors.primaryDark}
    editor={editorRef}
    disabled={false}
    />
    <RichEditor
    ref={editorRef}
    onChange={onChange}
    containerStyle={styles.rich}
    editorStyle={styles.constentStyle}
    placeholder='Un mot pour les IT-Connecter!'
    />
    </View>
  )
}

export default RichTextEditor;

const styles = StyleSheet.create({
  Richbar: {
    height: 50,
    backgroundColor:'#ccc',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor:'#ccc',
  },
  rich:{
    minHeight: 220,
    borderWidth:1.5,
    borderColor:'#ccc',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    padding:5,
  },
  constentStyle:{
    color:theme.colors.textDark,
    placeholderColor:'gray',
  },
  listStyle:{
    paddingHorizontal:8,
    gap:3,
  }
});
