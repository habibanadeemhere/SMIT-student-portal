import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {

  return (
    <div className="flex min-h-screen">

     
      <div className="w-64 bg-green-700 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">SMIT Admin</h1>

        <nav className="flex flex-col gap-4">

          <Link to="/admin/dashboard">Dashboard</Link>
<Link to="/admin/complaints">Complaints</Link>
<Link to="/admin/lostfound">Lost & Found</Link>
<Link to="/admin/volunteers">Volunteers</Link>
<Link to="/admin/users">Users</Link>

        </nav>

      </div>

    
      <div className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </div>

    </div>
  );
}