import React, { useEffect, useState, useCallback } from "react";

import "./Content1.css";

import axios from "axios";
import Divider from "@mui/material/Divider";


import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Button from "@mui/material/Button";
import { CompressOutlined, Margin } from "@mui/icons-material";
// import { listClasses } from "@mui/material";
import { FloatingButton, Item } from "react-floating-button";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Lists from "../List.js/List";
import ApiCaller from "../../../ApiCaller/ApiCaller";
const NewsContent2 = () => {
  const [Index, setIndex] = useState(null);
  const [menu_type, setMenu_type] = useState([]);
  const [List, setList] = useState([]);
  
  const [restaurant,setRestaurant] = useState({})
  console.log(restaurant,"plan222res")

  const [ImgLink, setImgLink] = useState("");
  const [SpcLink, setSpcLink] = useState("");
 
  const [isVisible, setIsVisible] = useState(true);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [show,setShow]= useState(false)
  
  

  const caller = (index) => {
    setList(menu_type[index]?.arr_cat);
   
    console.log(menu_type, index);
    setIndex(index);
    setCurrentListIndex(index);
    setShow(!show)
  };

  // const OrderReceiver = (id, name, price) => {
  //   let OrderArray = [...Orders, { id, name, price }];
  //   setOrders(OrderArray);
  // };

  // const OrderReducer = (id, name, price) => {
  //   // console.log("blah");
  //   const itemToBeRemoved = { id: id, name: name, price: price };
  //   let apps = Orders;
  //   const findIndex = apps.findIndex((a) => a.id === itemToBeRemoved.id);
  //   findIndex !== -1 && apps.splice(findIndex, 1);
  //   setOrders([...apps]);
  // };
 
  // console.log("Orders are", Orders);

  // const ItemCounter = (id, name, price) => {
  //   let count = 0;
  //   Orders.map((item) => {
  //     if (item?.id == id && item?.name == name && item?.price == price) {
  //       count = count + 1;
  //     }
  //   });
  //   return count;
  // };
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    // console.log(id);
    ApiCaller(id)
      .then((Response) => {
        console.log("Response from server", Response.data?.data);
        // console.log(Response.data?.data[0]?.restaurant[0]?.name);
        // console.log(Response.data?.data?.restaurant[0]?.name);
        // setShopName(Response.data?.data?.restaurant[0]?.name);
        setMenu_type(Response.data?.data?.menu);
        setRestaurant(Response.data?.data?.restaurant[0])
        // setImgLink(Response.data?.data?.arr_links?.menuitem_image);
        // setSpcLink(Response.data?.data?.arr_links?.menuitem_icons);
        // caller(0);
        // setList(menu_type[0]?.list);
        // caller(0);
        // if (menu_type.length !== 0) {
        //   console.log("hi");
        // }
      
      });
    // .then(() => {
    //   addTodo();
    // });
  }, []);
  useEffect(() => {
    const scanFunction = async () => {
      if (restaurant.id) {
        const onScan = {
          restid: restaurant.id,
          Device: "",
          Location: "",
          Status: restaurant.status,
          Rank: restaurant.rank,
          CUser: restaurant.cUser,
        };
        try {
          await axios.post('https://plankton-app-ovujs.ondigitalocean.app/routes/onscan', onScan);
        } catch (error) {
          console.log(error);
        }
      }
    };
    
    scanFunction();
  }, [restaurant.id]);


  const summaryStyle ={display: show ?"block":'none'}
  // const addTodo = useCallback(() => {
  //   console.log(menu_type);
  // }, [menu_type]);

  // useEffect(() => {
  //   // caller(0);
  //   console.log("menu Appred", menu_type);
  //   if (menu_type.length !== 0) {
  //     console.log("hi");
  //     caller(0);
  //   }
    
  // }, [menu_type]);

  //caller(0);
  const handleClick = () => {
    setIsVisible(!isVisible);
  }
  return (
    <div className="main">
    <div className="menu">
    {menu_type.map((item, index) => (
        
        <ul className="listWrap" style={{
            color: Index == index ? "orange" : "black",
            backgroundColor: Index == index ? " #595959" : "white",
            fontSize: "23px",
            fontWeight:"700"
        }}>
        <li  className="itemList" 
        onClick={()=>{caller(index)}} 
         style={{
             
           
          display:"flex",
            alignItems:"center",
            justifyContent:"center",
           
           width:"100%",


          justifyContent:"space-between",
           borderBottom:"0.1px solid black"
         
           
           }}> {item?.type_name}
           <IconButton aria-label="delete">
{show && Index == index ? <ExpandLessIcon color='warning'/>: <ExpandMoreIcon/>}
</IconButton>
          
           </li>
          <div style={{backgroundColor:"white" ,width:"100%"}}>{Index == index && show  && <Lists  style={summaryStyle}  List={List}/>}</div> 
        </ul>
      

       ))}
       </div>
    </div>
  );
};    

export default NewsContent2;

// {/* <div style={{display: "flex",  alignItems: "center",justifyContent:"center" ,gap:"1rem"}}>
// <p
//     style={{
//       color: "orange", fontWeight: "bold",
//       cursor: "pointer"
//     }}
     
//   onClick={() => {
//     OrderReducer(item?.id, item?.name, item?.price);
//   }}
//   >
//     -
//   </p>
// <div
//   style={{
//     height: 20,
   
//     // width: 80,
//     backgroundColor:
//       ItemCounter(item?.id, item?.name, item?.price) !== 0
//         ? "green"
//         : "grey",
   
//     cursor: "pointer",
//   }}
//   onClick={() => {
//     OrderReceiver(item?.id, item?.name, item?.price);
//   }}
// >
//   {/* <p style={{ color: "white" }}>-</p> */}
//   <p
//     style={{
//       marginTop: -0.5,
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       paddingLeft: 5,
//       paddingRight: 5,
//       // marginLeft: 5,
//     }}
//   >
//     {ItemCounter(item?.id, item?.name, item?.price)}
//   </p>
  
// </div>
// <p
//     style={{
      
//       color: "orange",
//       fontWeight: "bold",
//       cursor: "pointer"
     
//     }}
//     onClick={() => {
//     OrderReceiver(item?.id, item?.name, item?.price);
//   }}
//   >
//     +
//   </p>
// </div>
//  */}