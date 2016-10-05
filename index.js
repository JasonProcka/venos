import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import routes from './core/routes/routes.js'

render((
    <Router routes={routes} history={browserHistory}/>
), document.getElementById('app'))
