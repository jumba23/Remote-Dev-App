import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("jobItems", jobItems);

  useEffect(() => {
    if (!searchText) return;

    // Fetch data from the API
    const fetchData = async () => {
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await response.json();
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <div className="sidebar__top">
            <ResultsCount />
            <SortingControls />
          </div>

          <JobList jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
