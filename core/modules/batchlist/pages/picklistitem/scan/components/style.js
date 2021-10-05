/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        position: 'relative',
    },
    btn: {
        borderRadius: 30,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        padding: '14px 53px',
        marginTop: 27,
        textTransform: 'uppercase',
    },
    button: {
        verticalAlign: 'middle',
        background: 'unset',
        border: 0,
        fontSize: 32,
        color: colorPurple,
        fontWeight: 800,
        cursor: 'pointer',
    },
    content: {
        padding: '8px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '60% 40%',
    },
    h2: {
        marginBottom: 0,
        color: colorText,
        letterSpacing: 0,
        '&.quantity': {
            margin: '0 30px',
            fontSize: 40,
            display: 'inline-block',
            verticalAlign: 'middle',
        },
    },
    text: {
        display: 'block',
        color: colorText,
    },
    img: {
        width: '50%',
        marginTop: 17,
        marginBottom: 19,
    },
    linkBack: {
        display: 'block',
        textDecoration: 'underline',
        color: colorPurple,
        marginTop: 143,
        marginBottom: 10,
    },
}));

export default useStyles;
