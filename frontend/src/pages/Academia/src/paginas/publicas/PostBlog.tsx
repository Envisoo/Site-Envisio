import { useParams } from 'react-router-dom';

export default function PostBlog() {
  const { slug } = useParams();
  return <h1>Post: {slug}</h1>;
}