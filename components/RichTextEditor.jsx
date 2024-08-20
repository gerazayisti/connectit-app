import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichToolbar } from 'react-native-pell-rich-editor'

const RichTextEditor = ({
    editorRef,
    onChange
}) => {
  return (
    <View>
      <Text>mon editeur de texte</Text>
    </View>
  )
}

export default RichTextEditor;

const styles = StyleSheet.create({
});
