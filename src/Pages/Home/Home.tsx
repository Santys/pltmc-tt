import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Home = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  return <h1 className="mt-5">Welcome {username}</h1>;
};

export default Home;
