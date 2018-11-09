import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

const styles = {
    root: {
        color: "red",
        // css atrributes
    },
}

class AuthTest extends React.Component {
    render() {
        const { classes } = this.props
        const store = this.props.sessionStore
        return (
            <React.Fragment>
                <button onClick={store.setSessionName} className={classes.root}>{store.sessionName}</button>
            </React.Fragment>
        )
    }
}

export default compose(
    withStyles(styles),
    inject('sessionStore'),
    observer
)(AuthTest);