import PropTypes from "prop-types";
import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { Button, SvgIcon } from "@material-ui/core";
import classNames from 'classnames'
import ToolboxIcon from '../media/tpot_icon.png'
import ToolboxIconWide from '../media/toolbox_banner.png'

// import { ContentSaveOutline, FolderOpen } from 'mdi-material-ui'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSlidersH, faLaptop, faTv, faGlasses, } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen, faPaperPlane, faEnvelope, faEdit, faSave, faWindowRestore, faHdd, faPlusSquare, faFileAlt, faTrashAlt, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'
import OSTitleBar from "./OSTitleBar";
import { SidebarBadge } from "./SidebarBadge";

const styles = theme => ({
    root: {
        // background: '#28303d',
        background: theme.palette.background.paper,
        minWidth: 120,
        maxWidth: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'all 0.35s ease-in-out',
        boxSizing: 'border-box',
        borderRight: `1px solid ${theme.palette.text.disabled}`,
        overflow: 'hidden',
        // border: '1px solid lime'
    },
    compact: {
        minWidth: 70,
        maxWidth: 70,
    },
    expanded: {
        minWidth: 260,
        maxWidth: 260,
    },
    logo: {
        margin: theme.spacing.unit * 2.5,
        minHeight: 30,
        minWidth: 30,
        cursor: 'pointer'
    },
    navButton: {
        boxSizing: 'border-box',
        width: '100%',
        padding: 0,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 400,
        padding: '15px 30px',
        color: theme.palette.text.secondary,
        // '&:hover': { color: theme.palette.primary.main, '&:hover *': { color: theme.palette.primary.main }},
        '&:hover.amber': { color: '#f9843f', '&:hover .amber': { color: '#f9843f' } },
        '&:hover.rose': { color: '#f52266', '&:hover .rose': { color: '#f52266' } },
        '&:hover.gold': { color: '#ffbc00', '&:hover .gold': { color: '#ffbc00' } },
        '&:hover.teal': { color: '#20cdde', '&:hover .teal': { color: '#20cdde' } },
        '&:hover.blue': { color: '#1e90ff', '&:hover .blue': { color: '#1e90ff' } },
        '&:hover.plum': { color: '#be33f7', '&:hover .plum': { color: '#be33f7' } },
        '&:hover.mint': { color: '#19e180', '&:hover .mint': { color: '#19e180' } },
    },
    nabButtonLabel: {
        '& svg': {
            color: theme.palette.text.primary,
            minHeight: 30,
            minWidth: 30,
            marginRight: 15,
        },
    }
})

const appsSidebarButtonsConfig = [
    {
        primaryText: 'Save',
        secondaryText: 'Save File to Disk',
        icon: faSave,
        color: 'teal'
    },
    {
        primaryText: 'Load',
        secondaryText: 'Open DocX from Source',
        icon: faHdd,
        color: 'amber'
    },
    {
        primaryText: 'Drafts',
        secondaryText: 'Load Autosaved File',
        icon: faEnvelopeOpen,
        color: 'gold'
    },
    {
        primaryText: 'Publish',
        secondaryText: 'Publish Page to TPOT',
        icon: faPaperPlane,
        color: 'mint'
    },
    {
        primaryText: 'Preview',
        secondaryText: 'Previw Page in Browser',
        icon: faGlasses,
        color: 'plum'
    },
    {
        primaryText: 'Clear',
        secondaryText: 'Create a Fresh Post',
        icon: faTrashAlt,
        color: 'rose'
    },
    {
        primaryText: 'Settings',
        secondaryText: 'Adjust Toolbox Preferences',
        icon: faSlidersH,
        color: 'none'
    },
]

const Sidebar = observer((props) => {
    const { classes, variant, color } = props
    const { sidebarVariant, toggleSidebarVariant } = props.settingsStore
    return (
        <div id="Sidebar" className={classNames(classes.root, sidebarVariant && classes[sidebarVariant])}>
            {/* <OSTitleBar /> */}
            {/* <img onClick={() => toggleSidebarVariant()} className={classes.logo} src={sidebarVariant === 'compact' ? ToolboxIcon : ToolboxIconWide} alt="ToolboxLogo" /> */}
            <SidebarBadge />
            <AppButtons {...{ config: appsSidebarButtonsConfig, classes, variant: sidebarVariant }} />
        </div>
    )
})

const AppButtons = observer(({ config, classes, variant }) => (
    <Fragment>
                {config.map((data) => (
            <NavButton {...{ classes, data, variant }}></NavButton>
        ))}
    </Fragment>
))

export const NavButton = observer(({ data, classes, variant }) => (
    // <div id={`NavButton-${data.primaryText}`} className={classNames(classes.navButton, data.color)}>
    <Button
        id={`NavButton-${data.primaryText}`}
        className={classNames(classes.navButton, data.color)}
        classes={{ label: classes.nabButtonLabel }}
    >
        {/* {data.icon && <data.icon />} */}
        <FontAwesomeIcon icon={data.icon} size="1g" className={data.color} />
        {variant === 'expanded' && <span>{data.primaryText}{classes.navButton.color}</span>}
    </Button>
    // </div>
))

Sidebar.propTypes = {
    variant: PropTypes.string.isRequired,
};

export default compose(
    withStyles(styles),
    inject('settingsStore'),
    observer
)(Sidebar)