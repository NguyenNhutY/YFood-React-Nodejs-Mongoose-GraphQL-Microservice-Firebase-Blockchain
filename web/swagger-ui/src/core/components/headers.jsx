import React from "react"
import PropTypes from "prop-types"
import Im from "immutable"

const propClass = "header-example"

export default class Headers extends React.Component {
  static propTypes = {
    headers: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  }

  render() {
    let { headers, getComponent } = this.props

    const Property = getComponent("Property")
    const Markdown = getComponent("Markdown", true)

    if ( !headers || !headers.size )
      return null

      return (
      <div class="headers-wrapper">
        <h4 class="headers__title">Headers:</h4>
        <table class="headers">
          <thead>
            <tr class="header-row">
              <th class="header-col">Name</th>
              <th class="header-col">Description</th>
              <th class="header-col">Type</th>
            </tr>
          </thead>
          <tbody>
          {
            headers.entrySeq().map( ([ key, header ]) => {
              if(!Im.Map.isMap(header)) {
                return null
              }

              const description = header.get("description")
              const type = header.getIn(["schema"]) ? header.getIn(["schema", "type"]) : header.getIn(["type"])
              const schemaExample = header.getIn(["schema", "example"])

              return (<tr key={ key }>
                <td class="header-col">{ key }</td>
                <td class="header-col">{
                  !description ? null : <Markdown source={ description } />
                }</td>
                <td class="header-col">{ type } { schemaExample ? <Property propKey={ "Example" } propVal={ schemaExample } propClass={ propClass } /> : null }</td>
              </tr>)
            }).toArray()
          }
          </tbody>
        </table>
      </div>
    )
  }
}
