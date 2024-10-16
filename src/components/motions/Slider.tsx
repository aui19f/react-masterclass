import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVars = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  }),
};
export default function Slider() {
  const [isVisivle, setIsVisivle] = useState(0);
  const [isBack, setIsBack] = useState(false);
  const nextButton = () => {
    setIsBack(false);
    setIsVisivle((prev) => (prev === 10 ? 1 : ++prev));
  };
  const prevButton = () => {
    setIsBack(true);
    setIsVisivle((prev) => (prev === 1 ? 10 : --prev));
  };
  return (
    <Wrapper>
      <AnimatePresence custom={isBack}>
        {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) =>
          x === isVisivle ? (
            <Box
              key={x}
              variants={boxVars}
              initial="invisible"
              animate="visivle"
              exit="exit"
            >
              {x}
            </Box>
          ) : null
        )} */}

        <Box
          custom={isBack}
          key={isVisivle}
          variants={boxVars}
          initial="entry"
          animate="center"
          exit="exit"
        >
          {isVisivle}
        </Box>
      </AnimatePresence>
      <button onClick={prevButton}>PREV</button>
      <button onClick={nextButton}>NEXT</button>
    </Wrapper>
  );
}
