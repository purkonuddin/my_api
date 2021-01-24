const helpers = require("../helpers");
const fetch = require('node-fetch');

function search(arr, searchKey) {
    const index = arr.findIndex((x)=>RegExp(`${searchKey}`, 'g').test(x.title));
    if (index < 0) return {};
    const hero = arr[index];
    return hero;
}  

module.exports = {
     // FIND A HERO
    searchHero: async(request, response)=>{
        const hero = request.heroArr;
        const name = request.toSearch; 

        const singlehero = search(hero,`${name}`);

        helpers.response(response, 200, singlehero); 
    },
     // GET HEROs List
    getHeros: async (request, response, next) => {
        try {
            let url = "https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json";
            let settings = { method: "Get" };
            let heroArr = []; 

            await fetch(url, settings)
            .then(res => res.json())
            .then((json) => { 
                Object.keys(json)
                .map(key => ( { key: key, value: json[key] } ))
                .forEach((sortedData) => {
                    if(sortedData.key === 'data') {

                        Object.keys(sortedData.value)
                            .map(key => ( { title: key, detail: sortedData.value[key] } ))
                            .sort((a, b) => (a.detail.name < b.detail.name) ? -1 : (a.detail.name > b.detail.name) ? 1 : 0)
                            .forEach((sortedDataHeros) => {
                                heroArr.push(sortedDataHeros) 
                            })
                    } 

                }); 

            });  

            request.heroArr = heroArr;
            request.toSearch = request.query.name || "";
            next()

        
        } catch (error) {
            helpers.customErrorResponse(response, 404, error);
        }

    }, 
}