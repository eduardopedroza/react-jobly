import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/company/${company.handle}`);
  };

  return (
    <div className="CompanyCard" onClick={handleClick}>
      <h2>{company.name}</h2>
      <h4>{company.description}</h4>
    </div>
  );
}

export default CompanyCard;
