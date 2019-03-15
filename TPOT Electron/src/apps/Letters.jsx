// React
import React, { Component } from 'react';
import PublishScreenContainer from '../container/PublishScreenContainer';
import Editor from '../editor/Editor';

class Letters extends Component {

    constructor(props) {
        super(props);

        this.state = { // set default state for App (single source of truth)
            editMode: "edited"
        }
    }

    onUpdateHeader = async (headerState) => {
        await this.setState({
            menuToggled: headerState.menuToggled,
            editMode: headerState.editMode
        })
    }

    render() {
        return (
            <div className="Letters" style={{flexGrow: 1}}>
                {/* <Header color="primary" onUpdate={this.onUpdateHeader} {...childProps} /> */}
                <Editor />
                <PublishScreenContainer/>
            </div>
        )
    }

}

export default Letters

