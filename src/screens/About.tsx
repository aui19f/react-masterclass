import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelector, minuteState } from "../atom";

export default function About() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hoursSelector);
  // const hours = useRecoilValue(hoursSelector);
  const onChangeMinute = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMinutes(+value);
  };

  const onChangeHour = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setHours(+value);
  };

  return (
    <>
      <input
        type="number"
        value={minutes}
        onChange={onChangeMinute}
        placeholder="Minutes"
      />
      <span> / </span>
      <input
        type="number"
        onChange={onChangeHour}
        value={hours}
        placeholder="Hours"
      />
    </>
  );
}
