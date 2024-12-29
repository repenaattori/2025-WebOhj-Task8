const { fireEvent, waitFor, getByText } = require('@testing-library/dom');
const {JSDOM} = require('jsdom');
require('@testing-library/dom')
require('@testing-library/jest-dom');
const users = require('./testdata');


const mockFetch = jest.fn(url => new Promise((resolve,reject) =>{
    if(!url.includes('reqres.in/api/users/')){
        reject(new Error('Wrong url for fetch!'));
        return;
    }

    let parts = url.split('/');
    let id = parts[parts.length - 1];

    resolve( {json: () =>  new Promise( (resolve, reject) => {
        resolve(users[id-1]);
    }) } )
}))

describe('Test 3', ()=>{
    let dom;

    beforeEach(async ()=>{
        dom = await JSDOM.fromFile('./index.html',{
            resources: 'usable',
            runScripts: 'dangerously'
        });

        
        Object.defineProperty(dom.window, 'fetch', {value: mockFetch})

        await new Promise((resolve) => dom.window.addEventListener('load', resolve));        

    })
   
    it('Check that the image source is set.',  done=>{

        let button = dom.window.document.querySelector('button');
        let input = dom.window.document.querySelector('input');
        let image = dom.window.document.querySelector('img');
        fireEvent.change(input, {target: {value: '1'}} );
        fireEvent.click(button);
        
        setTimeout(()=>{
            expect(image.src).toBe('https://reqres.in/img/faces/1-image.jpg');
            done();
        },1000);  
    }, 2000);

    it('Check that the image source is set.',  done=>{

        let button = dom.window.document.querySelector('button');
        let input = dom.window.document.querySelector('input');
        let image = dom.window.document.querySelector('img');
        fireEvent.change(input, {target: {value: '2'}} );
        fireEvent.click(button);
        
        setTimeout(()=>{        
            expect(image.src).toBe('https://reqres.in/img/faces/2-image.jpg');
            done();
        },1000);  
    }, 2000);
    
})