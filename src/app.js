// Tips: use 'sjw' shortcut to build the stimulus setup
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

// initialize StimulusJS
const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))