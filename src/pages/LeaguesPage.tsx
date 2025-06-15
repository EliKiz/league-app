import { Input, Select, Spin, Alert, Modal, Divider } from "antd";
import { LeagueCard } from "../ui/LeagueCard/LeagueCard";
import { useLeagues } from "../features/leagues/useLeagues";
import { useLeagueBadge } from "../features/leagues/useLeagueBadge";
import { Header } from "../ui/Header/Header";
import "./LeaguesPage.css";

const ALL_SPORTS = "All sports";

export const LeaguesPage = () => {
  const { sports, filter, setFilter, filteredLeagues, loading, error } =
    useLeagues();
  const badgeModal = useLeagueBadge();

  const isDefault = filter.sport === ALL_SPORTS && !filter.query.trim();

  return (
    <div className="leagues-page">
      <Header />
      <div className="leagues-page__controls">
        <Input
          placeholder="Search by league name..."
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
          className="leagues-page__search"
        />
        <Select
          value={filter.sport}
          onChange={(sport) => setFilter({ ...filter, sport })}
          options={sports.map((sport) => ({ label: sport, value: sport }))}
          className="leagues-page__select"
        />
      </div>
      <Divider style={{ margin: "16px 0" }} />
      <div className="leagues-page__list">
        {loading && <Spin size="large" style={{ margin: "40px auto" }} />}
        {error && (
          <div className="league-list__item">
            <Alert type="error" message={error} showIcon />
          </div>
        )}
        {!loading && !error && filteredLeagues.map((league) => (
          <div className="league-list__item" key={league.id}>
            <LeagueCard league={league} onShowBadge={badgeModal.fetchBadge} />
          </div>
        ))}
        {!loading && !error && filteredLeagues.length === 0 && (
          <div className="league-list__item">
            <Alert
              type="info"
              message={isDefault ? "Please use filters to find leagues" : "No leagues found"}
              showIcon
            />
          </div>
        )}
      </div>
      <Modal
        open={!!badgeModal.badge || badgeModal.loading || !!badgeModal.error}
        onCancel={badgeModal.reset}
        footer={null}
        centered
      >
        {badgeModal.loading && (
          <Spin
            size="large"
            style={{ margin: "40px auto", display: "block" }}
          />
        )}
        {badgeModal.error && (
          <Alert
            type="error"
            message={badgeModal.error}
            showIcon
            style={{ margin: "40px auto" }}
          />
        )}
        {badgeModal.badge && (
          <div style={{ textAlign: "center" }}>
            <img
              src={badgeModal.badge}
              alt="League Badge"
              style={{ maxWidth: 180, margin: "24px auto" }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};
