
import { useLocation } from 'react-router-dom';
import { Car } from '../../hooks/customer/useCustomerFetchEachLocationCars';
import Navbar from './Navbar';
import styles from "./CustomerBooking.module.css"
import { useEffect, useState } from 'react';

import useCustomerBooking,{bookingType} from "../../hooks/customer/useCustomerBooking"

import useCustomerDisableDates from '../../hooks/customer/useCustomerDisableDates';

const CustomerBooking = () => {
    const { state } = useLocation();
  const car = state?.car as Car;
  const {error,loading,customerbooking}=useCustomerBooking();
  const {getdisabledates}=useCustomerDisableDates();
  const [errorMessage,setErrorMessage]=useState("");
  const [notallowedDates,setNotAlloowedDates]=useState<string[]>([])
  const [booking, setBooking] = useState<bookingType>({
    date: new Date().toISOString().split('T')[0],
    carId: 0,
    cardType: '',
    cardNumber: '',
    cardCVV: '',
    cardHolderName: ''
  });

  useEffect(()=>{
    const fetch=async()=>{
      
      setNotAlloowedDates(await getdisabledates(car.id))
    }
    fetch()
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if ((name === 'cardNumber' || name === 'cardCVV') && !/^\d*$/.test(value)) {
      return;
    }
    if (name === 'cardNumber' && value.length > 16) return;
    if (name === 'cardCVV' && value.length > 3) return;
  
    setBooking({ ...booking, [name]: value });
  };



  const handleDateChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    const selectedDate = e.target.value;
    console.log(selectedDate,notallowedDates.includes(selectedDate))
    if (notallowedDates.includes(selectedDate) && selectedDate !== '') {
      setErrorMessage('date is not available for booking.');
      setBooking({ ...booking, date: '' });
    } else {
      setBooking({ ...booking, [name]: value });
      setErrorMessage('');
    }
  }

  const bookCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if( !booking.date || !booking.cardType || !booking.cardNumber || !booking.cardCVV){
      alert("Please fill all fields")
      return
    }
    customerbooking({ ...booking, carId: car.id,date:new Date(booking.date).toISOString() })
  };


  return (
    <>
    <Navbar />
    <div className={styles.outercontainer}>
        <div key={car.id} className={styles.container}>
            <img
              src={car.photo}
              alt={`${car.make} ${car.model}`}
              className={styles.carImage}
            />
            <p className={styles.carDetail}><strong>id:</strong> {car.id}</p>
            <p className={styles.carDetail}><strong>Make:</strong> {car.make}</p>
            <p className={styles.carDetail}><strong>Model:</strong> {car.model}</p>
            <p className={styles.carDetail}><strong>Year:</strong> {car.year}</p>
            <p className={styles.carDetail}><strong>Price Per Day:</strong> ${car.pricePerDay}</p>
          </div>
        
          <form onSubmit={bookCar} className={styles.bookingForm}>
            <label className={styles.label}>Booking Date</label>
            <input
              type='date'
              name='date'
              value={booking.date}
              onChange={handleDateChange}
              className={styles.input}
            />
            <>{errorMessage}</>
            <label className={styles.label}>Card Type</label>  
            <select
              name="cardType"
              value={booking.cardType}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">-- Select Card Type --</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Amex">Amex</option>
            </select>
        
            <label className={styles.label}>Card Number</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={16}
              name="cardNumber"
              value={booking.cardNumber}
              onChange={handleChange}
              className={styles.input}
            />
        
            <label className={styles.label}>CVV</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={3}
              name="cardCVV"
              value={booking.cardCVV}
              onChange={handleChange}
              className={styles.input}
            />
        
            <label className={styles.label}>Card Holder Name</label>
            <input
              type='text'
              name='cardHolderName'
              value={booking.cardHolderName}
              onChange={handleChange}
              className={styles.input}
            />
        
            <div className={styles.error}>{error}</div>
        
            <input
              type='submit'
              disabled={loading}
              className={styles.submitButton}
            />
          </form>


    </div>
    
  </>
  
  )
}

export default CustomerBooking