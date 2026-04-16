import { useEffect } from "react";

const SparkleTrail = () => {
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      for (let i = 0; i < 2; i++) {
        const spark = document.createElement("div");
        spark.className = "sparkle-cursor";
        spark.style.left = `${x + (Math.random() - 0.5) * 16}px`;
        spark.style.top = `${y + (Math.random() - 0.5) * 16}px`;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);
  return null;
};

export default SparkleTrail;
