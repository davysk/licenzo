/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useEffect, useState, useContext } from 'react';
import {
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../App';
import { Button, Text, Layout } from '@ui-kitten/components';
import { styles } from '../styles.js';
import auth from '@react-native-firebase/auth';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import messaging from '@react-native-firebase/messaging';
import { YoutubeScreen } from './Youtube';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './Login';
import { Navbar } from './Navbar';

type onlineProps = {
    navigation: any;
    route: any;
}

const Stack = createStackNavigator();
const TOPIC = 'MyNews';

export const OnlinePage = (props: onlineProps) => {
    const [user, setUser] = useState();
    const appData = useContext(AppContext);
    const { onMenuClick } = appData;
    const navigation = props.navigation;

    useEffect(() => {
        // eslint-disable-next-line no-shadow
        const subscriber = auth().onAuthStateChanged((user) => {
            console.log('user', JSON.stringify(user));
            setUser(user);
        });

        return subscriber;
    }, []);

    const [
        canReceiveMessage,
        setCanReceiveMessage
    ] = useState(true);

    const allowToReceiveMessage = async (isAllowed: any) => {
        setCanReceiveMessage(isAllowed);
        await inAppMessaging().setMessagesDisplaySuppressed(
            isAllowed
        );
    };

    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    }
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        auth()
                            .signOut()
                            .then(() => navigation.navigate('login'))
                            .catch((error) => {
                                console.log(error);
                                if (error.code === 'auth/no-current-user') { onMenuClick(1); }
                                //navigation.
                                else { Alert.alert(error); }
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const requestUserPermission = async () => {
        // for ios
        const authStatus = await messaging().requestPermission();
        console.log('Authorization status(authStatus):', authStatus);
        return (
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
    };

    useEffect(() => {
        if (requestUserPermission()) {
            messaging()
                .getToken()
                .then((fcmToken) => {
                    console.log('FCM Token -> ', fcmToken);
                });
        } else { console.log('Not Authorization status'); }

        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'getInitialNotification:' +
                        'Notification caused app to open from quit state',
                    );
                    console.log(remoteMessage);
                    Alert.alert(
                        'getInitialNotification: Notification caused app to' +
                        ' open from quit state',
                    );
                }
            });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    'onNotificationOpenedApp: ' +
                    'Notification caused app to open from background state',
                );
                console.log(remoteMessage);
                Alert.alert(
                    'onNotificationOpenedApp: Notification caused app to' +
                    ' open from background state',
                );
            }
        });

        messaging().setBackgroundMessageHandler(
            async (remoteMessage) => {
                console.log(
                    'Message handled in the background!',
                    remoteMessage
                );
            });

        const unsubscribe = messaging().onMessage(
            async (remoteMessage) => {
                Alert.alert('A new FCM message arrived!');
                console.log(
                    'A new FCM message arrived!',
                    JSON.stringify(remoteMessage)
                );
            }
        );

        messaging()
            .subscribeToTopic(TOPIC)
            .then(() => {
                console.log(`Topic: ${TOPIC} Suscribed`);
            });
        return () => {
            unsubscribe;
            // messaging().unsubscribeFromTopic(TOPIC);
        };
    }, []);

    return (
        <Layout style={styles.megaWrap} >
            <SafeAreaView style={[styles.mainViewWrapper]}>
                <Layout style={styles.instructions}>
                    <Text style={[styles.text, styles.titleText]}>
                        Online Services
                    </Text>

                    <Text />

                    {user ? (
                        <Text style={[styles.text, styles.lightText]}>
                            Welcome{' '}
                            {user.displayName
                                ? user.displayName
                                : user.email}
                        </Text>
                    ) : null}

                    <Text />

                    <Text style={[styles.text, styles.lightText]}>
                        In-App Messages enabled :{' '}
                        {canReceiveMessage ? 'Yes' : 'No'}
                    </Text>
                    <Text />

                    <Text style={[styles.text, styles.lightText]}>
                        These messages
                        are for new or returning users for quick updates or general instructions. You can turn this off
                        to avoid getting spammed when the app starts up.
                    </Text>

                    <Text />

                    <Button
                        activeOpacity={0.5}
                        style={styles['ctaButton--smallWidth']}
                        onPress={() =>
                            allowToReceiveMessage(!canReceiveMessage)
                        }
                    >
                        {canReceiveMessage
                            ? 'DISABLE MSGS'
                            : 'ENABLE MSGS'}
                    </Button>

                    <Text />

                    <Text style={[styles.text, styles.lightText]}>
                        You can also access YouTube playlists made specially for your language of choice.
                    </Text>
                    <Text />

                    <Button style={styles['ctaButton--smallWidth']}
                        onPress={() => { navigation.navigate('youtube'); }}
                    >
                        ACCESS YOUTUBE
                    </Button>

                    <Text />

                    <Button style={styles['ctaButton--smallWidth']}
                        activeOpacity={0.9}
                        onPress={logout}
                    >
                        LOGOUT
                    </Button>
                </Layout>
            </SafeAreaView>
            <Navbar />
        </Layout>
    );
};

export const OnlineScreen = () => {
    return (
        <Layout style={styles.stackNavigatorWrapper} >
            <Stack.Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: '#fff' }
                }}
            >
                <Stack.Screen
                    name='online'
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
                                <OnlinePage
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='youtube'
                    options={{
                        headerShown: false,
                        title: '',
                        animationEnabled: true,
                        cardOverlayEnabled: true,
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0
                        }
                    }}
                >
                    {
                        (props) => {
                            return (
                                <YoutubeScreen
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='login'
                    options={{
                        headerShown: false,
                        title: '',
                        animationEnabled: true,
                        cardOverlayEnabled: true,
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0
                        }
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

            </Stack.Navigator>
        </Layout>
    );
};
