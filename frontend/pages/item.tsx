import { useRouter } from 'next/router';
import SingleItems from '../components/SingleItem';

type Props = {}

const Home: React.FC<Props> = () => {
  const { query: { id } } = useRouter();
  return (
    <div>
      <SingleItems id={id}/>
    </div>
  )
};

export default Home;
