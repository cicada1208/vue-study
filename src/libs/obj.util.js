import _ from 'lodash';

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
