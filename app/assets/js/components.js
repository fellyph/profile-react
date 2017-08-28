import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class PortfolioItem extends React.Component {
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

let PortfolioList = React.createClass({
  getInitialState: function() {
      return {
        jobs: []
      };
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest =
      axios
        .get(this.props.source)
        .then(function(result) {
          _this.setState({
            jobs: result.data
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort()
  },

  render: function() {
    let jobsList = [];
    this.state.jobs.forEach ( function(job) {
      jobsList.push(<PortfolioItem name={job.title.rendered} technologies={job.content.rendered} image={job.thumbnail_url} alt={job.title.rendered} />);
    });

    return (
      <div className="jobs">
        {jobsList}
      </div>
    );
  }
})

ReactDOM.render(
  <PortfolioList source="http://fellyph.com.br/blog/wp-json/wp/v2/portfolio"/>, document.getElementById('jobs')
);
