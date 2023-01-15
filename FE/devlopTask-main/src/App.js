import './App.css';
import GroupedTable from './component/GroupedTable';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GroupedTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
