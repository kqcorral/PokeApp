import { api, LightningElement } from 'lwc';
    
export default class PokeTile extends LightningElement {
    @api pokemon;

    handleRecordClick(){
        const selectEvent = new CustomEvent('pokeview', {
            detail: this.pokemon.Id
        });
        this.dispatchEvent(selectEvent);
    }
}