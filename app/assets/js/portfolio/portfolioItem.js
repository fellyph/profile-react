'use strict'
import React, {Component} from 'react'

class PortfolioItem extends Component {
  render() {
    return (
      <article className="job">
        <figure className="thumb">
          <img src={this.props.image} alt={this.props.alt} />
        </figure>
        <h4 className="title">{this.props.name}</h4>
        <div className="description" dangerouslySetInnerHTML={{__html: this.props.technologies}} />
      </article>
    )
  }
}

export default PortfolioItem
