import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@mui/system";
import "./plan3.css";

import axios from "axios";
import Divider from "@mui/material/Divider";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Button from "@mui/material/Button";
import { CompressOutlined } from "@mui/icons-material";
// import { listClasses } from "@mui/material";
import { FloatingButton, Item } from "react-floating-button";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import veg from "../../assets/vegs.png"
import nonveg from "../../assets/non-veg.png"
import Card from "../Card/Card";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ApiCaller from "../../../ApiCaller/ApiCaller";
//import Card from '@mui/material/Card';

const NewsContent3 = () => {
  const [Index, setIndex] = useState(null);
  const [menu_type, setMenu_type] = useState([]);
  const [List, setList] = useState([]);
  const [restaurant,setRestaurant] = useState({})
  const [ImgLink, setImgLink] = useState("");
  const [SpcLink, setSpcLink] = useState("");
  const [show,setShow] = useState(false);
  const [catid,setCatId]=  useState("");
  const [filter,setFilter]=  useState(false);
const [items, setItems] = useState([]);
const [isChecked, setIsChecked] = useState(false);
const[bottom ,setBottom]= useState(false);

  


  const caller = (index) => {
    setList(menu_type[index]?.arr_cat);
    setShow(!show)
    console.log(menu_type, index);
    setIndex(index);
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
        console.log(Response.data?.data?.menu);
        //console.log(Response.data?.data?.menu?.arr_cat);

      //  setShopName(Response.data?.data?.restaurant[0]?.name);
        setMenu_type(Response.data?.data?.menu);
        setRestaurant(Response.data?.data?.restaurant[0]);
        //setImgLink(Response.data?.data?.arr_links?.menuitem_image);
        //setSpcLink(Response.data?.data?.arr_links?.menuitem_icons);
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
  console.log(menu_type.arr_cat,"menu")

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

  // caller(0);
  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
    setFilter(false)
  }

  return (
    <div style={{position: 'relative', minHeight: '100vh'}}>
    {!show && <div>
      {/* <div> */}
     
      <div className="wrap-container" >
          {menu_type.map((item, index) => (
           
            <div
              className="wrap"
              style={{
                backgroundColor: "black",
                textDecorationLine: "underline",
                borderBottomColor: Index == index ? "orange" : "#d0d0d0",
                borderWidth: 10,
                cursor: "pointer",
                width:"100%"
            
              
              }}
              // onClick={caller(0)}
              onClick={() => {
                caller(index);
              }}
            >
           
              <div className="menu">
                <p
                  style={{
                    color: Index == index ? "orange" : "#d0d0d0",
                    paddingLeft: 5,
                    paddingRight: 10,
                    fontWeight: "bold",
                    // fontFamily: "Trirong",
                    fontSize: 25,
                  }}
                >
                  {item?.type_name}
                  {console.log(item.arr_cat,"menusssssss")}
                </p>
              </div>
              {/* <div style={{ width: 5, height: 5, backgroundColor: "red" }}></div> */}
            </div>
           
          ))}
          {List?.length == 0 ? (
        
        
        <p style={{ color: "gray" , display: "flex",
          justifyContent: "center",
          fontWeight:100,
          fontSize:12,
          alignItems: "center",}}>Please Select a tab!!</p>
     
    ) : "" }
          </div>
          </div>}
     
     
      {/* </div> */}


    

      
{console.log(List,"lissssssss")}
{show && <div className="mains">
<div className="vegonly">



{console.log(filter,"filter")}
<div style={{
  display:"flex",
  justifyContent:"space-between",
  alignItems:'flex-end',
  marginRight:"auto",
}} >

{show && <FormControlLabel control={<Switch defaultChecked color="success" checked={isChecked} onChange={handleSwitchChange}/>} label="Veg-only" />}
</div>
</div>
</div>}


 {/* {filter=== true && item.arr_items.filter(item => item.catid === catid).map(item => (
                <div key={item.id}>
                  <span>{item.name}</span>
                </div>
              ))} */}

      
      
     {filter===false && show && !isChecked && 
    
     <div className="mainContainers">
        {List.map((item, key) => {

       
          return (
            
        
            <div className="divs">
            
              <div className="allfoods"> 
              {item.arr_items.length>0 && (
            
                <div style={{margin:0}}>
                {item.arr_items.map((i)=>(
                  <Card>
              <div className="subcontainer" >
              
              <img  
                    src={i.image? i.image:"https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"}

                    alt="content Image"
                    style={{
                      width: "300px",
                      borderRadius: "15px",
                      
                      
                      height: 180}}

                  />
                  {console.log(i.image,"i.name")}

                

              <div className="lsName">
              <div style={{
                display:"flex",
                gap:"10px",
                alignItems:"center"

              }}>
              
              <img style={{width:25,height:25,marginTop:2}} src={i?.vegid=== 1 ? veg : nonveg} alt="veg"/>
              
              <span  style={{
                fontWeight: 800,
                fontSize:"25px",
                color:"orange"
                
              }}
              >{i.name}</span>
</div>
             <span style={{
                fontWeight: 800,
                fontSize:"18px",
                color:"gray"
                
              }}> ₹{i.price}</span>
            
              
              </div>

              <div className="desc" style={{ alignSelf: "flex-start" }}>
               <p style={{
                 fontStyle: "italic",
                 color:"gray",
                 fontWeight: 200,
               
                 
                  
                 

              }}>{i.description}
              
              </p>
              
              </div>
             
             
            
                
              </div>
              </Card>
             ))}
             </div>
             
       
              )}
           
</div>
  
</div>
           
             
             
            
          );
        })}
        </div>
       
        }
      

        {isChecked && show && 
        
        <div className="mainContainers">
        {List.map((item, key) => {
  return (
    <div key={key}  >
      {item.arr_items.map((i) => {
        if (i.vegid === 1 ) {

          return (
            <div key={i.id}>
             <Card>
              <div className="subcontainer" >
                <img  
                  src={i.image?i.image:"https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"}
                  alt="content Image"
                  style={{
                    width: "300px",
                    borderRadius: "15px",
                    height: 180
                  }}
                />
                 
                 <div className="lsName">
              <div style={{
                display:"flex",
                gap:"10px",
                alignItems:"center"

              }}>
              
              <img style={{width:25,height:25,marginTop:2}} src={i?.vegid=== 1 ? veg : nonveg} alt="veg"/>
              <span  style={{
                fontWeight: 800,
                fontSize:"25px",
                color:"orange"
                
              }}
              >{i.name}</span>
</div>
             <span style={{
                fontWeight: 800,
                fontSize:"18px",
                color:"gray"
                
              }}> ₹{i.price}</span>
            
              
              </div>
                <div className="desc" style={{ alignSelf: "flex-start" }}>
                  <p style={{
                    fontStyle: "italic",
                    color:"gray",
                 fontWeight: 200
                  }}>{i.description }</p>
                </div>
               
              </div>
              </Card>
            </div>
          );
        } {
          return null
            

          
        }
      })}
    </div>
    
  );
 
}

)}

        </div>
       }
      


        
      
      { show && <Button onClick={()=>{setShow(false);setFilter(false);setIsChecked(false);setBottom(false)}} style={{
        color:  "orange",
        fontSize:22,
        fontWeight:800,
        height:"60px",
        width:"350px",

      
        position: 'sticky',
        bottom:0,
        display: "flex",
        margin :"auto",
  
  
  

        
       
        backgroundColor:  "black",
      }}>back</Button>} 
      </div>
      
    
    
  );
};    

export default NewsContent3;
  {/* {filter=== true && item.arr_items.filter(item => item.catid === catid).map(item => (
                <div key={item.id}>
                  <span>{item.name}</span>
                </div>
              ))} */}
{/* 
             {filter===false && item.arr_items.map((i)=>(
              <div>
                <span>{i.name}</span>
              </div>
             ))} */}