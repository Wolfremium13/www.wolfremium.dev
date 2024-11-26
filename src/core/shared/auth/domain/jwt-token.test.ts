import {JwtToken} from "./jwt-token"

describe('JwtToken', () => {
  it('should create a valid jwt token', () => {
    const token = JwtToken.create('ey')
    expect(token).toBeDefined()
  })
  it('should throw an error if token is missing', () => {
    expect(() => JwtToken.create('')).toThrow()
  })
  it('should throw an error if token is invalid', () => {
    expect(() => JwtToken.create('token')).toThrow()
  })
})
