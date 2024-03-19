import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type jobsListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

const JobList = ({ jobItems, isLoading }: jobsListProps) => {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => <JobListItem jobItem={jobItem} />)}
    </ul>
  );
};

export default JobList;
