import {StyleSheet, View, Text, Pressable} from "react-native";
import React from "react";
import {Stack} from "expo-router";
import Icon from "../assets/icons/index";
import {theme} from "../constants/theme";
import { StatusBar } from 'expo-status-bar';
import ScreenWrapper from "../components/ScreenWrapper";
import {useRouter} from 'expo-router';
import {hp} from "../helpers/common";
const Backbutton = ({size=26}) => {
    const router = useRouter();
    return(

            <Pressable onPress={()=> router.back()}>
                <Icon name="forward" strokeWidth={2.5} size={size} color={theme.colors.blue} />
            </Pressable>
    )
}

export default Backbutton;

const styles = StyleSheet.create({

})