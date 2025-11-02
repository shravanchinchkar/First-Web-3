import { useState } from "react";

type TCourseRegistration = {
  web3: any;
  courseContract: any;
  courseFee: string;
};

export const CourseRegistration = ({
  web3,
  courseContract,
  courseFee,
}: TCourseRegistration) => {
  const [email, setEmail] = useState("");
  const payForCourse = async () => {
    if (!web3 || !courseContract) return;

    const accounts = await web3.eth.getAccounts(); // get all the users accounts

    courseContract.methods
      .payForCourse(email) // here we are calling the payForCourse function which is in our contract.
      .send({ from: accounts[0], value: web3.utils.toWei(courseFee, "ether") })
      .on("transactionHash", (hash: string) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt: any) => {
        console.log("Transaction successful:", receipt);
      })
      .on("error", (error: any) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-full h-full flex flex-col justify-center items-center text-white gap-[0.5rem]">
        <h1 className="font-bold text-[2rem]">Hello from Sharvan Chinchkar!</h1>
        <p className="text-[1.5rem] font-semibold">
          Course Fee: {courseFee} ETH
        </p>
        <div className="flex gap-[1rem]">
          <input
            placeholder="Email"
            className="border-[2px] border-white placeholder:text-white p-[0.5rem] rounded-[1rem]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="border-[2px] border-white p-[1rem] rounded-[1rem] text-[1rem] font-bold cursor-pointer hover:bg-white hover:text-black"
            onClick={payForCourse}
          >
            Pay for the course
          </button>
        </div>
      </div>
    </div>
  );
};
