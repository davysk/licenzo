/* eslint-disable space-in-parens */
/* eslint-disable react/jsx-curly-spacing */
import React, { useContext } from 'react';

import { BottomNavigation, BottomNavigationTab, IconProps, Layout } from '@ui-kitten/components';

import { AppContext } from '../App';
import { styles } from '../styles';
import { SvgXml } from 'react-native-svg';
import { plusSvg, testSvgBase, listSvgBase, netSvgBase, getCustomSvg, cardsSvgBase } from '../assets/customIcons';

const ListIcon = (props: IconProps) => {

    return (
        <SvgXml
            width='32'
            height='32'
            xml={getCustomSvg(listSvgBase, props.style?.tintColor)}
        />
    );
};

const CardsIcon = (props: IconProps) => {

    return (
        <SvgXml
            width='32'
            height='32'
            xml={getCustomSvg(cardsSvgBase, props.style?.tintColor)}
        />
    );
};

const PlusIcon = () => {
    return (
        <SvgXml
            width='44'
            height='44'
            xml={plusSvg}
            style={styles.plusIcon}
        />
    );
};

const PlayIcon = (props: IconProps) => {
    return (
        <SvgXml
            width='32'
            height='32'
            xml={getCustomSvg(testSvgBase, props.style?.tintColor)}
        />
    );
};

const InfoIcon = (props: IconProps) => {
    return (
        <SvgXml
            width='32'
            height='32'
            xml={getCustomSvg(netSvgBase, props.style?.tintColor)}
        />
    );
};

export const Navbar = () => {

    const appData = useContext(AppContext);

    const { onMenuClick, selectedIndex } = appData;

    return (
        <Layout style={styles.bottomZone}>
            <BottomNavigation
                appearance={'noIndicator'}
                style={styles.bottomWrapper}
                selectedIndex={selectedIndex}
                onSelect={(index) => onMenuClick(index)}>
                <BottomNavigationTab icon={ListIcon} />
                <BottomNavigationTab icon={InfoIcon} />
                <BottomNavigationTab icon={CardsIcon} />
                <BottomNavigationTab icon={PlayIcon} />
                <BottomNavigationTab icon={PlusIcon} />
            </BottomNavigation>
        </Layout>
    );
};
