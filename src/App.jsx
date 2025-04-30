import React from 'react'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
