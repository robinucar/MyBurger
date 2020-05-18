import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from '../Layout/Layout.module.css';
import Toolbar from '../../components/Navbar/ToolBar/Toolbar';
import SideDrawer from '../../components/Navbar/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerisVisible] = useState(false);



    const sideDrawerClosedHandler = () => {
       setSideDrawerisVisible(false)
    }

     const sideDrawerToggleHandler = () => {
        setSideDrawerisVisible(!sideDrawerIsVisible)
    }


        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);