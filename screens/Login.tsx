/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useContext, useState, createRef } from 'react';
import { Button, Layout, Text, Input, Icon } from '@ui-kitten/components';
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';

type loginScreen = {
    navigation: any;
    route: any;
}

export const LoginScreen = (props: loginScreen) => {
    const appData = useContext(AppContext);
    const { onMenuClick } = appData;
    const { navigation } = props;
    //const rememberMe = false;

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef() as any;

    const onSubmit = () => {
        setErrortext('');
        if (!userEmail) {
            Alert.alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            Alert.alert('Please fill Password');
            return;
        }
        auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then((user) => {
                console.log(user);
                if (user) onMenuClick(5);
            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'auth/invalid-email')
                    setErrortext(error.message);
                else if (error.code === 'auth/user-not-found')
                    setErrortext('No User Found');
                else {
                    setErrortext(
                        'Please check your email or password'
                    );
                }
            });
    };
    return (
        <Layout style={styles.megaWrap}>
            <SafeAreaView style={styles.mainViewWrapper}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                >
                    <Layout
                        style={styles.createNewDeckHeader}
                    >
                        <Layout style={styles.createNewDeckSideElement} />

                        <Layout style={styles.createNewDeckTitle}>
                            <Text style={[styles.text, styles.titleTextSmall]} category='h4'>
                                Sign In
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
                            <View />
                            <Layout style={styles.listSearchWrapper}>
                                <View>
                                    {/*  */}
                                    <Input
                                        style={styles.topSearchInput}
                                        onChangeText={(UserEmail) =>
                                            setUserEmail(UserEmail)
                                        }
                                        placeholder='Enter Email'
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        size='small'
                                        onSubmitEditing={() =>
                                            passwordInputRef.current &&
                                            passwordInputRef.current.focus()
                                        }
                                        underlineColorAndroid='#f000'
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </Layout>
                            <View>
                                <Input
                                    style={styles.topSearchInput}
                                    onChangeText={(UserPassword) =>
                                        setUserPassword(UserPassword)
                                    }
                                    placeholder='Enter Password'
                                    placeholderTextColor='#8b9cb5'
                                    keyboardType='default'
                                    size='small'
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
                                    onPress={onSubmit}
                                >
                                    LOGIN
                                </Button>
                                <Text />
                                <Button
                                    style={styles['ctaButton--smallWidth']}
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        onMenuClick(6)
                                    }
                                >
                                    REGISTER
                                </Button>

                            </Layout>
                        </KeyboardAvoidingView>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Layout>
    );
};
