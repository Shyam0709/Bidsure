import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import Approvecard from './Approvecard';
import { getformaxios } from '../utility/Request';

const Final = () => {
    const [box, Setbox] = useState(false);
    const [tenders, Settenders] = useState([]);
    const [list, Setlist] = useState([]);
    const [invalid, Setinvalid] = useState([]);
    const [selectedid, Setselectedid] = useState('');
    const [sortConfig, setSortConfig] = useState({ field: 'rawcost', direction: 'asc' });
    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch tenders on component load
    useEffect(() => {
        const fetchtender = async (user) => {
            const api = getformaxios();
            const form = new FormData();
            form.append('userid', user.id);
            const response = await api.post('/tenderlist', form);
            Settenders(response.data);
        };
        fetchtender(user);
    }, []);

    // Fetch bids based on selected tender
    useEffect(() => {
        const fetchbids = async () => {
            try {
                const api = getformaxios();
                const formdata = new FormData();
                formdata.append('id', selectedid);
                const response = await api.post('/availabetenderbids', formdata);
                Setlist(response.data.bids);
                Setinvalid(response.data.invalidBids);
            } catch (error) {
                console.error('Error fetching bids:');
            }
        };
        if (selectedid) fetchbids();
    }, [selectedid]);

    // Handle sorting logic
    const handleSort = (e) => {
        const [field, direction] = e.target.value.split(':');
        setSortConfig({ field, direction });

        const sortedData = [...list].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            // Numeric comparison
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // String comparison
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        Setlist(sortedData);
    };

    // Handle tender selection
    const handleselect = (value) => {
        Setselectedid(value);
    };

    return (
        <div className='relative bg-black'>
            <div className='h-[10vh] bg-gradient-to-r from-blue-500 to-green-50'></div>
            <div className='h-[90vh] p-5'>
                <h2 className='font-semibold text-3xl text-center text-white mb-6'>Shortlisted Contracts</h2>
                <div className='flex flex-wrap justify-center gap-6'>
                    {tenders.map((tender, index) => (
                        <div className='bg-white p-4 rounded-lg shadow-lg w-[200px]' key={index}>
                            <Approvecard handleclick={() => Setbox(true)} tender={tender} onclick={handleselect} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sort dialog box */}
            {box && (
                <div className='absolute bottom-[15vh] left-[10vw] w-[80vw] md:w-[40vw] bg-white rounded-lg shadow-lg p-5'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>Sort Options</h3>
                    <div className='flex flex-col space-y-5'>
                        <label htmlFor='sort-select' className='text-gray-700'>Sort By:</label>
                        <select
                            id='sort-select'
                            onChange={handleSort}
                            className='border-2 border-gray-300 rounded-md px-3 py-2'>
                            <option value='rawcost:asc'>Raw Cost (Ascending)</option>
                            <option value='rawcost:desc'>Raw Cost (Descending)</option>
                            <option value='orgproject:asc'>Org Project (Ascending)</option>
                            <option value='orgproject:desc'>Org Project (Descending)</option>
                            <option value='timequoted:asc'>Time Quoted (Ascending)</option>
                            <option value='timequoted:desc'>Time Quoted (Descending)</option>
                        </select>
                    </div>
                    <div className='mt-6 overflow-y-auto max-h-[200px]'>
                        {list.map((value, index) => (
                            <div
                                key={index}
                                className='bg-black text-white flex justify-between items-center py-3 px-4 mb-2 rounded-lg'>
                                <div className='truncate'>{value.name}</div>
                                <div>{value?.[sortConfig.field]}</div>
                                <Button
                                    variant='contained'
                                    color='error'
                                    className='text-xs rounded-md'
                                    onClick={() => console.log('Delete action')}>
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Invalid Bids */}
            {invalid.length > 0 && (
                <div className='absolute top-[50vh] right-5 w-[50vw] md:w-[30vw] bg-white p-4 rounded-lg shadow-lg'>
                    <h3 className='text-xl font-semibold text-red-500 mb-4'>Invalid Bids</h3>
                    {invalid.map((value, index) => (
                        <div key={index} className='bg-black text-white flex justify-between items-center py-3 px-4 mb-2 rounded-lg'>
                            <div>{value.name}</div>
                            <div>{value.bid.name}</div>
                            <div>{value.message}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Final;
