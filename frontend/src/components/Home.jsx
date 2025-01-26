import React, { useEffect, useRef, useState } from 'react';
import { getauthaxios, getaxios, getformaxios } from '../utility/Request';
import { useReducer } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Input, TextField } from '@mui/material';
import { UserIcon, PlusCircleIcon } from "lucide-react";
import Tendercard from './Tendercard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, Setuser] = useState({});
  const isrunnable = useRef(false);
  const [verify, Setverify] = useState(false);
  const [experiance, Setexpiriance] = useState('')
  const [file, Setfile] = useState(null);
  const [tender, Settender] = useState({name: '',estimated: '', discription: '',deposit: '',time: ''});
  const [tenders, Settenders] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchuser=async()=>{
      const api = getaxios();
      const response = await api.get("/currentuser");
      localStorage.setItem("user", JSON.stringify(response.data));
      Setuser(response.data);
    };
    const fetchtender=async()=>{
      const api = getaxios();
      const response = await api.get("/availablecontarct");
      console.log(response.data);
      Settenders(response.data);
    }
    if(!isrunnable.current){
    fetchuser();
    fetchtender();
    isrunnable.current=true;
    }
  },[]);

  const handleaccountclick=()=>{
    Setverify(true);
  } 
  const handleclick=async()=>{
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("experiance", experiance);
    formdata.append("userid", user.id);
    const api = getformaxios();
    const response = api.post("/createcontract", formdata);
  }
  
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    
  
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const handletenderchange=(e)=>{
    const {name,value} = e.target;
    Settender({
      ...tender,
      [name]: value,
    });
  }
  const tenderclick=async()=>{
    const formdata = new FormData();
    formdata.append("userid", user.id);
    formdata.append("tender", JSON.stringify(tender));
    const api = getformaxios();
    const response = await api.post("/createtender", formdata);
    console.log(response.data);
  }
  return (
    <div>
      
      {user.role==='USER' && 
      
        <div className="text-white min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-[#00df9a]">BIDSURE</h1>
        <div className="flex items-center space-x-4">
          <UserIcon className="w-6 h-6 text-white cursor-pointer" />
          <Button onClick={toggleDialog} className="bg-blue-600 text-white">
            Add Tender
          </Button>
          <Button onClick={()=>navigate("/map")}>Land</Button>
        </div>
      </header>

      {/* Center Icon */}
      <div className="flex-grow flex items-center justify-center">
        {!isDialogOpen && (
          <PlusCircleIcon onClick={()=>navigate("/filter")} className="w-16 h-16 text-gray-500" />
        )}
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white text-[#00df9a]">

            <DialogTitle>Add New Tender</DialogTitle>
          
          <div className="space-y-4 flex flex-col">
            <Input placeholder="Tender Title" className="bg-gray-400 text-white" name='name' onChange={handletenderchange} />
            <Input placeholder="Description" className="bg-gray-400 text-white" name='discription' onChange={handletenderchange} />
            <Input placeholder="Budget" className="bg-gray-400 text-white" name='estimated' onChange={handletenderchange}/>
            <Input placeholder="Deadline" className="bg-gray-400 text-white" name='time' onChange={handletenderchange}/>
            <Input placeholder="deposit" className="bg-gray-400 text-white" name='deposit' onChange={handletenderchange}/>
            <Button className="bg-blue-600 text-white w-full" variant='contained' onClick={tenderclick}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
      
      }
      {user.role==='CONTRACTOR' &&
      <div className='h-[100vh]'>
        
      <div className='h-[10vh] flex  bg-white items-center px-4 justify-between'>
      <h1 className="text-2xl font-bold text-[#00df9a] flex justify-left bg-white  ">BIDSURE</h1>
        <div
          className='h-[4vh] w-[4vh] bg-black rounded-full flex items-center justify-center cursor-pointer'
          onClick={handleaccountclick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12c2.28 0 4.125-1.845 4.125-4.125S14.28 3.75 12 3.75 7.875 5.595 7.875 7.875 9.72 12 12 12z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 18.75h-9a4.5 4.5 0 019 0z"
            />
          </svg>
        </div>
        <div><div onClick={()=>navigate("/vendortools")}>Quotation</div></div>
      </div>
      {verify && (
        <div className='flex items-center justify-center h-[80vh] absolute z-10 left-[80vh]'>
        <div className='h-[30vh] w-[40vh] bg-white p-4 rounded-md shadow-md space-y-4'>
          <div>
            <TextField
              label={"Experience"}
              onChange={(e) => Setexpiriance(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => Setfile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
          <div>
            <button
              onClick={handleclick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              Submit
            </button>
          </div>
        </div>
        </div>
      )}
      <div className='min-h-screen w-[45vw] flex top-[20vh] items-center flex-col justify-center left-[25vw] absolute overflow-hidden space-y-4'>
        {tenders.map((value,index)=>(
          <div key={index} className='flex flex-col'>
          <div onClick={()=>{localStorage.setItem("tender", JSON.stringify(value));navigate("/bid")}}><Tendercard tender={value}/></div>
          </div>
        ))}
      </div>
    </div>
    
    
      }
      
    </div>
  );
};

export default Home;