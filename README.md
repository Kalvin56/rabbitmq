# Installation 
- `cd api/code` -> `npm install`
- `cd worker_plat/code` -> `npm install`
- `docker-compose up`
- Créer la queue 'command' à cette url : "http://localhost:15672/"
- Si container "worker_plat" crash, sur un nouveau terminal -> `docker-compose restart worker_plat`

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