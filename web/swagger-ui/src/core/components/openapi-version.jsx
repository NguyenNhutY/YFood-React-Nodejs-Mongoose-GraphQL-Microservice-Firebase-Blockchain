import React from "react"
import PropTypes from "prop-types"


const OpenAPIVersion = ({ oasVersion }) => (
  <small class="version-stamp">
    <pre class="version">OAS {oasVersion}</pre>
  </small>
)

OpenAPIVersion.propTypes = {
  oasVersion: PropTypes.string.isRequired
}

export default OpenAPIVersion
