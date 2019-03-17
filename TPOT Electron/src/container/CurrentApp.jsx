import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Loading } from '../presentation/Loading';
import Loadable from "react-loadable";
import Header from '../presentation/Header';
import Notifier from '../container/Notifier';

const Letters = Loadable({ loader: () => import('../apps/Letters'), loading: Loading, });
// Letters.preload()

const styles = theme => ({
    root: {
        // justifyContent: 'flex-start',
        flexFlow: 'column nowrap',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
    },
    currentApp: {
        // border: '4px solid orange !important',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        flex: 1,
        // display: 'flex',
        // flexGrow: 1,
    },
})

@inject('store')
@withStyles(styles)
@observer
export class CurrentApp extends Component {

    @observable apps = {
        welcome: () => <h1>Getting Started</h1>,
        letters: Letters,
        settings: () => <h1>Settings</h1>
    }

    @action switchApp = () =>
        this.apps = null

    render() {
        const { store, classes, location, match, history } = this.props
        const { switchApp, currentApp, apps } = this
        // console.log("PATH", match.path, match.params)
        return (
            <div id="Content" className={classes.root}>
                <Header id="Header" style={{ background: '#3e4552 !important' }} />
                {/* <Toolbar id="Header" style={{maxHeight: '10px !important', overflow: 'hidden'}} /> */}
                <div id="Current App" className={classes.currentApp}>
                    {/* <div id="Modal"
                        style={{
                            height: 'calc(100% - 75px)',
                            width: 'calc(100% - 260px)',
                            pointerEvents: 'none',
                            position: 'absolute',
                            zIndex: 1,
                            // border: '2px solid blue'
                        }}
                    ><Loading /></div> */}
                    <Switch location={location}>
                        {/* <Route exact path={`${match.path}`} render={apps.welcome} /> */}
                        <Route path={`${match.path}`} render={
                            ({ match }) => (
                                <Route path={`${match.path}:app`} children={
                                    ({ location, match }) => {
                                        const appRoute = match ? match.params.app : null
                                        const App = appRoute ? apps[appRoute] : apps.welcome // console.log(App)
                                        console.log(appRoute)
                                        return <App {...{ location, match }} />
                                    }
                                } />
                            )
                        } />
                        {/* <Route path={`/:app`} children={
                            ({ location, match }) => {
                                const appRoute = match.params.app
                                const App = appRoute ? apps[appRoute] : apps.welcome // console.log(App)
                                console.log(appRoute)
                                return <App {...{location, match}}/>
                            }
                        } /> */}
                        {/* Good */}
                        {/* <Route exact path={`${match.path}`} render={apps.welcome} />
                        <Route path={`${match.path}:app`} render={
                            ({ match }) => {
                                return (
                                    <Fragment>
                                        <h1>{match.params.app}</h1>
                                        <Route path={`${match.path}/:command`} render={
                                            ({ match }) => {
                                                return (
                                                    <h1>{match.params.command}</h1>
                                                )
                                            }
                                        } />
                                    </Fragment>
                                )
                            }
                        } /> */}
                    </Switch>
                    <Notifier />
                </div>
                {/* <ul style={{
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
                    <button onClick={switchApp}>{`${currentApp}`}</button>
                </ul> */}
            </div>
        )
    }
}
