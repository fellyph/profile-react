'use strict'

import React, {PropTypes} from 'react'

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