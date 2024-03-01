import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardGroup } from "reactstrap";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import CompanyDetail from "./CompanyDetail";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const allCompanies = await JoblyApi.getAllCompanies();
        setCompanies(allCompanies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const filteredCompanies = await JoblyApi.searchCompany({
        search: searchTerm,
      });
      setCompanies(filteredCompanies);
    } catch (error) {
      console.error("Error searching companies:", error);
    }
  };

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  if (isLoading) {
    return (
      <>
        {" "}
        <p>Loading...</p>{" "}
      </>
    );
  }

  return (
    <div className="CompanyList">
      <div className="SearchForm">
        <form onSubmit={handleSubmit}>
          <input
            id="search"
            name="search"
            placeholder="Search Companies..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="CompanyList">
        <CardGroup>
          {companies.map((company) => (
            <a>
              <CompanyCard company={company} />
            </a>
          ))}
        </CardGroup>
      </div>
    </div>
  );
}

export default CompanyList;
