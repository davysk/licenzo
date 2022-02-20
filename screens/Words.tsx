/* eslint-disable indent */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppContext, myWords } from '../App';
//import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Layout, Text } from '@ui-kitten/components';
import _ from 'underscore';
import { styles } from '../styles';
//import Accordion from 'react-native-accordion';
import StylishAccordion from 'react-native-stylish-accordion';
import { SimpleAccordion } from 'react-native-simple-accordion';
import { PhraseRes } from './PhraseRes';
import { SafeAreaView } from 'react-native-safe-area-context';

export type searchResults = myWords;

export const Words = () => {

    return (
        <Layout style={styles.megaWrap}>
            <SafeAreaView style={styles.mainViewWrapper}>
                <SimpleAccordion titleStyle={{ color: '#fff' }} bannerStyle={styles.customBanner} viewInside={<PhraseRes />} title={"My Accordion Title"} />
            </SafeAreaView>
        </Layout>
    );
};


