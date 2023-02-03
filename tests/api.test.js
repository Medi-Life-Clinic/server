import request from 'supertest'
import app from '../api.js'

// Testing api.js route "/" for default route

// Test 1: Returns failed on the GET request to "/"
// FAIL
describe('Medi-Life Clinic API', () => {
  test('Returns 200 status code on GET request to "/"', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
  
// Test 2: Returns "Medi-Life Clinic API" message on GET request to "/"
// PASS
  test('Returns "Medi-Life Clinic API" message on GET request to "/"', async () => {
    const response = await request(app).get('/')
    expect(response.text).toBe('{"info":"Medi-Life Clinic API"}')
  })
})

// Testing api.js routes for "/api/user", "/api/doctor", and "/api/appointment"
// PASS
describe('User Routes', () => {
  test('Returns 404 status code on GET request to "/api/user"', async () => {
    const response = await request(app).get('/api/user')
    expect(response.statusCode).toBe(404)
  })
})

describe('Doctor Routes', () => {
  test('Returns 404 status code on GET request to "/api/doctor"', async () => {
    const response = await request(app).get('/api/doctor')
    expect(response.statusCode).toBe(404)
  })
})

describe('Appointment Routes', () => {
  test('Returns 404 status code on GET request to "/api/appointment"', async () => {
    const response = await request(app).get('/api/appointment')
    expect(response.statusCode).toBe(404)
  })
})