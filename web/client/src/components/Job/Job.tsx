import React  from "preact/hooks";
import { Job } from "../../types/dbJobs";
import "./job.scss";
import { FunctionalComponent } from "preact";

interface JobDetailProps {
  job: Job;
  onApply: (jobId: string) => void;
}

const JobDetail: FunctionalComponent<JobDetailProps> = ({ job, onApply }) => (
  <div class='job-detail'>
    <h2>{job.title}</h2>
    <ul>
      <li> {job.location}</li>
      <li>
        {job.applicationPeriod.startDate} -&gt;
        {job.applicationPeriod.endDate}
      </li>
      <li> {job.description}</li>
      <li> {job.responsibilities}</li>
      <li> {job.requirements}</li>
      <li> {job.preferredQualifications}</li>
      <li>{job.benefits}</li>
      <li> {job.careerGrowth}</li>
      <li> {job.workEnvironment}</li>
    </ul>

    <button class='application-success' onClick={() => onApply(job.id)}>
      Apply Now
    </button>
  </div>
);

export default JobDetail;
