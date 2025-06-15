import { Typography } from "antd";
import logo from "../../assets/sports_leagues_logo.svg";
import "./Header.css";

export const Header = () => (
  <header style={{ padding: "24px 0", textAlign: "center" }}>
    <div className="header__logo-row">
      <Typography.Title
        level={2}
        style={{
          margin: 0,
          marginLeft: 16,
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        Sports Leagues
      </Typography.Title>
      <img src={logo} alt="Sports Leagues Logo" className="header__logo-img" />
    </div>
  </header>
);
