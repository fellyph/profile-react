'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import Thumb from '../common/thumb'

const PortfolioItem = ({imageUrl, imageAlt, imageCaption, title, content}) => (
  <article className="job">
    <Thumb imageAlt={imageAlt} imageUrl={imageUrl} imageCaption={imageCaption} />
    <h4 className="title">{title}</h4>
    <div className="description" dangerouslySetInnerHTML={{__html: content}} />
  </article>
)

PortfolioItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageCaption: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string
}

export default PortfolioItem
