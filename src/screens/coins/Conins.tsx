import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background-color: blue;
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 32px;
  color: white;
`;
const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const List = styled.ul`
  position: absolute;
  top: 88px;
  left: 12px;
  right: 12px;
  // padding: 12px;
  background-color: white;
  border-radius: 4px;
  overflow: auto;
  height: calc(100% - 64px);
`;
const Coin = styled.li`
  border: 1px solid lightgray;
  margin-bottom: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(200, 200, 200, 0.2);

  cursor: pointer;

  a {
    display: flex;
    align-items: center;
  }

  :hover {
    font-size: 120%;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  h3 {
    flex: 1;
  }
`;
const Rank = styled.div`
  font-size: 75%;
  background-color: lightgray;
  width: 24px;
  padding: 4px;
  border-radius: 4px;
  text-align: center;
  color: white;
`;
// id: "btc-bitcoin",
// name: "Bitcoin",
// symbol: "BTC",
// rank: 1,
// is_new: false,
// is_active: true,
// type: "coin",

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
export default function Coins() {
  const [coinData, setCoinData] = useState<ICoin[]>([]);
  const [isLoading, setIsLoding] = useState(true);
  const fetchCoins = async () => {
    const res = await fetch(" https://api.coinpaprika.com/v1/coins");
    const json = await res.json();
    setCoinData(json.slice(0, 10));
    setIsLoding(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <Container>
      <Header>
        <h2>Coin List</h2>
      </Header>
      <List>
        {coinData.map((coin) => (
          <Coin key={coin.id}>
            <Link to={coin.id} state={{ coin }}>
              <img
                src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
              />
              <h3>{coin.name}</h3>
              {coin.rank < 4 ? <Rank>{coin.rank}</Rank> : null}
            </Link>
          </Coin>
        ))}
      </List>
    </Container>
  );
}
