import { useAppSelector } from '../../app/hooks';

const Home = () => {
  const username = useAppSelector((state) => state.auth.username);
  return <h1 className="mt-5">Welcome {username}</h1>;
};

export default Home;
