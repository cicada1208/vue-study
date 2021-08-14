import _ from 'lodash';

// remove object Types 'namespace/'
// Ex:
// const Types = {
//   getters: {
//     GET_FIRST_THING: 'namespace/GET_FIRST_THING',
//   },
// };
function removeNamespace(namespace, types) {
  return _.reduce(
    types,
    (typeObj, typeValue, typeName) => {
      typeObj[typeName] = _.reduce(
        typeValue,
        (obj, v, k) => {
          obj[k] = v.replace(namespace, '');
          return obj;
        },
        {}
      );
      return typeObj;
    },
    {}
  );
}

export default {
  removeNamespace,
};
