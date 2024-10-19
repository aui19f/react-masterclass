import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IMovie } from "../api/netflixApi";
import { makeImagePath } from "../api/utils";
const Test = styled.div`
  background-color: red;
  width: 100%;
  padding: 40px;
  position: relative;
`;
const SliderDiv = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  font-size: 66px;
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

const size = 6;

export default function Slider({ images }: IMovieProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const addIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = images.length - 1;
    const maxIndex = Math.floor(totalMovies / size) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Test onClick={addIndex}>
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
                key={x.id}
                bgPhoto={makeImagePath(x.backdrop_path, "w500")}
              />
            ))}
          </Row>
        </AnimatePresence>
      </SliderDiv>
    </Test>
  );
}
