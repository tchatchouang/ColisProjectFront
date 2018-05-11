import * as _ from 'lodash';
import {actionsTypes} from './actions.types';

describe('actionsTypes', () => {

  describe('actions', () => {
    it('should all have a unique value', () => {
      const actionsCategories = _.values(actionsTypes);
      const actionsKeysLists = _.flatMap(actionsCategories, cat => _.values(cat));
      const countByKey = _.reduce(actionsKeysLists, (aggr, key) => {
        aggr[key] = aggr[key] ? aggr[key] + 1 : 1;
        return aggr;
      }, {});
      _.each(_.entries(countByKey), entry => {
        expect(entry[1]).toBe(1, `Action key "${entry[0]}" is not unique`);
      });
    });
  });
});
