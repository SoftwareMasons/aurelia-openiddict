import {ToDo} from 'src/routes/todo';
import {DataServices} from 'src/services/dataServices';
import {Rest} from 'aurelia-api';
import {Container} from 'aurelia-dependency-injection';

describe('ToDo', () => {
  const container = new Container();
  const httpClient = container.get(Rest);
  const dataServices = new DataServices(httpClient);
  let sut = new ToDo(dataServices);

  describe('constructor()', () => {
    it('dataServices should be defined', () => {
      expect(sut.dataServices).toBeDefined();
    });
  });

  describe('activate()', () => {
    let todoItems = [
      { id: 1, description: 'I need to read PinpointTownes' }
    ];
    it('todoItems exist', done => {
      spyOn(dataServices, 'getToDoItems').and.callFake(() => {
        return Promise.resolve(todoItems);
      });
      sut.activate()
        .then(() => {
          expect(sut.todoItems).toBe(todoItems);
          done();
        });
    });
  });
});