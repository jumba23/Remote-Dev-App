import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useActiveId, useJobItems } from "../lib/hooks";
import { BASE_API_URL } from "../lib/constants";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, isLoading] = useJobItems(searchText);
  const activeId = useActiveId();
  const [jobItem, setJobItem] = useState(null);

  console.log(activeId);

  useEffect(() => {
    if (!activeId) return;

    const fetchData = async () => {
      const response = await fetch(`${BASE_API_URL}/${activeId}`);
      const data = await response.json();
      console.log("Active Job DATA - ", data.jobItem);
      setJobItem(data.jobItem);
    };
    fetchData();
  }, [activeId]);

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
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
