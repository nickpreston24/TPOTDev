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
        console.log(this.props)
        const { pluginprops, geteditorstate } = this.props
        const { setItem, currentEntityKey, currentEditorState, getCurrentEditorState } = this.props.store
        const { onEditorStateChange, createEntityFromDecorator } = this
        if (pluginprops) {
            // let initialEditorState = currentEditorState ? currentEditorState : 
            pluginprops.callbacks.onChange = onEditorStateChange;
            createEntityFromDecorator()
            console.log('good')
        } else {
            // console.log('ignore')
        }
    }

    // /     componentWillMount() {
    //         // this.key = genKey();
    //         if (this.props.pluginprops) {
    //             this.props.pluginprops.callbacks.onChange = this.onEditorStateChange;
    //             this.createEntityFromDecorator()
    //             console.log('good')
    //         } else {
    //             console.log('ignore')
    //         }
    //     }

    componentWillUnmount() {
        const { pluginprops } = this.props
        if (pluginprops) {
            // this.props.pluginprops.callbacks.onChange = undefined;
            // console.log('goodbye')
        } else {
            // console.log('ignorebye')
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

        const { geteditorstate, seteditorstate, entitykey, offsetkey, regex, strategy, decoratedtext } = this.props
        const { setItem, currentEntityKey, currentEditorState, getCurrentEditorState } = this.props.store
        console.group('CREATE')
        console.log(`%c[${decoratedtext}]`, `color: #68b684; background: #02501e;`)

        // * Get Block and Key from Decorator Regex, Get Content State
        // editorState = 
        // let editorState = null
        // if (getCurrentEditorState === null) {
        //     editorState = geteditorstate()
        // } else {
        //     geteditorstate()
        // }
        // editorState = !!getCurrentEditorState ? getCurrentEditorState : geteditorstate()
        // let editorState = !!getCurrentEditorState ? getCurrentEditorState : geteditorstate()
        // * GOOD
        // : get currentEditorState from store that was initialized with first editorState
        let editorState = currentEditorState
        // First time get the editorState from plugin, then mobx after that
        let selection = editorState.getSelection()
        let anchorKey = selection.getAnchorKey()
        let anchorOffset = selection.getAnchorOffset()
        let focusKey = selection.getFocusKey()
        let focusOffset = selection.getFocusOffset()

        // console.log(currentEditorState)
        console.log('Content Before: ', convertToRaw(editorState.getCurrentContent()))
        // console.log(convertToRaw(currentEditorState.getCurrentContent()))

        let contentState = editorState.getCurrentContent()
        let blockKey = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
        let block = contentState.getBlockForKey(blockKey)
        if (!block) {
            block = contentState.getBlockForKey(focusKey)
        }

        console.groupCollapsed(`%cPROPS: `, 'color: dodgerblue; background: navy;')
        for (var prop in this.props) {
            if (this.props.hasOwnProperty(prop)) {
                console.log(`%c${prop}`, 'color: dodgerblue;', this.props[prop])
            }
        }
        console.groupEnd()

        // console.log(offsetkey)
        // console.log(block)
        // console.log(block.getText())
        // console.log(block.getText().length)
        
        // console.log(convertToRaw(contentState))
        // console.log(blockKey)
        // console.log(focusKey)
        // console.log(entitykey)

        // * Component Mounted by Decorator
        if (regex) {
            console.log(regex)
            let text = block.getText();
            let regx = new RegExp(regex)

            // * Find Decorated Text in Current Block
            console.log(text)
            let match = regx.exec(text)
            console.log(match)

            let start = match ? match.index : 0
            let end = match ? match[0].length + start : 0
            console.log(start)
            console.log(end)
            console.log(blockKey)
            console.log(anchorKey)
            console.log(focusKey)

            // * Make New Selection from Regex
            let regexSelection = new SelectionState({
                anchorKey: blockKey, anchorOffset: start,
                focusKey: blockKey, focusOffset: end,
            })

            const contentState = editorState.getCurrentContent();
            console.log(regexSelection)
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: decoratedtext }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            console.log(contentStateWithEntity)
            const contentStateWithLink = Modifier.applyEntity(
                contentStateWithEntity,
                regexSelection,
                entityKey
            );
            const newEditorState = EditorState.push(editorState, contentStateWithLink, 'apply-entity');

            editorState = newEditorState

        }
        // ? Component Mounted by Existing Entity
        else {
            if (entitykey) {
                console.log('already an entity')
            }
        }

        console.log('Content After: ', convertToRaw(editorState.getCurrentContent()))

        console.groupEnd()
        // * GOOD
        // ? setItem('currentEditorState', editorState) // need to set state for next cycle to see
        // : set editorState that onChange can see
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

        // ! geteditorstate is useless

        const { geteditorstate, seteditorstate, entitykey, offsetkey, regex, decoratedtext } = this.props
        const { setItem, currentEntityKey, currentEditorState, getCurrentEditorState } = this.props.store
        console.group('UPDATE')
        console.error('editorStateChange')
        // console.log(!!getCurrentEditorState.getCurrentContent()w)
        // let editorState = !!getCurrentEditorState ? getCurrentEditorState : editorStateDefault
        // : Get editorState from OnChange
        console.log('editorState',convertToRaw(editorState.getCurrentContent()))
        // !! USELESS: console.log('geteditorstate()',convertToRaw(geteditorstate().getCurrentContent()))
        console.log('currentEditorState',convertToRaw(currentEditorState.getCurrentContent()))
        console.log('getCurrentEditorState',convertToRaw(getCurrentEditorState.getCurrentContent()))


        // * Create a Random Key to force MobX Renders on every onEditorStateChange
        let randomKey = new Date()



        let currentSelectionKey = null


        // let newEditorState = EditorState.push(editorStateDefault, editorState.getCurrentContent(), editorState.getLastChangeType())
        // * Set Selection Key or Randomize, Set Final EditorState
        console.groupEnd()
        setItem('currentEntityKey', currentSelectionKey ? currentSelectionKey : randomKey)
        // : Return editorState to onChange (will update both currentEditorState and editorState)
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

        const { geteditorstate, seteditorstate, children, classes, entitykey, offsetkey, regex, decoratedtext } = this.props
        const { setItem, currentEntityKey, getCurrentEditorState, currentEditorState } = this.props.store
        console.group('RENDER')
        console.warn(this.props.children[0].props.text)

        // * GOOD
        console.log('Rendered Content: ', convertToRaw(currentEditorState.getCurrentContent()))
        console.log('Rendered Content: ', convertToRaw(geteditorstate().getCurrentContent()))

        let editing = false

        console.groupEnd()

        return (
            <span key={currentEntityKey} className={classNames(classes.root, editing ? classes.editing : null)} >
                <Fragment>
                    <Icon className={classes.icon} />
                    <span className={classes.span} children={children} />
                </Fragment>
            </span>
        )
    }
};


// export default withStyles(styles)(LinkSpan)

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