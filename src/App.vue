<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.text-center {
  text-align: center !important;
}

.checkbox {
  display: flex;
  align-items: center;
}

label.checkbox-label {
  display: inline;
}

.regular-checkbox {
  display: none;
}

.regular-checkbox + label {
  background-color: #fafafa;
  border: 1px solid #cacece;
  padding: 13px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}

.regular-checkbox + label:active,
.regular-checkbox:checked  +label:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.regular-checkbox:checked + label {
  background-color: #fff;
  border: 1px solid #adb8c0;
  color: #99a1a7;
}

.regular-checkbox:checked + label:after {
  content: '\2714';
  font-size: 20px;
  position: absolute;
  top: 0px;
  left: 5px;
  color: #2c3e50;
}

.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 3px 10px;
  font-size: 13px;
  line-height: 1.5384616;
  user-select: none;
  color: #333;
  background-color: #fcfcfc;
  border-color: #ddd;
  position: relative;
  outline: none;
}

.btn:hover, .btn:focus .btn.active {
  background-color: #fcfcfc;
  border-color: #ddd;
  outline: none;
  box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
}

.btn.active {
  color: #fff;
  background-color: #2196F3;
  border-color: #2196F3;
}

.btn-blue {
  background-color: #2196F3;
  border-color: #2196F3;
  color: #fff;
}

.btn-blue:hover, .btn-blue:focus {
  background-color: #2196F3;
  border-color: #2196F3;
}

.btn-red {
  background-color: #D32F2F;
  border-color: #D32F2F;
  color: #fff;
}

.btn-red:hover, .btn-red:focus {
  background-color: #D32F2F;
  border-color: #D32F2F;
}

.position-left {
  margin-right: 10px;
}
</style>
