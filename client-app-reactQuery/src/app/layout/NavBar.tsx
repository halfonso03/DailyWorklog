import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Link to={'/'}>
      <div className="text-4xl font-semibold text-yellow-50 border-b-2 border-slate-500 p-3">
        {/* Daily Work Log */}
      </div>
    </Link>
  );
}
