import "./App.css";
import Footer from "./components/Footer/Footer";
import NavQuana from "./components/NavQuana";
import NewsContent4 from "./components/Content/Content";
import NewsContent1 from "./plan1/components/Content/Content"
import NewsContent3 from "./plan3/components/Content/Content"

import axios from "axios";
import { useEffect, useState } from "react";
import NewsContent2 from "./plan2/components/Content/Content";
import ApiCaller from "./ApiCaller/ApiCaller";


// import { Values } from "./Context/ContextTab";
// import React from "react";

function App() {
  const [planId,setPlanId]=useState(null)
  const [shopName,setShopName]=useState("")
  const [brand,setBrandName]=useState("")
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    // console.log(id);
    
    ApiCaller(id)
      .then((Response) => {
        console.log("Response from server", Response.data?.data);
        // console.log(Response.data?.data[0]?.restaurant[0]?.name);
        // console.log(Response.data?.data?.menu);
        //console.log(Response.data?.data?.menu?.arr_cat);

       setPlanId(Response.data?.data?.restaurant[0]?.plan.plan_id);
       setShopName(Response.data?.data?.restaurant[0]?.name);
       setBrandName(Response.data?.data?.restaurant[0]?.brand);

        
        
      });
    
  }, [planId])
  return (
    <div className="App">
      <NavQuana shopName={shopName} brand={brand}/>
      {planId===1&&<NewsContent1 />} 
      {planId===2&& <NewsContent2/>} 
      
     { planId===3&&<NewsContent3/>} 
     {planId===4&&<NewsContent4/>} 

    </div>
  );
}

export default App;
