// import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss'
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css'; 
import PrimeReact, { FilterMatchMode } from 'primereact/api';                      
import AppRouter from './app/app-routing'

PrimeReact.cssTransition = false;
PrimeReact.ripple = true;
PrimeReact.nullSortOrder = 1;
PrimeReact.appendTo = 'self';
PrimeReact.filterMatchModeOptions = {
  text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
  numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
  date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
};    
PrimeReact.zIndex = {
  modal: 1100,  
  overlay: 1000,  
  menu: 1000,     
  tooltip: 1100,  
  toast: 1200     
}
PrimeReact.autoZIndex = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppRouter></AppRouter>
)
