# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Setting up vite

```
$ npm create vite@latest # or version number
```
- Give a name to the project
- select framework (react)  
- select language option (js or ts)

cd to working directory
```
$ npm install
```
To get support from eslint we have to install it:
```
$ npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
```
Create the file `.eslintrc.json` in the root folder  
and add:
```javascript
// .eslintrc.json
{
  "extends": "react-app"
}
```
in vite.config.js import eslint  
and add eslint() to plugins array:
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
```
