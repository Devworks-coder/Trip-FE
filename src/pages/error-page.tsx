// ErrorPage.tsx
import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC<{ message?: string }> = () => {
  const error: any = useRouteError();

  return (
    <div className="bg-space bg-cover bg-center h-screen flex flex-col items-center justify-center text-textSecondary">
      <div className="text-center">
        <h1 className="text-5xl font-bold neon-text mb-4">
          Oops! You’ve Lost in Space
        </h1>

        <img
          src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg" // Replace with your astronaut image URL
          alt="Astronaut"
          className="w-52 mx-auto mb-4"
        />

        <p className="text-xl mb-6">
          {error
            ? error?.message
            : "The page you’re looking for has drifted off into the void."}
        </p>

        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-light py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
