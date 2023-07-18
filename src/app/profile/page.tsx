"use client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  type userDataType = {
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    username: string;
    // __v: 0;
    _id: string;
  };
  const router = useRouter();
  const [userData, setUserData] = useState<userDataType>();

  async function logout() {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Logout successful");
    }
  }

  const getUserInfo = async () => {
    const response = await axios.get("api/users/userInfo");
    console.log(
      "====================================",
      { response },
      "====================================="
    );
    setUserData(response.data.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <h2>
        {userData ? (
          <Link href={`/profile/${userData._id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              View user Details
            </button>
          </Link>
        ) : (
          ""
        )}
      </h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={getUserInfo}
      >
        Get user Info
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={logout}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
}
