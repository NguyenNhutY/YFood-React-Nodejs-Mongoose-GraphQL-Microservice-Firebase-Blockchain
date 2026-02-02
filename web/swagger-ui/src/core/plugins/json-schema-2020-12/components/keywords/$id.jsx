/**
 * @prettier
 */
import React from "react"

import { schema } from "../../prop-types"

const $id = ({ schema }) => {
  if (!schema?.$id) return null

  return (
    <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword--$id">
      <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
        $id
      </span>
      <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
        {schema.$id}
      </span>
    </div>
  )
}

$id.propTypes = {
  schema: schema.isRequired,
}

export default $id
