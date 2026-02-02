import React, { useEffect }  from "preact/hooks";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

const AnimatedBox = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      class='box'
      ref={ref}
      variants={boxVariant}
      initial='hidden'
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBox;
