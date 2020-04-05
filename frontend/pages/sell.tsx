import CreateItem from '../components/CreateItem';

type Props = {}

const Sell: React.FC<Props> = () => {
  return (
    <div>
      <h3>Sell something!</h3>
      <CreateItem />
    </div>
  )
};

export default Sell;
