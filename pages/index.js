import TopBar from "../components/TopBar";
import UserTable from "../components/UserTable";

export default function Home() {

  return (
    <TopBar title="Home Page">
      <UserTable/>
    </TopBar>
  );
}
