import { AUTH_URL } from "@/config/auth";

export default function LogIn() {
  return (
    <div
      className="flex flex-col justify-center items-center gap-8"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <h1 className="text-white text-center text-8xl">
          dara
          <span className="text-pink-500">.</span>
        </h1>
      </div>
      <div>
        <button
          className="border-black border-4 text-green px-8 py-4 bg-colors-customGreen hover:bg-colors-customBlue hover:text-white rounded-md text-3xl font-semibold"
          onClick={() => window.location.assign(AUTH_URL)}
        >
          Log in with Spotify
        </button>
        <p className="mt-6 text-xs">
          You need a Spotify account and subscription to proceed. <br></br>
          <a
            href="https://www.spotify.com/se/signup"
            target="_blank"
            className="font-bold  hover:underline"
          >
            Get it here.
          </a>
        </p>
      </div>
    </div>
  );
}
