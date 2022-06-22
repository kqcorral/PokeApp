import {NavigationMixin} from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';

import getAllPokemons from '@salesforce/apex/PokeController.getAllPokemons';
const genFilter = [
    { label: "All", value: '' },
    { label: "1", value: '1' },
    { label: "2", value: '2' },
    { label: "3", value: '3' },
    { label: "4", value: '4' },
    { label: "5", value: '5' },
    { label: "6", value: '6' },
    { label: "7", value: '7' },
    { label: "8", value: '8' }
];
const tFilter = [
    
    { label: "Normal", value: 'Normal' },
    { label: "Fighting", value: 'Fighting' },
    { label: "Flying", value: 'Flying' },
    { label: "Poison", value: 'Poison' },
    { label: "Ground", value: 'Ground' },
    { label: "Rock", value: 'Rock' },
    { label: "Bug", value: 'Bug' },
    { label: "Ghost", value: 'Ghost' },
    { label: "Steel", value: 'Steel' },
    { label: "Fire", value: 'Fire' },
    { label: "Water", value: 'Water' },
    { label: "Grass", value: 'Grass' },
    { label: "Electric", value: 'Electric' },
    { label: "Psychic", value: 'Psychic' },
    { label: "Ice", value: 'Ice' },
    { label: "Dragon", value: 'Dragon' },
    { label: "Dark", value: 'Dark' },
    { label: "Fairy", value: 'Fairy' },
    { label: "All", value: '' }
];
export default class PokeList extends NavigationMixin(LightningElement) {
	tipo = '';
	generacion = '';
	name = '';

	
	@wire(getAllPokemons,{name:'$name',generacion:'$generacion',tipo:'$tipo' })
	pokemons;

	handleChange(event){
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.name = searchTerm;
		}, 300);
	}
	get generationFilter() {
        return genFilter;
    }
	genChange(event){
		this.generacion = event.detail.value;
		console.log(event.detail.value, 'event');
	}
	get typeFilter() {
        return tFilter;
    }
	typeChange(event){
		this.tipo = event.detail.value;
		console.log(event.detail.value, 'event');
	}

   handlePokeView(event) {
		
		const pokemonId = event.detail;
		// Navego a la pagina de registros de Pokemon
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: pokemonId,
				objectApiName: 'Pokemon__c',
				actionName: 'view',
			},
		});
	} 

}
