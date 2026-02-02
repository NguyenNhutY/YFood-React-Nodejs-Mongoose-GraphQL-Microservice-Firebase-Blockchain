import React, { useState, useEffect }  from "preact/hooks";
import { Job } from "../../types/dbJobs";
import "./jobs.scss";
import { FunctionalComponent } from "preact";

interface JobListProps {
  jobs: Job[];
  onSelectJob: (jobId: string) => void;
  selectedProvince: string; // Add selectedProvince prop
}

const JobList: FunctionalComponent<JobListProps> = ({
  jobs,
  onSelectJob,
  selectedProvince,
}) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    const filtered = selectedProvince
      ? jobs.filter((job) => job.location === selectedProvince)
      : jobs;
    setFilteredJobs(filtered);
  }, [jobs, selectedProvince]);

  return (
    <div class='job-list'>
      <div class='job-items'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              class='job-item'
              onClick={() => onSelectJob(job.id)}
            >
              <h2>{job.title}</h2>
              <p>{job.location}</p> {/* Display province name */}
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
