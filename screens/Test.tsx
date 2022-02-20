/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useContext } from 'react';

import { Button, Card, Icon, IconProps, Layout, Text } from '@ui-kitten/components';
import { mainColor, styles } from '../styles';
import { Navbar } from './Navbar';
import { AppContext, myDeck } from '../App';
import { FlatList } from 'react-native-gesture-handler';
import Pie from 'react-native-pie';
import { ListRenderItemInfo } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { TestModePlaying } from './TestPlay';

type TWrappedDeck = ListRenderItemInfo<myDeck>

export const PlayIcon = (props: IconProps) => (
    <Icon {...props} width={24} height={24} fill='#fff' name={'chevron-right-outline'} />
);

const renderCloseIcon = () => {
    return (
        <Icon
            style={styles.testModeCloseButton}
            width={22}
            height={22}
            fill={mainColor}
            name={'close-circle'}
        />
    );
};

export const getDeckPercentage = (deck: myDeck): number => {
    const masteredWords = deck.cards.filter((card) => card.mastered === true);
    return Math.round((masteredWords.length * 100) / deck.cards.length);
};


type testProps = {
    navigation: any;
    route: any;
}

export const TestMain = (props: testProps) => {

    const appData = useContext(AppContext);
    const { decksData, onMenuClick } = appData;
    const { navigation } = props;

    const playClick = (deckKey: number) => {
        navigation.navigate('test-mode_playing', { deckKey });
    };

    return (
        <Layout style={styles.megaWrap} >
            <Layout>
                <Text style={[styles.text, styles.titleText]} category='h4'>Test mode</Text>
                {decksData.length <= 1 &&
                    <Layout style={styles.centeredElement}>
                        <Text style={[styles.text, styles.smallerText, styles.lightText]} >
                            In this area you will be able to test your knowledge on words coming from your decks.
                            Start by creating a deck in the Study Mode view and then come back 🙂
                        </Text>
                        <Layout style={styles.listInstructions}>
                            <Button onPress={() => { onMenuClick(2); }} style={styles.ctaButton}>
                                GO TO STUDY MODE
                            </Button>
                        </Layout>
                    </Layout>
                }

                {decksData.length > 1 &&
                    <>
                        <Text style={[styles.text, styles.smallerText]}>Select a deck and start the test</Text>
                        <FlatList
                            keyboardDismissMode={'on-drag'}
                            showsVerticalScrollIndicator={false}
                            data={decksData}
                            style={[styles.cardsScrollView, styles.inputExtraTopSpacing]}
                            keyExtractor={deck => deck.id.toString()}
                            renderItem={(data: TWrappedDeck) => {

                                const { item: deck } = data;

                                if (deck.name === '__ADD_PLACEHOLDER__') {
                                    return null;
                                }

                                return (
                                    <Card
                                        style={styles.wordCard}
                                        onPress={() => playClick(deck.id)}
                                    >
                                        <Layout
                                            style={styles.testModeCardWrapper}
                                        >
                                            <Layout
                                                style={styles.testModeCardLeftZone}
                                            >
                                                <Layout
                                                    style={styles.testModeCardLeftZoneTop}
                                                >
                                                    <Text style={[styles.text, styles.whiteText, styles.leftAlignedText]}>
                                                        {deck.name}
                                                    </Text>
                                                </Layout>

                                                <Layout
                                                    style={styles.testModeCardLeftZoneBottom}
                                                >
                                                    <Text style={[styles.text, styles.whiteText, styles.leftAlignedText, styles.smallerText]}>
                                                        {`${deck.cards.length} card${deck.cards.length > 1 ? 's' : ''}`}
                                                    </Text>
                                                </Layout>
                                            </Layout>

                                            <Layout
                                                style={styles.testModeCardCenterZone}
                                            >
                                                <Pie
                                                    radius={24}
                                                    innerRadius={18}
                                                    sections={[
                                                        {
                                                            percentage: getDeckPercentage(deck),
                                                            color: '#FFF'
                                                        }
                                                    ]}
                                                    backgroundColor='#DC9CAE'
                                                />

                                                <Text style={[styles.text, styles.whiteText, styles.verySmallText, styles.testModeCardPercentageText]}>
                                                    {`${getDeckPercentage(deck)}%`}
                                                </Text>

                                            </Layout>

                                            <Layout
                                                style={styles.testModeCardRightZone}
                                            >
                                                <PlayIcon />
                                            </Layout>
                                        </Layout>
                                    </Card>
                                );
                            }}
                        />
                    </>
                }
            </Layout>
            <Navbar />
        </Layout>
    );
};

const Stack = createStackNavigator();

type TNavigationOptionsProps = {
    navigation: any; // TODO: better type?
}

const navigationOptions = (props: TNavigationOptionsProps) => {

    const { navigation } = props;

    return {
        title: '',
        animationEnabled: true,
        headerLeft: () => (
            <></> // this is just a workaround to show nothing
        ),
        headerRight: () => {

            return (
                <HeaderBackButton
                    labelVisible={false}
                    backImage={renderCloseIcon}
                    onPress={() => navigation.goBack()}
                />
            );
        },
        headerBackTitleVisible: false,
        headerStyle: {
            shadowColor: 'transparent',
            elevation: 0
        }
    };
};

export const TestMode = () => {

    return (
        <Layout style={styles.stackNavigatorWrapper} >
            <Stack.Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: '#fff' }
                }}
            >
                <Stack.Screen
                    name='test-mode_mainScreen'
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
                                <TestMain
                                    {...props}
                                />
                            );
                        }
                    }
                </Stack.Screen>

                <Stack.Screen
                    name='test-mode_playing'
                    options={navigationOptions}
                >
                    {
                        (props) => {
                            return (
                                <TestModePlaying
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

