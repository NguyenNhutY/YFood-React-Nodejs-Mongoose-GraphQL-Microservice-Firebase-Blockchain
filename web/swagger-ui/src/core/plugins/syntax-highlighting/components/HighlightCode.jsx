/**
 * @prettier
 */
import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import classs from "classs"
import saveAs from "js-file-download"
import { CopyToClipboard } from "react-copy-to-clipboard"

const HighlightCode = ({
  fileName = "response.txt",
  class,
  downloadable,
  getComponent,
  canCopy,
  language,
  children,
}) => {
  const rootRef = useRef(null)
  const SyntaxHighlighter = getComponent("SyntaxHighlighter", true)

  const handleDownload = () => {
    saveAs(children, fileName)
  }

  const handlePreventYScrollingBeyondElement = (e) => {
    const { target, deltaY } = e
    const {
      scrollHeight: contentHeight,
      offsetHeight: visibleHeight,
      scrollTop,
    } = target
    const scrollOffset = visibleHeight + scrollTop
    const isElementScrollable = contentHeight > visibleHeight
    const isScrollingPastTop = scrollTop === 0 && deltaY < 0
    const isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0

    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    const childNodes = Array.from(rootRef.current.childNodes).filter(
      (node) => !!node.nodeType && node.classList.contains("microlight")
    )

    // eslint-disable-next-line no-use-before-define
    childNodes.forEach((node) =>
      node.addEventListener(
        "mousewheel",
        handlePreventYScrollingBeyondElement,
        { passive: false }
      )
    )

    return () => {
      // eslint-disable-next-line no-use-before-define
      childNodes.forEach((node) =>
        node.removeEventListener(
          "mousewheel",
          handlePreventYScrollingBeyondElement
        )
      )
    }
  }, [children, class, language])

  return (
    <div class="highlight-code" ref={rootRef}>
      {canCopy && (
        <div class="copy-to-clipboard">
          <CopyToClipboard text={children}>
            <button />
          </CopyToClipboard>
        </div>
      )}

      {!downloadable ? null : (
        <button class="download-contents" onClick={handleDownload}>
          Download
        </button>
      )}

      <SyntaxHighlighter
        language={language}
        class={classs(class, "microlight")}
        renderPlainText={({ children, PlainTextViewer }) => (
          <PlainTextViewer class={class}>{children}</PlainTextViewer>
        )}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

HighlightCode.propTypes = {
  getComponent: PropTypes.func.isRequired,
  class: PropTypes.string,
  downloadable: PropTypes.bool,
  fileName: PropTypes.string,
  language: PropTypes.string,
  canCopy: PropTypes.bool,
  children: PropTypes.string.isRequired,
}

export default HighlightCode
