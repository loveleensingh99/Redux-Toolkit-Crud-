"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import UserForm from "./UserForm";
import { useRouter } from "next/navigation";

const EditUser = ({ userId }: { userId: string }) => {
    console.log("🚀 ~ EditUser ~ userId:", userId)
    const router = useRouter();
  const users = useSelector((state: RootState) => state.user);
  const existingUser = users.find((item) => item.id == userId);
  if (!existingUser) {
    return <p className="text-red-600 text-center text-xl">User not found</p>;
  }
    return (
        <>
  <button
                  onClick={() => router.push(`/`)}
                  className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600"
                >
Home                </button>
        <UserForm isEditUser={true} existingUser={existingUser} />;
  </>
    )
};

export default EditUser;
