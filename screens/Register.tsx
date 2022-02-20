/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useContext, useState, createRef } from 'react';

import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';

import { styles } from '../styles';
import { AppContext } from '../App';
import {
    SafeAreaView,
    View,
    ScrollView,
    Alert,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';

import auth from '@react-native-firebase/auth';
import { Navbar } from './Navbar';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type TRegisterScreen = {
    navigation: any;
    route: any;
}

export const RegisterScreen = (props: TRegisterScreen) => {
    const appData = useContext(AppContext);
    const { onMenuClick } = appData;
    const { navigation } = props;

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');

    const emailInputRef = createRef() as any;
    const passwordInputRef = createRef() as any;

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            Alert.alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            Alert.alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            Alert.alert('Please fill Password');
            return;
        }

        auth()
            .createUserWithEmailAndPassword(
                userEmail,
                userPassword
            )
            .then((user) => {
                console.log(
                    'Registration Successful. Please Login to proceed'
                );
                console.log(user);
                if (user) {
                    auth()
                        .currentUser.updateProfile({
                            displayName: userName
                        })
                        .then(() => onMenuClick(5))
                        .catch((error) => {
                            Alert.alert(error);
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'auth/email-already-in-use') {
                    setErrortext(
                        'That email address is already in use!'
                    );
                } else {
                    setErrortext(error.message);
                }
            });
    };
    return (
        <Layout style={styles.megaWrap}>
            <SafeAreaView style={[styles.mainViewWrapper, styles.emptyListWrapper]}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <Layout
                        style={styles.createNewDeckHeader}
                    >
                        <Layout style={styles.createNewDeckSideElement} />

                        <Layout style={styles.createNewDeckTitle}>
                            <Text style={[styles.text, styles.titleTextSmall]} category='h4'>
                                Sign Up
                            </Text>
                        </Layout>

                        <Layout style={styles.createNewDeckSideElement} >
                            <TouchableWithoutFeedback
                                onPress={() => navigation.goBack()}
                            >
                                <Icon
                                    style={{}}
                                    width={30}
                                    height={30}
                                    fill='#ccc'
                                    name={'close'}
                                />
                            </TouchableWithoutFeedback>
                        </Layout>

                    </Layout>
                    <View>
                        <KeyboardAvoidingView enabled>
                            <View>
                                <Input
                                    style={styles.topSearchInput}
                                    size='small'
                                    onChangeText={(UserName) =>
                                        setUserName(UserName)
                                    }
                                    underlineColorAndroid='#f000'
                                    placeholder='Enter Name'
                                    placeholderTextColor='#8b9cb5'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    onSubmitEditing={() =>
                                        emailInputRef.current &&
                                        emailInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View>
                                <Input
                                    style={styles.topSearchInput}
                                    size='small'
                                    onChangeText={(UserEmail) =>
                                        setUserEmail(UserEmail)
                                    }
                                    placeholder='Enter Email'
                                    placeholderTextColor='#8b9cb5'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    onSubmitEditing={() =>
                                        passwordInputRef.current &&
                                        passwordInputRef.current.focus()
                                    }
                                    underlineColorAndroid='#f000'
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View>
                                <Input
                                    style={styles.topSearchInput}
                                    size='small'
                                    onChangeText={(UserPassword) =>
                                        setUserPassword(UserPassword)
                                    }
                                    placeholder='Enter Password'
                                    placeholderTextColor='#8b9cb5'
                                    keyboardType='default'
                                    ref={passwordInputRef}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    underlineColorAndroid='#f000'
                                    returnKeyType='next'
                                />
                            </View>
                            {errortext != '' ? (
                                <Text>
                                    {' '}
                                    {errortext}{' '}
                                </Text>
                            ) : null}
                            <Layout style={styles.instructions}>
                                <Text />
                                <Button
                                    style={styles['ctaButton--smallWidth']}
                                    activeOpacity={0.8}
                                    onPress={handleSubmitButton}
                                >
                                    REGISTER
                                </Button>
                                <Text />
                                <Button
                                    style={styles['ctaButton--smallWidth']}
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        onMenuClick(7)
                                    }
                                >
                                    LOGIN
                                </Button>

                            </Layout>
                        </KeyboardAvoidingView>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Layout>
    );
};
