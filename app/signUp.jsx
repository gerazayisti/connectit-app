import { StyleSheet, Button, View, Text, TextInput, Pressable, Image, ScrollView, SafeAreaView, Alert } from "react-native";
import React, { useRef, useState } from "react";
import Icon from "../assets/icons/index";
import { theme } from "../constants/theme";
import { StatusBar } from 'expo-status-bar';
import ScreenWrapper from "../components/ScreenWrapper";
import { useRouter } from 'expo-router';
import Backbutton from "../components/BackButton";
import { hp, wp } from "../helpers/common";
import Input from "../components/input";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/button"; // Ensure you import your custom button component

const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (confirmPasswordRef.current !== passwordRef.current) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
            return;
        }
        if (!confirmPasswordRef.current || !passwordRef.current || !emailRef.current || !nameRef.current) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }
        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();

        setLoading(true);

        try {
            const { data: { session }, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name
                    }
                }
            });

            setLoading(false);
            console.log('session:', session);
            console.log('error:', error);

            if (error) {
                //Alert.alert('Sign up', error.message);
            } else {
                Alert.alert('Inscription réussie', 'Votre compte a été créé avec succès');
                router.push('login');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error during sign up:', error);
            Alert.alert('Sign up error', 'An error occurred during sign up. Please try again later.');
        }
    };

    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <Backbutton router={router} />
                <View>
                    <Text style={styles.WelcomeTextHead}>G-Connect IT</Text>
                </View>
                <SafeAreaView style={styles.containerSafe}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <View>
                            <Image
                                style={styles.WelcomeImage} resizeMode='contain' source={require('../assets/images/logo-gc.png')} />
                            <Text style={styles.WelcomeText}>Bienvenue chez Vous</Text>
                        </View>
                        <View style={styles.form}>
                            <Text style={{ fontSize: hp(1.5), color: theme.colors.text, textAlign: 'center' }}>Créer un compte pour vous connecter</Text>
                            <Input
                                icon={<Icon name="user" size="26" strokeWidth={1.6} />}
                                placeholder="Votre Nom"
                                onChangeText={value => nameRef.current = value}
                            />
                            <Input
                                icon={<Icon name="mail" size="26" strokeWidth={1.6} />}
                                placeholder="Votre mail"
                                onChangeText={value => emailRef.current = value}
                            />
                            <Input
                                icon={<Icon name="lock" size="26" strokeWidth={1.6} />}
                                placeholder="Votre Mot de passe"
                                secureTextEntry={true}
                                onChangeText={value => passwordRef.current = value}
                            />
                            <Input
                                icon={<Icon name="lock" size="26" strokeWidth={1.6} />}
                                placeholder="Confirmez votre Mot de Passe"
                                secureTextEntry={true}
                                onChangeText={value => confirmPasswordRef.current = value}
                            />
                            <CustomButton
                                title="S'inscrire"
                                loading={loading}
                                onPress={submit} />
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Déjà un compte?</Text>
                                <Pressable onPress={() => router.push('login')}>
                                    <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Se Connecter</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </ScreenWrapper>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        borderColor: "rgba(0,0,0,0.4)"
    },
    container: {
        flex: 1,
        gap: 5,
        marginHorizontal: wp(3.5),
    },
    containerSafe: {
        flex: 1,
        paddingBottom: 12
    },
    scrollView: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.lg,
    },
    WelcomeText: {
        height: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.blue,
        textAlign: "center",
        fontSize: theme.radius.xl,
    },
    WelcomeTextHead: {
        height: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.blue,
        textAlign: "right",
        top: -25,
        fontSize: theme.radius.xl,
        marginLeft: 55
    },
    form: {
        gap: 20,
    },
    forgotPassword: {
        color: theme.colors.primary,
        fontWeight: theme.fonts.semibold,
        textAlign: 'right'
    },
    footerText: {
        color: theme.fonts.text,
        textAlign: 'center',
        fontSize: hp(1.6)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 5
    },
    WelcomeImage: {
        width: wp(90),
        height: hp(30),
        alignSelf: 'center',
    }
});
