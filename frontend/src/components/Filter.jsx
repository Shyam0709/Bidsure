import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import Approvecard from './Approvecard'; // Assuming Approvecard is your card component
import { getformaxios } from '../utility/Request';

const Filter = () => {
  const [box, Setbox] = useState(false);
  const [tenders, Settenders] = useState([]);
  const [progress, setProgress] = useState(0); // Track progress of filtering
  const [isFiltering, setIsFiltering] = useState(false); // To trigger filtering state
  const [isFinished, setIsFinished] = useState(false); // To determine when filtering is done
  const [selectedid, Setselectedid] = useState('');
  const [list, Setlist] = useState([]);
  const [invalid, Setinvalid] = useState([]);
  const navigate = useNavigate(); // Hook to navigate between pages
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage

  // Fetching tenders data
  useEffect(() => {
    const fetchtender = async () => {
      const api = getformaxios();
      const form = new FormData();
      form.append('userid', user.id);
      const response = await api.post('/tenderlist', form);
      console.log(response.data);
      Settenders(response.data);
    };
    fetchtender();
  }, []);

  // Handle filter button click
  const handleFilterButtonClick = () => {
    setIsFiltering(true);
    let step = 1;
    const interval = setInterval(() => {
      setProgress(step);
      if (step === 5) {
        clearInterval(interval);
        setIsFinished(true);
        // Redirect to Final page after filtering is done
        setTimeout(() => navigate('/final'), 1000); // Wait 1 second before navigation
      } else {
        step++;
      }
    }, 1000); // Update progress every 1 second
  };

  // Handle selecting a tender
  const handleselect = (value) => {
    Setselectedid(value);
  }

  useEffect(()=>{
    const fetchbids = async() => {
        try {
            const api = getformaxios();
      const formdata = new FormData();
      formdata.append('id', selectedid);
      const response = await api.post('/availabetenderbids', formdata);
      console.log(response.data);
      Setlist(response.data.bids);
      Setinvalid(response.data.invalidBids);
        } catch (error) {
            console.log("error");
        }
      
    };
    fetchbids();
  },[selectedid])
    
  

  return (
    <div className="relative">
      {/* Main content */}
      <div className="h-[10vh] bg-black"></div>
      <div className="h-[90vh]">
        <div className="font-semibold text-2xl text-white mb-10 text-center ">BIDDED CONTRACTS</div>
        <div className="flex flex-row space-x-5 w-[100vw] justify-center">
          {tenders.map((tender, index) => (
            <div className="ml-5" key={index}>
              <Approvecard handleclick={() => Setbox(true)} tender={tender} onclick={handleselect} />
            </div>
          ))}
        </div>
      </div>

      {/* Sort dialog box */}
      {box && (
        <div className="absolute top-[30vh] left-[50%] transform -translate-x-[50%] space-x-4 flex-row">
          <div className="bg-white h-[50vh] w-[40vw] flex flex-col rounded-lg justify-center items-center">
            <div className='flex flex-col'>
                {list.map((value,index)=>(
                    <div key={index}
                    className='bg-black text-white flex justify-between items-center py-3 w-[25vw] px-4 mb-2 rounded-lg'>
                        <div className='truncate'>{value.name}</div>
                        <div>{value.rawcost}</div>
                    </div>
                ))}
                {invalid.map((value,index)=>(
                    <div key={index}
                    className='bg-black text-white flex justify-between items-center py-3 w-[25vw] px-4 mb-2 rounded-lg'>
                        <div className='truncate'>{value.bid.name}</div>
                        <div>{value.bid.rawcost}</div>
                    </div>
                ))}
            </div>
            <Button variant="contained" className="mt-4" onClick={handleFilterButtonClick}>
              Filter
            </Button>
          </div>
        </div>
      )}

      {/* Blank Page (Full-Screen Div) during Filtering */}
      {isFiltering && (
        <div className="absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center">
          {!isFinished ? (
            <div className="space-y-4 text-center">
              <div className="text-white">Loading...</div>
              <div className="text-white">Filtering {progress} out of 5 bids</div>
              <div className="text-white">Please wait...</div>
              {/* Circular loading symbol */}
              <div className="w-16 h-16 border-4 border-t-4 border-white border-solid ml-[6vh] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="text-white">Processing completed, redirecting...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
