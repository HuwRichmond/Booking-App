import './App.css';
import React, { lazy, Suspense }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Flex } from '@chakra-ui/react';
import loading from './assets/images/logo_demo.gif';

import Home from './pages/Home';
import Login from './pages/Login';

import Enquire from './pages/Enquire';
import SingleEnquiry from './pages/SingleEnquiry';
import Dashboard from './pages/Dashboard';
import Branches from './pages/Branches';
import About from './pages/About';
import Vision from './pages/Vision';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import Auth from './utils/auth';
import Success from './pages/Success';
import Forgot from './pages/Forgot';
import ResetPassword from './pages/ResetPassword';
import Enrollment from './pages/Enrollment';

import AllBranches from './components/Branches';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const Navi = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./components/Nav')), 2500);
//   });
// });

function App() {
  return (
    <ApolloProvider client={client}>
      
      <Router>
        <div className="App" data-id={Auth.loggedIn() ? "murad" : "Ali"}>
          
          <Suspense fallback={
            <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={loading}
            backgroundSize={'cover'}
            backgroundPosition={''}></Flex>
            }>
          
            <Nav />
            </Suspense>
            <Routes>        
              <Route 
                path="/dashboard" 
                element={Auth.loggedIn() ? ( <>
                {<Dashboard />} </>) : ( <>
                {<Login />} 
                </>)}
              />              
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/vision" 
                element={<Vision />} 
              />
              <Route 
                path="/about" 
                element={<About />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/enquire" 
                element={<Enquire branches={AllBranches}/>} 
                //element={<BasicUsage />} 
              />
              <Route 
                path="/enquiries/:enquiryId" 
                element={Auth.loggedIn() ? ( <>
                  {<SingleEnquiry />} </>) : ( <>
                  {<Login />} 
                  </>)}
                />   

              <Route 
                path="/success" 
                element={<Success />} 
              />

              <Route 
                path="/forgot" 
                element={<Forgot />} 
              />
              <Route 
                path="/resetpassword" 
                element={<ResetPassword />} 
              />

              <Route 
                path="/dashboard/branches" 
                element={<Branches />} 
              />

              <Route 
                path="/enrollment/:enrollmentCode" 
                element={<Enrollment />} 
              />
              
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
