import useAccessStore from "@/store/store";

const Reset = () => {
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  return (
    <div>
      <button
        className="bg-black text-white py-1.5 px-3 rounded-md "
        onClick={() => addAccessToken(null)}
      >
        reset
      </button>
    </div>
  );
};

export default Reset;
