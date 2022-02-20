/* eslint-disable space-in-parens */
import { singleWord, myWords, wordsList } from '../App';
import { Platform } from 'react-native';

type typesOfWords = {
    name: string,
    class: 'typeOfWord--Noun' | 'typeOfWord--Verb' | 'typeOfWord--Adj' | 'typeOfWord--Adv'
}

const capitalizeWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getFullWordString = (word: singleWord): string => {
    return `${getArticle(word)}${getCapitalizedIfNeeded(word).trim()}`;
};

export const uncapitalizeWord = (word: string) => {
    return word.charAt(0).toLowerCase() + word.slice(1);
};

export const isAndroid = Platform.OS === 'android';

export const getCapitalizedIfNeeded = (word: singleWord): string => {

    const { wordType } = word;

    switch (wordType) {
        case 'm':
        case 'f':
            return capitalizeWord(word.tr);

        default:
            return word.tr;
    }
};

export const getArticle = (word: singleWord): string => {

    const { wordType } = word;

    switch (wordType) {
        case 'm':
            return 'le ';

        case 'f':
            return 'la ';

        default:
            return '';
    }
};

export const removeArticle = (searchString: string) => {

    const searchRegex = /^(le|la) /i;

    return searchString.replace(searchRegex, '');
};

export const getTypeOfWord = (word: singleWord): typesOfWords => {

    const { wordType } = word;

    switch (wordType) {
        case 'm':
        case 'f':
        default:
            return {
                class: 'typeOfWord--Noun',
                name: 'NOUN'
            };

        case 'verb':
            return {
                class: 'typeOfWord--Verb',
                name: 'VERB'
            };

        case 'adj':
            return {
                class: 'typeOfWord--Adj',
                name: 'ADJ'
            };

        case 'adv':
            return {
                class: 'typeOfWord--Adv',
                name: 'ADV'
            };
    }
};

export const timeAgo = (date: any) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - date;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
};
