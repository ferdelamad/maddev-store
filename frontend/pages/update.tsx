import { useRouter } from 'next/router';
import UpdateItem from '../components/UpdateItem';

type Props = {};

const Update: React.FC<Props> = () => {
  const { query: { id } } = useRouter();
  return (
    <div>
      <UpdateItem id={id} />
    </div>
  )
};

export default Update;
