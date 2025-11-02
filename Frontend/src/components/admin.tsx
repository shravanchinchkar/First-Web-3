import { useEffect, useState } from "react";

type TAdmin = {
  web3: any;
  courseContract: any;
};

export const Admin = ({ web3, courseContract }: TAdmin) => {
  const [payments, setPayments] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("");

  const init = () => {
    if (!web3 || !courseContract) return;

    courseContract.methods
      .getAllPayments()
      .call()
      .then((values: any) => {
        setPayments(values);
      })
      .catch((err: any) => {
        console.error("Error fetching payments:", err);
      });
  };

  useEffect(() => {
    if (web3 && courseContract) {
      init();
    }
  }, [web3, courseContract]);

  const withDrawFunds = async () => {
    try {
      if (!web3 || !courseContract) {
        alert("Web3 or contract not initialized!");
        return;
      }

      // Get current connected account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      setStatus("⏳ Transaction is being processed...");

      // Call withdrawFunds function (only owner can call this)
      await courseContract.methods
        .withdrawFunds()
        .send({ from: account });

      setStatus("✅ Funds withdrawn successfully!");
    } catch (err: any) {
      console.error("Withdraw error:", err);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-black text-white w-screen h-screen flex flex-col items-center gap-[1rem] p-6">
      <h1 className="text-[1.5rem] font-bold">Admin Dashboard</h1>

      <p>Total {payments.length} people have bought the course!</p>

      <div className="flex flex-col gap-2">
        {payments.map((payment: any, index) => (
          <div key={index} className="border border-gray-700 p-2 rounded">
            <p>Email: {payment.email}</p>
            <p>Amount: {web3.utils.fromWei(payment.amount, "ether")} ETH</p>
          </div>
        ))}
      </div>

      <button
        onClick={withDrawFunds}
        className="mt-4 border border-white px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all"
      >
        Withdraw Funds
      </button>

      {status && <p className="mt-2 text-sm text-gray-400">{status}</p>}
    </div>
  );
};
