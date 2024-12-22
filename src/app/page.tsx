"use client";
import React, { useState } from "react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { deleteUser } from "./slice/userSlice";
import UserForm from "./components/UserForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const users = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <UserForm />

      {users.length === 0 ? (
        <p className="text-center">No user</p>
      ) : (
        <div className=" mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-gray-700 mb-4">Simple List</h1>
          <ul className="space-y-2">
            {users?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow"
              >
                <span className="text-gray-700">{item.id}</span>

                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-700">{item.email}</span>
                <span className="text-gray-700">{item.phone}</span>
                <span className="text-gray-700">{item.dob}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/edituser/${item.id}`)}
                    className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(item.id))}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
