class ExcursionsAPI {
    constructor() {

    }

    async addExcursion(excursionData) {
        const excursions = await fetch('http://localhost:3000/excursions', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
            
        }).then((value) => value.json())
        console.log(excursions);
        
        const id = excursions.length + 1
        const data = {
            ...excursionData, id
        }

        await fetch('http://localhost:3000/excursions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

}


export default ExcursionsAPI;