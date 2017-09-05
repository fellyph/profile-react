import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import PortfolioItem from './portfolio/portfolioItem'

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
      jobsList.push(<PortfolioItem key={job.id} name={job.title.rendered} technologies={job.content.rendered} image={job.thumbnail_url} alt={job.title.rendered} />);
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
