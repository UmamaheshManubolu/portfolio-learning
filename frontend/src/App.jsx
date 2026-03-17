// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

//src/App.jsx 
import AboutMe from "./components/AboutMe.jsx";
import Experience from "./components/Experience.jsx";    // ← ADD
import Skills from "./components/Skills.jsx";          // ← ADD

function App() {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "8px" }}>
        Umamahesh Manubolu
      </h1>
      <p style={{ textAlign: "center", color: "#888", marginBottom: "40px" }}>
        AI Research Engineer · Germany
      </p>

      <AboutMe />

      <Experience /> {/* ← ADD */}

      <Skills /> {/* ← ADD */}

    </div>
  );
}

export default App;

