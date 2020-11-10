import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Breadcrumb from 'core/modules/common/breadcrumb';
import { useRouter } from 'next/router';
import RightToolbar from './components/rightToolbar';
import useStyles from './style';

const Layout = (props) => {
    const { children } = props;
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(true);

    const Header = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(!open)}
                    className={clsx(classes.togleMenuButton)}
                >
                    {
                        open
                            ? <ChevronLeftIcon className={classes.togleMenuIcon} />
                            : <ChevronRightIcon className={classes.togleMenuIcon} />
                    }
                </IconButton>

                <Breadcrumb data={[
                    { url: '/', label: 'Home' },
                    { url: '/oms', label: 'OMS' },
                    { url: '/oms/channel', label: 'Channel' }]}
                />
                <RightToolbar />
            </Toolbar>
        </AppBar>
    );

    const Sidebar = () => {
        const [expandedMenu, setExpandedMenu] = React.useState();
        const menuList = [
            { key: 'dashboard', label: 'Dashboard', url: '/' },
            {
                key: 'oms',
                label: 'OMS',
                children: [
                    { key: 'channel', label: 'Channel' },
                    { key: 'company', label: 'Company', url: '/oms/company' },
                ],
            },
            {
                key: 'sales',
                label: 'Sales',
                children: [
                    { key: 'orderQueue', label: 'Order Queue' },
                    { key: 'shipment', label: 'Shipment' },
                ],
            },
            { key: 'catalogInventory', label: 'Catalog Inventory' },
            {
                key: 'userData',
                label: 'User Data',
                children: [
                    { key: 'adminStore', label: 'Admin Store' },
                    { key: 'customerData', label: 'Customer Data' },
                ],
            },
        ];

        const handleClickParent = (menu) => {
            setExpandedMenu(menu);
            if (menu.url) router.push(menu.url);
        };
        const handleClickChild = (menu) => {
            if (menu.url) router.push(menu.url);
        };

        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, open ? classes.drawerOpen : classes.drawerClose)}
                classes={{
                    paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
                }}
            >
                <div className={clsx(classes.toolbar, classes.swiftOmsLogo, open ? 'open' : 'close')}>
                    <img
                        alt=""
                        src={open ? '/assets/img/swiftoms_logo_expanded.png' : '/assets/img/swiftoms_logo_collapsed.png'}
                    />
                </div>
                <List className={clsx(classes.menuList, open ? 'open' : 'close')}>
                    {menuList.map((menu) => (
                        <div key={menu.key}>
                            <ListItem
                                button
                                className={clsx(classes.menuItem, open ? 'open' : 'close')}
                                onClick={() => handleClickParent(menu)}
                            >
                                <ListItemIcon>
                                    <img alt="" src={`/assets/img/layout/${menu.key}.svg`} />
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                            {menu && menu.children && menu.children.length && (
                                <Collapse in={expandedMenu && expandedMenu.key === menu.key} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {menu.children.map((menuChild) => (
                                            <ListItem
                                                button
                                                key={menuChild.key}
                                                className={classes.menuChildItem}
                                                onClick={() => handleClickChild(menuChild)}
                                            >
                                                <ListItemText primary={menuChild.label} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </List>
            </Drawer>
        );
    };

    return (
        <div className={classes.root}>
            {Header()}
            {Sidebar()}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
