# Installation 
- `cd api/code` -> `npm install`
- `cd worker_plat/code` -> `npm install`
- `docker-compose up`
- Si container "worker_plat" crash, sur un nouveau terminal -> `docker-compose restart worker_plat`
- Créer la queue 'command' à cette url : "http://localhost:15672/"

# Description
Création d'une nouvelle commande, avec le flag "1" -> ``` POST api/commands ```  
Un message est transmis sur une queue rabbitmq  
Un worker consomme cette queue  
Il reçoit le message et change le flag par "2" -> ``` PUT api/commands ```     
Vérifier que le flag a bien été changé -> ``` GET api/commands/:id ```     

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

Exemple réponse :
```sh
{
    "name": "TEST",
    "flag": 1,
    "_id": "63d24b5372f37c079fc95058",
    "__v": 0
}
```

## Récupérer une commande (id)

```sh
GET /api/commands/63d24b5372f37c079fc95058
```

Exemple réponse :
```sh
{
    "_id": "63d24b5372f37c079fc95058",
    "name": "TEST",
    "flag": 2,
    "__v": 0
}
```
