import { cn } from "../..";
import styles from "./redirect.module.css";

export const SupermanLoader = ({
  withParentClass = true,
}: {
  withParentClass?: boolean;
}) => {
  return (
    <div
      className={cn(
        withParentClass && "relative h-full w-full overflow-hidden",
      )}
    >
      <div className={styles.main_frame}>
        <span className={styles.main_frame_span}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className={styles.inner_frame}>
          <span className={styles.inner_frame_span}></span>
          <div className={styles.person_face}></div>
        </div>
      </div>
      <div className={styles.longfazers}>
        <span className={styles.longfazers_span}></span>
        <span className={styles.longfazers_span}></span>
        <span className={styles.longfazers_span}></span>
        <span className={styles.longfazers_span}></span>
      </div>
    </div>
  );
};
