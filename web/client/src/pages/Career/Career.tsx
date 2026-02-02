import React, { useState, useEffect }  from "preact/hooks";
import JobList from "../../containers/Jobs/Jobs"; // Make sure the import path is correct
import JobDetail from "../../components/Job/Job"; // Make sure the import path is correct
import ApplyForm from "../../components/ApplyForm/ApplyForm";
import Search from "../../components/SearchNor/SearchNor";
import Pagination from "../../components/Pagination/Pagination";
import jobs from "../../types/dbJobs";
import { Job } from "../../types/dbJobs";
import "./career.scss";
import AdSlider from "../../components/AdSlider/AdSlider";
import ProvinceSelector from "../../containers/Jobs/ProvinceSelector"; // Import ProvinceSelector
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

const ITEMS_PER_PAGE = 10;

const Career: FunctionalComponent = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  useEffect(() => {
    // Filter jobs whenever selectedProvince or jobs change
    const filtered = jobs.filter(
      (job) => job.location === selectedProvince || selectedProvince === ""
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when province or jobs change
  }, [selectedProvince, jobs]);

  const handleSelectJob = (jobId: string) => {
    const job = jobs.find((job) => job.id === jobId);
    setSelectedJob(job || null);
  };

  const handleApply = (jobId: string) => {
    setSelectedJob(jobs.find((job) => job.id === jobId) || null);
  };

  const handleSubmitApplication = (data: any) => {
    console.log("Application submitted:", data);
    setApplicationSuccess(true);
  };

  const handleSearchName = (name: string) => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(name.toLowerCase()) &&
        (job.location === selectedProvince || selectedProvince === "")
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const handleProvinceSelect = (provinceName: string) => {
    setSelectedProvince(provinceName);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastJob = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - ITEMS_PER_PAGE;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  return (
    <>
      {" "}
      <div>
        {" "}
        <button
          class='btn-back-history'
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowUp} class='fontawe' />
        </button>
      </div>
      <div class='career-page p-8'>
        <h1 class=' mb-8'>Career Opportunities</h1>
        {!selectedJob && (
          <>
            <Search
              setSearchName={handleSearchName}
              placeholder='Search for jobs...'
            />
            <ProvinceSelector onSelectProvince={handleProvinceSelect} />
          </>
        )}
        {!selectedJob ? (
          <div class=''>
            <JobList
              jobs={currentJobs}
              onSelectJob={handleSelectJob}
              selectedProvince={selectedProvince} // Pass the selectedProvince
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </div>
        ) : applicationSuccess ? (
          <div class='text-green-600 font-bold'>
            Your application has been submitted successfully!
          </div>
        ) : (
          <>
            <JobDetail job={selectedJob} onApply={handleApply} />
            <ApplyForm
              jobId={selectedJob.id}
              onSubmit={handleSubmitApplication}
            />
          </>
        )}
      </div>
      <AdSlider />
    </>
  );
};

export default Career;
