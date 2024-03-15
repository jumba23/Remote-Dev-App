export function JobList({ jobItems }) {
  return (
    <ul className="job-list">{jobItems.map((jobItem) => jobItem.title)}</ul>
  );
}

export default JobList;
