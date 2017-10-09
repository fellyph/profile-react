'use strict'

import React, {PropTypes} from 'react'
import Thumb from '../common/thumb'

const BlogItem  = ({imageUrl,imageAlt, imageCaption, title, content}) => (
  <article className="post">
    <Thumb imageUrl={imageUrl} imageAlt={imageAlt} imageCaption={imageCaption} />
    <h4 className="title">{title}</h4>
    <div className="excerpt" dangerouslySetInnerHTML={{__html: content}} />
  </article>
)

BlogItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageCaption: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string
}

export default BlogItem