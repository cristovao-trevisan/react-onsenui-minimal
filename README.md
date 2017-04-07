# react-onsenui-minimal
Minimal application using React with Redux, Onsen UI 2 and Webpack 2

Scaffolding explanation:
  - "www" will contain the compiled code (after transpilation)
  - "src" contains the actual code
  - "webpack.config.js" is the compilation configuration, it may change depending on the environment variables (check the file for more info)
  - "config.xml" is the configuration for cordova usage
  - ".babelrc" is the transpilation configuration

More about src scaffolding:
  - "reducers" contains the Redux reducers
  - "actions" contains the Redux action creators
  - "components" contains the presentational components (React components without any store data)
  - "containers" contains all the container components (React components linked to the store to read the state and/or dispatch actions)
  - "public" contains at least the index.ejs file (will be compiled to index.html by webpack). All other files (or folders) put in here will be copied to the "www" folder upon compilation
  - "main.js" is the actual code to be run
