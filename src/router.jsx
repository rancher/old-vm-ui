import React, { PropTypes } from 'react'
import nprogress from 'nprogress'
import { Router } from 'dva/router'
import App from './routes/app'
import { addPrefix } from './utils/pathnamePrefix'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: addPrefix('') || '/',
      component: App,
      getIndexRoute(nextState, cb) {
        nprogress.start()
        require.ensure([], (require) => {
          nprogress.done()
          registerModel(app, require('./models/instances'))
          registerModel(app, require('./models/hosts'))
          registerModel(app, require('./models/credentials'))
          registerModel(app, require('./models/machineimages'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              registerModel(app, require('./models/instances'))
              registerModel(app, require('./models/hosts'))
              registerModel(app, require('./models/credentials'))
              registerModel(app, require('./models/machineimages'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
        {
          path: 'instances',
          name: 'instances',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              registerModel(app, require('./models/instances'))
              registerModel(app, require('./models/hosts'))
              registerModel(app, require('./models/credentials'))
              registerModel(app, require('./models/machineimages'))
              cb(null, require('./routes/instances/'))
            }, 'instances')
          },
        },
        {
          path: 'hosts',
          name: 'hosts',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              registerModel(app, require('./models/hosts'))
              cb(null, require('./routes/hosts/'))
            }, 'hosts')
          },
        },
        {
          path: 'credentials',
          name: 'credentials',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              registerModel(app, require('./models/credentials'))
              cb(null, require('./routes/credentials/'))
            }, 'credentials')
          },
        },
        {
          path: 'machineimages',
          name: 'machineimages',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              registerModel(app, require('./models/machineimages'))
              registerModel(app, require('./models/instances'))
              cb(null, require('./routes/machineimages/'))
            }, 'credentials')
          },
        },
        {
          path: 'setting',
          name: 'setting',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              registerModel(app, require('./models/setting'))
              cb(null, require('./routes/setting/'))
            }, 'setting')
          },
        },
        {
          path: '*',
          name: 'notfound',
          getComponent(nextState, cb) {
            nprogress.start()
            require.ensure([], (require) => {
              nprogress.done()
              cb(null, require('./routes/notfound/'))
            }, 'notfound')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
