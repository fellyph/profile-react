import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import PortfolioItem from './portfolio/portfolioItem'

class PortfolioList extends Component {
  constructor() {
    super()
    this.state = {
      jobs : []
    }
  }
  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get(this.props.source)
        .then((result) => {
          _this.setState({
            jobs: result.data
          });
        })
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    let jobsList = [];
    this.state.jobs.forEach ( (job) => {
      jobsList.push(<PortfolioItem key={job.id} name={job.title.rendered} technologies={job.content.rendered} image={job.thumbnail_url} alt={job.title.rendered} />);
    });

    return (
      <div className="jobs">
        {jobsList}
      </div>
    );
  }
}

ReactDOM.render(
  <PortfolioList source="http://fellyph.com.br/blog/wp-json/wp/v2/portfolio"/>, document.getElementById('jobs')
);
