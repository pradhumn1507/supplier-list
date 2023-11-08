// SupplierCard.js
import React from 'react';

function SupplierCard({ supplier }) {
  return (
    <div className="supplier-card">
      <div className="supplier-info">
        <h3>{supplier.category}</h3>
        <p>Channel: {supplier.channel}</p>
        <p>Description: {supplier.request_description}</p>
        <p>Contact Numbers: {supplier.contact_numbers}</p>
        <p>State: {supplier.state}</p>
        <p>District: {supplier.district}</p>
        <p>Source Time: {supplier.source_time}</p>
      </div>
    </div>
  );
}

export default SupplierCard;
