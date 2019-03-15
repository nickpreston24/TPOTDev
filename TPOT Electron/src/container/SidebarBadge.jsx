import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { inject } from 'mobx-react';
import React from 'react';
import ToolboxIconWide from '../media/toolbox_banner.png';
import ToolboxIcon from '../media/tpot_icon.png';

const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        width: '100%',
        marginBottom: 20,
        height: 75,
    },
    logo: {
        borderBottom: `1px solid ${theme.palette.text.disabled}`,
        padding: '11.5px 10px',
        margin: '0px 10px',
        height: 50,
        width: 200,
    },
    logoCompact: {
        paddingBottom: 20,
        height: 30,
        width: 30,
    },
});

export const SidebarBadge =
    inject('settingsStore')(
        withStyles(styles)(
            ({ classes, settingsStore }) => {
                const { sidebarVariant, toggleSidebarVariant } = settingsStore
                return (
                    <div className={classes.root} onClick={() => toggleSidebarVariant()}>
                        <img
                            alt="ToolboxLogo"
                            className={classNames(classes.logo, sidebarVariant === 'compact' && classes.logoCompact)}
                            src={sidebarVariant === 'compact' ? ToolboxIcon : ToolboxIconWide}
                        />
                    </div>
                )
            }
        )
    )