'use strict'

import React from 'react'
import PropTypes from 'prop-types'

const Thumb = ({imageUrl, imageAlt, imageCaption}) => (
  <figure className="thumb">
    <img src={imageUrl} alt={imageAlt} />
  </figure>
)

Thumb.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageCaption: PropTypes.string
}

export default Thumb