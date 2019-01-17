import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import { withSnackbar, SnackbarProvider } from 'notistack';
import { inject, observer } from "mobx-react";
import { Button } from '@material-ui/core'

const styles = {
    root: {
        // css atrributes
    },
};

const Notifier = (props) => {
    const notification = props.lettersStore.notification
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={2000}
            disableWindowBlurListener
        // action={[ <Button color="secondary" size="small"> Alert </Button> ]}
        >
            <Fragment>
                {notification && (< Dispatcher notification={notification} />)}
            </Fragment>
        </SnackbarProvider>
    )
}

const Dispatcher = withSnackbar((props) => {
    const { enqueueSnackbar } = props
    const data = JSON.parse(props.notification.data)
    const { message, config } = data
    enqueueSnackbar(message, {
        ...config,
        action: <Button size="small" color="inherit">Dismiss</Button>,
    })
    return null
})

export default compose(
    inject("lettersStore"),
    withStyles(styles),
    observer
)(Notifier);