import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function JobList({ company }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let jobData;
        if (company && company.name) {
          jobData = await JoblyApi.getCompanyJobs(company.name);
        } else {
          jobData = await JoblyApi.getAllJobs();
        }
        setJobs(jobData);
      } catch (e) {
        console.error("Error fetching jobs:", e);
      }
    };
    fetchJobs();
  }, [company]);

  return (
    <div className="JobList">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
