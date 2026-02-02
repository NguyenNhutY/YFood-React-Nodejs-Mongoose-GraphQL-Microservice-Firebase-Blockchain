import React from "react"
import PropTypes from "prop-types"

export default class AuthorizationPopup extends React.Component {
  close =() => {
    let { authActions } = this.props

    authActions.showDefinitions(false)
  }

  render() {
    let { authSelectors, authActions, getComponent, errSelectors, specSelectors, fn: { AST = {} } } = this.props
    let definitions = authSelectors.shownDefinitions()
    const Auths = getComponent("auths")
    const CloseIcon = getComponent("CloseIcon")

    return (
      <div class="dialog-ux">
        <div class="backdrop-ux"></div>
        <div class="modal-ux">
          <div class="modal-dialog-ux">
            <div class="modal-ux-inner">
              <div class="modal-ux-header">
                <h3>Available authorizations</h3>
                <button type="button" class="close-modal" onClick={ this.close }>
                  <CloseIcon />
                </button>
              </div>
              <div class="modal-ux-content">

                {
                  definitions.valueSeq().map(( definition, key ) => {
                    return <Auths key={ key }
                                  AST={AST}
                                  definitions={ definition }
                                  getComponent={ getComponent }
                                  errSelectors={ errSelectors }
                                  authSelectors={ authSelectors }
                                  authActions={ authActions }
                                  specSelectors={ specSelectors }/>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  static propTypes = {
    fn: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    authSelectors: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    errSelectors: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
  }
}
