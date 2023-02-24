import { PayPalButtons } from '@paypal/react-paypal-js'
import React, { useState } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import swal from "sweetalert";


function Paypal(props) {
    const userDetails=props.personal
    

    const [paidFor,setPaidFor]=useState(false)
    const [error,setError]=useState(null)

    const handleApprove=(orderId)=>{
        
        setPaidFor(true)
    }
    if(paidFor){
        swal("Good job!", "Thank you for your purchase!", "success");
    }
    if(error){
        swal("OOPS!!", "Something error!!", "error");
    }

    return (
        <PayPalScriptProvider options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENTID}}>
        <PayPalButtons 
        style={{
            color:"gold",
            layout:"horizontal",
            height:48,
            tagline:false,
            shape:"pill"
        }}
        onClick={(data,actions)=>{
            const hasAlreadyBoughtCource=false;
            if (hasAlreadyBoughtCource) {
                setError("You already bought this booking. Go to your account view your list of booking")
                return actions.reject()
            } else{
                return actions.resolve()
            }
        }}
        createOrder={(data,actions)=>{
            return actions.order.create({
                purchase_units:[
                    {
                        description:"hotel booking successfully",
                        amount:{
                            value:userDetails
                        }
                    }
                ]
            })
        }}
        onApprove={async(data,actions)=>{
            // const order=await actions.order.capture();
            // console.log("order",order);
            // setPaidFor(true)
            // handleApprove(data.orderID);
            return actions.order.capture().then((details)=>{
                console.log("order",details);
                setPaidFor(true)
                console.log(details.orderID);
                handleApprove(details.orderID);
            })

        }}
        onError={(err)=>{
            setError(err);
            console.log("Paypal Checkout onError",err);
        }}
        onCancel={()=>{
            swal("Payment is canceled!", "You clicked the button!", "info");
        }}
        />
        </PayPalScriptProvider>
    )
}

export default Paypal