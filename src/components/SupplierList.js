import React, { useState, useEffect } from 'react';
import SupplierCard from './SupplierCard';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ category: '', channel: '', state: '' });
  const [sort, setSort] = useState({ sortBy: 'source_time', reverse: false });

  useEffect(() => {
    fetchSuppliers();
  }, [page, filters, sort]);

  const fetchSuppliers = async () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/list/supply?_page_number=${page}&_sort_by=${sort.sortBy}&_sort_reverse=${sort.reverse}&category=${filters.category}&channel=${filters.channel}&state=${filters.state}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'X-I2CE-ENTERPRISE-ID': 'dave_vs_covid',
          'X-I2CE-USER-ID': 'ananth+covid@i2ce.in',
          'X-I2CE-API-KEY': '0349234-38472-1209-2837-3432434',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSortChange = (sortBy, reverse) => {
    setSort({ sortBy, reverse });
  };

  return (
    <div>
      <div className="filtering">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
        </select>

        <select
          value={filters.channel}
          onChange={(e) => handleFilterChange('channel', e.target.value)}
        >
          <option value="">All Channels</option>
        </select>

        <select
          value={filters.state}
          onChange={(e) => handleFilterChange('state', e.target.value)}
        >
          <option value="">All States</option>
        </select>

        <label>
          Sort by Source Time:
          <input
            type="checkbox"
            checked={sort.reverse}
            onChange={() => handleSortChange('source_time', !sort.reverse)}
          />
        </label>
      </div>

      <div className="supplier-cards">
        {suppliers && suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))
        ) : (
          <p>No suppliers found.</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={suppliers.length === 0}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default SupplierList;
