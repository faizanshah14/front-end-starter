
### Method 1:
Start working with the design system
1. Install Dependency
```
npm install
```

2. Run on development 
```
npm start
```
3. Build for production
```
npm run build
```
## File Structure
Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:
```
github/hope-ui-admin-dashboard/

src
  ├── assets
  │    ├── images
  │    │    ├── icon.png
  │    │    ├── favicon.ico
  │    │    └── loader.gif
  │    |── scss
  │    |    ├── bootstrap/
  │    |    │     ├── forms/
  │    |    │     ├── helper/
  │    |    │     ├── mixins/
  │    |    │     ├── utilites/
  │    |    │     └── vendor/
  │    |    ├── custom
  │    |    │     ├── auth/
  │    |    │     ├── kanban/
  │    |    │     ├── pricing/
  │    |    │     └── ui-kit/
  |    |    ├──customizer
  │    |    │     ├── components/
  │    |    │     ├── layouts/
  │    |    │     ├── menu-style/
  │    |    │     ├── utilities/
  │    |    │     ├── components.scss
  │    |    │     ├── dark.scss
  │    |    │     ├── layout.scss
  │    |    │     └── variables.scss   
  │    |    ├── hope-ui-design-system
  │    |    │     ├── components/
  │    |    │     ├── helper/
  │    |    │     ├── layout-style/
  │    |    │     ├── pages/
  │    |    │     ├── plugins/
  │    |    │     ├── variables/
  │    |    │     └── variables.scss
  │    |    ├── dark
  │    |    │     ├── components/
  │    |    │     ├── helper/
  │    |    │     ├── layout-style/
  │    |    │     ├── pages/
  │    |    │     ├── plugins/
  │    |    │     ├── reboot/
  │    |    │     ├── _dark.scss
  │    |    │     └── _index.scss
  │    |    ├── rtl
  │    |    │     ├── components/
  │    |    │     ├── pages/
  │    |    │     ├── reboot/
  │    |    │     ├── utilities/
  │    |    │     └── _index.scss
  │    |    ├── rtl.scss
  │    |    ├── dark.scss
  │    |    ├── customizer.scss
  │    |    ├── custom.scss
  │    |    └── hope-ui.scss
  |    |
  |    └──sortable/
  │         └── Plugins Files
  │  
  │ 
  ├── components
  |    ├── partials
  |    |    ├──components
  │    |    |   ├── header-breadcrumb
  │    |    |   ├── logo
  │    |    |   ├── mobile-offcanvas
  │    |    |   ├── settingoffcanvas
  │    |    |   └── shareoffcanvas
  │    |    └──dashboard
  │    |        ├── FooterStyle/
  │    |        ├── HeaderStyle/
  │    |        └── SidebarStyle/
  │    ├── Card
  │    ├── circularprogressbar
  │    ├── counterup
  │    ├── datepicker
  │    ├── dropdown
  │    ├── leaflet
  │    ├── loader
  │    └── progress
  ├── layouts/dashboard
  |    ├── boxed-fancy
  |    ├── boxed
  |    ├── default
  |    ├── dual-Compact
  |    ├── dual-horizontally
  |    ├── horizontal
  |    └── simple 
  ├── plugins
  |    └──slider-tabs
  ├── router
  |    ├── boxed-fancy-router
  |    ├── boxed-router
  |    ├── defult-router 
  |    ├── horizontal-multi-2
  |    ├── horizontal-router
  |    ├── simple-router 
  |    └── index
  ├── store
  |    ├── setting
  |    |    └── setting
  |    └──index
  ├── views
  |    ├── dashboard/
  |    └── uikit/
  ├── App.js
  ├── App.test.js
  ├── index.js
  ├── reportWebVitals.js
  ├── setupTests.js
  ├── .env.development.local
  ├── .env.production.local
  ├── .gitignore
  ├── .htaccess
  ├── package-lock.json
  ├── package.json
  └── README.md
```
## Browser Support
![chrome](https://assets.iqonic.design/hope-ui/github/chrome.png)
![Firefox](https://assets.iqonic.design/hope-ui/github/Firefox.png)
![Safari](https://assets.iqonic.design/hope-ui/github/Safari.png)
![Microsoft](https://assets.iqonic.design/hope-ui/github/Microsoft%20edge.png)
![Operamini](https://assets.iqonic.design/hope-ui/github/Operamini.png)