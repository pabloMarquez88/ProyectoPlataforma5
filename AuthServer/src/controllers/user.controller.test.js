const userController = require('./user.controller');
const userService = require('../services/user.service.js');

jest.mock('../services/user.service.js');

let sendMock;
let statusMock;
let res;

beforeEach(() => {
  sendMock = jest.fn();
  statusMock = jest.fn();
  res = { status: statusMock, send: sendMock };
  statusMock.mockImplementation(() => res);
});

describe('user Controller', () => {
  describe('sign up method', () => {
    it('should fail with 400 if email is missing', async () => {
      const req = {
        body: {
          password: 'password',
          firstName: 'firstName',
          lastName: 'lastName',
          userName: 'userName'
        }
      };

      await userController.signUp(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if password is missing', async () => {
      const req = {
        body: {
          email: 'email@test.com',
          firstName: 'firstName',
          lastName: 'lastName',
          userName: 'userName'
        }
      };

      await userController.signUp(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if firstName is missing', async () => {
      const req = {
        body: {
          email: 'email@test.com',
          password: 'password',
          lastName: 'lastName',
          userName: 'userName'
        }
      };

      await userController.signUp(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if lastName is missing', async () => {
      const req = {
        body: {
          email: 'email@test.com',
          password: 'password',
          firstName: 'firstName',
          userName: 'userName'
        }
      };

      await userController.signUp(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if userName is missing', async () => {
      const req = {
        body: {
          email: 'email@test.com',
          password: 'password',
          firstName: 'firstName',
          lastName: 'lastName'
        }
      };

      await userController.signUp(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should pass with 200 and create user', async () => {
      const req = {
        body: {
          email: 'email@test.com',
          password: 'password',
          firstName: 'firstName',
          lastName: 'lastName',
          userName: 'userName'
        }
      };
      const mock = {};
      userService.signUp.mockImplementationOnce(() => mock);

      await userController.signUp(req, res);
      expect(statusMock).toBeCalledWith(200);
    });
  });
  describe('/put update user info', () => {
    it('should fail with 400 if email is sent with wrong type', async () => {
      const req = {
        body: {
          email: 1,
          userName: 'userName',
          firstName: 'firstName',
          lastName: 'lastName'
        },
        params: { id: 1 }
      };

      await userController.update(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if userName is sent with wrong type', async () => {
      const req = {
        body: {
          email: 'test@mail.com',
          userName: 1,
          firstName: 'firstName',
          lastName: 'lastName'
        },
        params: { id: 1 }
      };

      await userController.update(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if firstName is sent with wrong type', async () => {
      const req = {
        body: {
          email: 1,
          userName: 'userName',
          firstName: 1,
          lastName: 'lastName'
        },
        params: { id: 1 }
      };

      await userController.update(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should fail with 400 if lastName is sent with wrong type', async () => {
      const req = {
        body: {
          email: 1,
          userName: 'userName',
          firstName: 'firstName',
          lastName: 1
        },
        params: { id: 1 }
      };

      await userController.update(req, res);
      expect(statusMock).toBeCalledWith(400);
    });
    it('should succeed with 200 and update user info', async () => {
      const req = {
        body: {
          email: 'test@mail.com',
          userName: 'userName',
          firstName: 'firstName',
          lastName: 'lastName'
        },
        params: { id: 1 }
      };

      const mock = {};
      userService.update.mockImplementationOnce(() => mock);

      await userController.update(req, res);
      expect(statusMock).toBeCalledWith(200);
    });
  });
  describe('delete single user', () => {
    it('should succeed with 200 and delete user', async () => {
      const req = { params: { id: 1 } };

      const mock = {};
      userService.delete.mockImplementationOnce(() => mock);

      await userController.delete(req, res);
      expect(statusMock).toBeCalledWith(200);
    });
  });
  describe('get single user', () => {
    it('should pass with 200 ', async () => {
      const req = {
        params: { id: '1' }
      };
      const mock = [
        {
          id: '1',
          userName: 'userName',
          email: 'email@email.com',
          lastName: 'lastName',
          firstName: 'firstName',
          createdAt: '2019-09-03T16:27:20.000Z'
        }
      ];

      const result = [
        {
          id: '1',
          userName: 'userName',
          email: 'email@email.com',
          lastName: 'lastName',
          firstName: 'firstName',
          createdAt: '2019-09-03T16:27:20.000Z'
        }
      ];

      userService.get.mockImplementationOnce(() => mock);

      await userController.get(req, res);
      expect(statusMock).toBeCalledWith(200);
      expect(sendMock).toBeCalledWith(expect.objectContaining(result));
    });

    it('should pass with 404 user not found ', async () => {
      const req = {
        params: { id: '1' }
      };

      userService.get.mockImplementationOnce(() => {
        throw {
          status: 404,
          error: 'user_not_found',
          msg: 'Usuario no encontrado'
        };
      });

      await userController.get(req, res);
      expect(statusMock).toBeCalledWith(404);
    });
  });
});
