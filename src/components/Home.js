import React from "react";
// import { Router, Route, Routes } from "react-router-dom";
// import { Link } from "react-router-dom";
import Policy from "./Policy";
import Policyholder from "./Policyholder";
import Claim from "./Claim";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the App
      </h1>
      <div className="w-full max-w-4xl space-y-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <Policy />
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <Policyholder />
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <Claim />
        </div>
      </div>
    </div>
  );
};

export default Home;
