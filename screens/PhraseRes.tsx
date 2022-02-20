/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../styles';
import { View } from 'react-native';

export const PhraseRes = () => {
    return (
        <Layout>
            <View style={[
                styles.searchResultWordBlock
            ]}>
                <Text>
                    <Text style={styles.singleSearchResultMainWord}>test</Text>
                </Text>
                <Text style={styles.enWord} >hello</Text>
            </View>
        </Layout>
    );
};