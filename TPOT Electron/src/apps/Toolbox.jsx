import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import React, { Fragment } from 'react';
import Loadable from "react-loadable";
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import 'typeface-roboto';
import { Loading } from '../presentation/Loading';
import ModalLoad from '../presentation/ModalLoad'

const Dashboard = Loadable({ loader: () => import('../container/Dashboard'), loading: Loading });
// import Dashboard from '../container/Dashboard'

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

export const Toolbox =
    inject('settingsStore')(
        observer(
            ({ settingsStore }) => {
                const { theme } = settingsStore
                return (
                    <BrowserRouter>
                        <MuiThemeProvider theme={theme}>
                            <RoutedApp />
                        </MuiThemeProvider>
                    </BrowserRouter>
                )

            }
        )
    )

const RoutedApp =
    withStyles(styles)(
        withRouter(
            ({ location, classes }) => {
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
                            <li><Link to="/letters/about-clean-meats.docx">/Letters/docx</Link></li>
                            <li><Link to="/Letters/about-clean-meats.docx/publish">/Letters/docx/Publish</Link></li>
                        </ul>
                        <Switch location={location}>
                            <Route path="/:app" component={Dashboard} />
                            {/* <Route path="/splash" render={() => <h1>Splash Loading...</h1>} /> */}
                            <Route render={() => <Fragment><h1>404</h1><h4>Page not found.</h4></Fragment>} />
                        </Switch>
                        <ModalLoad />
                    </div>
                )
            }
        )
    )


