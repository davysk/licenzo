/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useContext } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { styles } from '../styles';
// import { Image, View } from 'react-native';
import { AppContext } from '../App';
import { DEMO } from '../assets/demoData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from './Navbar';

export const Index = () => {

    const appData = useContext(AppContext);
    const { setWordsList } = appData;

    return (
        <Layout style={styles.megaWrap} >
            <SafeAreaView style={[styles.mainViewWrapper, styles.emptyListWrapper]}>

                <Layout style={styles.listInstructions}>
                    <Text style={[styles.text, styles.titleText]} category='h4'>Hello! 👋</Text>

                    <Text style={[styles.text, styles.instructionsText]}>
                        This is your list view. All the words that you add from the dictionary will show up here.
                    </Text>
                </Layout>

                <Layout style={styles.listInstructions}>
                    <Button onPress={() => { setWordsList(DEMO); }} style={styles.ctaButton}>
                        START WITH A DEMO WORD
                    </Button>
                    <Text />
                    <Text style={[styles.text, styles.instructionsText]}>
                        Or just click on the (+) button to get started!
                    </Text>
                </Layout>

            </SafeAreaView>
            <Navbar />
        </Layout>
    );
};
