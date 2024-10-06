import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoin, fetchTickers } from "../../api";
import { Link } from "react-router-dom";
interface IinfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  padding: 16px;
  max-width: 720px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  text-align: center;
`;

const Summary = styled.ul`
  display: flex;
  border-radius: 16px;
  background-color: rgba(222, 222, 222, 0.2);
  margin: 40px 0;
  li {
    padding: 24px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      &:first-child {
        font-weight: bold;
        margin-bottom: 8px;
      }
    }
  }
`;

const Description = styled.div``;

const Tab = styled.ul`
  display: flex;

  li {
    flex: 1;
    text-align: center;
    padding: 16px;
    border-bottom: 1px solid lightgray;
  }
`;

export default function Coin() {
  const { coinId } = useParams();

  const { isLoading: infoLoading, data: coinData } = useQuery<IinfoData>(
    "fetchInfoData",
    () => fetchCoin(`${coinId}`)
  );

  const { isLoading: priceLoading, data: PriceData } = useQuery<IPriceData>(
    "fetchInfoData",
    () => fetchTickers(`${coinId}`)
  );

  const coinMatch = useMatch("/:codId/chart");
  const priceMatch = useMatch("/:codId/price");

  return (
    <Container>
      <Title>{coinData?.name}</Title>

      <Summary>
        <li>
          <p>RANK</p>
          <p>{coinData?.rank}</p>
        </li>
        <li>
          <p>SYMBOL</p>
          <p>{coinData?.symbol}</p>
        </li>
        <li>
          <p>OPEN SOURCE</p>
          <p>{coinData?.open_source || "-"}</p>
        </li>
      </Summary>

      <Description>
        <p>{coinData?.description}</p>
      </Description>

      <Summary>
        <li>
          <p>Total Suply</p>
          <p>{PriceData?.total_supply}</p>
        </li>
        <li>
          <p>Max Supply</p>
          <p>{PriceData?.max_supply}</p>
        </li>
      </Summary>

      <Tab>
        <li>
          <Link to="chart">CHART</Link>
        </li>
        <li>
          <Link to="price">PRICE</Link>
        </li>
      </Tab>

      <Outlet context={{ coinId }} />
    </Container>
  );
}
