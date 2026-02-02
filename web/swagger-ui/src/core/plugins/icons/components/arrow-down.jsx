/**
 * @prettier
 */
import React from "react"
import PropTypes from "prop-types"

const ArrowDown = ({ class = null, width = 20, height = 20, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    class={class}
    width={width}
    height={height}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z" />
  </svg>
)

ArrowDown.propTypes = {
  class: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default ArrowDown
