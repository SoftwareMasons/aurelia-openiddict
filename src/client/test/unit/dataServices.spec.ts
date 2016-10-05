import {Container} from 'aurelia-dependency-injection';
import {DataServices} from 'src/services/dataServices';
import {Endpoint, Rest} from 'aurelia-api';

describe('DataServices', () => {
  const container = new Container();
  const httpClient = container.get(Rest);
  const githubClient = container.get(Rest);
  let sut = new DataServices(httpClient, githubClient);

  describe('constructor()', () => {
    it('should have a resourceClient defined', () => {
      expect(sut.resourcesClient).toBeDefined();
    });

    it('should have logger defined with Data Services as id', () => {
      expect(sut.logger).toBeDefined();
      expect(sut.logger.id).toBe('Data Services');
    });

    it('should have a githubClient defined', () => {
      expect(sut.githubClient).toBeDefined();
    });
  });

  describe('getToDoItems()', () => {
    it('returns items for only authenticated user', done => {
      let todoItems = [
        { id: 1, description: 'I need to read PinpointTownes' }
      ];
      spyOn(httpClient, 'find').and.callFake((endPoint) => {
        if (endPoint === 'todoItems') {
          return Promise.resolve(todoItems);
        }
      });
      sut.getToDoItems().then(response => {
        expect(response).toBe(todoItems);
        done();
      });
    });
  });

  describe('getUsers', () => {
    it('returns users', done => {
      let users = [
        { userId: 1, userName: 'John Doe' }
      ];
      spyOn(githubClient, 'find').and.callFake((endPoint) => {
        if (endPoint === 'users') {
          return Promise.resolve(users);
        }
      });
      sut.getUsers().then(response => {
        expect(response).toBe(users);
        done();
      });
    });
  });
});
