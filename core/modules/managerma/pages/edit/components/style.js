import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorBlue = '#007bdb';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        '& .title-information': {
            [theme.breakpoints.down('xs')]: {
                height: 75,
            },
            [theme.breakpoints.up('sm')]: {
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
            },
        },
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    capitalize: {
        textTransform: 'capitalize',
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        padding: '17px 0',
        '&.border': {
            borderBottom: '1px solid #DDE1EC',
        },
    },
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    btn: {
        borderRadius: 20,
        boxShadow: 'none',
        border: '1px solid',
        height: 36,
        width: 150,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '0 10px',
        marginTop: 20,
        float: 'right',
        [theme.breakpoints.down('xs')]: {
            width: 50,
            marginRight: 18,
        },
        '&.reverse': {
            background: '#FFFFFF',
            color: colorPurple,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    orderLabel: {
        fontFamily: font,
        display: 'block',
    },
    spanLabel: {
        display: 'block',
        fontWeight: 700,
    },
    gridHeader: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    contentLeft: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'top',
    },
    contentRight: {
        width: '100%',
        '& tr td:nth-child(3)': {
            [theme.breakpoints.up('sm')]: {
                width: '10%',
            },
            [theme.breakpoints.up('md')]: {
                width: '17%',
            },
        },
        '& tr td:first-child, tr td:nth-child(4)': {
            paddingRight: 8,
        },
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 0',
    },
    td: {
        padding: '5px 0',
        fontFamily: font,
        verticalAlign: 'top',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            color: colorPurple,
            fontSize: 20,
        },
    },
    grandTotal: {
        fontFamily: font,
        fontWeight: 'bold',
    },
    link: {
        color: colorBlue,
        fontWeight: 500,
        '&:hover': {
            textDecorationLine: 'underline',
        },
    },
    list: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottom: `1px solid ${borderColor}`,
        '&.right': {
            textAlign: 'end',
        },
    },
    fieldRoot: {
        maxWidth: 200,
        verticalAlign: 'middle',
        marginBottom: 30,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
        '&.fieldCenter': {
            marginLeft: 10,
            marginRight: 10,
        },
        '& .MuiInputLabel-outlined': {
            transform: 'translate(10px, 10px)',
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '&.marginTop': {
            marginTop: '20px !important',
        },
        '&.full': {
            maxWidth: '100%',
            width: '100%',
        },
    },
    formgroup: {
        marginBottom: 20,
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 14,
        },
    },
    rootLabel: {
        marginBottom: 3,
    },
}));

export default useStyles;
