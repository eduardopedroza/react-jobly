import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(handle);

  console.log(handle);
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        let companyData = await JoblyApi.getCompany(handle);
        console.log(companyData);
        setCompany(companyData);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching company:", e);
      }
    };
    fetchCompany();
  }, [handle]);

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <h3>{company.description}</h3>
      <JobList company={company} />
    </div>
  );
}

export default CompanyDetail;
