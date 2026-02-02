/**
 * @prettier
 */
import React from "react"

import { schema } from "../../prop-types"

const $schema = ({ schema }) => {
  if (!schema?.$schema) return null

  return (
    <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword--$schema">
      <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
        $schema
      </span>
      <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
        {schema.$schema}
      </span>
    </div>
  )
}

$schema.propTypes = {
  schema: schema.isRequired,
}

export default $schema
