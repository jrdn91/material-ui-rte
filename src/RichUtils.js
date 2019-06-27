import { Modifier, EditorState, RichUtils } from "draft-js"
import getCurrentlySelectedBlock from "./getCurrentlySelectedStyleBlock"

export const ALIGNMENTS = {
  CENTER: "center",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right"
}

export const ALIGNMENT_DATA_KEY = "textAlignment"

const ExtendedRichUtils = Object.assign({}, RichUtils, {
  // Largely copied from RichUtils' `toggleBlockType`
  toggleAlignment(editorState, alignment) {
    const {
      content,
      currentBlock,
      hasAtomicBlock,
      target
    } = getCurrentlySelectedBlock(editorState)

    if (hasAtomicBlock) {
      return editorState
    }

    const blockData = currentBlock.getData()
    const alignmentToSet =
      blockData && blockData.get(ALIGNMENT_DATA_KEY) === alignment
        ? undefined
        : alignment

    return EditorState.push(
      editorState,
      Modifier.mergeBlockData(content, target, {
        [ALIGNMENT_DATA_KEY]: alignmentToSet
      }),
      "change-block-data"
    )
  },

  /*
   * An extension of the default split block functionality, originally pulled from
   * https://github.com/facebook/draft-js/blob/master/src/component/handlers/edit/commands/keyCommandInsertNewline.js
   *
   * This version ensures that the text alignment is copied from the previously selected block.
   */
  splitBlock(editorState) {
    // Original split logic
    const contentState = Modifier.splitBlock(
      editorState.getCurrentContent(),
      editorState.getSelection()
    )
    const splitState = EditorState.push(
      editorState,
      contentState,
      "split-block"
    )

    // Assign alignment if previous block has alignment. Note that `currentBlock` is the block that was selected
    // before the split.
    const { currentBlock } = getCurrentlySelectedBlock(editorState)
    const alignment = currentBlock.getData().get(ALIGNMENT_DATA_KEY)
    if (alignment) {
      return ExtendedRichUtils.toggleAlignment(splitState, alignment)
    } else {
      return splitState
    }
  }
})

export default ExtendedRichUtils
