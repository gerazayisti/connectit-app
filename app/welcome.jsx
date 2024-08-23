import {StyleSheet, Text, View, Button, Image, Pressable} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import  {StatusBar} from 'expo-status-bar';
import {wp, hp} from '../helpers/common';
import {theme} from "../constants/theme";
import CustomButton from "../components/button";
import {useRouter} from 'expo-router';


const Welcome = () => {
    const router = useRouter();
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark"/>
            <View style={styles.container}>
                {/*image*/}
                <Image
                    style={styles.WelcomeImage} resizeMode='contain' source={require('../assets/images/welcome2.png')}/>
                <View style={{gap:20}}>
                    <Text style={styles.title}>G-Connect IT</Text>
                    <Text style={styles.punchline}>À l'épicentre de la technologie, G-connect IT révolutionne le partage d'informations et de connaissances.</Text>
                </View>
                <View style={styles.footer}>
                  <CustomButton
                    title="Commencer"
                    buttonStyle={{marginHorizontal: wp(3)}}
                    onPress={()=>router.push('login')}
                  />
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.loginText}>Vous n'avez pas de compte ?</Text>
                    <Pressable onPress={()=>router.push('signUp')}>
                        <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight:theme.fonts.semibold}]}>Inscrivez vous ici</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: wp(4),
    },
    WelcomeImage: {
        width: wp(100),
        height: hp(30),
        alignSelf: 'center',

    },
    title: {
        fontSize: hp(4),
        color: theme.colors.primary,
        fontWeight: theme.fonts.extrabold,
        textAlign: 'center'
    },
    punchline: {
        fontSize: hp(1.7),
        paddingHorizontal: wp(10),
        color: theme.fonts.extrabold,
        textAlign: 'center'
    },
    footer: {
        gap:30,
        width: '100%',

    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:5
    },
    loginText: {
        textAlign: 'center',
        fontSize: hp(1.6),
        color: theme.colors.text
    },
})