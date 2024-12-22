import EditUser from "@/app/components/EditUser";
import UserForm from "@/app/components/UserForm";
import React from "react";

type Params = {
  userId: string;
};

const Page = ({ params }: { params: Params }) => {
  const { userId } = params;
  const decodedId = decodeURIComponent(userId);
  console.log("🚀 ~ Page ~ decodedId:", decodedId)

  return <EditUser userId={decodedId} />;
};

export default Page;
