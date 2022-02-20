import { StyleSheet } from 'react-native';
import { isAndroid } from './assets/utils';
import { Dimensions } from 'react-native';

const globalStyles = {
    width: '91%',
    marginLeft: '4.5%',
    marginRight: '4.5%',
    borderRadius: 16,
    fontFamily: customFontRegular
};

export const mainColor = '#E08531';
export const secondColor = '#E8D33F';
export const thirdColor = '#2C4251';
export const fourthColor = '#44FFD2';
export const fifthColor = '#e63946';
export const sixthColor = '#023e8a';

const customFontRegular = 'Montserrat-Regular';
const customFontBold = 'Montserrat-SemiBold';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    topContainer: {
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'flex-end'
    },
    centeredElement: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        paddingTop: '10%'
    },
    'centeredElement--noTopSpace': {
        paddingTop: 0
    },
    'centeredElement--mediumHorizontalPadding': {
        width: '92%',
        marginLeft: '4%',
        marginRight: '4%'
    },
    'centeredElement--lessHorizontalPadding': {
        width: '98%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    centeredSimpleView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    coloredTopContainer: {
        backgroundColor: mainColor
    },
    listSearchWrapper: {
        marginBottom: 6
    },
    select: {
        flex: 1,
        margin: 2
    },
    labelText: {
        flex: 1,
        fontFamily: customFontRegular
    },
    smallSelect: {
        flex: 1,
        margin: 2
    },
    sectionLabel: {
        marginTop: 10,
        marginBottom: 10
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    commonDivider: {
        marginTop: 10,
        marginBottom: 10
    },
    verticalSpacer: {
        marginTop: 10,
        marginBottom: 10,
        height: 20
    },
    backupDivider: {
        width: '91%',
        marginLeft: '4.5%',
        marginRight: '4.5%',
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 10,
        marginBottom: 20
    },
    addBar: {
        display: 'flex',
        flexDirection: 'row',
        top: 3
    },
    addBarLeft: {
        backgroundColor: mainColor,
        flex: 1.5,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingBottom: 5
    },
    addBarRight: {
        backgroundColor: mainColor,
        flex: 18
    },
    addWordInput: {
        ...globalStyles,
        borderRadius: 18
    },
    searchResultsContainer: {
        paddingBottom: 80
    },
    topSearchInput: {
        ...globalStyles
    },
    smallInput: {
        ...globalStyles,
        borderRadius: 6
    },
    inputExtraTopSpacing: {
        marginTop: 5
    },
    listInstructions: {
        marginTop: 40,
        paddingLeft: 30,
        paddingRight: 30
    },
    tapInstructions: {
        position: 'absolute',
        bottom: 84,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomZone: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%'
    },
    bottomWrapper: {
        paddingTop: 12,
        paddingBottom: 14
    },
    'bottomWrapper--withNotch': {
        paddingBottom: 30
    },
    text: {
        textAlign: 'center',
        color: '#333',
        fontFamily: customFontRegular,
        fontSize: 16.5
    },
    boldText: {
        fontFamily: customFontBold,
        fontWeight: '900'
    },
    biggerText: {
        fontSize: 18
    },
    veryBigText: {
        fontSize: 27
    },
    smallerText: {
        fontSize: 13
    },
    verySmallText: {
        fontSize: 10
    },
    leftAlignedText: {
        textAlign: 'left'
    },
    rightAlignedText: {
        textAlign: 'right'
    },
    centeredText: {
        textAlign: 'center'
    },
    lightText: {
        color: '#666'
    },
    greenText: {
        color: 'green'
    },
    strikedText: {
        textDecorationLine: 'line-through'
    },
    redText: {
        color: 'red'
    },
    textWithTopMargin: {
        marginTop: 10
    },
    whiteText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: customFontRegular
    },
    titleText: {
        color: mainColor,
        fontFamily: customFontBold,
        fontSize: 30
    },
    titleTextSmall: {
        color: mainColor,
        fontFamily: customFontBold,
        fontSize: 24
    },
    linkText: {
        textDecorationLine: 'underline'
    },
    centeredView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    plusIcon: {
        marginLeft: -1
    },
    icon: {
        width: 32,
        height: 32,
        textAlign: 'center'
    },
    cardsScrollView: {
        width: '91%',
        marginLeft: '4.5%',
        marginRight: '4.5%',
        height: screenHeight - 170
    },
    cardMasteredIconContainer: {
        backgroundColor: mainColor,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    'cardMasteredIconContainer--Back': {
        backgroundColor: secondColor
    },
    wordCard: {
        marginBottom: 10,
        backgroundColor: mainColor,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 16
    },
    mainWord: {
        color: '#fff',
        fontSize: 22,
        fontFamily: customFontBold
    },
    translationWord: {
        color: '#fff',
        fontSize: 16,
        marginTop: 8,
        fontFamily: customFontRegular
    },
    deleteAction: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10
    },
    megaWrap: {
        height: '100%',
        backgroundColor: '#FFF'
    },
    mainViewWrapper: {
        width: '100%',
        paddingTop: 10
    },
    emptyListWrapper: {
        height: '100%'
    },
    singleSearchResult: {
        width: '91%',
        marginLeft: '4.5%',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    singleSearchResultMainWord: {
        fontSize: 18,
        fontFamily: customFontRegular
    },
    singleSearchResultArticle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: customFontBold
    },
    enWord: {
        marginTop: 4,
        fontFamily: customFontRegular
    },
    searchResultWordBlock: {
        flex: 8.5
    },
    'searchResultWordBlock--Disabled': {
        opacity: 0.2
    },
    searchResultTypeOfWordBlock: {
        flex: 1.5,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    typeOfWord: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 10,
        fontFamily: customFontRegular
    },
    'typeOfWord--Noun': {
        backgroundColor: mainColor
    },
    'typeOfWord--Verb': {
        backgroundColor: secondColor
    },
    'typeOfWord--Adj': {
        backgroundColor: thirdColor
    },
    'typeOfWord--Adv': {
        backgroundColor: fifthColor
    },
    sliderWrapper: {
        flex: 2,
        maxWidth: '90%',
        marginLeft: '5%'
    },
    singleSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: customFontRegular
    },
    singleCardWrapper: {
        height: 400,
        width: 320
    },
    singleCard: {},
    cardFrontAndBack: {
        backgroundColor: mainColor,
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 16,
        padding: 20
    },
    cardBack: {
        backgroundColor: secondColor
    },
    instructions: {
        paddingLeft: 13,
        paddingRight: 13
    },
    instructionsText: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'left'
    },
    instructionsTextExtraBlock: {
        marginTop: 0
    },
    ctaButton: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: mainColor,
        borderColor: mainColor,
        fontFamily: customFontRegular
    },
    'ctaButton--smallWidth': {
        width: '50%',
        marginLeft: '25%'
    },
    'ctaButton--superSmall': {
        width: '20%',
        marginLeft: '5%'
    },
    cardsTopNav: {
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: -10
    },
    firstSlideText: {
        fontSize: 16,
        fontWeight: 'normal',
        maxWidth: '90%',
        marginLeft: '5%'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '91%',
        marginLeft: '4.5%',
        marginRight: '4.5%'
    },
    infoColOne: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingRight: 20,
        paddingBottom: 18,
        paddingTop: 1.3
    },
    infoColTwo: {
        flex: 10,
        backgroundColor: 'transparent',
        alignItems: 'flex-start'
    },
    infoColThree: {
        flex: 4,
        backgroundColor: 'transparent'
    },
    versionBox: {
        width: '91%',
        marginLeft: '4.5%',
        marginRight: '4.5%'
    },
    iconImage: {
        width: 100,
        height: 100
    },
    stackNavigatorWrapper: {
        width: '100%',
        flex: 1
    },
    standardModal: {
        width: '90%'
    },
    standardModalBackdrop: {
        backgroundColor: 'black',
        opacity: 0.8
    },
    decksWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '2%',
        marginBottom: '2%'
    },
    singleDeck: {
        backgroundColor: mainColor,
        height: 140,
        flexBasis: '31%',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 8,
        marginLeft: '3.5%',
        marginRight: '3.5%',
        zIndex: 1
    },
    'singleDeck--noMargin': {
        marginLeft: 0,
        marginRight: 0
    },
    addDeck: {
        backgroundColor: '#EAC3CF',
        borderStyle: 'dashed',
        borderColor: mainColor,
        borderWidth: 2
    },
    addDeckPlus: {
        color: mainColor,
        textAlign: 'center',
        fontSize: 20
    },
    createDeckList: {
        width: '100%',
        height: '100%'
    },
    createDeckListContainer: {
        paddingBottom: 200
    },
    createDeckCta: {
        height: 200,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        bottom: 0,
        alignItems: 'center'
    },
    createDeckCtaButton: {
        width: 170,
        backgroundColor: mainColor
    },
    'createDeckCtaButton--Disabled': {
        backgroundColor: '#EAC4CE',
        borderWidth: 0
    },
    deckAddRow: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    deckAddRowLeft: {
        flexBasis: '60%'
    },
    deckAddRowRight: {
        flexBasis: '40%'
    },
    editButtonSvg: {
        position: 'absolute',
        top: 5,
        right: 4,
        zIndex: 2
    },
    deckName: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    createNewDeckHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 50
    },
    createNewDeckTitle: {
        flexBasis: '80%',
        justifyContent: 'center'
    },
    createNewDeckSideElement: {
        flexBasis: '10%',
        justifyContent: 'center'
    },
    // CHALLENGE MODE
    testModeCardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: mainColor
    },
    testModeCardLeftZone: {
        flexBasis: '60%',
        backgroundColor: mainColor
    },
    testModeCardLeftZoneTop: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: mainColor
    },
    testModeCardLeftZoneBottom: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: mainColor,
        marginTop: 8
    },
    testModeCardCenterZone: {
        flexBasis: '30%',
        backgroundColor: mainColor,
        justifyContent: 'center'
    },
    testModeCardPercentageText: {
        position: 'absolute',
        left: 9,
        width: 30
    },
    testModeCardRightZone: {
        flexBasis: '10%',
        backgroundColor: mainColor,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    // CHALLENGE MODE - Playing
    progressBarWrapper: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    testModeCloseButton: {
        marginRight: 20
    },
    bigEmoji: {
        fontSize: 100,
        textAlign: 'center'
    },
    graphsHolder: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    endOfTestGraph: {
        alignItems: 'center'
    },
    endOfTestGraphPercentage: {
        position: 'absolute',
        bottom: 48
    },
    accordionHeader: {
        backgroundColor: '#ff9d9d',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8
    },
    accordionSubContainer: {
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
        marginBottom: 13
    },
    customBanner: {
        backgroundColor: '#E08531',
        borderRadius: 16,
        width: '90%'
    },
    buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'blue'
    },
    buttonTextSmall: {
        fontSize: 15
    },
    player: {
        alignSelf: 'stretch',
        marginVertical: 10
    }
});

