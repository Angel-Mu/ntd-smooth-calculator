const request = require('supertest');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const AppService = require('../../services/app.service');

describe('AppService', () => {
  let app;

  beforeAll(() => {
    app = AppService.init();
  });

  test('should initialize the app with all middlewares', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Not found');
  });

  // Test for CORS
  test('should have CORS headers', async () => {
    const res = await request(app).options('/');
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });

  // Test for error handling
  test('should convert error to ApiError and handle it', async () => {
    app.post('/login', () => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
    });

    const res = await request(app).post('/login');
    expect(res.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });
});
