import  { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import useCustomerGetOrders from "../../hooks/customer/useCustomerGetOrders";
import Styles from "./CustomerOrders.module.css"; // Import the CSS module

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Booking[]>([]);
  const { error, loading, customerOrders } = useCustomerGetOrders();
  const lastdiv = useRef<HTMLDivElement>(null);
  const [page,setPage]=useState(3)
  const [reached,setReached]=useState(false)
  useEffect(() => {
    const fetchOrders = async () => {
      setOrders(await customerOrders(0, 2));
    };
    if (!loading) {
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(async(entries) => {
      if (entries[0].isIntersecting && !reached) {
        const temp=await customerOrders(page,page+2);
        if(temp.length!==0){
            setOrders([...orders,...temp]);
            setPage(page=>page+3)
        }
        else{
            setReached(true)
        }
            
      }}, {
        threshold: 0.1,
      })
      if(lastdiv.current)
      observer.observe(lastdiv.current)
      const removal=lastdiv.current
      return () => {
        if(removal)
        observer.unobserve(removal)
      }
  },[orders])

  const showOrders = () => {
    return orders.map((order, index) => {
      const isLastOrder = index === orders.length - 1;
      return (
        <div
          ref={isLastOrder ? lastdiv : null}
          key={index}
          className={Styles.orderContainer} // Apply a CSS class for styling
        >
          <div className={Styles.minicontainer1}>

                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Booking Date:</span>
                  {order.bookingDate}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Card Type:</span>
                  {order.cardType}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Card Number:</span>
                  {order.cardNumber}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Card Holder:</span>
                  {order.cardHolderName}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Car Make:</span>
                  {order.car.make}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Car Model:</span>
                  {order.car.model}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Car Year:</span>
                  {order.car.year}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Price/Day:</span>
                  {order.car.pricePerDay}
                </div>

          </div>

          <div className={Styles.minicontainer2}>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Location Name:</span>
                  {order.car.location.name}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Location City:</span>
                  {order.car.location.city}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Location State:</span>
                  {order.car.location.state}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Location Country:</span>
                  {order.car.location.country}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Latitude:</span>
                  {order.car.location.latitude}
                </div>
                <div className={Styles.orderItem}>
                  <span className={Styles.label}>Longitude:</span>
                  {order.car.location.longitude}
                </div>
          </div>

          <div className={Styles.minicontainer3}>
              <div className={Styles.orderItem}>
                 
                  <img
                    src={order.car.photo}
                    alt={`${order.car.make} ${order.car.model}`}
                    className={Styles.carPhoto} 
                  />
                </div>
          </div>
          
        </div>
      );
    });
  };

  return (
    <div className={Styles.container}>
      <Navbar />
      <div className={Styles.minicontainer}>
        <h1 className={Styles.title}> Orders</h1>
        {loading && <div className={Styles.loading}>"Loading..."</div> }
        {error ?  <div className={Styles.error}>{error}</div> : <></>}
        <div className={Styles.orders}>{showOrders()}</div>
        {reached ? <>reached end</> : <></>}
      </div>
      
    </div>
  );
};

interface Location {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: string;
  photo: string;
  location: Location;
}

interface Booking {
  id: number;
  bookingDate: string;
  cardType: string;
  cardNumber: string;
  cardHolderName: string;
  car: Car;
}

export default CustomerOrders;
