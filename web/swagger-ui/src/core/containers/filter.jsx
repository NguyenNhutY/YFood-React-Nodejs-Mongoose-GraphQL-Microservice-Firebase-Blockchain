import React from "react"
import PropTypes from "prop-types"

export default class FilterContainer extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  }

  onFilterChange = (e) => {
    const {target: {value}} = e
    this.props.layoutActions.updateFilter(value)
  }

  render () {
    const {specSelectors, layoutSelectors, getComponent} = this.props
    const Col = getComponent("Col")

    const isLoading = specSelectors.loadingStatus() === "loading"
    const isFailed = specSelectors.loadingStatus() === "failed"
    const filter = layoutSelectors.currentFilter()

    const classs = ["operation-filter-input"]
    if (isFailed) classs.push("failed")
    if (isLoading) classs.push("loading")

    return (
      <div>
        {filter === false ? null :
          <div class="filter-container">
            <Col class="filter wrapper" mobile={12}>
              <input class={classs.join(" ")} placeholder="Filter by tag" type="text"
                     onChange={this.onFilterChange} value={typeof filter === "string" ? filter : ""}
                     disabled={isLoading}/>
            </Col>
          </div>
        }
      </div>
    )
  }
}
