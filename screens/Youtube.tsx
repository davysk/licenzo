/* eslint-disable indent */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useState, useRef } from 'react';
import { Button, Layout, Text, Input, Icon } from '@ui-kitten/components';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { styles } from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import YouTube from 'react-native-youtube';

type ytProps = {
    navigation: any;
    route: any;
}

export const YoutubeScreen = (props: ytProps) => {
    const { navigation } = props;
    const youtubePlayerRef = useRef();
    // const singleVideoId = '4A426Yjm_jM';
    // const listVideoIds = [
    //     '4A426Yjm_jM',
    //     'BfmIgt_kPvM',
    //     'F9LwbmIWIr0'
    // ];
    const playlistID = 'PLxIXIaLcdFwD_gbMXHUOYqQtXTIPrys8L';

    const [isReady, setIsReady] = useState(false);
    const [status, setStatus] = useState(null);
    const [quality, setQuality] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLooping, setIsLooping] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [containerMounted, setContainerMounted] = useState(false);
    const [containerWidth, setContainerWidth] = useState(null);
    const plus = currentTime + 15;
    const minus = currentTime - 15;

    return (
        <Layout style={styles.megaWrap}>
            <SafeAreaView style={{ flex: 1 }}>

                <Layout
                    style={styles.createNewDeckHeader}
                >
                    <Layout style={styles.createNewDeckSideElement} />

                    <Layout style={styles.createNewDeckTitle}>
                        <Text style={[styles.text, styles.titleTextSmall]} category='h4'>
                            YouTube
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

                <ScrollView
                    onLayout={({
                        nativeEvent: {
                            layout: { width }
                        }
                    }) => {
                        if (!containerMounted) { setContainerMounted(true); }
                        if (containerWidth !== width) { setContainerWidth(width); }
                    }}>
                    {containerMounted && (
                        <YouTube
                            ref={youtubePlayerRef}
                            apiKey="AIzaSyATIyIKPvQ0h7Al7evhXoFm8YhUDfd7AbA"
                            // videoId={singleVideoId}
                            // videoIds={listVideoIds}
                            playlistId={playlistID}
                            play={isPlaying}
                            loop={isLooping}
                            fullscreen={fullscreen}
                            controls={1}
                            style={[
                                {
                                    height: PixelRatio.roundToNearestPixel(
                                        containerWidth / (16 / 9),
                                    )
                                },
                                styles.player
                            ]}
                            onError={(e) => setError(e.error)}
                            onReady={() => setIsReady(true)}
                            onChangeQuality={() => setQuality(quality)}
                            onProgress={(e) => {
                                setDuration(e.duration);
                                setCurrentTime(e.currentTime);
                            }}
                        />
                    )}
                    <Text />

                    {/* Previous / Play / Next video */}
                    <Button
                        style={styles['ctaButton--smallWidth']}
                        onPress={() =>
                            youtubePlayerRef.current &&
                            youtubePlayerRef.current.previousVideo()
                        }>
                        Previous Video
                        </Button>
                    <Text />
                    <Button
                        style={styles['ctaButton--smallWidth']}
                        onPress={() =>
                            youtubePlayerRef.current &&
                            youtubePlayerRef.current.nextVideo()
                        }>
                        Next Video
                        </Button>
                    <Text />

                    {/* Go To Specific time in played video with seekTo() */}
                    <View style={styles.buttonGroup}>
                        <Button
                            style={styles['ctaButton--superSmall']}
                            onPress={() =>
                                youtubePlayerRef.current &&
                                youtubePlayerRef.current.getCurrentTime().then(result => youtubePlayerRef.current.seekTo(result + 15))
                            }>
                            +15s
                        </Button>
                        <Button
                            style={styles['ctaButton--superSmall']}
                            onPress={() => setIsPlaying((isPlaying) => !isPlaying)}>
                            {status === 'playing' ? 'Pause' : 'Play'}
                        </Button>
                        <Button
                            style={styles['ctaButton--superSmall']}
                            onPress={() =>
                                youtubePlayerRef.current &&
                                youtubePlayerRef.current.getCurrentTime().then(result => youtubePlayerRef.current.seekTo(result - 15))
                                //youtubePlayerRef.current.seekTo(youtubePlayerRef.current.currentTime - 15)
                            }>
                            -15s
                        </Button>
                    </View>

                    {/* Play specific video in a videoIds array by index */}
                    {youtubePlayerRef.current &&
                        youtubePlayerRef.current.props.videoIds &&
                        Array.isArray(youtubePlayerRef.current.props.videoIds) && (
                            <View style={styles.buttonGroup}>
                                {youtubePlayerRef.current.props.videoIds.map(
                                    (videoId, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            style={styles.button}
                                            onPress={() =>
                                                youtubePlayerRef.current &&
                                                youtubePlayerRef.current.playVideoAt(i)
                                            }>
                                            <Text
                                                style={[
                                                    styles.buttonText,
                                                    styles.buttonTextSmall
                                                ]}>{`Video ${i}`}</Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                        )}
                </ScrollView>
            </SafeAreaView>
        </Layout>
    );
};
