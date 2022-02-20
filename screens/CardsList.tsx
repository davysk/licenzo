/* eslint-disable space-in-parens */
/* eslint-disable react/jsx-curly-spacing */
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { Text, Card, IconProps, Icon, Layout, Input } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';

import { AppContext, fillDecksWithPlaceholder, myDeck, singleListWord, singleWord } from '../App';
import { styles } from '../styles';

import { SwipeListView } from 'react-native-swipe-list-view';
import { getArticle, getCapitalizedIfNeeded } from '../assets/utils';
import { Index } from './Index';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fuse from 'fuse.js';
import { Navbar } from './Navbar';

export const DeleteIcon = (props: IconProps) => <Icon {...props} fill='#333' width={32} height={32} name='trash-2-outline' />;

export const CardsList = () => {

    const appData = useContext(AppContext);

    const {
        wordsList,
        hasShownAnimation,
        decksData,
        setWordsList,
        setHasShownAnimation,
        storeData,
        storeDecksData,
        setDecksData
    } = appData;

    const [listSearchKeyword, setListSearchKeyword] = React.useState('');
    const [filteredWordsList, setFilteredWordsList] = React.useState([] as typeof wordsList);

    const listFuseInstance = new Fuse(wordsList, {
        keys: ['tr', 'og'],
        threshold: 0.2
    });

    const updateListFilter = () => {
        const fuseResult = listFuseInstance.search(listSearchKeyword);
        setFilteredWordsList(fuseResult.map((result) => result.item));
    };

    const deleteWordFromAllDecks = (word: singleWord) => {
        const decksDataClone = [...decksData];

        // removing the add placeholder row
        decksDataClone.splice(-1, 1);

        decksDataClone.forEach((singleDeck: myDeck) => {
            const wordInDeckIndex = singleDeck.cards.findIndex((singleCard) => {

                if (singleCard.tr === word.tr && singleCard.og === word.og) {
                    return singleCard;
                }

            });

            singleDeck.cards.splice(wordInDeckIndex, 1);
        });

        storeDecksData(decksDataClone).then(() => {
            setDecksData(fillDecksWithPlaceholder(decksDataClone));
        });

    };

    useEffect(() => {
        updateListFilter();

        if (listSearchKeyword === '') {
            setFilteredWordsList([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listSearchKeyword]);

    if (wordsList.length === 0) {
        return <Index />;
    }

    if (wordsList[0].wordType === '__LOADING__LIST__') {
        return null;
    }

    const wipeListSearch = () => {
        setListSearchKeyword('');
    };

    const closeIcon = (props: IconProps) => {
        if (listSearchKeyword.length < 1) {
            return <></>;
        }

        return (
            <TouchableWithoutFeedback onPress={wipeListSearch}>
                <Icon {...props} width={22} height={22} fill='#ccc' name={'close-circle'} />
            </TouchableWithoutFeedback>
        );
    };

    const renderFilterIcon = (props: IconProps) => {
        return (
            <Icon {...props} width={22} height={22} fill='#ccc' name={'search-outline'} />
        );
    };

    const wordsListToShow = filteredWordsList.length > 0 ? filteredWordsList : wordsList;

    const deleteWord = (word: singleListWord, rowMap: any, rowKey: string) => {

        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }

        const updatedList = wordsList.filter((singleWord) => {
            return (!(singleWord.tr === word.tr && singleWord.og === word.og));
        });

        storeData(updatedList).then(() => {
            setWordsList(updatedList);
        });

        wipeListSearch();
        deleteWordFromAllDecks(word);
    };

    const wordsListWithKeys = [...wordsListToShow].map((word, index) => {
        return {
            ...word,
            key: index.toString()
        };
    });

    if (!hasShownAnimation) {
        setTimeout(() => { setHasShownAnimation(true); }, 3000);
    }

    return (
        <Layout style={styles.megaWrap} >
            <SafeAreaView style={[styles.mainViewWrapper]}>
                <Layout style={styles.listSearchWrapper} >
                    <Input
                        style={styles.topSearchInput}
                        placeholder='Search your list'
                        value={listSearchKeyword}
                        onChangeText={nextValue => setListSearchKeyword(nextValue)}
                        size={'small'}
                        accessoryRight={closeIcon}
                        accessoryLeft={renderFilterIcon}
                    />
                </Layout>
                <SwipeListView
                    keyboardDismissMode={'on-drag'}
                    previewRowKey={hasShownAnimation ? '' : '0'}
                    previewOpenValue={-50}
                    showsVerticalScrollIndicator={false}
                    data={wordsListWithKeys}
                    style={styles.cardsScrollView}
                    renderItem={(data) => {

                        return (
                            <Card
                                style={styles.wordCard}
                            >
                                <Text>
                                    <Text
                                        style={styles.mainWord}
                                    >
                                        {getArticle(data.item)}
                                    </Text>
                                    <Text
                                        style={styles.mainWord}
                                    >
                                        {getCapitalizedIfNeeded(data.item)}
                                    </Text>
                                </Text>
                                <Text
                                    style={styles.translationWord}
                                >
                                    {data.item.og}
                                </Text>
                            </Card>
                        );
                    }}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.deleteAction} >
                            <DeleteIcon
                                onPress={() => { deleteWord(data.item, rowMap, data.item.key); }}
                            />
                        </View>
                    )}
                    rightOpenValue={-75}
                    disableRightSwipe={true}
                />
            </SafeAreaView>
            <Navbar />
        </Layout>
    );
};
