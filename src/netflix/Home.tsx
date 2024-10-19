import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovieResult, IMovie } from "../api/netflixApi";
import { makeImagePath } from "../api/utils";
import Slider from "./Slider";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Overview = styled.p`
  width: 50%;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 24px;
`;

export default function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(["movies"], getMovies);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>LOADING...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {data?.results && data?.results.length > 0 ? (
            <Slider {...{ images: data?.results }} />
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
