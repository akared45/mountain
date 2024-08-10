import React, { useEffect } from "react";
import { useState } from "react";
import { showMountain } from "../../services/api";
import "../../style/mountain.css"
import { Link } from "react-router-dom";

const Mountain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [listMountain, setlistMountain] = useState([]);
  useEffect(() => {
    getListMountain();
  }, [])

  const getListMountain = async () => {
    let res = await showMountain();
    if (res && res.data) {
      setlistMountain(res.data.ListMountain);

    }
  }
  console.log(listMountain);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredMountains = listMountain.filter((mountain) => {
    return (
      (mountain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (selectedCountry === "" || mountain.country.includes(selectedCountry))
    );
  });


  return (
    <div className="container">
      <div className="row">
        <div className="inf-sort col-2 mt-5">
          <div className="form-group">
            <label htmlFor="countrySelect">Select a Country:</label>
            <div className="position-relative">
              <select className="form-control custom-select form-select" id="countrySelect" onChange={handleCountryChange}>
                <option value="">All Countries</option>
                {listMountain.map((item) => (
                  <option value={item.country}>{item.country}</option>
                ))}
                <div className="select-arrow"></div>
              </select>
            </div>
          </div>
        </div>

        <div className="mountain-inf col-9">

          {/* thanh search */}
          <form className="d-flex mb-2" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search.."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
          <div className="row gy-5">
            {filteredMountains.map((mountain) => (
              <div className="mountain-inf-container col-4" key={mountain.id}>
                <div className="mountain-item p-3 mb-1">
                  <img
                    src={`http://localhost:8000/storage/images/${mountain.img}`}
                    alt={mountain.name}
                    style={{ maxWidth: '100%', height: '25vh' }}
                  />
                  <h1 className="description">{mountain.name}</h1>
                  <button className="btn btn-primary">
                    <Link to={`/mountain/${mountain.id}`} className="text-white">Read more</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mountain;
