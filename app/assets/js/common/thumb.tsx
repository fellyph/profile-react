import { ThumbProps } from '../types';

const Thumb = ({ imageUrl, imageAlt }: ThumbProps) => (
  <figure className="thumb">
    <img src={imageUrl} alt={imageAlt} />
  </figure>
);

export default Thumb;
