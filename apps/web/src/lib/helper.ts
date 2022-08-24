import * as R from 'ramda';

export const pipeWhileNotNil = R.pipeWith((f, res) => (R.isNil(res) ? res : f(res)));
