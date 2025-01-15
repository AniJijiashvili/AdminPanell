import { useAuth } from "../Guard/guard";
import "./Header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <div>
        <h2 className="logoText"> Admin Panel </h2>
      </div>

      <div>
        <button className="logoutButton" onClick={useAuth().logout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
