/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint max-len: ["error", { "code": 180 }] */
import clsx from 'clsx';
import useStyles from '@modules/dashboard/pages/default/components/style';
import loginGqlService from '@modules/login/services/graphql';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';

const DashboardContent = () => {
    const styles = useStyles();
    const [getCustomer, getCustomerRes] = loginGqlService.getCustomer();
    const getCustomerFromGql = () => getCustomerRes
        && getCustomerRes.data
        && getCustomerRes.data.customer;
    const [username, setUsername] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [customer_loc_code, setCustomerLocCode] = React.useState('');
    const handleSetUserInfo = (customer) => {
        const firstnameTemp = customer && customer.firstname;
        const lastnameTemp = customer && customer.lastname;
        const emailTemp = customer && customer.email;
        const customerLocCodeTemp = customer && customer.customer_loc_code;
        setUsername(`${firstnameTemp} ${lastnameTemp}`);
        setFirstname(`${firstnameTemp}`);
        setEmail(`${emailTemp}`);
        setCustomerLocCode(`${customerLocCodeTemp}`);
    };
    const limitString = (string, limit) => {
        return string.substring(0, limit);
    };

    React.useEffect(() => {
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUserInfo(Cookies.getJSON(custDataNameCookie));
        } else {
            getCustomer();
        }
    }, []);

    React.useEffect(() => {
        if (getCustomerFromGql()) {
            Cookies.set(custDataNameCookie, getCustomerFromGql());
            handleSetUserInfo(getCustomerFromGql());
        }
    }, [getCustomerFromGql()]);

    return (
        <div>
            <div className={clsx(styles.info, styles.welcomeUser)}>
                <div className="title">
                    <span>
                        Hello
                        {' '}
                        {firstname}
                        ,
                        <br />
                        welcome to your dashboard!
                    </span>
                </div>
                <div className={styles.userWrapper}>
                    <div className={styles.user}>
                        <div className={styles.containerUser}>
                            <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/people.svg" />
                            <div className="user-text">
                                <span className={styles.textName}>{username}</span>
                                <br />
                                <span>Store Manager</span>
                                <br />
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <span className={styles.textBold}>Location Code</span>
                        <br />
                        <span>
                            {limitString(customer_loc_code, 64)}
                            ...
                        </span>
                    </div>
                    <div className={styles.user}>
                        <span className={styles.textBold}>Channel Code</span>
                        <br />
                        <span>SWI,SWIPOS,Jubelio,TKPD,SHPE,LZDA</span>
                    </div>
                    <div className={styles.user}>
                        <a href="#">Edit</a>
                    </div>
                </div>

            </div>
            <div className={styles.info}>
                <div className={styles.boxInfo}>
                    <h3 className={clsx('colorBlue', styles.noMargin)}>Order</h3>
                    <div className={styles.infoDetail}>
                        <span>
                            You have
                            <br />
                            <b>70 new order</b>
                            {' '}
                            to confirm
                        </span>
                        <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_order.svg" />
                    </div>
                    <div className={styles.infoStatus}>
                        <h2 className={clsx('colorBlue', styles.noMargin)}>12</h2>
                        <span>Failed Order</span>
                    </div>
                    <a className="link" href="#">Manage Order</a>
                </div>
                <div className={styles.boxInfo}>
                    <h3 className={clsx('colorGreen', styles.noMargin)}>Shipment</h3>
                    <div className={styles.infoDetail}>
                        <span>
                            You have
                            <br />
                            <b> 610 orders to full fill</b>
                            {' '}
                            and
                            <br />
                            <b> 2 orders cannot fullfill</b>
                        </span>
                        <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_shipment.svg" />
                    </div>
                    <div className={styles.infoStatusWrapper}>
                        <div className={clsx(styles.infoStatus, 'statusCenter')}>
                            <h2 className={clsx('colorGreen', styles.noMargin)}>12</h2>
                            <span>Store Pickup</span>
                        </div>
                        <div className={clsx(styles.infoStatus, 'statusCenter')}>
                            <h2 className={clsx('colorGreen', styles.noMargin)}>251</h2>
                            <span>Home Delivery</span>
                        </div>
                        <div className={clsx(styles.infoStatus, 'statusCenter')}>
                            <h2 className={clsx('colorGreen', styles.noMargin)}>347</h2>
                            <span>Marketplace</span>
                        </div>
                    </div>
                    <a className="link" href="#">Manage Shipment</a>
                </div>
                <div className={styles.boxInfo}>
                    <h3 className={clsx('colorOrange', styles.noMargin)}>Return</h3>
                    <div className={styles.infoDetail}>
                        <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_return.svg" />
                    </div>
                    <div className={styles.infoStatus}>
                        <h2 className={clsx('colorOrange', styles.noMargin)}>12</h2>
                        <span>Request to Proceed</span>
                    </div>
                    <a className="link" href="#">Manage Return</a>
                </div>

                <div className={styles.salesChannelTableWrapper}>
                    <h2>Sales Channel</h2>
                    <div className={styles.container}>
                        <table>
                            <thead>
                                <tr>
                                    <td />
                                    <td>CHANNEL</td>
                                    <td>STORE NAME</td>
                                    <td>CODE</td>
                                    <td>VIRTUAL STOCK</td>
                                    <td>LOCATION</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="channelIcon"><img className="imgIcon" alt="" src="/assets/img/dashboard/channel_official.png" /></td>
                                    <td>Official Website</td>
                                    <td>Official Website</td>
                                    <td>SWIFTPOS</td>
                                    <td>VSSWIFTPOS</td>
                                    <td>Warehouse 1 - Neo Soho Central Park, Jakarta Barat</td>
                                </tr>
                                <tr>
                                    <td className="channelIcon"><img className="imgIcon" alt="" src="/assets/img/dashboard/channel_tokopedia.png" /></td>
                                    <td>Tokopedia</td>
                                    <td>Tokopedia</td>
                                    <td>SWIFTPOS</td>
                                    <td>VSSWIFTPOS</td>
                                    <td>Warehouse 1 - Neo Soho Central Park, Jakarta Barat</td>
                                </tr>
                                <tr>
                                    <td className="channelIcon"><img className="imgIcon" alt="" src="/assets/img/dashboard/channel_shopee.png" /></td>
                                    <td>Shopee</td>
                                    <td>Shopee</td>
                                    <td>SWIFTPOS</td>
                                    <td>VSSWIFTPOS</td>
                                    <td>Warehouse 1 - Neo Soho Central Park, Jakarta Barat</td>
                                </tr>
                                <tr>
                                    <td className="channelIcon"><img className="imgIcon" alt="" src="/assets/img/dashboard/channel_lazada.png" /></td>
                                    <td>Lazada</td>
                                    <td>Lazada</td>
                                    <td>SWIFTPOS</td>
                                    <td>VSSWIFTPOS</td>
                                    <td>Warehouse 1 - Neo Soho Central Park, Jakarta Barat</td>
                                </tr>
                                <tr>
                                    <td className="channelIcon"><img className="imgIcon" alt="" src="/assets/img/dashboard/channel_blibli.png" /></td>
                                    <td>Blibli</td>
                                    <td>Blibli</td>
                                    <td>SWIFTPOS</td>
                                    <td>VSSWIFTPOS</td>
                                    <td>Warehouse 1 - Neo Soho Central Park, Jakarta Barat</td>
                                </tr>
                                <tr>
                                    <td className="channelIcon"><img className="imgIcon" alt="" src="/assets/img/dashboard/channel_bukalapak.svg" /></td>
                                    <td>Bukalapak</td>
                                    <td>Bukalapak</td>
                                    <td>SWIFTPOS</td>
                                    <td>VSSWIFTPOS</td>
                                    <td>Warehouse 1 - Neo Soho Central Park, Jakarta Barat</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
