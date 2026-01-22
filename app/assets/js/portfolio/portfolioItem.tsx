import Thumb from '../common/thumb';
import { PortfolioItemProps } from '../types';

const PortfolioItem = ({
  imageUrl,
  imageAlt,
  imageCaption,
  title,
  content,
}: PortfolioItemProps) => (
  <article className="job">
    <Thumb imageAlt={imageAlt} imageUrl={imageUrl} imageCaption={imageCaption} />
    <h4 className="title">{title}</h4>
    <div className="description" dangerouslySetInnerHTML={{ __html: content || '' }} />
  </article>
);

export default PortfolioItem;
