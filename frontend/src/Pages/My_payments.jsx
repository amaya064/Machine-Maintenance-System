import React, { useEffect, useState } from "react";
import {
  FaCreditCard,
  FaRegCalendarAlt,
  FaUserAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaBook,
  FaTrashAlt, // Added trash icon
} from "react-icons/fa";
import jsPDF from "jspdf";

export default function My_payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("paymentDate"); // default sort by paymentDate
  const [sortOrder, setSortOrder] = useState("desc"); // descending order

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetch(`http://localhost:3000/api/payment/payments/${email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch payments");
          }
          return res.json();
        })
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setPayments(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("An unexpected error occurred. Please try again.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No email found. Please sign in again.");
    }
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const generatePDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payment Receipt", 105, 10, { align: "center" });
    doc.setFontSize(12);
    const content = `
      Book ID: ${payment.bookId}
      Book Title: ${payment.bookTitle}
      Payment Date: ${new Date(payment.paymentDate).toLocaleDateString()}
      Amount: $${payment.totalPrice}
      Customer Name: ${payment.customerName}
      Customer Address: ${payment.customerAddress}
      Customer Phone: ${payment.customerPhone}
      Customer Email: ${payment.customerEmail}
      Bank Name: ${payment.bankName}
    `;
    doc.text(content, 10, 30);
    doc.save(`Receipt_${payment.bookId}.pdf`);
  };

  const deletePayment = (id) => {
    fetch(`http://localhost:3000/api/payment/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Remove deleted payment from the state
          setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== id));
        } else {
          setError("Failed to delete the payment.");
        }
      })
      .catch((err) => {
        setError("An unexpected error occurred. Please try again.");
      });
  };

  const sortedPayments = [...payments].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return <div className="text-center text-xl font-semibold text-gray-500">Loading payments...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">My Payments</h2>
      {payments.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No payments found.</p>
      ) : (
        <div>
          <div className="flex justify-between mb-6">
            <button
              onClick={() => handleSort("paymentDate")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
            >
              Sort by Date
            </button>
            <button
              onClick={() => handleSort("totalPrice")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none transition duration-200"
            >
              Sort by Amount
            </button>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {sortedPayments.map((payment, index) => (
              <li
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Book ID: {payment.bookId}</h3>
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <FaBook className="text-gray-500 mr-2" />
                    <strong>Book Title:</strong> {payment.bookTitle}
                  </div>
                  <div className="flex items-center">
                    <FaUserAlt className="text-gray-500 mr-2" />
                    <strong>Customer Name:</strong> {payment.customerName}
                  </div>
                  <div className="flex items-center">
                    <FaUserAlt className="text-gray-500 mr-2" />
                    <strong>Customer Email:</strong> {payment.customerEmail}
                  </div>
                  <div className="flex items-center">
                    <FaPhoneAlt className="text-gray-500 mr-2" />
                    <strong>Customer Phone:</strong> {payment.customerPhone}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <strong>Customer Address:</strong> {payment.customerAddress}
                  </div>
                  <div className="flex items-center">
                    <FaRegCalendarAlt className="text-gray-500 mr-2" />
                    <strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="text-gray-500 mr-2" />
                    <strong>Bank Name:</strong> {payment.bankName}
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-green-500 mr-2" />
                    <strong>Amount:</strong> ${payment.totalPrice}
                  </div>
                </div>
                <button
                  onClick={() => generatePDF(payment)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none w-full transition duration-200"
                >
                  Download Receipt
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => deletePayment(payment._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none w-full transition duration-200"
                >
                  <FaTrashAlt className="mr-2 inline" />
                  Delete Receipt
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
