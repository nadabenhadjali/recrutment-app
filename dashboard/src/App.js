import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Offers from "./pages/Offres/Offers";
import UpdateOffer from "./pages/UpdateOffer";
import Sidebar from "./Components/Sidebar";
import Signin from "./pages/Signin/singin";
import CreateQuestion from "./pages/CreateQuestion/CreateQuestion";
import Subjects from "./pages/subjects";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import Quiz from "./pages/CreateQuiz/Quiz";
import QuizDetails from "./pages/CreateQuiz/QuizDetails";
import Candidats from "./pages/Candidats";
import CreateOffer from "./pages/Offres/CreateOffer";
import Questions from "./pages/CreateQuestion/Questions";

function App() {
  const user = window.localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}

        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/"
            element={user ? <Navigate to="/offres" /> : <Signin />}
          />
          {user && <Route path="/offres" element={<Offers />} />}
          {user && <Route path="/AjouterOffre" element={<CreateOffer />} />}
          {user && <Route path="/offres/:id" element={<UpdateOffer />} />}
          {user && <Route path="/Questions" element={<Questions />} />}
          {user && <Route path="/AjoutQuestion" element={<CreateQuestion />} />}
          {user && <Route path="/subjects" element={<Subjects />} />}
          {user && <Route path="/CreateQuiz" element={<CreateQuiz />} />}
          {user && <Route path="/Quizs" element={<Quiz />} />}
          {user && <Route path="/quizs/:id" element={<QuizDetails />} />}
          {user && <Route path="/candidats" element={<Candidats />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
