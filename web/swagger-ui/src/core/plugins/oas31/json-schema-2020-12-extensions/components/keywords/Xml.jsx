/**
 * @prettier
 */
import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import classs from "classs"

const Xml = ({ schema, getSystem }) => {
  const xml = schema?.xml || {}
  const { fn, getComponent } = getSystem()
  const { useIsExpandedDeeply, useComponent } = fn.jsonSchema202012
  const isExpandedDeeply = useIsExpandedDeeply()
  const isExpandable = !!(xml.name || xml.namespace || xml.prefix)
  const [expanded, setExpanded] = useState(isExpandedDeeply)
  const [expandedDeeply, setExpandedDeeply] = useState(false)
  const Accordion = useComponent("Accordion")
  const ExpandDeepButton = useComponent("ExpandDeepButton")
  const JSONSchemaDeepExpansionContext = getComponent(
    "JSONSchema202012DeepExpansionContext"
  )()

  /**
   * Event handlers.
   */
  const handleExpansion = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])
  const handleExpansionDeep = useCallback((e, expandedDeepNew) => {
    setExpanded(expandedDeepNew)
    setExpandedDeeply(expandedDeepNew)
  }, [])

  /**
   * Rendering.
   */
  if (Object.keys(xml).length === 0) {
    return null
  }

  return (
    <JSONSchemaDeepExpansionContext.Provider value={expandedDeeply}>
      <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword--xml">
        {isExpandable ? (
          <>
            <Accordion expanded={expanded} onChange={handleExpansion}>
              <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
                XML
              </span>
            </Accordion>
            <ExpandDeepButton
              expanded={expanded}
              onClick={handleExpansionDeep}
            />
          </>
        ) : (
          <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
            XML
          </span>
        )}
        {xml.attribute === true && (
          <span class="json-schema-2020-12__attribute json-schema-2020-12__attribute--muted">
            attribute
          </span>
        )}
        {xml.wrapped === true && (
          <span class="json-schema-2020-12__attribute json-schema-2020-12__attribute--muted">
            wrapped
          </span>
        )}
        <strong class="json-schema-2020-12__attribute json-schema-2020-12__attribute--primary">
          object
        </strong>
        <ul
          class={classs("json-schema-2020-12-keyword__children", {
            "json-schema-2020-12-keyword__children--collapsed": !expanded,
          })}
        >
          {expanded && (
            <>
              {xml.name && (
                <li class="json-schema-2020-12-property">
                  <div class="json-schema-2020-12-keyword json-schema-2020-12-keyword">
                    <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
                      name
                    </span>
                    <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
                      {xml.name}
                    </span>
                  </div>
                </li>
              )}

              {xml.namespace && (
                <li class="json-schema-2020-12-property">
                  <div class="json-schema-2020-12-keyword">
                    <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
                      namespace
                    </span>
                    <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
                      {xml.namespace}
                    </span>
                  </div>
                </li>
              )}

              {xml.prefix && (
                <li class="json-schema-2020-12-property">
                  <div class="json-schema-2020-12-keyword">
                    <span class="json-schema-2020-12-keyword__name json-schema-2020-12-keyword__name--secondary">
                      prefix
                    </span>
                    <span class="json-schema-2020-12-keyword__value json-schema-2020-12-keyword__value--secondary">
                      {xml.prefix}
                    </span>
                  </div>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </JSONSchemaDeepExpansionContext.Provider>
  )
}

Xml.propTypes = {
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  getSystem: PropTypes.func.isRequired,
}

export default Xml
