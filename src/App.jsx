import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Home } from './pages/Home';


const App = () => (
  <div className='bg-primary w-full overflow-hidden'>

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>

  </div>
)


export default App