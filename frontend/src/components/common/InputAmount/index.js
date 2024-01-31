import React from "react";
import styles from './inputAmount.module.css'

const index = () => {
  const [amount, setAmount] = useState(1);
  const handleIncrease = () => {
    if (amount <= 1) return;
    setAmount((pre) => pre - 1);
  };
  const handleDecrease = () => {
    setAmount((pre) => pre + 1);
  };
  return (
    <div className={styles["ProductInfor__amount-input"]}>
      <button onClick={handleIncrease}>-</button>
      <input type="text" value={amount} />
      <button onClick={handleDecrease}>+</button>
    </div>
  );
};

export default index;