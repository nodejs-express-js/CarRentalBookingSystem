

  
  import { useLocation } from "react-router-dom";
  import Navbar from "./Navbar";
  import styles from "./CustomerSuccess.module.css"; // optional: style it
  
  const CustomerSuccess = () => {
    const { state } = useLocation();
    const bookingData = state as BookingResponse;
    const { booking, car } = bookingData;
    return (
      <>
        <Navbar />
        <div className={styles.successContainer}>
          <h2 className={styles.successTitle}>Booking Successful 🎉</h2>
          <div className={styles.details}>
            <h3>Booking Details</h3>
            <p><strong>Card Holder Name:</strong> {booking.cardHolderName}</p>
            <p><strong>Card Type:</strong> {booking.cardType}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p><strong>Booking ID:</strong> #{booking.id}</p>
          </div>
  
          <div className={styles.details}>
            <h3 >Car Details</h3>
            <img src={car.photo} alt={`${car.make} ${car.model}`} className={styles.carImage} />
            <p><strong>Make:</strong> {car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price Per Day:</strong> ${car.pricePerDay}</p>
          </div>
        </div>
      </>
    );
};


  type BookingResponse = {
    booking: {
      id: number;
      cardType: string;
      cardNumber: string;
      cardCVV: string;
      cardHolderName: string;
      bookingDate: string; // ISO string
      carId: number;
      customerId: number;
      updatedAt: string; // ISO string
      createdAt: string; // ISO string
    };
    car: {
      id: number;
      make: string;
      model: string;
      year: number;
      pricePerDay: string; // assuming string based on the sample, though it could be number
      photo: string;
      locationId: number;
      createdAt: string; // ISO string
      updatedAt: string; // ISO string
    };
  };
  export default CustomerSuccess;
  