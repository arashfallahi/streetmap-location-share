import { LocationInfoModel } from './location-info.model';

describe('LocationInfo', () => {
  it('should create an instance', () => {
    expect(new LocationInfoModel(0, '', [0, 1], 'Personal', '')).toBeTruthy();
  });
});
