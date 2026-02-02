/**
 * @prettier
 */
import React from "react"

import { schema } from "../../prop-types"

const $anchor = ({ schema }) => {
  if (!schema?.$anchor) return null

  return (
    <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword--$anchor">
      <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
        $anchor
      </span>
      <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
        {schema.$anchor}
      </span>
    </div>
  )
}

$anchor.propTypes = {
  schema: schema.isRequired,
}

export default $anchor
