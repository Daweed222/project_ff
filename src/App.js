import 'assets/style/App.scss';

import {
    Routes,
    Route,
} from "react-router-dom";

import Index from 'pages/Index'
import Details from 'pages/Details'

function App() {
    console.log('App RENDER');
    return (
        <>
            <header></header>
            <main>
                <Routes>
                    <Route exact path="/" element={<Index />} />
                    <Route path="/details/:movieIdentifier" element={<Details />} />
                </Routes>
            </main>
            <footer></footer>
        </>
  );
}

export default App;
