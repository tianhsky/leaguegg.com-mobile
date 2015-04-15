window.app = window.app || {};
app.store = app.store || {};
// Permenant store
app.store.set = function(key, obj) {
  var objType = typeof(obj);
  var storeVal = obj;
  if (objType == 'object') {
    storeVal = JSON.stringify(obj);
  }
  localStorage.setItem(key, storeVal);
}
app.store.get = function(key) {
  var storeVal = localStorage.getItem(key);
  var obj = null;
  try {
    obj = JSON.parse(storeVal);
  } catch (e) {
    obj = storeVal;
  }
  return obj;
}
app.store.remove = function(key) {
  localStorage.removeItem(key);
}

// Temp store
app.tstore = app.tstore || {};
app._tstore = app._tstore || {};
app.tstore.set = function(key, val) {
  app._tstore[key] = val;
  app._tstore;
}
app.tstore.get = function(key) {
  return app._tstore[key];
}