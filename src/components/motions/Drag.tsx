import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { PollingWatchKind } from "typescript";

const Container = styled(motion.div)`
  width: 300px;
  height: 300px;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  background: rgba(111, 111, 111, 0.8);
  margin: 48px;
  border-radius: 30px;
`;

const Box = styled(motion.div)`
  width: 150px;
  height: 150px;
  background: white;
  border-radius: inherit;
`;

const boxVars = {
  click: {
    backgourndColor: "#df7f8f",
    rotate: -90,
    borderRadius: "100%",
  },
  drag: {
    backgourndColor: "#df7f8f",
  },
};

export default function Drag() {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);

  useEffect(() => {
    x.onChange(() => console.log(x));
  }, [x]);
  return (
    <Container ref={constraintsRef}>
      <Box
        style={{ x, scale }}
        variants={boxVars}
        whileTap="click"
        whileDrag="drag"
        drag
        dragConstraints={constraintsRef}
      />
    </Container>
  );
}
