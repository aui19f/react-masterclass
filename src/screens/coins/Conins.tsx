import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../../api";

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background-color: blue;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 32px;
  color: white;
`;

const List = styled.ul`
  position: absolute;
  max-width: 800px;
  top: 88px;
  width: 100%;
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
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <h2>Coin List</h2>
      </Header>
      {isLoading ? (
        `isLoding`
      ) : (
        <List>
          {data?.slice(0, 30).map((coin) => (
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
      )}
    </Container>
  );
}
