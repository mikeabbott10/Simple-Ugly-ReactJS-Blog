// containers
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

// content
import Home from './pages/Home/Home';
import NewPost from './pages/NewPost/NewPost';
import PostPage from './pages/PostPage/PostPage';
import EditPost from './pages/EditPost/EditPost';
import About from './pages/About/About';
import Missing from './pages/Missing/Missing'; // 404

import {Route, Routes} from 'react-router-dom';
import { DataProvider } from './context/DataContext';


function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="ReactJS Blog"/>
        <Nav/>
        <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/post" element={ <NewPost /> }/>
            <Route path="/edit/:id" element={ <EditPost/> }/>
            <Route path="/post/:id" element={ <PostPage/> } />

            <Route path="/about" element={ <About/> } />
            <Route path="*" element={ <Missing/> } />
        </Routes>
      </DataProvider>
      <Footer/>
    </div>
  );
}

export default App;
