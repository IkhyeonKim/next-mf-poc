import { useState } from "react";

export default function Setup() {
  const [count, setCount] = useState(0);
  return (
    <main className="bg-red-100">
      <div>This is apc setup page 😃</div>

      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </main>
  );
}
