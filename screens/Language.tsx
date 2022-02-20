import React from 'react';
import { Text, Button, Layout } from '@ui-kitten/components';

const languages = ['fr', 'sp'];

export const LanguageScreen = () => {
    return (
        <Layout>
            <Text> Select Language </Text>
            <Button>
                Words
            </Button>

            <Button >
                Phrases
            </Button>

        </Layout>
    );
};

