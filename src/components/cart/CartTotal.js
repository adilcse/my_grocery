import React from 'react';
const CartTotal=(props)=>{
    if(!props){
        return(<></>);
    }
    const{countItems,total,deleveryCharges}=props.item;

const inRupee=(amount)=>{
    return new Intl.NumberFormat('en-IN').format(amount)
}
return(
    <div className="_3CKRe3">
        <div className="_13wOiu">
            <span className="_2huYiT">Price details</span>
            <div className="_2twTWD"><div className="hJYgKM">
            <div>Price ({countItems} {countItems===1?' item':' items'})</div><span> ₹{inRupee(total)}</span></div>
                <div className="hJYgKM">
                    <div>Delivery Fee</div>
                <span><span className="_27kB8M _3Oa-sk">{deleveryCharges===0?'Free':inRupee(deleveryCharges)}</span></span>
                </div>
                <div className="_3xFQAD">
                    <div className="hJYgKM">
                        <div>Total Payable</div>
                        <span> ₹{inRupee(total)}</span>
                    </div>
                </div>
            </div>
            <div className="_22vQVX">You will save ₹{inRupee(total*0.1)} on this order</div>
        </div>
    </div>
)

}
export default CartTotal;