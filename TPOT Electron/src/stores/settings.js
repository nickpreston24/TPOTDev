import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { observable, action, decorate, runInAction, computed } from 'mobx'
import { db, auth, firebase } from '../firebase'

class SettingsStore {

    themeData = {
        palette: {
            // primary: {
            //     light: '#ff867c',
            //     main: '#ef5350',
            //     // dark: '#CC3333',
            //     medium: '#d23140',
            //     dark: '#b61827',
            //     contrastText: '#fff',
            // },
            primary: {
                light: '#4dabf5',
                main: '#2196f3',
                // dark: '#CC3333',
                medium: '#d23140',
                dark: '#1769aa',
                contrastText: '#fff',
            },
            secondary: {
                light: '#484b5b',
                main: '#343745',
                dark: '#272934',
                contrastText: '#fff',
                textLight: '#FFFFFF',
                textMain: '#A7AAB8',
                textDark: '#C2C6D7',
            },
            darkmode: {
                light: '#484b5b',
                main: '#343745',
                dark: '#272934',
                contrastText: '#fff',
                textLight: '#FFFFFF',
                textMain: '#A7AAB8',
                textDark: '#C2C6D7',
            },
            type: 'light',
            accent: "dodgerblue"
        },
        status: {
            danger: 'orange',
            warning: '#deb15b',
            ready: '#98C379',
        },
        // overrides: {
        //   MuiStepper: { // Name of the component ⚛️ / style sheet
        //     root: { // Name of the rule
        //       // color: "blue",
        //     },
        //   },
        typography: {
            useNextVariants: true,
        },
    }

    get theme() {
        return createMuiTheme(this.themeData)
    }

    setKey = (key, value) => {
        this.theme.palette[key] = value
    }

    setThemeData = (key, value) =>
        this.themeData.palette[key] = value
}

export default decorate(
    SettingsStore, {
        theme: computed,
        themeData: observable,
        setKey: action,
        setThemeData: action,
    })