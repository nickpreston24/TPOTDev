import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { RichUtils, EditorState, SelectionState, Entity, Modifier, convertToRaw } from 'draft-js';
import Icon from 'mdi-material-ui/LinkVariant'
import { networkOnly } from 'sw-toolbox';
import { compose } from 'recompose';
import DraftUtils from 'draftjs-utils'
import { inject, observer } from 'mobx-react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { toJS } from 'mobx';

const styles = theme => ({
    root: {
        overflow: 'hidden',
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
    editing: {
        background: '#d0e1f3',
        '& span, svg': {
            background: '#d0e1f3',
            color: '#7eadda',
        }
    },
    warning: {
        background: '#fdf1d0',
        '& span, svg': {
            background: '#fdf1d0',
            color: '#c5995e',
        }
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
});

class LinkSpan extends Component {

    componentWillMount() {
        if (this.props.pluginprops) {
            this.props.pluginprops.callbacks.onChange = this.onEditorStateChange;
            this.createEntityFromDecorator()
        }
    }

    componentWillUnmount() {
        if (this.pluginprops) {
            // : Needed?
            this.props.pluginprops.callbacks.onChange = undefined;
        }
    }

    /*
     
       .oooooo.                                    .             
      d8P'  `Y8b                                 .o8             
     888          oooo d8b  .ooooo.   .oooo.   .o888oo  .ooooo.  
     888          `888""8P d88' `88b `P  )88b    888   d88' `88b 
     888           888     888ooo888  .oP"888    888   888ooo888 
     `88b    ooo   888     888    .o d8(  888    888 . 888    .o 
      `Y8bood8P'  d888b    `Y8bod8P' `Y888""8o   "888" `Y8bod8P' 
                                                                 
                                                                 
                                                                 
     
    */

    createEntityFromDecorator = () => {

        const { seteditorstate, entitykey, offsetkey, regex, strategy, decoratedtext } = this.props
        const { currentEditorState } = this.props.store
        console.group('CREATE')
        console.log(`%c[${decoratedtext}]`, `color: #68b684; background: #02501e;`)

        // : get currentEditorState from store that was initialized with first editorState
        let editorState = currentEditorState
        let contentState = editorState.getCurrentContent()
        let selection = editorState.getSelection()
        let focusKey = selection.getFocusKey()

        // : Get Block and Key from Decorator Regex, Get Content State
        let blockKey = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
        let block = contentState.getBlockForKey(blockKey)
        if (!block) {
            block = contentState.getBlockForKey(focusKey)
        }

        // : Component Mounted by Decorator
        if (regex) {

            // : Find Decorated Text in Current Block
            let text = block.getText();
            let regx = new RegExp(regex)
            let match = regx.exec(text)
            let start = match ? match.index : 0
            let end = match ? match[0].length + start : 0
            console.log(match)
            console.log(decoratedtext)

            // : If there is a Regex Match 
            // TODO - Support for multiple decorator generator entities found on block and their selection range
            if (match && decoratedtext === match[0]) {

                // : Make New Selection from Regex
                let regexSelection = new SelectionState({ anchorKey: blockKey, anchorOffset: start, focusKey: blockKey, focusOffset: end, })

                // : Create Entity in Content State
                contentState = contentState.createEntity('LINK', 'MUTABLE', { url: decoratedtext });
                let lastEntityKey = contentState.getLastCreatedEntityKey();

                // : Modify contentState with Entity Data
                contentState = Modifier.applyEntity(contentState, regexSelection, lastEntityKey);

                // : Apply Entity to editorState
                editorState = EditorState.push(editorState, contentState, 'undo');

                // : Create Collapsed Selection at Entity End
                let collapsedSelection = new SelectionState({ anchorKey: blockKey, anchorOffset: end, focusKey: blockKey, focusOffset: end, })

                // : Apply Selectlion to editorState
                editorState = EditorState.forceSelection(editorState, collapsedSelection)

            } else {
                console.log('No Match')
            }

        } else {

            // : Component Mounted by Existing Entity
            if (entitykey) {
                console.log('Already an Entity')
            } else {
                console.error('Unknown Decorator')
            }
        }

        // // console.log('Content After: ', convertToRaw(editorState.getCurrentContent()))

        // setItem('currentEditorState', editorState) // need to set state for next cycle to see

        // : set editorState that onChange can see
        console.groupEnd()
        seteditorstate(editorState)

    }

    /*
     
     ooooo     ooo                  .o8                .             
     `888'     `8'                 "888              .o8             
      888       8  oo.ooooo.   .oooo888   .oooo.   .o888oo  .ooooo.  
      888       8   888' `88b d88' `888  `P  )88b    888   d88' `88b 
      888       8   888   888 888   888   .oP"888    888   888ooo888 
      `88.    .8'   888   888 888   888  d8(  888    888 . 888    .o 
        `YbodP'     888bod8P' `Y8bod88P" `Y888""8o   "888" `Y8bod8P' 
                    888                                              
                   o888o                                             
                                                                     
     
    */

    onEditorStateChange = (editorState) => {

        const { setItem, currentEditorState } = this.props.store
        console.group('UPDATE')
        console.error('editorStateChange')

        // : Use editorState from OnChange
        let contentState = editorState.getCurrentContent()
        let selection = editorState.getSelection()
        let focusKey = selection.getFocusKey()
        let focusOffset = selection.getFocusOffset()
        let anchorKey = selection.getAnchorKey()
        let anchorOffset = selection.getAnchorOffset()

        // : Create a Random Key to force MobX Renders on every onEditorStateChange
        let randomKey = new Date()
        let currentSelectionKey = 'www.thepathoftruth.com'

        // : Bump and Shift Selection to See if we are in an Entity
        const block = contentState.getBlockForKey(focusKey)
        let entityKeyAtSelectionEnd = block.getEntityAt(focusOffset)
        if (!entityKeyAtSelectionEnd) {
            entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 1)
        }
        if (!entityKeyAtSelectionEnd) {
            entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 2)
        }
        let entityKeyAtSelectionStart = block.getEntityAt(anchorOffset)

        // : User's Selection is inside an Entity Now!
        if (entityKeyAtSelectionStart || entityKeyAtSelectionEnd) {

            console.log('Inside Entity', true)
            // : Get and Check and Set Current Key and Entity
            let currentKey = !!entityKeyAtSelectionStart ? entityKeyAtSelectionStart : entityKeyAtSelectionEnd
            let currentEntity = contentState.getEntity(currentKey)
            setItem('currentEntityKey', currentKey)
            console.log(currentKey)

            // : Get Entity Text and Ranges
            let blockText = block.getText()
            let { start, end } = (() => {
                let _ = {}
                block.findEntityRanges(
                    (value) => { return currentKey === value.getEntity() },
                    (start, end) => { _.start = start, _.end = end },
                )
                return _
            })()

            // : Capture string of entity range with characters before and after and add to entity
            let captureStart = start === 0 ? 0 : start - 1
            let captureEnd = end > blockText.length ? blockText.length : end + 1
            let captureText = blockText.slice(captureStart, captureEnd)

            // TODO: Force selection into entity range
            let insertPoint = focusOffset > captureStart ? focusOffset : focusOffset < captureStart ? focusOffset : focusOffset > captureEnd ? focusOffset : focusOffset < captureEnd ? focusOffset : anchorOffset

            // : Create Collapsed Selection at insertPoint
            const insertSelection = new SelectionState({
                anchorKey: focusKey, anchorOffset: insertPoint,
                focusKey: focusKey, focusOffset: insertPoint,
            });

            // : Apply Selection to prevent breaking Entity title and URL
            // TODO - Eventually only the URL decorator will need this protection. Existing Entities self-manage
            editorState = EditorState.forceSelection(editorState, insertSelection);



            // TODO Does Text Around Entity Need Updated?

            // TODO Find Text around Entity

            // TODO Update State and Entity Data URL


        }


        // : Create New Editor State
        let newEntityState = (() => {
            return EditorState.push(editorState, editorState.getCurrentContent(), editorState.getLastChangeType())
        })()

        // : Set Selection Key or Randomize, Set Final EditorState
        // // ! setItem('currentEntityKey', currentSelectionKey ? currentSelectionKey : randomKey)

        // : Return editorState to onChange (will update both currentEditorState and editorState)
        console.groupEnd()
        return editorState
    }

    /*
     
     ooooooooo.                               .o8                     
     `888   `Y88.                            "888                     
      888   .d88'  .ooooo.  ooo. .oo.    .oooo888   .ooooo.  oooo d8b 
      888ooo88P'  d88' `88b `888P"Y88b  d88' `888  d88' `88b `888""8P 
      888`88b.    888ooo888  888   888  888   888  888ooo888  888     
      888  `88b.  888    .o  888   888  888   888  888    .o  888     
     o888o  o888o `Y8bod8P' o888o o888o `Y8bod88P" `Y8bod8P' d888b    
                                                                      
                                                                      
                                                                      
     
    */

    render() {

        const { geteditorstate, children, classes, entitykey, offsetkey, regex } = this.props
        const { currentEntityKey, currentEditorState } = this.props.store
        console.group('RENDER')
        console.warn(this.props.children[0].props.text)

        // : Any change here will go to next render cycle. Focus on
        // : evaluating render conditions based upon current state.
        let editing = false
        if (entitykey) {
            // console.log(entitykey)
            // console.log('Rendered Content: ', convertToRaw(geteditorstate().getCurrentContent()))
            // console.log('Rendered Content: ', convertToRaw(currentEditorState.getCurrentContent()))

            // : This Entity Instance is Currently Editable
            if (currentEntityKey === entitykey) {

                // : Get Entity Text and Ranges
                let editorState = geteditorstate()
                let contentState = editorState.getCurrentContent()

                // : Get Entity Text and Ranges
                let blockKey = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
                let block = contentState.getBlockForKey(blockKey)
                let blockText = block.getText()
                let { start, end } = (() => {
                    let _ = {}
                    block.findEntityRanges(
                        (value) => { return entitykey === value.getEntity() },
                        (start, end) => { _.start = start, _.end = end },
                    )
                    return _
                })()

                // : Capture string of entity range with characters before and after and add to entity
                let captureStart = start === 0 ? 0 : start - 1
                let captureEnd = end > blockText.length ? blockText.length : end + 1
                let captureText = blockText.slice(captureStart, captureEnd)

                // : Shift and Bump Selection around Ranges    
                let selection = editorState.getSelection()
                let focusKey = selection.getFocusKey()
                let focusOffset = selection.getFocusOffset()

                // : Set Final Editing State for UI Feedback
                editing = captureStart < focusOffset && focusOffset < captureEnd && focusKey === blockKey

                // console.log(insertPoint)
                // console.log(anchorOffset, focusOffset)
                // console.log(captureStart, captureEnd)

            }
        } else {

            // : Component is Rendered, but there is no Entity (ex: un-doing a decorated added entry)
            // TODO - Prevent only initially converted decorator entities from being undone, but not later ones
            // ! this.createEntityFromDecorator()
        }


        // : Other Rendering Prep Operations, if any


        // : Render based upon the current editorState
        console.groupEnd()

        return (
            <span className={classNames(classes.root, editing && classes.editing, !entitykey && classes.warning)} >
                <Fragment>
                    <Icon className={classes.icon} />
                    <span className={classes.span} children={children} />
                </Fragment>
            </span>
        )
    }
};

LinkSpan.propTypes = {
    store: PropTypes.object.isRequired,
};

export default compose(
    inject('store'),
    withStyles(styles),
    observer
)(LinkSpan)





/*

   .oooooo.   oooo        .o8
  d8P'  `Y8b  `888       "888
 888      888  888   .oooo888
 888      888  888  d88' `888
 888      888  888  888   888
 `88b    d88'  888  888   888
  `Y8bood8P'  o888o `Y8bod88P"




*/


// class LinkSpan extends Component {

//     componentWillMount() {
//         // this.key = genKey();
//         if (this.props.pluginprops) {
//             this.props.pluginprops.callbacks.onChange = this.onEditorStateChange;
//             this.createEntityFromDecorator()
//             console.log('good')
//         } else {
//             console.log('ignore')
//         }
//     }

//     componentWillUnmount() {
//         // this.key = genKey();
//         if (this.props.pluginprops) {
//             // this.props.pluginprops.callbacks.onChange = undefined;
//             console.log('goodbye')
//         } else {
//             console.log('ignorebye')
//         }
//     }

//     createEntityFromDecorator = () => {
//         console.group('CREATE')

//         const { geteditorstate, seteditorstate, entitykey, offsetkey, regex, strategy, decoratedtext } = this.props
//         const { setItem, currentEntityKey } = this.props.store
//         let editorState = geteditorstate()
//         const contentState = editorState.getCurrentContent()
//         const blockKey = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
//         const block = contentState.getBlockForKey(blockKey)
//         CURBLOCK = blockKey

//         // *
//         // console.log('block', block)
//         // console.log('blockKey', blockKey)
//         // console.log(entitykey, offsetkey)

//         const TEXT = block.getText();
//         const REGX = new RegExp(regex)
//         const match = REGX.exec(TEXT)
//         const start = match ? match.index : 0
//         const end = match ? match[0].length + start : 0
//         //*
//         // console.log(match)
//         // console.log(start)
//         // console.log(end)
//         var selection = new SelectionState({
//             anchorKey: blockKey, anchorOffset: start,
//             focusKey: blockKey, focusOffset: end,
//         })
//         //*
//         // console.log(selection)
//         // console.log('selectionCollapsed?', selection.isCollapsed())
//         const hasEntity = block.getEntityAt(start)
//         //*
//         // console.log('hasEntityAtStart?', hasEntity)

//         const contentStateWithEntity = contentState.createEntity(
//             'LINK',
//             'MUTABLE',
//             { url: strategy === 'Decorator' ? decoratedtext : match[0] }
//         )
//         const lastKey = contentStateWithEntity.getLastCreatedEntityKey();
//         // setItem('currentEntityKey', lastKey)
//         // console.log(lastKey)
//         CURRENT = lastKey
//         const contentStateWithNewLink = Modifier.applyEntity(
//             contentStateWithEntity,
//             selection,
//             lastKey
//         );

//         // * Apply the Entity to EditorState
//         let editorStateWithEntity = EditorState.push(
//             editorState,
//             contentStateWithNewLink,
//             'apply-entity'
//         )

//         // * Replace Decorator Text with String
//         var contentStateWithReplacedText = Modifier.replaceText(
//             editorStateWithEntity.getCurrentContent(), selection,
//             strategy === 'Generic' ? decoratedtext : `${strategy ? strategy : 'default'} Link: Title`,
//             null, lastKey
//         )

//         // * Apply the Replacement to EditorState
//         let editorStateWithReplacedText = EditorState.push(
//             editorStateWithEntity,
//             contentStateWithReplacedText,
//             editorStateWithEntity.getLastChangeType()
//         )

//         var selection = new SelectionState({
//             anchorKey: blockKey, anchorOffset: start,
//             focusKey: blockKey, focusOffset: end,
//         })

//         const newSelection = new SelectionState({
//             anchorKey: blockKey, anchorOffset: end,
//             focusKey: blockKey, focusOffset: end,
//         });
//         editorState = EditorState.forceSelection(editorStateWithReplacedText, newSelection);

//         // * Final Result to Push to onChange
//         // editorState = editorStateWithReplacedText

//         console.log(decoratedtext)

//         console.groupEnd()

//         seteditorstate(editorState)

//     }

//     onEditorStateChange = (editorState) => {

//         console.group('change')

//         const { geteditorstate, seteditorstate, entitykey, offsetkey, regex, decoratedtext } = this.props
//         const { setItem, currentEntityKey } = this.props.store

//         // * Update URL only on Default Decorator Links to Match current Entity Text
//         // console.error('spanEdit')
//         // console.log(regex)
//         // * Figure out if we are in an Entity
//         // ? If we are not, return editorState right away.
//         let selectionEntity = DraftUtils.getSelectionEntity(editorState)
//         console.log('selectionEntity', selectionEntity)

//         const contentState = editorState.getCurrentContent()
//         let selection = editorState.getSelection()
//         let focusKey = selection.getFocusKey()
//         let anchorOffset = selection.getAnchorOffset()
//         let offsetKeyTrim = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
//         let focusOffset = selection.getFocusOffset()
//         const block = contentState.getBlockForKey(focusKey)
//         // * Bump and shift selection to pay attention to characters around entity range
//         let entityKeyAtSelectionEnd = block.getEntityAt(focusOffset)
//         if (!entityKeyAtSelectionEnd) {
//             entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 1)
//         }
//         if (!entityKeyAtSelectionEnd) {
//             entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 2)
//         }
//         let entityKeyAtSelectionStart = block.getEntityAt(anchorOffset)
//         // if (!entityKeyAtSelectionStart) {
//         //     entityKeyAtSelectionStart = block.getEntityAt(anchorOffset + 1)
//         // }
//         // if (!entityKeyAtSelectionStart) {
//         //     entityKeyAtSelectionStart = block.getEntityAt(anchorOffset - 2)
//         // }
//         // if (!entityKeyAtSelectionEnd) {return editorState}
//         // if (!entityKeyAtSelectionEnd) {
//         //     entityKeyAtSelectionEnd = block.getEntityAt(focusOffset + 1)
//         // }
//         //*
//         // console.log('textAvail', block.getText())
//         // console.log('entitykey', entitykey)
//         // console.log('focusKey', focusKey)
//         // console.log('focusOffset', focusOffset)
//         // console.log('anchorOffset', anchorOffset)
//         // console.log('enttyBlockKey', entityKeyAtSelectionEnd)

//         if (entityKeyAtSelectionStart || entityKeyAtSelectionEnd) {
//             // * User's Selection is inside an Entity Now!
//             CURRENT = !!entityKeyAtSelectionStart ? entityKeyAtSelectionStart : entityKeyAtSelectionEnd
//             CURBLOCK = focusKey
//             let currentKey = !!entityKeyAtSelectionStart ? entityKeyAtSelectionStart : entityKeyAtSelectionEnd
//             setItem('currentEntityKey', currentKey)
//             //*
//             // console.log(currentKey, CURRENT)
//             // console.log(currentEntityKey)
//             // console.error('\tfoundEntity', CURRENT, CURBLOCK)
//             let currentEntity = contentState.getEntity(entityKeyAtSelectionEnd)
//             currentEntity = !currentEntity && contentState.getEntity(entityKeyAtSelectionStart)
//             let blockText = block.getText()
//             let entityRange = {}

//             block.findEntityRanges(
//                 (value) => {
//                     return entityKeyAtSelectionEnd === value.getEntity()
//                     // if(entityKeyAtSelectionEnd === value.getEntity()){

//                     //     console.log('value', value.getEntity())
//                     //     return true
//                     // }
//                 },
//                 (start, end) => {
//                     // linkTitle = linkTitle.slice(start, end)
//                     entityRange.start = start
//                     entityRange.end = end
//                     //*
//                     // console.log('ranges', start, end)
//                 },
//             )


//             // TODO: Capture string of entity range with characters before and after and add to entity

//             //*
//             // console.log("TEXT", blockText)
//             // console.log("TEXT", blockText.slice(entityRange.start, entityRange.end))
//             // console.log(entityRange)
//             let captureStart = entityRange.start === 0 ? 0 : entityRange.start - 1
//             let captureEnd = entityRange.end > blockText.length ? blockText.length : entityRange.end + 1
//             let linkTitle = blockText.slice(
//                 captureStart,
//                 captureEnd
//             )
//             //*
//             // console.log('len', entityRange.end - entityRange.start)
//             // console.log("TEXT", linkTitle, linkTitle.length)



//             // TODO: Force selection into entity range and collapse
//             let insertPoint = anchorOffset

//             //*
//             // console.log(insertPoint)
//             // console.log(anchorOffset, focusOffset)
//             // console.log(captureStart, captureEnd)

//             insertPoint = focusOffset > captureStart ? focusOffset : anchorOffset
//             if (insertPoint < captureEnd) {
//                 // * Create Collapsed Selection at nsertPoint
//                 const insertSelection = new SelectionState({
//                     anchorKey: focusKey, anchorOffset: insertPoint,
//                     focusKey: focusKey, focusOffset: insertPoint,
//                 });
//                 // * Apply Selection to prevent breaking Entity title and URL
//                 editorState = EditorState.forceSelection(editorState, insertSelection);
//                 // CURRENT = true
//                 //*
//                 // console.log('COLLAPSED')
//             } else {

//                 CURRENT = null
//                 CURBLOCK = null
//             }
// //*
//             // console.log(insertPoint)






//             // ! Check linkTitle to make sure it is a valid URL! 
//             // ? Both linkTitle and data.url are in sync, so they need to both be valid
//             // ? Other types of decorators have Titles separate from their URL which is 
//             // ? set on creation, or it edited with the LinkMenu or MUIToolbar.

//             let isURL = regex.test(linkTitle)

//             //*
//             // console.log(isURL)

//             // * We are a Generic Decorator

//             //*
//             // console.log('editSpan')
//             // console.log(currentEntity)
//             // console.log(focusKey)
//             // console.log(entitykey, entityKeyAtSelectionEnd)
//             // console.groupCollapsed(decoratedtext)

//             // const contentStateWithReplacedText

//             /////

//             // * Create Collapsed Selection around Entity Link Name
//             const entitySelection = new SelectionState({
//                 anchorKey: focusKey, anchorOffset: entityRange.start,
//                 focusKey: focusKey, focusOffset: entityRange.end,
//             });

//             // * Replace Decorator Text with String
//             var contentStateWithReplacedText = Modifier.replaceText(
//                 contentState,
//                 entitySelection,
//                 linkTitle,
//                 null,
//                 entityKeyAtSelectionEnd
//             )

//             // * Apply the Replacement to EditorState
//             let editorStateWithReplacedText = EditorState.push(
//                 editorState,
//                 contentStateWithReplacedText,
//                 editorState.getLastChangeType()
//             )

//             // * Update Entity Map with new URL
//             const contentStateWithNewURL = contentStateWithReplacedText.replaceEntityData(
//                 entityKeyAtSelectionEnd,
//                 { url: linkTitle }
//             )

//             // * Push Entity Map update to new EditorState
//             const editorStateWithReplacedData = EditorState.push(
//                 editorStateWithReplacedText,
//                 contentStateWithNewURL,
//                 'apply-entity'
//             )

//             // let editorState = geteditorstate()

//             // console.log(this.props)

//             // console.log(editorState)

//             // console.log(selection)
//             // console.log(convertToRaw(contentState))
//             // console.log(block)
//             // console.log(focusOffset)

//             // if (entityKeyAtSelectionEnd) {

//             // }
//             // console.groupEnd()
//             // * Create Collapsed Selection at End of Entity
//             const newSelection = new SelectionState({
//                 anchorKey: focusKey, anchorOffset: focusOffset,
//                 focusKey: focusKey, focusOffset: focusOffset,
//             });

//             // * Apply Selection to prevent breaking Entity title and URL
//             editorState = EditorState.forceSelection(editorState, newSelection);

//         } else {
//             // CURRENT = entitykey
//             setItem('currentEntityKey', 0)
//             CURRENT = null
//             CURBLOCK = null
//             //*
//             // console.error('\tNO_Entity', CURRENT)
//         }

//         console.groupEnd()

//         return editorState
//         // seteditorstate(editorState)

//     }

//     render() {
//         //*
//         console.group('RENDER_ENTITY')
//         console.warn('currentEntityKey',this.props.store.currentEntityKey)
//         console.log(this.props.pluginprops)
//         console.log(this.props.children[0].props.text)
//         // console.log(this.props.store.setItem)
//         const { classes, children } = this.props
//         const { geteditorstate, seteditorstate, entitykey, offsetkey, regex, decoratedtext } = this.props

//         let editorState = geteditorstate()
//         let contentState = editorState.getCurrentContent()
//         let selection = editorState.getSelection()
//         let focusKey = selection.getFocusKey()
//         let anchorOffset = selection.getAnchorOffset()
//         let offsetKeyTrim = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
//         let focusOffset = selection.getFocusOffset()
//         const block = contentState.getBlockForKey(focusKey)
//         // * Bump and shift selection to pay attention to characters around entity range
//         let entityKeyAtSelectionEnd = block.getEntityAt(focusOffset)
//         if (!entityKeyAtSelectionEnd) {
//             entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 1)
//         }
//         // if (!entityKeyAtSelectionEnd) {
//         //     entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 2)
//         // }
//         let entityKeyAtSelectionStart = block.getEntityAt(anchorOffset)
//         // if (!entityKeyAtSelectionStart) {
//         //     entityKeyAtSelectionStart = block.getEntityAt(anchorOffset + 1)
//         // }
//         // if (!entityKeyAtSelectionStart) {
//         //     entityKeyAtSelectionStart = block.getEntityAt(anchorOffset - 2)
//         // }
//         // if (!entityKeyAtSelectionEnd) {return editorState}
//         // if (!entityKeyAtSelectionEnd) {
//         //     entityKeyAtSelectionEnd = block.getEntityAt(focusOffset + 1)
//         // }

//         let renderedEntityKey = null
//         if (entityKeyAtSelectionStart || entityKeyAtSelectionEnd) {
//             renderedEntityKey = !!entityKeyAtSelectionStart ? entityKeyAtSelectionStart : entityKeyAtSelectionEnd
//         }



//         // const newSelection = new SelectionState({
//         //     anchorKey: focusKey, anchorOffset: focusOffset,
//         //     focusKey: focusKey, focusOffset: focusOffset,
//         // });
//         // console.error('\tcontains: ', containsLink)
//         //*
//         // console.group()
//         // console.error('\tRENDER: ', renderedEntityKey, focusKey)
//         // console.error('\tTEXT: ', block.getText())
//         // console.error('\tCURRENT: ', CURRENT, CURBLOCK)

//         let spanText = this.props.children[0].props.text
//         let entityText = block.getText()
//         block.findEntityRanges(
//             (value) => {
//                 return entityKeyAtSelectionEnd === value.getEntity()
//                 // if(entityKeyAtSelectionEnd === value.getEntity()){

//                 //     console.log('value', value.getEntity())
//                 //     return true
//                 // }
//             },
//             (start, end) => {
//                 entityText = entityText.slice(start, end)
//                 // entityRange.start = start
//                 // entityRange.end = end
//                 // console.log('ranges', start, end)
//             },
//         )
//         //*
//         // console.log('entityText', entityText, entityText.length)
//         // console.log('spanText', spanText, spanText.length)
//         // console.error('\tEK: ', entitykey, focusKey)
//         let sameBlock = CURBLOCK === focusKey
//         let sameKey = CURRENT === renderedEntityKey
//         let sameWork = sameBlock === true && sameKey === true
//         let sameText = entityText === spanText
//         // let editing = sameWork === true && sameText === true
//         let editing = renderedEntityKey === this.props.store.currentEntityKey
//         //*
//         // console.log(editing)
//         console.groupEnd()


//         // console.log(convertToRaw(this.props.geteditorstate().getCurrentContent()).blocks)
//         return (
//             <span {...this.props} key={this.props.store.currentEntityKey} className={classNames(classes.root, editing ? classes.editing : null)} >
//                 <Fragment>
//                     <Icon className={classes.icon} />
//                     <span className={classes.span} children={children} />
//                 </Fragment>
//             </span>
//         )
//     }
// };


// // export default withStyles(styles)(LinkSpan)

// LinkSpan.propTypes = {
//     store: PropTypes.object.isRequired,
// };

// export default compose(
//     inject('store'),
//     withStyles(styles),
//     observer
// )(LinkSpan)