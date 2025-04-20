import "./App.scss";
import Header from './components/Header/Header.jsx';
import Page from './components/Page/Page.jsx';
import AlberoGenealogico from "./components/TreeElement/TreeElement.jsx";
//import TreeQuestions from "./components/QuizComponents/TreeQuestions/TreeQuestions.jsx"



function App() {
  return (
    <>
      <Header />
      <main>
        <Page />
        {/* <AlberoGenealogico /> */}
        {/* <TreeQuestions domande={strutturaDomande} /> */}
      </main>
    </>
  );
}

export default App;


