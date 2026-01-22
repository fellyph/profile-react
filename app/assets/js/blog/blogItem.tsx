import Thumb from '../common/thumb';
import { BlogItemProps } from '../types';

const BlogItem = ({
  imageUrl,
  imageAlt,
  imageCaption,
  title,
  content,
}: BlogItemProps) => (
  <article className="post">
    <Thumb imageUrl={imageUrl} imageAlt={imageAlt} imageCaption={imageCaption} />
    <h4 className="title">{title}</h4>
    <div className="excerpt" dangerouslySetInnerHTML={{ __html: content || '' }} />
  </article>
);

export default BlogItem;
