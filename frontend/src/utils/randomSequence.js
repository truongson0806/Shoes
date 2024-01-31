function generateRandomNumber() {
    return Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
  }
  
  function generateRandomSequence(length) {
    let sequence = '';
    for (let i = 0; i < length; i++) {
      const randomNumber = generateRandomNumber();
      sequence += randomNumber.toString();
    }
    return sequence;
  }
  
  const randomSequence = generateRandomSequence(8);
  export default randomSequence;