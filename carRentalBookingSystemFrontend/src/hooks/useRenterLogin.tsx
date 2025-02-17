import { useState } from "react";

const useRenterLogin = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const loginRenter=()=>{

  }
  return [error,loading,loginRenter]
}

export default useRenterLogin