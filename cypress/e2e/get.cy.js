describe('GET /characters', function () {

    const characters = [
        {
            name: 'Peter Quill',
            alias: 'Senhor das Galaxias',
            team: ['Guardiões da Galaxia', 'Vingadores'],
            active: true
        },
        {
            name: 'Groot',
            alias: 'Groot',
            team: ['Guardiões da Galaxia'],
            active: true
        },
        {
            name: 'Rocket Racoon',
            alias: 'Rocket',
            team: ['Guardiões da Galaxia'],
            active: true
        }
    ]

    before(function () {
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function () {

        cy.getCharacters()
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
                expect(response.body.length).greaterThan(0)
            })
    })

    it('deve buscar personagem por nome', function(){
        cy.searchCharacters('Rocket Racoon')
            .then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('Rocket')
                expect(response.body[0].team).to.eql(['Guardiões da Galaxia'])
                expect(response.body[0].active).to.eql(true)
            })
    })
})

describe('GET /characters/id', function(){

    const gamora = {
        name: 'Gamora',
        alias: 'Gamora',
        team: ['Guardiões da Galaxia'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function(){
        before(function(){
            cy.postCharacter(gamora)
            .then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })

        })

        it('deve buscar o personagem pelo id', function(){
            
            const id = Cypress.env('characterId')
            cy.searchCharactersById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Gamora')
                expect(response.body.team).to.eql(['Guardiões da Galaxia'])
                expect(response.body.active).to.eql(true)
            })
        })

        it('deve retornar 404 ao buscar por id não cadastrado', function(){
            
            const id = '63389749e26452c4d2057555'
            cy.searchCharactersById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
    })
})