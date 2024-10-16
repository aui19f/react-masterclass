import { motion } from "framer-motion";
import styled from "styled-components";
import Drag from "./Drag";
import Gestures from "./Gestures";
import Images from "./Images";
import Modal from "./Modal";
import Slider from "./Slider";
import Variants from "./Variants";

const Box = styled(motion.div)`
  margin: 40px;
  width: 80px;
  height: 80px;
  border-radius: 15px; //50%;
  background: pink;
`;
export default function Animations() {
  return (
    <>
      <hr />
      <Slider />
      <hr />
      <Modal />
      <hr />
      <motion.header></motion.header>
      <hr />
      <Images />
      <hr />
      <Drag />
      <hr />
      <Box
        initial={{ scale: 0 }}
        animate={{ rotate: 180, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />

      <hr />
      <Variants />
      <hr />
      <Gestures />
    </>
  );
}
