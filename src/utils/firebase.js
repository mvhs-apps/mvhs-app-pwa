// @flow

import * as storage from './storage';

const config = {
  databaseURL: 'https://mvhs-app-d04d2.firebaseio.com'
};

function deep(obj, path, value) {
  if (arguments.length === 3) return set.apply(null, arguments);
  return get.apply(null, arguments);
}

function get(obj, path) {
  var keys = Array.isArray(path) ? path : path.split('/');
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, key)) {
      obj = undefined;
      break;
    }
    obj = obj[key];
  }
  return obj;
}

function set(obj, path, value) {
  var keys = Array.isArray(path) ? path : path.split('/');
  let itObj = obj;
  for (var i = 0; i < keys.length - 1; i++) {
    var key = keys[i];
    if (!Object.prototype.hasOwnProperty.call(itObj, key)) itObj[key] = {};
    itObj = itObj[key];
  }
  itObj[keys[i]] = value;
  return obj;
}

const fbCacheKey = 'fbCache';
const fbResetTimestampKey = 'fbResetTimestamp';

export const getFirebaseVal = async (ref: string, forceFetch: boolean): any => {
  const fbCacheString = await storage.getItem(fbCacheKey);
  let fbCache = !fbCacheString ? {} : JSON.parse(fbCacheString);

  const deepPath = ref.slice(1);

  let val = deep(fbCache, deepPath);

  //If value is not in the cache, or if we need to fetch
  if (!val || forceFetch) {
    console.log(`Fetching "${ref}" from web`);

    const response = await fetch(`${config.databaseURL + ref}.json`);
    val = await response.json();

    if (val) {
      //If last reset was over 1 week ago, clear the cache
      const fbResetTimestampString = await storage.getItem(fbResetTimestampKey);
      if (fbResetTimestampString) {
        const fbResetTimestamp = JSON.parse(fbResetTimestampString);

        //If timestamp exists, reset cache if needed
        if (Date.now() - fbResetTimestamp > 6.048e8) {
          fbCache = {};
          await storage.setItem(
            fbResetTimestampKey,
            JSON.stringify(Date.now())
          );
        }
      } else {
        //If timestamp doesn't exist, initialize it
        await storage.setItem(fbResetTimestampKey, JSON.stringify(Date.now()));
      }

      const updatedCache = deep(fbCache, deepPath, val);
      await storage.setItem(fbCacheKey, JSON.stringify(updatedCache));
    }
  } else {
    console.log(`Fetching "${ref}" from cache`);
  }

  return val;
};
