import React, { useState } from 'react';
import './EditAddress.css'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import {LOGIN, ADDRESS, PAYMENT, INPUT_NUMBER, INPUT_NAME, INPUT_PIN, INPUT_LANDMARK, INPUT_LOCALITY, INPUT_ADDRESS, INPUT_CITY, INPUT_STATE, INPUT_ALTERNATE} from '../../app/constants';
let touched={
  name:false,
  number:false,
  pin:false,
  locality:false,
  address:false,
  city:false,
  state:false,
  landmark:false,
  alternate:false

};
let errors={
  name:true,
  number:true,
  pin:true,
  locality:true,
  address:true,
  city:true,
  state:true,
  landmark:false,
  alternate:false

};
const EnterAddress=(props)=>{
  const [name,setName]=useState('');
  const [number,setNumber]=useState('')
  const [pin,setPin]=useState('')
  const [locality,setLocality]=useState('')
  const [address,setAddress]=useState('')
  const [city,setCity]=useState('')
  const [state,setState]=useState('1')
  const [landmark,setLandmark]=useState('')
  const [alternate,setAlternate]=useState('')
  const [updated,setUpdated]=useState(true);
    const handleSubmit=()=>{
      let correct=true;
     Object.keys(errors).forEach((key,index)=>{
        touched[key]=true;
        if(errors[key])
          correct=false;
     });
     console.log(errors)
     if(correct)
        deleverToThisAddress();
     setUpdated(!updated);
    }
    const deleverToThisAddress=()=>{
      let fullAddress={
        name:name,
        mobile:number,
        locality:locality,
        pin:pin,
        address:address,
        city:city,
        state:state,
        landmark:landmark,
        alternate:alternate
      }
      console.log(fullAddress);
      props.setValidAddress(true,fullAddress);
    }
    const handleChange=(element)=>{
      let val=element.target.value;
      let regex = /^[a-zA-Z ]{3,}$/;
      switch(element.target.id){
        case INPUT_NAME:
          touched.name=true;
          if(regex.test(val))
            errors.name=false;
            else
              errors.name=true;
          setName(val);
          break;
        case INPUT_NUMBER:
          regex = /^[0-9]{10}$/;
          touched.number=true;
          if(regex.test(val))
            errors.number=false;
            else
              errors.number=true;
            setNumber(val);
          break;
        case INPUT_PIN:
          regex = /^[0-9]{6}$/;
          touched.pin=true;
          if(regex.test(val))
            errors.pin=false;
            else
              errors.pin=true;
            setPin(val);
          break;  
        case INPUT_LOCALITY:
          regex = /^[0-9a-zA-Z\-, ]{3,}$/;
          touched.locality=true;
          if(regex.test(val))
            errors.locality=false;
            else
              errors.locality=true;
            setLocality(val);
          break;    
        case INPUT_ADDRESS:
          regex = /^[0-9a-zA-Z\-, \n]{3,}$/;
          touched.address=true;
          if(regex.test(val))
            errors.address=false;
            else
              errors.address=true;
            setAddress(val);
          break;  
        case INPUT_CITY:
          regex = /^[a-zA-Z\-, ]{3,}$/;
          touched.city=true;
          if(regex.test(val))
            errors.city=false;
            else
              errors.city=true;
            setCity(val);
          break;            
        case INPUT_STATE:
          touched.state=true;
          if(val!=1)
            errors.state=false;
            else
              errors.state=true;
            setState(val);
          break;         
        case INPUT_LANDMARK:
          touched.landmark=true;
            errors.landmark=false;
            setLandmark(val);
          break;
        case INPUT_ALTERNATE:
          regex = /^[0-9]{10}$/;
          touched.alternate=true;
          if(regex.test(val)|| val=='')
            errors.alternate=false;
            else
              errors.alternate=true;
            setAlternate(val);
          break;               
          
      }
    }

  
return(
<div className="address">
    <div>
    <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_NAME}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type='invalid'>Please Enter valid Name</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_NUMBER}>
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="MobileNumber"
              value={number}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              isValid={touched.number && !errors.number}
              isInvalid={touched.number && errors.number}
              maxLength={10}
            
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Mobile Number
            </Form.Control.Feedback>
          </InputGroup>
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_PIN}>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder='PIN'
                value={pin}
                onChange={handleChange}
                isValid={touched.pin && !errors.pin}
                isInvalid={touched.pin && errors.pin}
                maxLength={6}
              />
              <Form.Control.Feedback type='invalid'>Please Enter correct pin code</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_LOCALITY}>
              <Form.Label>Locality</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Locality"
              aria-describedby="inputGroupPrepend"
              value={locality}
              onChange={handleChange}
              isValid={touched.locality && !errors.locality}
              isInvalid={touched.locality && errors.locality}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
         
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} md='12' controlId={INPUT_ADDRESS}>
            <Form.Label>Address (Area and Street)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3"
              value={address}
              onChange={handleChange}
              isValid={touched.address && !errors.address}
              isInvalid={touched.address && errors.address}
               />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="6" controlId={INPUT_CITY}>
            <Form.Label>City/District/Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={handleChange}
              isValid={touched.city && !errors.city}
              isInvalid={touched.city && errors.city}
              
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your City
            </Form.Control.Feedback>
            </Form.Group>  
            <Form.Group as={Col} md='6' controlId={INPUT_STATE}>
            <Form.Label>State</Form.Label>
            <Form.Control as="select" 
              value={state}
              onChange={handleChange}
              isValid={touched.state && !errors.state}
              isInvalid={touched.state && errors.state}
              >
            <option value='1'>---SELECT STATE---</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>        
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_LANDMARK}>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                placeholder='Landmark (Optional)'
                value={landmark}
                onChange={handleChange}
                isValid={touched.landmark && !errors.landmark}
                isInvalid={touched.landmark && errors.landmark}
                maxLength={20}
              />
              <Form.Control.Feedback type='invalid'>Enter valid landmark</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_ALTERNATE}>
              <Form.Label>Alternate Number</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Alternate Number"
              aria-describedby="inputGroupPrepend"
              value={alternate}
              onChange={handleChange}
              isValid={touched.alternate && !errors.alternate}
              isInvalid={touched.alternate && errors.alternate}
              maxLength={10}
            
            />
             <Form.Control.Feedback type='invalid'>Enter valid number (Optional)</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button variant="warning" size='lg' onClick={handleSubmit}>Delever to this Address</Button>
          </Form>     
    </div>
</div>     
          
)
}
export default EnterAddress;