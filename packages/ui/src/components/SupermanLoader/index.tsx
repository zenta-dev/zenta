import { cn } from "../..";
// @ts-ignore
import style from "./redirect.module.css";

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
      <div className={style.main_frame}>
        <span className={style.main_frame_span}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className={style.inner_frame}>
          <span className={style.inner_frame_span}></span>
          <div className={style.person_face}></div>
        </div>
      </div>
      <div className={style.longfazers}>
        <span className={style.longfazers_span}></span>
        <span className={style.longfazers_span}></span>
        <span className={style.longfazers_span}></span>
        <span className={style.longfazers_span}></span>
      </div>
    </div>
  );
};
