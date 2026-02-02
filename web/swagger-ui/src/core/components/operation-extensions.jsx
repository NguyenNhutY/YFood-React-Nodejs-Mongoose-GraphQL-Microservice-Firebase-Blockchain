import React from "react"
import PropTypes from "prop-types"

export const OperationExt = ({ extensions, getComponent }) => {
    let OperationExtRow = getComponent("OperationExtRow")
    return (
      <div class="opblock-section">
        <div class="opblock-section-header">
          <h4>Extensions</h4>
        </div>
        <div class="table-container">

          <table>
            <thead>
              <tr>
                <td class="col_header">Field</td>
                <td class="col_header">Value</td>
              </tr>
            </thead>
            <tbody>
                {
                    extensions.entrySeq().map(([k, v]) => <OperationExtRow key={`${k}-${v}`} xKey={k} xVal={v} />)
                }
            </tbody>
          </table>
        </div>
      </div>
    )
}
OperationExt.propTypes = {
  extensions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}

export default OperationExt
