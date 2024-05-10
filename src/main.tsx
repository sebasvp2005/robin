import ReactDOM from 'react-dom/client'
import './index.css'

import {BrowserRouter} from "react-router-dom";
import { AppRouter } from '@/routing/components/AppRouter';
import "primereact/resources/themes/lara-light-cyan/theme.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
)
