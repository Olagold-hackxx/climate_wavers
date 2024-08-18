import Accountcard from "./Accountcard";

const Popularaccounts = () => {
  const users = [
    {
      id: "1",
      first_name: "United Nations",
      // "last_name": "Nations",
      profile_pic: "../../unn.png",
      username: "unnnigeria",
    },
    {
      id: "2",
      first_name: "Red Cross ",
      // "last_name": "Cross",
      profile_pic: "../../red.png",
      username: "redcrossng",
    },
    {
      id: "4",
      first_name: "Lawma",
      last_name: " ",
      profile_pic: "../../lawma.png",
      username: "lawma",
    },
    {
      id: "3",
      first_name: "UNFCCC",
      last_name: " ",
      profile_pic: "../../unfcc.png",
      username: "unfcccnigeria",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-2 text-black bg-[#F4F4F4] list-none py-4 m-4 rounded-2xl ">
        <h2 className="text-lg font-semibold p-3">Popular accounts</h2>
        {users.map((user) => {
          return <Accountcard key={user.id} user={user} />;
        })}
        {/* <Accountcard user={user} />
        <Accountcard user={user} /> */}
      </div>
    </div>
  );
};

export default Popularaccounts;
