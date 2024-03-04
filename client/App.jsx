import React from 'react';
import { Routes, Route} from 'react-router-dom'

export default function App() {
  return (

    <div> React Works, App
      <Routes>
        <Route  path="/" element={<div>element</div>}/>
        <Route  path="/home" element={<div>home</div>}/>
      </Routes>
    </div>
  );
}