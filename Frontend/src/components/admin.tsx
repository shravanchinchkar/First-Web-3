import { useEffect, useState } from "react";

type TAdmin = {
  web3: any;
  courseContract: any;
};

export const Admin = ({ web3, courseContract }: TAdmin) => {
  const [payments, setPayments] = useState([]);

  const init = () => {
    if (!web3 || !courseContract) return;
    console.log(courseContract.methods.payments);

    courseContract.methods
      .getAllPayments()
      .call()
      .then((values: any) => {
        setPayments(values);
      });
  };

  useEffect(() => {
    if (web3 && courseContract) {
      init();
    }
  }, [web3, courseContract]);

  return (
    <div className="bg-black text-white w-screen h-screen">
      <h1>Admin</h1>
      Total {payments.length} people have bought the course!
      {payments.map((payment: any) => (
        <div key={payment.email}>
          <p>Email: {payment.email}</p>
        </div>
      ))}
    </div>
  );
};
