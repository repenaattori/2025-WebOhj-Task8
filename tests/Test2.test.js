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

describe('Test 2', ()=>{
    let dom;

    beforeEach(async ()=>{
        dom = await JSDOM.fromFile('./index.html',{
            resources: 'usable',
            runScripts: 'dangerously'
        });

        
        Object.defineProperty(dom.window, 'fetch', {value: mockFetch})

        await new Promise((resolve) => dom.window.addEventListener('load', resolve));        

    })
   
    it('Check that the name is set.', done =>{

        let button = dom.window.document.querySelector('button');
        let input = dom.window.document.querySelector('input');
        let h3 = dom.window.document.querySelector('h3');
        let image = dom.window.document.querySelector('img');
        fireEvent.change(input, {target: {value: '1'}} );
        fireEvent.click(button);
        
        setTimeout(()=>{
            expect(h3.textContent).toContain('George Bluth');
            done();
        },1000);  
    }, 2000);

    it('Check that the name is set.', done =>{

        let button = dom.window.document.querySelector('button');
        let input = dom.window.document.querySelector('input');
        let h3 = dom.window.document.querySelector('h3');
        let image = dom.window.document.querySelector('img');
        fireEvent.change(input, {target: {value: '2'}} );
        fireEvent.click(button);
        
        setTimeout(()=>{
            expect(h3.textContent).toContain('Janet Weaver');
            done();
        },1000);  
    }, 2000);
    
})