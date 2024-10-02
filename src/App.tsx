import React, { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setId(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("[onSubmit] ID: ", id);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="ID" onChange={onChange} />
        <button>Login</button>
      </form>
    </div>
  );
}
export default App;
