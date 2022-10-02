describe('DELETE /characters/id', function(){

    const thor = {
        name: 'Thor',
        alias: 'Thor',
        team: ['Vingadores'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function(){
        before(function(){
            cy.postCharacter(thor)
            .then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })

        })

        it('deve remover o personagem pelo id', function(){
            
            const id = Cypress.env('characterId')
            cy.deleteCharactersById(id).then(function(response){
                expect(response.status).to.eql(204)
            })
        })

        after(function(){
            const id = Cypress.env('characterId')
            cy.searchCharactersById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })

        it('deve retornar 404 ao remover por id não cadastrado', function(){
            
            const id = '63389749e26452c4d2057555'
            cy.deleteCharactersById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
    })
})