import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if(!user) return <div>Please login</div>

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-organicGreen mb-6">My Profile</h1>
      <div className="bg-white p-6 shadow rounded-lg max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'Customer'}</p>
        <hr className="my-4"/>
        <button className="text-blue-500 hover:underline">My Orders</button>
      </div>
    </div>
  )
}

export default Profile;