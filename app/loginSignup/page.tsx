import { ProductResults } from "@/components";
import LoginSignUp from "@/components/LoginSignUp/LoginSignUp";
import React from "react";
type Props = {
  searchParams?: {
    message?: string;
  };
};

export default function loginSignup(params: Props) {
  return (
    <>
      <LoginSignUp message={params.searchParams?.message}/>
    </>
  );
}
