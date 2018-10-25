// React
import React from 'react'
import Header from '../react/Components/Header'
import Draft from '../react/Editor/Draft'

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
        return (
            <div className="Letters">
                <Header color="primary" onUpdate={this.onUpdateHeader} editMode={this.state.editMode} />
                <Draft editMode={this.state.editMode} />
            </div>
        )
    }

}

export default Letters

