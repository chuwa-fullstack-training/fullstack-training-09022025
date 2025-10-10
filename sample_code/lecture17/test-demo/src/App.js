import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { ReactQueryDemo } from './features/query/ReactQueryDemo';
import './App.css';

function App() {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <Counter />
            <ReactQueryDemo />
        </div>
    );
}

export default App;
