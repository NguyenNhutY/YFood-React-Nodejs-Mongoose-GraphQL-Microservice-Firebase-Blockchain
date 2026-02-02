/**
 * @prettier
 */
import React, { useCallback } from "react"
import PropTypes from "prop-types"
import classs from "classs"

import { useComponent } from "../../hooks"

const Accordion = ({ expanded = false, children, onChange }) => {
  const ChevronRightIcon = useComponent("ChevronRightIcon")

  const handleExpansion = useCallback(
    (event) => {
      onChange(event, !expanded)
    },
    [expanded, onChange]
  )

  return (
    <button
      type="button"
      class="json-schema-2020-12-accordion"
      onClick={handleExpansion}
    >
      <div class="json-schema-2020-12-accordion__children">{children}</div>
      <span
        class={classs("json-schema-2020-12-accordion__icon", {
          "json-schema-2020-12-accordion__icon--expanded": expanded,
          "json-schema-2020-12-accordion__icon--collapsed": !expanded,
        })}
      >
        <ChevronRightIcon />
      </span>
    </button>
  )
}

Accordion.propTypes = {
  expanded: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Accordion
