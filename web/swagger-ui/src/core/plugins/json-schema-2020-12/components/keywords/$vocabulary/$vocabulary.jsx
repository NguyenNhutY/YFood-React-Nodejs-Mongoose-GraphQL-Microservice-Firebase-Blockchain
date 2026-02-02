/**
 * @prettier
 */
import React, { useCallback, useState } from "react"
import classs from "classs"

import { schema } from "../../../prop-types"
import {
  useComponent,
  useIsExpanded,
  useIsExpandedDeeply,
} from "../../../hooks"

const $vocabulary = ({ schema }) => {
  const isExpanded = useIsExpanded()
  const isExpandedDeeply = useIsExpandedDeeply()
  const [expanded, setExpanded] = useState(isExpanded || isExpandedDeeply)
  const Accordion = useComponent("Accordion")

  const handleExpansion = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  /**
   * Rendering.
   */
  if (!schema?.$vocabulary) return null
  if (typeof schema.$vocabulary !== "object") return null

  return (
    <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword--$vocabulary">
      <Accordion expanded={expanded} onChange={handleExpansion}>
        <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
          $vocabulary
        </span>
      </Accordion>
      <strong class="json-schema-2020-12__attribute json-schema-2020-12__attribute--primary">
        object
      </strong>
      <ul>
        {expanded &&
          Object.entries(schema.$vocabulary).map(([uri, enabled]) => (
            <li
              key={uri}
              class={classs("json-schema-2020-12-$vocabulary-uri", {
                "json-schema-2020-12-$vocabulary-uri--disabled": !enabled,
              })}
            >
              <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
                {uri}
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}

$vocabulary.propTypes = {
  schema: schema.isRequired,
}

export default $vocabulary
