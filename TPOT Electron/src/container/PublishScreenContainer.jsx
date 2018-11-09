import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import PublishScreen from '../presentation/PublishScreen';

class PublishScreenContainer extends Component {
    state = {
        // Properties...
    }

    render() {
        const { lettersStore: store, ...rest } = this.props
        
        return (
            <Fragment>
                <PublishScreen comments={store.publishData} store={store} {...rest} />
            </Fragment>
        )
    }
}

export default compose(
    inject('lettersStore'),
    observer
)(PublishScreenContainer)