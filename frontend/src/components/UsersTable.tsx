import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { TrashIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const UsersTable = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/users");
      if (response.data) {
        setUsers(response.data);
        setLoading(false);
      }
    } catch (error) {
      return true;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/user/${id}`);
      toast.success("User deleted successfully");
      getAllUsers();
    } catch (error) {
      toast.error("Internal Server Error");
      return true;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200/5">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Followers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Following
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/5">
                {users.map((user: any) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  text-primary">
                      {user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground uppercase">
                      {user?.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {user?.followers?.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {user?.following?.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        onClick={() => handleDelete(user?._id)}
                        type="button"
                        className="wd-error-button text-xs"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
