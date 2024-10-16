import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: yellow;
`;
const ModalBox = styled(motion.div)`
  padding: 40px;
  width: 400px;
  height: 200px;
  background-color: skyblue;
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
    x: 50,
  },
};

export default function Modal() {
  const [showing, setSelectedId] = useState(false);
  const toggleShowing = () => setSelectedId((prev) => !prev);

  return (
    <Container>
      <button onClick={toggleShowing}>BUTTON</button>
      {showing ? (
        <AnimatePresence>
          <ModalBox
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          >
            <motion.h5>Title</motion.h5>
            <motion.h2>TEXT</motion.h2>
            <motion.button onClick={toggleShowing}>모달닫기</motion.button>
          </ModalBox>
        </AnimatePresence>
      ) : null}
    </Container>
  );
}
