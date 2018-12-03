import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import { withSnackbar, SnackbarProvider } from 'notistack';
import { inject, observer } from "mobx-react";

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
        >
            {notification && (< Dispatcher notification={notification} />)}
        </SnackbarProvider>
    )
}

const Dispatcher = withSnackbar((props) => {
    const { enqueueSnackbar } = props
    const data = JSON.parse(props.notification.data)
    const { message, config } = data
    enqueueSnackbar(message, config)
    return (<noscript />)
})

export default compose(
    inject("lettersStore"),
    withStyles(styles),
    observer
)(Notifier);