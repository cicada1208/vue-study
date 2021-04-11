const type = {
  state: { countState: 'countState' },
  getters: {
    countStateDesp: 'countStateDesp',
    countStateDespFunc: 'countStateDespFunc',
  },
  mutations: {
    countStateIncrement: 'countStateIncrement',
    countStateDecrement: 'countStateDecrement',
    countStateSet: 'countStateSet',
  },
  actions: {
    countStateIncrement: 'countStateIncrement',
    countStateIncrementAsync: 'countStateIncrementAsync',
    countStateIncDecAsync: 'countStateIncDecAsync',
  },
};

export default type;
