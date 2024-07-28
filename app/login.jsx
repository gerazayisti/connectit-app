import {StyleSheet, Button, View, Text, TextInput, Pressable} from "react-native";
import React, {useRef, useState} from "react";
import Icon from "../assets/icons/index";
import {theme} from "../constants/theme";
import { StatusBar } from 'expo-status-bar';
import ScreenWrapper from "../components/ScreenWrapper";
import {useRouter} from 'expo-router';
import Backbutton from "../components/BackButton";
import {hp, wp} from "../helpers/common";
import Input from "../components/input";



const login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const {loading, setLoading} = useState(true);
    const submit =async () => {
        if(!emailRef.current || !passwordRef.current){
            alert('Connexion',"Veuillez remplir tous les champs!");
            return;
        }
    }
    return(
        <ScreenWrapper bg="white">
           <StatusBar style="dark" />
            <View style={styles.container}>
                <Backbutton router={router}/>
                <View>
                    <Text style={styles.WelcomeText}>Hey</Text>
                    <Text style={styles.WelcomeText}>Heureux de vous revoir!!!</Text>
                </View>
                <View style={styles.form}>
                    <Text style={{fontSize:hp(1.5), color:theme.colors.text}}>connecter vous pour continuer svp!</Text>
                    < Input
                        icon={<Icon name="mail" size="26" strokeWidth={1.6} />}
                        placeholder ="Votre mail"
                        onChangeText={value=>emailRef.current=value}
                    />
                    < Input
                        icon={<Icon name="lock" size="26" strokeWidth={1.6} />}
                        placeholder ="Votre Mot de passe"
                        secureTextEntry={true}
                        onChangeText={value=>passwordRef.current=value}
                    />
                    <Text style={styles.forgotPassword}>
                        mot de passe oublié?
                    </Text>
                    <Button
                        title="Se connecter"
                        lording={loading}
                        onPress={submit}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Vous n'avez pas de compte?</Text>
                        <Pressable onPress={()=>router.push('signUp')}>
                            <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>S'inscrire</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default login

const styles = StyleSheet.create({
    button:{
        alignSelf:'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        borderColor: "rgba(0,0,0,0.7)"
    },
    container: {
        flex: 1,
        gap: 5,
        marginHorizontal: wp(4),
    },
    WelcomeText: {
        height: hp(4),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,

    },
    form: {
        gap:25,
    },
    forgotPassword: {
        color: theme.colors.primary,
        fontWeight: theme.fonts.semibold,
        textAlign: 'right'
    },
    footerText:{
        color: theme.fonts.text,
        textAlign: 'center',
        fontSize: hp(1.6)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 5

    }
})