/* eslint-disable space-in-parens */
/* eslint-disable react/jsx-curly-spacing */
import React from 'react';
import { Text, Layout, Button } from '@ui-kitten/components';
import { styles } from '../styles';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from './Navbar';
import { LoginScreen } from './Login';
import { RegisterScreen } from './Register';

type loginProps = {
    navigation: any;
    route: any;
}

const Login = (props: loginProps) => {
    const { navigation } = props;

    return (
        <Layout style={styles.megaWrap} >
            <SafeAreaView style={[styles.mainViewWrapper, styles.emptyListWrapper]}>

                <Layout style={styles.listInstructions}>
                    <Text style={[styles.text, styles.titleText]} category='h4'>This app is offline.</Text>

                    <Text style={[styles.text, styles.instructionsText]}>
                        Register now to access some online services, which include personalized messages and YouTube access!
                    </Text>
                </Layout>

                <Layout style={styles.listInstructions}>
                    <Button onPress={() => { navigation.navigate('login-screen') }} style={styles['ctaButton--smallWidth']}>
                        LOGIN
                    </Button>
                    <Text />
                    <Button onPress={() => { navigation.navigate('register-screen') }} style={styles['ctaButton--smallWidth']}>
                        REGISTER
                    </Button>
                </Layout>

            </SafeAreaView>
            <Navbar />
        </Layout>
    );
};

const Stack = createStackNavigator();

export const LoginPage = () => {

    return (
        <Layout style={styles.stackNavigatorWrapper} >
            <Stack.Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: '#fff' }
                }}
            >
                <Stack.Screen
                    name='login-page'
                    options={{
                        title: '',
                        animationEnabled: false,
                        headerLeft: () => null,
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0
                        }
                    }}
                >
                    {
                        (props) => {
                            return (
                                <Login
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='login-screen'
                    options={{
                        headerShown: false,
                        title: '',
                        animationEnabled: true,
                        cardOverlayEnabled: true,
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0
                        },
                        ...TransitionPresets.ModalPresentationIOS
                    }}
                >
                    {
                        (props) => {
                            return (
                                <LoginScreen
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='register-screen'
                    options={{
                        headerShown: false,
                        title: '',
                        animationEnabled: true,
                        cardOverlayEnabled: true,
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0
                        },
                        ...TransitionPresets.ModalPresentationIOS
                    }}
                >
                    {
                        (props) => {
                            return (
                                <RegisterScreen
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

            </Stack.Navigator>
        </Layout>
    );
};
