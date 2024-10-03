import { useOutletContext } from "react-router";

interface IFollowers {
  userId: string;
}
export default function Followers() {
  const { userId } = useOutletContext<IFollowers>();
  return <p>- Followers ({userId})</p>;
}
