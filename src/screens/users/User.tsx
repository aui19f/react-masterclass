import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function User() {
  const { userId } = useParams();

  return (
    <>
      <h3>User : {userId}</h3>
      <Link to="followers">See followers</Link>
      <hr />

      <Outlet
        context={{
          userId: userId,
        }}
      />
    </>
  );
}
