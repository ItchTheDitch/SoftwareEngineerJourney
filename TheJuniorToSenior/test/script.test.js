const googleSearch = require('./script')

dbMock = [
    'dogpictures.com',
    'dogi.com',
    'cheesepuff.com',
    'burger.com'
]

describe('googleSearch', ()=> {
    it('this is a fucking test', () => {
        expect('hello').toBe('hello')
         googleSearch('test',dbMock )
    } )
    
    it('is searching google ', () => {
        expect(googleSearch('testest',dbMock)).toEqual([])
        expect(googleSearch('dog',dbMock)).toEqual([ 'dogpictures.com','dogi.com',])
    })
    
    it('work with undefined and null input', () => {
        expect(googleSearch(undefined,dbMock)).toEqual([])
        expect(googleSearch(null,dbMock)).toEqual([])
    })
    
    it('does not return more than 3 matches', ()=> {
        expect(googleSearch('.com',dbMock).length).toEqual(3)
    })

})
