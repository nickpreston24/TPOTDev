import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Icon from 'mdi-material-ui/LinkVariant'

const styles = theme => ({
    root: {
        background: '#e9f4ff',
        borderRadius: 6,
        paddingRight: 6,
        color: '#5e93c5',
        '& span, svg': {
            background: '#e9f4ff',
            color: '#5e93c5',
        },
        '&:hover *, &:focus *': {
            color: '#7eadda',
            cursor: 'pointer',
        },
    },
    span: {
        borderBottom: '1px dotted #5e93c5',
        textIndent: 24,
    },
    icon: {
        fontSize: 20,
        transform: 'translateY(4px)',
        marginRight: 4,
        marginLeft: 2,
        // '&::before': {
        //     content: "'\\1F517'",
        //     filter: 'drop-shadow(1px 1px 0.5px #000)',
        //     textDecoration: 'unset',
        // },
    }


    // .draftJsLinkPlugin__link__2ittM, .draftJsLinkPlugin__link__2ittM:visited {
    //     color: #5e93c5 !important;
    //     text-decoration: none;
    //   }

    //   .draftJsLinkPlugin__link__2ittM:hover, .draftJsLinkPlugin__link__2ittM:focus {
    //     color: #7eadda !important;
    //     outline: 0; /* reset for :focus */
    //     cursor: pointer;
    //   }

    //   .draftJsLinkPlugin__link__2ittM:active {
    //     color: #4a7bab !important;
    //   }



});

const LinkSpan = (props) => {
    console.log(props)
    return (
        <span className={props.classes.root}>
            <Fragment>
                <Icon className={props.classes.icon}/>
                <span className={props.classes.span} children={props.children} />
            </Fragment>
        </span>
    )
};

export default withStyles(styles)(LinkSpan)