import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provedor } from "./Contexto";
import { CookiesProvider } from 'react-cookie';
import './estilos/index.css';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
    <CookiesProvider>
        <Provedor>
            <App />
        </Provedor>
    </CookiesProvider>
);

