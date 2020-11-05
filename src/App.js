import React, { Fragment } from 'react';

import { ThemeProvider } from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import GlobalStyles from './index.css';
import { fetchBudget } from 'data/actions/budget.actions'

import theme from 'utils/theme'
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components'




function App({ budget, fetchBudget }) {
  const { i18n } = useTranslation();

  return (
    <Fragment>
      <GlobalStyles />

      <Router>
        <Navigation items={[
          { content: 'Homepage', to: '/' },
          { content: 'Budget', to: '/budget' }
        ]} RightElement={(
          <div>
            <Button variant="regular" onClick={() => i18n.changeLanguage('en')}>EN</Button>
            <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>PL</Button>
          </div>
        )} />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              HomePage
        </Route>
            <Route path="/budget">
              BudgetPage
        </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
}

const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget
  }
}, {
  fetchBudget
})(App)

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
