
import { Routes, Route } from 'react-router-dom'
import SignUp from "./components/register"
import LoginHandler from "./components/login"
import PostAQuestion from './components/askQuestion';
import EditAQuestion from "./components/editQuestion";
import AllQuestionCards from "./components/Questions"  ;
import DetailedQuestion from "./components/DetailedQuestion"  ;


function App() {
  return (
    <div>
    <Routes>
    <Route path ="/register" element={<SignUp/>}/> 
    <Route path ="/login" element={<LoginHandler/>}/> 


      <Route path ="/PostAQuestion" element={<PostAQuestion/>}/> 
      <Route path ="/EditAQuestion/:questionid" element={<EditAQuestion/>}/> 

      <Route path ="/" element={<AllQuestionCards/>}/> 
      <Route path ="/DetailedQuestion/:questionId" element={<DetailedQuestion/>}/> 


    </Routes>
     </div>
  );
}

export default App;

              