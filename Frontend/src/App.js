import React from 'react';
import './App.css';
import AppContent from './components/AppContent';
import MainPage from './components/MainPage'; // Update the import path
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AppContent} />
          <Route path="/main" component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App; 

// function App() {
//   return (
//     <div className="App">
//       <div className="container-fluid">
//         <div className="row">
//            <div className="col">
//             <AppContent />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }