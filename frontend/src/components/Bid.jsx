import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { getaxios, getformaxios } from '../utility/Request';

const Bid = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const tender = JSON.parse(localStorage.getItem("tender"));
    const [bid, setbid]=useState({contractor: user,name: '',rawcost: '', orgproject : '',totalprojects : '',monthsofvalidity : '',timequoted:'',contractorclass : '', cementcost: '', steelcost: '', brickcost: ''});
    const handlechange=(e)=>{
        const {name,value} = e.target;
        setbid({
            ...bid,
            [name]: value,
          });
    }
    const handleclick=async()=>{
        
        const body={
          bid: bid,
          tenderid: tender.id,
          contractorid: user.contractor.id
        }
        console.log(body);
        const api = getaxios();
        const response = await api.post("/addbid", body);
        console.log(response.data);
    }
  return (
    <div className='relative'>
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8">Tender Name</h1>
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4 flex flex-col">
            <TextField label={"name"}name='name' onChange={handlechange}></TextField>
            <TextField label={"rawcost"}name='rawcost'onChange={handlechange}></TextField>
            <TextField label={"orgproject"}name='orgproject'onChange={handlechange}></TextField>
            <TextField label={"totalprojects"}name='totalprojects'onChange={handlechange}></TextField>
            <TextField label={"monthsofvalidity"}name='monthsofvalidity'onChange={handlechange}></TextField>
            <TextField label={"timequoted"}name='timequoted'onChange={handlechange}></TextField>
            <TextField label={"contractorclass"}name='contractorclass'onChange={handlechange}></TextField>
            <TextField label={"cementcost"}name='cementcost'onChange={handlechange}></TextField>
            <TextField label={"steelcost"}name='steelcost'onChange={handlechange}></TextField>
            <TextField label={"brickcost"}name='brickcost'onChange={handlechange}></TextField>
            <Button variant='contained' onClick={handleclick}>Bid</Button>
        </div>
        </div>
    </div>
  )
}

export default Bid