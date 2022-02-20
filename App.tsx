/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useEffect, useState } from 'react';
import {
    ApplicationProvider,
    IconRegistry,
    Layout
} from '@ui-kitten/components';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles';
import { CardsList } from './screens/CardsList';
import { RegisterScreen } from './screens/Register';
import { AddToList } from './screens/AddToList';
import { Study } from './screens/Study';
import { customTheme } from './assets/customTheme';
import { TestMode } from './screens/Test';
import { LoginPage } from './screens/LoginPage';
import { LoginScreen } from './screens/Login';
import { OnlineScreen } from './screens/Online';
import { LanguageScreen } from './screens/Language';
import { ChatScreen } from './screens/Chat';
import { YoutubeScreen } from './screens/Youtube';

import SafeArea, { SafeAreaInsets } from 'react-native-safe-area';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Words } from './screens/Words';

const dbVersion = '5';

const SQLite = require('react-native-sqlite-storage');

const isOk = () => {
    console.log('db connected');
};

const isNotOk = (error: any) => {
    console.log('db not connected', error);
};

const db = SQLite.openDatabase({ name: 'dictionary.db', createFromLocation: '~dictionary.db' }, isOk, isNotOk);

const okDelete = () => {
    console.log('db deleted');
    SQLite.openDatabase({ name: 'dictionary.db', createFromLocation: '~dictionary.db' }, isOk, isNotOk);
};

const cantDelete = (error: any) => {
    console.log('cant delete db', error);
};

export const dbRefresh = () => {
    SQLite.deleteDatabase({ name: 'dictionary.db', createFromLocation: '~dictionary.db' }, okDelete, cantDelete);
};

export type singleWord = {
    tr: string, //translation
    og: string, //original(english)
    wordType: string
}

export type singlePhrase = {
    tr: string,
    og: string,
    category: string
}

export type singleListWord = singleWord & { dateAdded: number }

export type myWords = ReadonlyArray<singleWord>

export type wordsList = ReadonlyArray<singleListWord>

export type myPhrases = ReadonlyArray<singlePhrase>

export type singleCard = singleWord & { mastered: boolean };

export type myCards = singleCard[]

export type myDeck = {
    id: number,
    name: string,
    cards: myCards
};

export type myDecks = ReadonlyArray<myDeck>;

export type enrichedDecks = myDeck[];

export type state = {
    activeSections: [],
}

export type states = ReadonlyArray<state>

type appData = {
    wordsList: wordsList;
    states: states;
    decksData: myDecks;
    selectedIndex: number;
    hasShownAnimation: boolean;
    db: any;
    customNavigate: (route: string) => void;
    setHasShownAnimation: (value: boolean) => void;
    onMenuClick: (index: number) => void;
    setWordsList: (value: wordsList) => void;
    setDecksData: (value: myDecks) => void;
    storeData: (value: wordsList) => Promise<void>;
    storeDecksData: (value: myDecks) => Promise<void>;
    addSingleWord: (word: singleWord) => void;
    addSingleDeck: (deck: myDeck) => void;
    updateSingleDeck: (deck: myDeck, deckKey: number) => void;
    markWordAsMastered: (word: singleWord, deckKey: number, isMastered: boolean) => void;
    removeSingleDeck: (deckKey: number) => void;
};

export const AppContext = React.createContext({} as appData);

const setHasShownAnimation = (value: boolean) => {
    hasShownAnimation = value;
};

export const storeDBversion = async (version: string) => {
    try {
        await AsyncStorage.setItem('@dbVersion', version);
    } catch (e) {
        console.error('Error:', e);
    }
};

export const navigationRef = React.createRef() as any;

const customNavigate = (route: string) => {
    navigationRef.current?.navigate(route);
};

let hasShownAnimation = true;
let dbVersionWasChecked = false;

export const fillDecksWithPlaceholder = (decks: enrichedDecks): myDecks => {

    const extraDecks = {
        id: -1,
        name: '__ADD_PLACEHOLDER__',
        cards: []
    };

    decks.push(extraDecks);

    return decks;
};

export default () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const initialListState = [
        {
            tr: '__LOADING__LIST__',
            og: '__LOADING__LIST__',
            wordType: '__LOADING__LIST__',
            dateAdded: 0
        }
    ];

    const [wordsList, setWordsList] = React.useState(initialListState as wordsList);

    const [states] = React.useState([] as any);

    const [decksData, setDecksData] = React.useState([] as any);

    useEffect(() => {
        const getDecksData = async () => {
            try {
                const value = await AsyncStorage.getItem('@decks');

                if (value !== null) {
                    const dataAsArr = JSON.parse(value);

                    setDecksData(fillDecksWithPlaceholder(dataAsArr));
                }
                else {
                    setDecksData(fillDecksWithPlaceholder([]));
                }
            } catch (e) {
                //eroare
            }
        };

        getDecksData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@wordsList');
                const derivedValue = value || JSON.stringify([]);
                setWordsList(JSON.parse(derivedValue));
            } catch (e) {
                // eroare
            }
        };

        getData();
    }, []);

    const storeData = async (value: wordsList) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@wordsList', jsonValue);
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const storeDecksData = async (value: myDecks) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@decks', jsonValue);
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const addSingleWord = (word: singleWord) => {
        const listCopy = [...wordsList];

        const wordWithCurrentTimestamp = {
            ...word,
            dateAdded: (new Date()).getTime()
        };

        listCopy.unshift(wordWithCurrentTimestamp);

        setHasShownAnimation(false);

        storeData(listCopy).then(() => {
            setWordsList(listCopy);
        });

        onMenuClick(0);
    };

    const addSingleDeck = (deckData: myDeck) => {
        const decksClone = decksData.slice();

        // removing the add placeholder row
        decksClone.splice(-1, 1);

        decksClone.push(deckData);

        storeDecksData(decksClone).then(() => {
            setDecksData(fillDecksWithPlaceholder(decksClone));
        });

    };

    const updateSingleDeck = (deckData: myDeck, deckKey: number) => {
        const decksClone = decksData.slice();

        // removing the add placeholder row
        decksClone.splice(-1, 1);

        decksClone[deckKey] = deckData;

        storeDecksData(decksClone).then(() => {
            setDecksData(fillDecksWithPlaceholder(decksClone));
        });
    };

    const markWordAsMastered = (word: singleWord, deckKey: number, isMastered: boolean) => {
        const currentDeck = decksData.find((deck: myDeck) => deck.id === deckKey);

        const deckClone = { ...currentDeck } as myDeck;

        const wordToUpdate = deckClone.cards.find((card) => card.tr === word.tr && card.og === word.og);
        wordToUpdate ? wordToUpdate.mastered = isMastered : null;

        const decksClone = decksData.slice();

        // removing the add placeholder row
        decksClone.splice(-1, 1);

        decksClone[deckKey] = decksClone;

        storeDecksData(decksClone).then(() => {
            setDecksData(fillDecksWithPlaceholder(decksClone));
        });
    };

    const removeSingleDeck = (deckKey: number) => {
        const decksClone = decksData.slice();

        // removing the add placeholder row
        decksClone.splice(-1, 1);

        // removing the specified key
        decksClone.splice(deckKey, 1);

        storeDecksData(decksClone).then(() => {
            setDecksData(fillDecksWithPlaceholder(decksClone));
        });
    };

    const setDbVersionWasChecked = (newVal: boolean) => {
        dbVersionWasChecked = newVal;
    };

    const getDBversion = async () => {

        setDbVersionWasChecked(true);

        try {
            const version = await AsyncStorage.getItem('@dbVersion');

            if (version !== dbVersion) {
                dbRefresh();
                storeDBversion(dbVersion);
            }
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        if (!dbVersionWasChecked) {
            getDBversion();
        }
    });

    const onMenuClick = (index: number) => {
        switch (index) {
            case 0:
            default:
                customNavigate('list');
                break;

            case 1:
                customNavigate('login-start');
                break;

            case 2:
                customNavigate('study');
                break;

            case 3:
                customNavigate('test');
                break;

            case 4:
                customNavigate('add');
                break;
            case 5:
                customNavigate('online');
                break;
            case 6:
                customNavigate('register');
                break;
            case 7:
                customNavigate('login');
                break;
            case 8:
                customNavigate('lang');
                break;
            case 9:
                customNavigate('youtube');
                break;
            case 10:
                customNavigate('chat');
                break;
        }

        setSelectedIndex(index);
    };

    const appData: appData = {
        wordsList,
        states,
        decksData,
        selectedIndex,
        hasShownAnimation,
        db,
        customNavigate,
        setHasShownAnimation,
        onMenuClick,
        setWordsList,
        setDecksData,
        storeData,
        storeDecksData,
        addSingleDeck,
        updateSingleDeck,
        markWordAsMastered,
        removeSingleDeck,
        addSingleWord
    };

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer ref={navigationRef}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={customTheme}>
                <ActionSheetProvider>
                    <AppContext.Provider value={appData}>
                        <Layout style={styles.stackNavigatorWrapper} >
                            <Tab.Navigator
                                tabBarOptions={{
                                    showLabel: false,
                                    style: {
                                        height: 0
                                    }
                                }}
                            >


                                {/* <Tab.Screen
                                    name='lang'
                                    component={LanguageScreen}
                                /> */}

                                {/* <Tab.Screen
                                    name='words'
                                    component={Words}
                                /> */}

                                { /*
                                <Tab.Screen
                                    name='login'
                                    component={LoginPage}
                                />

                                 */ }
5

                                <Tab.Screen
                                    name='list'
                                    component={CardsList}
                                    options={{
                                        tabBarVisible: false
                                    }}
                                />

                                <Tab.Screen
                                    name='study'
                                    component={Study}
                                    options={{
                                        tabBarVisible: false
                                    }}
                                />

                                <Tab.Screen
                                    name='test'
                                    component={TestMode}
                                    options={{
                                        tabBarVisible: false
                                    }}
                                />

                                <Tab.Screen
                                    name='add'
                                    component={AddToList}
                                    options={{
                                        tabBarVisible: false
                                    }}
                                />

                                <Tab.Screen
                                    name='login-start'
                                    component={LoginPage}
                                    options={{
                                        tabBarVisible: false
                                    }}
                                />

                                <Tab.Screen
                                    name='register'
                                    component={RegisterScreen}
                                />

                                <Tab.Screen
                                    name='login'
                                    component={LoginScreen}
                                />

                                <Tab.Screen
                                    name='online'
                                    component={OnlineScreen}
                                />

                                <Tab.Screen
                                    name='youtube'
                                    component={YoutubeScreen}
                                />

                                <Tab.Screen
                                    name='chat'
                                    component={ChatScreen}
                                />

                            </Tab.Navigator>

                        </Layout>
                    </AppContext.Provider>
                </ActionSheetProvider>
            </ApplicationProvider>
        </NavigationContainer>
    );
};
