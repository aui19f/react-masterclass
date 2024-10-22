import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IMovie, movieList } from "../api/NetflixAtom";

import { makeImagePath } from "../api/utils";

const Page = styled.div``;
const Test = styled.div`
  width: 100%;
  padding: 40px;
  position: relative;
  height: 320px;
  background-color: rgba(222, 222, 222, 0.2);
`;

const NextButton = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  margin: auto 0;
`;
const SliderDiv = styled.div`
  position: relative;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  top: 0;
`;

const Img = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
  padding-top: 60%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  /* background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 240px;
  color: red;
  font-size: 66px;
  &:hover {
    z-index: 99;
  } */

  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  opacity: 0;
`;
const Modal = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #fff;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

interface IMovieProps {
  images: IMovie[];
}
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const size = 6;

export default function Slider({ images }: IMovieProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/netflix/:movieId");

  const movies = useRecoilValue(movieList);
  const [findMovie, setFindMovie] = useState<IMovie>();
  // console.log(movies);
  const addIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = images.length - 1;
    const maxIndex = Math.floor(totalMovies / size) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieID: number) => {
    const findMovie = movies.find((x) => x.id === movieID);
    setFindMovie(findMovie);
    navigate(`/netflix/${movieID}`);
  };

  const modalClose = () => {
    console.log("modalClose");

    navigate("/netflix");
  };

  return (
    <Test>
      <SliderDiv>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={index}
            transition={{ type: "tween", duration: 1 }}
          >
            {images.slice(size * index, size * index + size).map((x) => (
              <Box
                layoutId={x.id + ""}
                key={x.id}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                bgPhoto={makeImagePath(x.backdrop_path, "w500")}
                onClick={() => onBoxClick(x.id)}
                transition={{ type: "tween" }}
              />
            ))}
          </Row>
        </AnimatePresence>
      </SliderDiv>
      <AnimatePresence>
        {bigMovieMatch && (
          <>
            <Overlay
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={modalClose}
            />
            <Modal layoutId={bigMovieMatch.params.movieId}>
              <h2>{findMovie?.original_title}</h2>

              {findMovie?.backdrop_path && (
                <Img
                  bgPhoto={makeImagePath(findMovie?.backdrop_path, "w500")}
                />
              )}

              <p>{findMovie?.overview}</p>
            </Modal>
          </>
        )}
      </AnimatePresence>
      <NextButton onClick={addIndex}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347z" />
        </svg>
      </NextButton>
    </Test>
  );
}
