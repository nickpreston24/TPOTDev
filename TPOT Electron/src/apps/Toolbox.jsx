import Loadable from "react-loadable";
import React, { Fragment, Component } from 'react';
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Loading } from '../presentation/Loading';
import { compose } from 'recompose'
import ModalLoad from '../presentation/ModalLoad'
import 'typeface-roboto';

const Dashboard = Loadable({ loader: () => import('../container/Dashboard'), loading: Loading, });

window.require('electron-react-devtools').install() // Works, but resets (IS IT SLOWING THINGS DOWN!!!!)
// window.require('devtron').install() // Not Working ATM

const styles = theme => ({
    root: {
        background: theme.palette.background.default,
        justifyContent: 'flex-start',
        flexFlow: 'column nowrap',
        display: 'flex',
        height: '100vh',
        width: '100vw',
    },
})

// : Main Class with Settings
export const Toolbox = compose(
    inject('settingsStore'),
    observer
)(({ settingsStore }) => {
    const { theme } = settingsStore
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <RoutedApp />
            </MuiThemeProvider>
        </BrowserRouter>
    )
})

// : Subclass with Routes & Redirect
@withStyles(styles)
@withRouter
@observer
class RoutedApp extends Component {

    @observable loaded = false

    componentDidMount() {
        let _redirect = this.redirect
        setTimeout(() => _redirect(), 800);
    }

    @action redirect = () =>
        this.loaded = true

    render() {
        const { location, classes } = this.props
        const { loaded } = this
        return (
            <div id="Toolbox" className={classes.root}>

                <ul style={{
                    position: 'fixed', bottom: 0, left: 0, zIndex: 9999, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
                }}>
                    {window.location.pathname}
                </ul>
                <ul style={{
                    position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
                }}>
                    <li><Link to="/">/</Link></li>
                    <li><Link to="/letters">/Letters</Link></li>
                    <li><Link to="/settings">/Settings</Link></li>
                    <li><Link to="/letters/about-clean-meats">/Letters/docx</Link></li>
                    <li><Link to="/letters/about-clean-meats/publish">/Letters/docx/Publish</Link></li>
                    <li><Link to="/letters/about-clean-meats/load">/Letters/docx/Load</Link></li>
                    <li><Link to="/splash">/Splash</Link></li>
                    {/* <li><Link to="break">break</Link></li> */}
                    {/* <button onClick={switchApp}>{`${currentApp}`}</button> */}
                </ul>


                <Switch location={location}>
                    <Route path="/splash" render={() => <h1>Splash Loading...</h1>} />
                    <Route path="/" component={Dashboard} />
                    <Route render={() => <Fragment><h1>404</h1><h4>Page not found.</h4></Fragment>} />
                </Switch>
                {!loaded && <Redirect to="/splash" />}
                {loaded && <Redirect to="/" />}









            </div>
        )
    }
}


// const RoutedApp =
//     withStyles(styles)(
//         withRouter(
//             ({ location, classes }) => {
//                 return (
//                     <div id="Toolbox" className={classes.root}>
//                         <Redirect to="/splash" />
//                         <Switch location={location}>
//                             <Route exact path="/splash" render={() => <h1>Splash Loading...</h1>} />
//                             <Route path="/" component={Dashboard} />
//                             {/* <Route exact render={() => <Fragment><h1>404</h1><h4>Page not found.</h4></Fragment>} /> */}
//                         </Switch>
//                         <ModalLoad />
//                         <ul style={{
//                             position: 'fixed', bottom: 0, left: 0, zIndex: 9999, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
//                         }}>
//                             {window.location.pathname}
//                         </ul>
//                         <ul style={{
//                             position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
//                         }}>
//                             <li><Link to="/">/</Link></li>
//                             <li><Link to="/letters">/Letters</Link></li>
//                             <li><Link to="/letters/about-clean-meats.docx">/Letters/docx</Link></li>
//                             <li><Link to="/Letters/about-clean-meats.docx/publish">/Letters/docx/Publish</Link></li>
//                             <li><Link to="/splash">/Splash</Link></li>
//                             {/* <li><Link to="break">break</Link></li> */}
//                             {/* <button onClick={switchApp}>{`${currentApp}`}</button> */}
//                         </ul>
//                     </div>
//                 )
//             }
//         )
//     )


