/* eslint-disable indent */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useCallback, useContext, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { AppContext, myWords } from '../App';
import { SearchRes } from './SearchRes';

import { Icon, IconProps, Input, Layout } from '@ui-kitten/components';
import _ from 'underscore';
import { styles } from '../styles';

export type searchResults = myWords;

export const AddToList = () => {
    const appData = useContext(AppContext);
    const { wordsList, db, onMenuClick } = appData;

    const [addSearchKeyword, setAddSearchKeyword] = React.useState('');
    const [addSearchResults, setAddSearchResults] = React.useState([] as searchResults);
    const [shouldQuery, setShouldQuery] = React.useState(false);

    useEffect(() => {
        if (addSearchKeyword === '') {
            setAddSearchResults([]);
        }
    }, [addSearchKeyword]);

    const wipeSearch = () => {
        setAddSearchKeyword('');
    };

    const renderCloseIcon = (props: IconProps) => {
        if (addSearchKeyword.length < 1) {
            return <></>;
        }

        return (
            <TouchableWithoutFeedback onPress={wipeSearch}>
                <Icon {...props} width={22} height={22} fill='#ccc' name={'close-circle'} />
            </TouchableWithoutFeedback>
        );
    };

    const setAddSearchKeywordWrapper = (word: string) => {
        setShouldQueryDebounced(true);
        setAddSearchKeyword(word);
    };

    const setShouldQueryDebounced = useCallback(_.debounce(setShouldQuery, 300), []);

    const query = `select * from words where tr like '${(addSearchKeyword)}%' or og like '${(addSearchKeyword)}%' limit 20`;


    if (shouldQuery && addSearchKeyword !== '') {
        setShouldQuery(false);
        db.transaction((tx: any) => {

            tx.executeSql(query, [], (trans: any, results: any) => {
                console.log('query executed');

                const len = results.rows.length;

                const tempAddSearchResults = [];

                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);

                    const tempObj = {
                        tr: row.tr,
                        og: row.og,
                        wordType: row.wordType
                    };

                    tempAddSearchResults.push(tempObj);
                }

                setAddSearchResults(tempAddSearchResults);
            },
                (error: any) => {
                    console.log('Errors with the query', error);
                }
            );
        });
    }

    return (
        <>
            <Layout style={[
                styles.topContainer,
                styles.coloredTopContainer
            ]}>
                <Layout style={styles.addBar}>
                    <Layout style={styles.addBarLeft}>
                        <Icon
                            onPress={() => onMenuClick(0)}
                            width={30}
                            height={30}
                            fill='#fff'
                            name={'close'}
                        />
                    </Layout>
                    <Layout style={styles.addBarRight}>
                        <Input
                            autoFocus={true}
                            autoCorrect={false}
                            style={styles.addWordInput}
                            placeholder='Type the word you want to add'
                            value={addSearchKeyword}
                            onChangeText={nextValue => setAddSearchKeywordWrapper(nextValue)}
                            size={'medium'}
                            accessoryRight={renderCloseIcon}
                        />
                    </Layout>
                </Layout>
            </Layout>


            <SafeAreaView style={styles.mainViewWrapper}>
                <ScrollView
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'always'}
                    contentContainerStyle={styles.searchResultsContainer}
                >
                    {
                        addSearchResults.map((word, index) => {

                            const isAlreadyThere = wordsList.find((listWord) => listWord.tr === word.tr && listWord.og === word.og);

                            return <SearchRes
                                isAlreadyThere={Boolean(isAlreadyThere)}
                                word={word}
                                key={index}
                                setAddSearchResults={setAddSearchResults}
                                setAddSearchKeyword={setAddSearchKeyword}
                            />;
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

