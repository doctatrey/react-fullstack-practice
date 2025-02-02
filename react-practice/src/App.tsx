import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Counter from './pages/Counter'
import NotFound from './pages/NotFound'
import ToDo from './pages/ToDo'
import UEPractice from './pages/UEPractice'
import URPractice from './pages/URPractice'
import RandomFact from './pages/RandomFacts'
import ChatBot from './pages/ChatBot'
import Quiz from './pages/Quiz'
import AddQuestions from './pages/AddQuestions'
import DeleteQuestions from './pages/DeleteQuestions'
import BlogPage from './pages/BlogPage'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path ='/' element={<Home/>} />
        <Route path = '/counter' element={<Counter/>} />
        <Route path = '/todo' element={<ToDo/>} />
        <Route path='uepractice' element={<UEPractice/>} />
        <Route path='urpractice' element={<URPractice/>} />
        <Route path='randomfact' element={<RandomFact/>} />
        <Route path='chatbot' element={<ChatBot/>} />
        <Route path='quiz' element={<Quiz/>} />
          <Route path='/quiz/add' element={<AddQuestions/>} />
          <Route path='/quiz/delete' element={<DeleteQuestions/>} />
         {/* Private routes */}
         <Route path="/blog" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
        <Route path="/blog/add-new-post" element={<PrivateRoute><AddPost /></PrivateRoute>} />
        <Route path="/blog/edit" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
