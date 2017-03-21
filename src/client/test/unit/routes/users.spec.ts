import {Container} from 'aurelia-dependency-injection';
import {Users} from '../../../src/routes/users';
import {DataServices} from '../../../src/services/dataServices';

describe('the Users module', () => {
  const container = new Container();
  const dataServices = container.get(DataServices);
  const itemStubs = [
    { id: '12345', name: 'John Doe' },
    { id: '54321', name: 'Jane Doe' }
  ];
  const sut = new Users(dataServices);

  it('dataServices should be defined', () => {
    expect(sut.dataServices).toBeDefined();
  });

  it('sets fetch response to users', (done) => {
    spyOn(dataServices, 'getUsers').and.callFake(() => {
      return Promise.resolve(itemStubs);
    });
           
    sut.activate().then(() => {
      expect(sut.users).toBe(itemStubs);
      done();
    });
  });
});
