import PortfolioItem from './portfolioItem';
import { PortfolioListProps } from '../types';

const PortfolioList = ({ jobs = [] }: PortfolioListProps) => (
  <section className="jobs">
    <h2>Portfolio</h2>
    {jobs.map((job) => (
      <PortfolioItem
        key={job.id}
        title={job.title.rendered}
        content={job.content.rendered}
        imageUrl={job.thumbnail_url}
        imageAlt={job.title.rendered}
      />
    ))}
  </section>
);

export default PortfolioList;
