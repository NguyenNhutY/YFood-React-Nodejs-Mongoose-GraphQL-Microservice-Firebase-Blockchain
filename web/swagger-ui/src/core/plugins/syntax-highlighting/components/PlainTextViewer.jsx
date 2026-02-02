/**
 * @prettier
 */
import React from "react"
import PropTypes from "prop-types"
import classs from "classs"

const PlainTextViewer = ({ class = "", children }) => (
  <pre class={classs("microlight", class)}>{children}</pre>
)

PlainTextViewer.propTypes = {
  class: PropTypes.string,
  children: PropTypes.string.isRequired,
}

export default PlainTextViewer
