import Web3 from "web3";
import { contractABI } from "../abi";
import {Admin} from "./components/admin"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CourseRegistration} from "./components/course-registration"

function App() {
  const [web3, setWeb3] = useState<any>(null);
  const [courseContract, setCourseContract] = useState<any>(null);
  const [courseFee, setCourseFee] = useState("");
  const contractAddress = "0x6A8Ee5eAd4346FC23765f3004e98ef8c86FbC6D0";
  useEffect(() => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      window.ethereum
        .request({ method: "eth_requestAccounts" }) // this line connects the wallet to the website atleast for the first time
        .then(() => {
          // @ts-ignore
          const web3Instance = new Web3(window.ethereum); // here we just give the global web3 variable the ethereum.
          setWeb3(web3Instance);

          const courseInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          ); // create the instance of the contract so that we can interact with the contract.
          setCourseContract(courseInstance);

          courseInstance.methods
            .courseFee()
            .call()
            .then((fee: any) => {
              setCourseFee(web3Instance.utils.fromWei(fee, "ether"));
            }); // gets the course fee from the contract and display it on the screen.
        })
        .catch((err: any) => {
          // Handle error if the user rejects the connection request
          console.error(err);
        });
    } else {
      alert("Please install an another Ethereum wallet.");
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <CourseRegistration
              web3={web3}
              courseContract={courseContract}
              courseFee={courseFee}
            />
          }
        />
        <Route
          path="admin"
          element={
            <Admin
              web3={web3}
              courseContract={courseContract}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
