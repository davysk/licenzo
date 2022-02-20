/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useContext, useEffect, useState } from 'react';

import { Button, CheckBox, Layout, Text, Input, Icon, IconProps } from '@ui-kitten/components';
import { styles } from '../styles';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AppContext, myCards, myDeck, singleCard, singleWord } from '../App';
import { getFullWordString, timeAgo } from './../assets/utils';

// eslint-disable-next-line space-in-parens
const dateFormat = require('dateformat');

type deckProps = {
    word: singleWord;
    rowSelector: any;
}

const SingleRow = (props: any) => {
    const { data, rowSelector } = props;

    const { item } = data;
    const [checked, setChecked] = useState(item.checked);

    const onCheckboxChange = () => {
        setChecked(!checked);
        rowSelector(item.id, !checked);
    };

    return (
        <Layout style={styles.deckAddRow} key={item.id}>
            <Layout style={styles.deckAddRowLeft}>
                <CheckBox
                    checked={checked}
                    onChange={onCheckboxChange}
                >
                    { /* @ts-ignore */}
                    <Layout>
                        <Text style={styles.boldText} >{getFullWordString(item)}</Text>
                        <Text style={[styles.text, styles.smallerText, styles.leftAlignedText]}>{item.en}</Text>
                    </Layout>

                </CheckBox>
            </Layout>
            <Layout style={styles.deckAddRowRight}>
                <Text style={[styles.verySmallText, styles.rightAlignedText]} >{timeAgo(item.dateAdded)}</Text>
            </Layout>
        </Layout>
    );
};

export const Decks = (props: any) => { // TODO: types

    const { navigation } = props;
    const params = props.route?.params || {};

    const editMode = params?.editMode || false;
    const deckKey = params?.deckKey !== null ? params.deckKey : null;

    const appData = useContext(AppContext);
    const { wordsList, decksData, addSingleDeck, updateSingleDeck } = appData;
    const thisDeck = editMode ? decksData[deckKey] : null;

    const [isButtonEnabled, setButtonEnabled] = useState(false);

    const [newDeckCards, setnewDeckCards] = useState(editMode && thisDeck ? thisDeck.cards : [] as myCards);

    const rowSelector = (rowId: string, isSelected: boolean) => {

        const newDeckCardsClone = [...newDeckCards];

        if (isSelected) {
            const cardToAdd: singleCard = {
                og: wordsList[parseInt(rowId, 10)].og,
                tr: wordsList[parseInt(rowId, 10)].tr,
                wordType: wordsList[parseInt(rowId, 10)].wordType,
                mastered: false
            };
            newDeckCardsClone.push(cardToAdd);
        }
        else {
            const cardToDelete = newDeckCards.findIndex((singleCard) =>
                singleCard.og === wordsList[parseInt(rowId, 10)].og &&
                singleCard.tr === wordsList[parseInt(rowId, 10)].tr);

            newDeckCardsClone.splice(cardToDelete, 1);
        }

        setnewDeckCards(newDeckCardsClone);
    };

    useEffect(() => {
        setButtonEnabled(newDeckCards.length > 0);
    }, [newDeckCards]);

    const initialSelectionState = wordsList.map((word, index) => {

        let checkedValue = false;

        if (editMode && thisDeck) {
            const thisWordInOriginalDeck = thisDeck.cards.find((deckWord: singleCard) => deckWord.tr === word.tr && deckWord.og === word.og);

            if (thisWordInOriginalDeck) {
                checkedValue = true;
            }
        }

        return { ...word, checked: checkedValue, id: index.toString() };
    });

    const constructNewDeckData = (name?: string): myDeck => {
        const now = new Date();
        const readableDate = dateFormat(now, 'mmmm dS, yyyy, H:MM:ss');

        return {
            id: (new Date()).getTime(),
            name: name ? name : readableDate,
            cards: newDeckCards
        };
    };

    const onCreateDeck = () => {
        if (newDeckCards.length < 1) {
            return;
        }

        addSingleDeck(constructNewDeckData(inputContent));
        navigation.goBack();
    };

    const onUpdateDeck = () => {
        if (newDeckCards.length < 1) {
            return;
        }

        const updatedData = constructNewDeckData(inputContent);
        updateSingleDeck(updatedData, deckKey);

        navigation.goBack();
    };

    const [inputContent, setInputContent] = useState(thisDeck?.name);

    const [isInputFocused, setInputFocused] = useState(false);

    const renderCloseIconForDeckTitle = (iconProps: IconProps) => {
        if (!isInputFocused || !inputContent || inputContent.length < 1) {
            return <></>;
        }

        return (
            <TouchableWithoutFeedback onPress={() => setInputContent('')}>
                <Icon {...iconProps} width={22} height={22} fill='#ccc' name={'close-circle'} />
            </TouchableWithoutFeedback>
        );
    };

    return (
        <Layout style={[styles.centeredElement, styles['centeredElement--noTopSpace'], styles['centeredElement--lessHorizontalPadding']]}>

            <Layout
                style={styles.createNewDeckHeader}
            >
                <Layout style={styles.createNewDeckSideElement} />

                <Layout style={styles.createNewDeckTitle}>
                    <Text style={[styles.text, styles.titleTextSmall]} category='h4'>
                        {editMode ? 'Edit Deck' : 'Create new Deck'}
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

            <Input
                style={styles.smallInput}
                size='small'
                value={inputContent}
                placeholder='Name of your deck'
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                returnKeyType='done'
                onChangeText={nextValue => setInputContent(nextValue)}
                accessoryRight={renderCloseIconForDeckTitle}
            />

            <FlatList
                style={styles.createDeckList}
                contentContainerStyle={styles.createDeckListContainer}
                data={initialSelectionState}
                renderItem={(data) => {
                    return (
                        <SingleRow
                            data={data}
                            rowSelector={rowSelector}
                        />
                    );
                }}
                keyExtractor={item => item.id}
            />

            <Layout style={styles.createDeckCta}>
                <Button onPress={editMode ? onUpdateDeck : onCreateDeck} style={[styles.ctaButton, styles.createDeckCtaButton, !isButtonEnabled && styles['createDeckCtaButton--Disabled']]}>
                    {editMode ? 'Save Changes' : 'Create Deck'}
                </Button>
            </Layout>
        </Layout>
    );
};
