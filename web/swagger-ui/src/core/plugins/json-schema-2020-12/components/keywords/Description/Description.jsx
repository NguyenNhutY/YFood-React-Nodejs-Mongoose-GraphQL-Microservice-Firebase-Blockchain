/**
 * @prettier
 */
import React from "react"

import { schema } from "../../../prop-types"

const Description = ({ schema }) => {
  if (!schema?.description) return null

  return (
    <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword--description">
      <div class="json-schema-2020-12-core-keyword__value json-schema-2020-12-core-keyword__value--secondary">
        {schema.description}
      </div>
    </div>
  )
}

Description.propTypes = {
  schema: schema.isRequired,
}

export default Description
