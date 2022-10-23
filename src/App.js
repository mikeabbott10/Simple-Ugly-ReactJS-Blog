// containers
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

// content
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing'; // 404

import {Route, Routes} from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import SearchForm from './SearchForm';


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
