public with sharing class pokeController {
    @AuraEnabled(Cacheable=true)
    public static Pokemon__c[] getAllPokemons(String name,String generacion, String tipo) {
       Integer genPokemon = 0;
        if (string.isNotBlank(generacion)){
            genPokemon = Integer.valueOf(generacion);
        } 
       
        String pokemonQuery = 'SELECT Id, Name, PokeIndex__c, Generacion__c, Altura__c, Peso__c, Tipo__c, Foto_URL__c FROM Pokemon__c';
        if (String.isBlank(name)){
            if(String.isNotBlank(tipo)){
            pokemonQuery += ' WHERE Tipo__c INCLUDES(:tipo) ';
            }

            if(String.isBlank(tipo)){
                if(genPokemon != 0){
                    pokemonQuery += ' WHERE Generacion__c = :genPokemon ';
                }
            }

            if(genPokemon != 0){
                pokemonQuery += ' AND Generacion__c = :genPokemon ';
            }
        }

        if(String.isNotBlank(name)){
            pokemonQuery += ' WHERE Name LIKE \'%' + name + '%\''  ;
            
            if(String.isNotBlank(tipo)){
                pokemonQuery += ' AND Tipo__c INCLUDES(:tipo)';
            }

            if(genPokemon != 0){
                pokemonQuery += ' AND Generacion__c = :genPokemon ';
            }
        }

        pokemonQuery += ' WITH SECURITY_ENFORCED ORDER BY PokeIndex__c';
       
        List<Pokemon__c> pokeWithFilters = new List <Pokemon__c>();
            Database.QueryLocatorIterator iterator = Database.getQueryLocator(pokemonQuery).iterator();
            while (iterator.hasNext()) {
                pokeWithFilters.add((Pokemon__c)iterator.next());
            }
            System.debug(pokeWithFilters);

        return pokeWithFilters;
    }
}    
