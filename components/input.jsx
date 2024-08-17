import {StyleSheet, View, Text, TextInput} from "react-native";
import React from "react";
import {Stack} from "expo-router";
import {theme} from "../constants/theme";
import {hp, wp} from "../helpers/common";

const Input= (props) => {
    return(
        <View style={[styles.container, props.containerStyle && props.containerStyle]}>
            {
                props.icon && props.icon
            }
            <TextInput
            style={{flex: 1}}
            placeholderTextColor={theme.colors.primaryDark}
            ref={props.inputRef && props.inputRef}
            {...props}
            />

        </View>
    )
}


export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height:hp(7.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.white,
        borderWidth: 0.4,
        borderCurve: 'continuous',
        gap:12,
        borderColor: theme.colors.primaryDark,
        paddingHorizontal:15
        }
})