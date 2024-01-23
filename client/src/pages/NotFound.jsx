import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='w-[90%] min-h-[100vh] flex justify-center items-center flex-col gap-2'>
      <h1 className='text-6xl text-red-500'>404</h1>
      <p className='text-xl text-red-500'>Page not found</p>
      <Link to={'/login'} className='underline text-blue-500'>Login</Link>
    </div>
  );
};

export default NotFound;