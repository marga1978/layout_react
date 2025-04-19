import "./App.scss";
import Header from './components/Header/Header.jsx';
import Page from './components/Page/Page.jsx';
import AlberoGenealogico from "./components/TreeElement/TreeElement.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Page /> */}
        <AlberoGenealogico />
      </main>
    </>
  );
}

export default App;


