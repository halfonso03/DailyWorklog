import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex w-full justify-center text-white">
        {/* <SignupForm></SignupForm> */}
        <div className='w-4/5'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
