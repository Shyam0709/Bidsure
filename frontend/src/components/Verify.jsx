import React, { useEffect, useRef, useState } from 'react'
import Approvecard from './Approvecard'
import { Button } from '@mui/material';
import { getaxios, getformaxios } from '../utility/Request';
import axios from 'axios';

const Filter = () => {
    const [box,Setbox] = useState(false);
    const [tenders, Settenders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [sortConfig, setSortConfig] = useState({ field: "rawcost", direction: "asc" });
    const [list,Setlist] = useState([]);
    const isrunnable = useRef(false);
    const [selectedid, Setselectedid] = useState('');
    const [invalid, Setinvalid] = useState([]);
    useEffect(()=>{
        const fetchtender=async(user)=>{
            const api = getformaxios();
            const form = new FormData();
            console.log(user.id);
            form.append("userid", user.id);
            const response = await api.post("/tenderlist",form);
            console.log(response.data);
            Settenders(response.data);
            
        }
        fetchtender(user);
    },[]);
    useEffect(()=>{
        const fetchbids=async()=>{
            try {
                const api = getformaxios();
            const formdata = new FormData();
            formdata.append("id", selectedid);
            console.log(tenders.id);
            const response = await api.post("/availabetenderbids", formdata);
            console.log(response.data);
            Setlist(response.data.bids);
            Setinvalid(response.data.invalidBids)
            } catch (error) {
                console.log("error");
            }
            
        }
        fetchbids()
    },[box]);
    const handleSort = (e) => {
        const [field, direction] = e.target.value.split(":");
        setSortConfig({ field, direction });

        const sortedData = [...list].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            // Check if the field is an integer
            if (typeof aValue === "number" && typeof bValue === "number") {
                return direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            // Default string comparison
            if (aValue < bValue) return direction === "asc" ? -1 : 1;
            if (aValue > bValue) return direction === "asc" ? 1 : -1;
            return 0;
        });

        Setlist(sortedData);
        console.log(sortedData);
    };
    const handleselect=(value)=>{
        Setselectedid(value);
    }
  return (
    <div className='relative'>
        <div className='h-[10vh] bg-white'></div>
        <div className='h-[90vh]'>
        <div className='font-semibold text-2xl mb-5'>Created Contracts</div>
            <div className='flex flex-row space-x-5 w-[100vw] justify-center'>
            {tenders.map((tender,index)=>(
                 <div className='ml-5'>
                 <Approvecard key={index} handleclick={()=>{Setbox(true)}} tender={tender} onclick={handleselect}/>
                 </div>
            )) }
                </div>
        </div>
        {box && 
        <div className='absolute bottom-[25vh] left-[30vw] space-x-4 flex-row'>
        <div className='bg-white h-[50vh] w-[40vw] flex flex-row rounded-lg'>
            <div className='w-[12vw] h-full flex flex-col space-y-7'>
                 <div>Sort</div>
                 <div>
                <label htmlFor="sort-select">Sort By: </label>
                <select id="sort-select" onChange={handleSort}>
                    <option value="rawcost:asc">rawcost (Ascending)</option>
                    <option value="rawcost:desc">rawcost (Descending)</option>
                    <option value="orgproject:asc">orgproject (Ascending)</option>
                    <option value="orgproject:desc">orgproject (Descending)</option>
                    <option value="timequoted:asc">timequoted (Ascending)</option>
                    <option value="timequoted:desc">timequoted (Descending)</option>
                </select>
            </div>

            </div>
            <div className='h-[50vh] w-full overflow-y-scroll flex justify-end'>
                <div className='mt-[5vh] space-y-5'>{
                    list.map((value,index)=>(
                        <div key={index}>
                            <div className='bg-black w-[20vw] flex text-white flex-row justify-around'>
                                <div>{value.name}</div>
                                <div>{value?.[sortConfig.field]}</div>
                                <div><Button variant='contained'>Delete</Button></div>
                            </div>
                        </div>
                    ))
                    }</div>
            </div>
        </div>
        
        </div>
        }
        <div className='bg-white h-[50vh] w-[50vh] absolute right-5 top-[25vh] flex flex-col items-center justify-center'>
            <div className='space-y-4'>
                {invalid.map((value,index)=>(
                    <div key={index}>
                        <div className='bg-black w-[20vw] flex text-white flex-row justify-between'>
                                <div>{value.name}</div>
                                <div>{value.bid.name}</div>
                                <div>{value.message}</div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Filter