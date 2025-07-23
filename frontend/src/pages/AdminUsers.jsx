import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const { authorizationToken, API } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        getAllUserData();
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUserData();
  }, []);

  const confirmDelete = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      deleteUser(recipeId);
    }
  };
  return (
    <>
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-yellow-500 drop-shadow">
              Admin Users Data
            </h1>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full text-left text-sm table-auto">
              <thead className="bg-yellow-400 text-white uppercase text-sm">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Recipes Created</th>
                  <th className="px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((curUser, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {curUser.username}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{curUser.email}</td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {curUser.recipeCount}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => confirmDelete(curUser._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
