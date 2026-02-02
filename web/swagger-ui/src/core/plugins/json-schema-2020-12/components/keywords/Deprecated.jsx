/**
 * @prettier
 */
import React from "react"

import { schema } from "../../prop-types"

const Deprecated = ({ schema }) => {
  if (schema?.deprecated !== true) return null

  return (
    <span class="json-schema-2020-12__attribute json-schema-2020-12__attribute--warning">
      deprecated
    </span>
  )
}

Deprecated.propTypes = {
  schema: schema.isRequired,
}

export default Deprecated
