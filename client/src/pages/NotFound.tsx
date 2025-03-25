import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-white text-4xl font-bold">
        The page you're looking for is not available.
      </h1>
      <p className="text-white mt-4">
        Go back to{" "}
        <NavLink to="/" className="font-bold underline hover:font-normal">
          homepage
        </NavLink>
      </p>
    </div>
  );
}
