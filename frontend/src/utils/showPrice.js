const showPrice = (price) => {
  if (typeof price !== "number") {
    // If price is not a number, return it as is
    return price;
  }

  // Convert price to locale string with 'it-IT' format
  return price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Ensure no decimal digits
  });
};
export default showPrice;
