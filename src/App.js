import { Switch, Route } from 'react-router-dom';
import { lazy } from 'react';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

import Loader from 'react-loader-spinner';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';

const HomeView = lazy(() => import('./views/HomePage/HomeView'));
const MoviesView = lazy(() => import('./views/MoviesView/MoviesView'));
const MoviesDetailsView = lazy(() =>
  import('./views/MoviesDetails/MoviesDeatilsView'),
);
const NotFoundView = lazy(() => import('./views/NotFound/NotFoundView'));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MoviesDetailsView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}
