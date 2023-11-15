import {HashRouter, useRoutes} from 'react-router-dom';
import { Login } from './pages/Login';
import { Tareas } from './pages/Tareas';
import { Redirigir } from './pages/Redirigir';
import { Header } from './components/Header';
import { UseContexto } from './Contexto';
import { Loading } from './components/Loading';

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
    const {loading} = UseContexto();
    if(loading) return <Loading/>;
    
    return(
        <HashRouter>
            <Header/>
            <Rutas/>
        </HashRouter>
    );
}