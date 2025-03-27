import { AUTH_URL } from "@/config/auth";

export default function LogIn() {
  return (
    <div
      className="flex flex-col justify-center items-center gap-8"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1 className="text-heading text-8xl font-bold">
          dara
          <span className="text-daraPink">.</span>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="border-border border-4 text-text px-8 py-4 bg-button hover:bg-hoveredButton rounded-2xl font-semibold sm:text-lg md:text-2xl lg:text-4xl"
          onClick={() => window.location.assign(AUTH_URL)}
        >
          Log in with Spotify
        </button>
        <p className="mt-6 text-center text-white sm:text-sm md:text-md lg:text-lg">
          You need a Spotify account and subscription to proceed. <br></br>
          <a
            href="https://www.spotify.com/se/signup"
            target="_blank"
            className="font-bold underline hover:text-hoveredButton"
          >
            Get it here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
