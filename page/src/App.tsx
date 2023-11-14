import {HashRouter, useRoutes} from 'react-router-dom';
import { Login } from './pages/Login';
import { Tareas } from './pages/Tareas';
import { Redirigir } from './pages/Redirigir';
import { Header } from './components/Header';

const Rutas = () => useRoutes([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:"/tareas",
        element:<Tareas/>
    },
    {
        path:"/",
        element:<Redirigir/>
    }
]);

export function App(){
    return(
        <HashRouter>
            <Header/>
            <Rutas/>
        </HashRouter>
    );
}