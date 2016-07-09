class PortfolioItem extends React.Component {
  render() {
    return (
      <article className="job">
        <figure>
          <img src="{this.props.image}" alt="{this.props.alt}" />
        </figure>
        <h4 className="title">{this.props.name}</h4>
        <ul className="fetures">
          <li><a href="{this.props.url}" target="_blank" alt="{this.props.alt}">{this.props.url}</a></li>
          <li>Empresa: {this.props.company}</li>
          <li>Designer: {this.props.designer}</li>
          <li>Tecnologias: {this.props.technologies}</li>
        </ul>
      </article>
    )
  }
}

class PortfolioList extends React.Component {
  render() {
    const jobsList = [],
          data = [
            {"name": "Blog Elo 7", "url": "http://blog.elo7.com.br/", "company": "Elo7", "technologies": ["WordPress", "HTML5", "CSS3", "JS", "Git"], "image": ""},
            {"name": "Blog Elo 7", "url": "http://blog.elo7.com.br/", "company": "Elo7", "technologies": ["WordPress", "HTML5", "CSS3", "JS", "Git"], "image": ""},
            {"name": "Blog Elo 7", "url": "http://blog.elo7.com.br/", "company": "Elo7", "technologies": ["WordPress", "HTML5", "CSS3", "JS", "Git"], "image": ""},
            {"name": "Blog Elo 7", "url": "http://blog.elo7.com.br/", "company": "Elo7", "technologies": ["WordPress", "HTML5", "CSS3", "JS", "Git"], "image": ""},
            {"name": "Blog Elo 7", "url": "http://blog.elo7.com.br/", "company": "Elo7", "technologies": ["WordPress", "HTML5", "CSS3", "JS", "Git"], "image": ""},
            {"name": "Blog Elo 7", "url": "http://blog.elo7.com.br/", "company": "Elo7", "technologies": ["WordPress", "HTML5", "CSS3", "JS", "Git"], "image": ""}
          ];

    data.forEach ( function(job) {
      jobsList.push(<PortfolioItem name={job.name} url={job.url} company={job.company} technologies={job.tecnologias} image="{job.image}" />);
    });

    return (
      <div className="jobs">
        {jobsList}
      </div>
    );
  }
}

ReactDOM.render(
  <PortfolioList />, document.getElementById('jobs')
);
