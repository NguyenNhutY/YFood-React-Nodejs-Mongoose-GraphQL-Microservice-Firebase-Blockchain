/**
 * @prettier
 */
import React from "react"
import PropTypes from "prop-types"

const DiscriminatorMapping = ({ discriminator }) => {
  const mapping = discriminator?.mapping || {}

  if (Object.keys(mapping).length === 0) {
    return null
  }

  return Object.entries(mapping).map(([key, value]) => (
    <div key={`${key}-${value}`} class="json-schema-2020-12-keyword">
      <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
        {key}
      </span>
      <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
        {value}
      </span>
    </div>
  ))
}

DiscriminatorMapping.propTypes = {
  discriminator: PropTypes.shape({
    mapping: PropTypes.any,
  }),
}

export default DiscriminatorMapping
