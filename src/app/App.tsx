import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardDetails from '../pages/cards/CardDetails';
import NotFound from '../pages/NotFound/NotFound';
import Layout from '../shared/ui/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path=":id" element={<CardDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
