// components/OfferList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfferList = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(`/api/offers/nearby?latitude=${latitude}&longitude=${longitude}`);
            setOffers(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Nearby Offers</h2>
            <ul>
                {offers.map(offer => (
                    <li key={offer._id}>{offer.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default OfferList;
