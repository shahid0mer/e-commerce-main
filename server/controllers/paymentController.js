export const createPayment = async (req, res) => {
  res.send({ message: "Payment created" });
};

export const verifyPayment = async (req, res) => {
  res.send({ message: "Payment verified" });
};

export const getPaymentStatus = async (req, res) => {
  res.send({ message: "Payment status" });
};
export const getPaymentHistory = async (req, res) => {
  res.send({ message: "Payment history" });
};      