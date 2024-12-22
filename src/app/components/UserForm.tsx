"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../slice/userSlice";
import { TUserProfile } from "../slice/userSlice";
import { useRouter } from "next/navigation";

const UserForm = ({
  isEditUser = false,
  existingUser = null,
}: {
  isEditUser?: boolean;
  existingUser?: TUserProfile | null;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });
  function validateForm() {
    const newErrors = { name: "", email: "", phone: "", dob: "" };
    let isValid = true;

    // Name Validation
    if (!user.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email Validation (basic format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone Validation (basic 10-digit check)
    const phoneRegex = /^[0-9]{10}$/;
    if (!user.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(user.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // DOB Validation
    if (!user.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (isEditUser && existingUser) {
      if (validateForm()) {
        const { id } = existingUser;
        dispatch(updateUser({ ...user, id }));
        router.push("/");
      }
    } else {
      if (validateForm()) {
        const id = new Date().toString();

        const userWithId = { ...user, id: id };
        dispatch(addUser(userWithId));
        setUser({
          name: "",
          email: "",
          phone: "",
          dob: "",
        });
      }
    }
  }

  useEffect(() => {
    if (existingUser) setUser(existingUser);
  }, [isEditUser, existingUser]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New User</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* DOB Field */}
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={user.dob}
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
