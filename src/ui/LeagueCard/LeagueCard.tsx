import { Card, Typography, Button } from 'antd';
import type { League } from '../../features/leagues/useLeagues';

import './LeagueCard.css';

const { Title, Text } = Typography;

interface Props {
  league: League;
  onShowBadge?: (leagueId: string) => void;
}

export const LeagueCard = ({ league, onShowBadge }: Props) => {
  return (
    <Card className="league-card">
      <div className="league-card__info">
        <Title level={3}>{league.name}</Title>
        <Text type="secondary">Sport: </Text>
        <Text strong>{league.sport}</Text>
        <br />
        <Text type="secondary">Alternate: </Text>
        <Text>{league.alternate ? league.alternate : '—'}</Text>
      </div>
      <div className="league-card__actions">
        <Button type="primary" onClick={() => onShowBadge?.(league.id)}>
          Show Badge
        </Button>
      </div>
    </Card>
  );
}; 