import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="p-4">
        <Outlet></Outlet>
      </div>
    </>
  );
}
