export default function Login() {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto w-[100%] p-3 bg-linear md:p-6 rounded-md shadow-2xl shadow-indigo-700 flex flex-col text-white mb-8  "
    >
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-4 bg-white bg-opacity-30 shadow-md rounded focus:border-green focus:outline-none"
        {...register("username")}
      />
      <input
        type="password"
        placeholder="Password"
        // bg-gradient-to-r  from-slate-500 to-slate-800
        className="w-full p-2 mb-4 bg-white bg-opacity-30 shadow-md rounded focus:border-green focus:outline-none"
        {...register("password")}
      />
      <input
        className="w-full p-2  bg-gradient-to-r from-fuchsia-500 bg-blue-500 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-purple-700 text-white rounded cursor-pointer"
        type="submit"
      />
    </form>
  );
}
