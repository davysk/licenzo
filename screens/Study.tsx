/* eslint-disable space-in-parens */
/* eslint-disable react/jsx-curly-spacing */
import React, { useContext } from 'react';
import { Text, Layout, Card, Button } from '@ui-kitten/components';
import { styles } from '../styles';
import { AppContext } from '../App';
import { TransitionPresets } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Cards } from './StudyCards';
import _, * as underscore from 'underscore';
import { Decks } from './Decks';
import { SvgXml } from 'react-native-svg';
import { studySvgBase, getCustomSvg } from '../assets/customIcons';
import { TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import { Navbar } from './Navbar';
import { createStackNavigator } from '@react-navigation/stack';

type studyProps = {
    navigation: any;
    route: any;
}

const nDecksMax = 9;

const EditButton = () => {
    return (
        <SvgXml
            style={styles.editButtonSvg}
            width='18'
            height='18'
            xml={getCustomSvg(studySvgBase, '#FFFFFF')}
        />
    );
};

const StudyRules = (props: studyProps) => {

    const { navigation } = props;
    const { showActionSheetWithOptions } = useActionSheet();

    const appData = useContext(AppContext);
    const { decksData, removeSingleDeck, wordsList, onMenuClick } = appData;

    const chunked = _.chunk(decksData, 3);

    const editClick = (deckKey: number, event: GestureResponderEvent) => {

        event.stopPropagation();

        showActionSheetWithOptions(
            {
                options: ['Cancel', 'Edit Deck', 'Delete Deck'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    navigation.navigate('study-mode_new-deck', { deckKey, editMode: true });
                }
                if (buttonIndex === 2) {
                    removeSingleDeck(deckKey);
                }
            }
        );
    };

    const cardClick = (deckKey: number) => {
        navigation.navigate('study-mode_cards', { deckKey });
    };

    return (
        <Layout style={styles.megaWrap}>
            <Layout style={styles.instructions}>


                <Text style={[styles.text, styles.titleText]} category='h4'>Study mode</Text>

                <Text style={styles.verySmallText}>{'\n'}</Text>

                {wordsList.length > 0 && decksData.length > 1 &&
                    <Text style={[styles.text, styles.boldText, styles.smallerText, styles.leftAlignedText]}>YOUR DECKS</Text>
                }

                {wordsList.length > 0 && decksData.length === 1 &&
                    <Text style={[styles.text, styles.smallerText, styles.lightText]} >
                        You currently don't have any decks. {'\n'} Create a new one by clicking on the + icon below.
                    </Text>
                }
                {wordsList.length === 0 &&
                    <>
                        <Text style={[styles.text, styles.smallerText, styles.lightText]} >
                            In this area you will be able to create custom decks with words coming from your wallet.
                            Start by adding some words there and then come back
                        </Text>
                        <Layout style={styles.listInstructions}>
                            <Button onPress={() => { onMenuClick(0); }} style={styles.ctaButton}>
                                GO TO LIST
                            </Button>
                        </Layout>
                    </>
                }

                {chunked.map((singleRow, rowKey) => {

                    return (
                        <Layout key={rowKey} style={styles.decksWrapper}>
                            { singleRow.map((singleDeck, colNumber) => {

                                if (wordsList.length === 0) {
                                    return;
                                }

                                // deck key is calculated based on row and column
                                const deckKey = (rowKey * 3) + colNumber;

                                if (deckKey >= nDecksMax) {
                                    return (
                                        <Text style={[styles.text, styles.smallerText, styles.lightText]}>
                                            You reached the maximum amount of allowed decks.
                                        </Text>
                                    );
                                }

                                if (singleDeck.name === '__ADD_PLACEHOLDER__') {

                                    return (
                                        <Card
                                            onPress={() => navigation.navigate('study-mode_new-deck')}
                                            style={[
                                                styles.singleDeck,
                                                styles.addDeck,
                                                (colNumber === 0 || colNumber === 2) && styles['singleDeck--noMargin']
                                            ]}
                                            key={-1}
                                        >
                                            <Text style={styles.addDeckPlus}>+</Text>
                                        </Card>
                                    );
                                }

                                return (
                                    <Card
                                        onPress={(event) => editClick(deckKey, event)}
                                        style={[
                                            styles.singleDeck,
                                            (colNumber === 0 || colNumber === 2) && styles['singleDeck--noMargin']
                                        ]}
                                        key={deckKey}
                                    >

                                        <EditButton />

                                        <TouchableOpacity
                                            onPress={() => cardClick(deckKey)}
                                        >
                                            <View style={styles.deckName}>
                                                <Text style={[styles.whiteText, styles.smallerText]}>{singleDeck.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                );
                            })}
                        </Layout>
                    );

                })}

            </Layout>
            <Navbar />
        </Layout>
    );
};

const Stack = createStackNavigator();

export const Study = () => {

    return (
        <Layout style={styles.stackNavigatorWrapper} >
            <Stack.Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: '#fff' }
                }}
            >
                <Stack.Screen
                    name='study-mode_instructions'
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
                                <StudyRules
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='study-mode_cards'
                    options={{
                        headerShown: true,
                        title: '',
                        animationEnabled: true,
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0
                        }
                    }}
                >
                    {
                        (props) => {
                            return (
                                <Cards
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='study-mode_new-deck'
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
                                <Decks
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
