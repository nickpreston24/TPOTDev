// React
import React from 'react'
import Header from '../presentation/Header'
import Draft from '../draftjs/Draft'
import PublishScreenContainer from '../container/PublishScreenContainer';

class Letters extends React.Component {

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
        const childProps = { authUser: this.props.authUser }
        return (
            <div className="Letters">
                <Header color="primary" onUpdate={this.onUpdateHeader} editMode={this.state.editMode} {...childProps} />
                <Draft editMode={this.state.editMode} />
                <PublishScreenContainer/>
            </div>
        )
    }

}

export default Letters

