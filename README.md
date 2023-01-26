# Installation 
`docker-compose up`

# Description
Création d'une nouvelle commande, avec le flag "1" -> ``` POST api/commands ```  
Un message est transmis sur une queue rabbitmq
Un worker consomme cette queue  
Il reçoit le message et change le flag par "2" -> ``` PUT api/commands ```  

# Documentation

## Créer une commande

```sh
POST /api/commands
```

Exemple body : 
```sh
{
	"name": "TEST",
	"flag": 1
}
```