/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const colorBold = '#435179';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        maxWidth: 768,
        margin: '0 auto',
        pageBreakAfter: 'always',
    },
    containerBtn: {
        padding: '0 16px',
        maxWidth: 768,
        margin: '0 auto',
    },
    barcodeContainer: {
        fontFamily: font,
        color: colorText,
        fontSize: 12,
        margin: 0,
        display: 'block',
        textAlign: 'center',
        '&.signText': {
            textAlign: 'center',
        },
        '& strong': {
            fontWeight: 800,
        },
    },
    content: {
        padding: '18px 15px',
        background: '#ffffff',
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    content2: {
        padding: '5px 15px',
        background: '#ffffff',
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    contentImg: {
        paddingBottom: 0,
        '& .imgIcon': {
            width: 80,
            height: 'auto',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    wrapperColumn: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
        columnGap: 30,
        '&.borderTop': {
            borderTop: '1px solid',
        },
        '&.borderBottom': {
            borderBottom: '1px solid',
        },
    },
    descName: {
        fontFamily: font,
        color: 'black',
        fontSize: 16,
        margin: 0,
        display: 'block',
    },
}));

export default useStyles;